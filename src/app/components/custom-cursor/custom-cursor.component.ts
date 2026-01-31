import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  shade: number; // 0-1 representing cyan shade
  life: number;
}

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-container" *ngIf="isBrowser">
      <!-- Main cursor dot -->
      <div
        #cursorDot
        class="cursor-dot"
        [class.clicking]="isClicking"
        [class.hovering]="isHovering"
        [style.transform]="'translate(' + dotX + 'px, ' + dotY + 'px)'"
      >
        <div class="cursor-dot-inner"></div>
      </div>

      <!-- Cursor outline/ring -->
      <div
        #cursorRing
        class="cursor-outline"
        [class.clicking]="isClicking"
        [class.hovering]="isHovering"
        [style.transform]="'translate(' + ringX + 'px, ' + ringY + 'px)'"
      ></div>

      <!-- Particle trail canvas -->
      <canvas #trailCanvas class="trail-canvas"></canvas>
    </div>
  `,
  styles: [
    `
      .cursor-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
        overflow: hidden;
      }

      .cursor-dot {
        position: fixed;
        top: -5px;
        left: -5px;
        width: 10px;
        height: 10px;
        pointer-events: none;
        z-index: 10002;
        will-change: transform;
      }

      .cursor-dot-inner {
        width: 100%;
        height: 100%;
        background: var(--primary-color);
        border-radius: 50%;
        transition:
          transform 0.15s ease,
          background 0.2s ease,
          box-shadow 0.2s ease;
        box-shadow:
          0 0 10px rgba(0, 200, 200, 0.5),
          0 0 20px rgba(0, 255, 255, 0.2);
      }

      .cursor-dot.clicking .cursor-dot-inner {
        transform: scale(0.6);
        background: #00ffff;
        box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
      }

      .cursor-dot.hovering .cursor-dot-inner {
        transform: scale(1.3);
        background: #00e0e0;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
      }

      .cursor-outline {
        position: fixed;
        top: -20px;
        left: -20px;
        width: 40px;
        height: 40px;
        border: 1.5px solid var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        opacity: 0.4;
        transition:
          width 0.25s ease,
          height 0.25s ease,
          top 0.25s ease,
          left 0.25s ease,
          opacity 0.25s ease,
          border-color 0.25s ease;
        will-change: transform;
      }

      .cursor-outline.clicking {
        width: 25px;
        height: 25px;
        top: -12.5px;
        left: -12.5px;
        opacity: 0.8;
        border-color: #00ffff;
      }

      .cursor-outline.hovering {
        width: 55px;
        height: 55px;
        top: -27.5px;
        left: -27.5px;
        opacity: 0.25;
        border-color: #00d0d0;
      }

      .trail-canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
      }

      /* Mobile: hide custom cursor */
      @media (hover: none) and (pointer: coarse) {
        .cursor-container {
          display: none;
        }
      }
    `,
  ],
})
export class CustomCursorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cursorDot') cursorDot!: ElementRef<HTMLDivElement>;
  @ViewChild('cursorRing') cursorRing!: ElementRef<HTMLDivElement>;
  @ViewChild('trailCanvas') trailCanvas!: ElementRef<HTMLCanvasElement>;

  isBrowser = false;
  dotX = 0;
  dotY = 0;
  ringX = 0;
  ringY = 0;
  isClicking = false;
  isHovering = false;

  private mouseX = 0;
  private mouseY = 0;
  private animationId: number | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: TrailParticle[] = [];
  private lastMouseX = 0;
  private lastMouseY = 0;
  private shadeIndex = 0;

  // Cyan color palette for trail particles
  private cyanShades = [
    { r: 0, g: 100, b: 100 }, // Dark cyan
    { r: 0, g: 140, b: 140 }, // Medium dark
    { r: 0, g: 180, b: 180 }, // Medium
    { r: 0, g: 210, b: 210 }, // Medium light
    { r: 0, g: 240, b: 240 }, // Light
    { r: 0, g: 255, b: 255 }, // Bright cyan
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.setupEventListeners();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser && this.trailCanvas) {
      this.setupCanvas();
      this.animate();
    }
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.isBrowser) {
      this.removeEventListeners();
    }
  }

  private setupCanvas(): void {
    const canvas = this.trailCanvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.ctx = canvas.getContext('2d');

    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = (): void => {
    if (this.trailCanvas) {
      const canvas = this.trailCanvas.nativeElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };

  private setupEventListeners(): void {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('mouseover', this.handleMouseOver);
    document.addEventListener('mouseout', this.handleMouseOut);
  }

  private removeEventListeners(): void {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mousedown', this.handleMouseDown);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('mouseover', this.handleMouseOver);
    document.removeEventListener('mouseout', this.handleMouseOut);
    window.removeEventListener('resize', this.handleResize);
  }

  private handleMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Calculate mouse velocity for particle spawning
    const dx = this.mouseX - this.lastMouseX;
    const dy = this.mouseY - this.lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Spawn particles based on speed (reduced count)
    if (speed > 3) {
      const particleCount = Math.min(Math.floor(speed / 8), 2);
      for (let i = 0; i < particleCount; i++) {
        this.spawnParticle();
      }
    }

    this.lastMouseX = this.mouseX;
    this.lastMouseY = this.mouseY;
  };

  private handleMouseDown = (): void => {
    this.isClicking = true;
  };

  private handleMouseUp = (): void => {
    this.isClicking = false;
  };

  private handleMouseOver = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('clickable') ||
      target.classList.contains('card') ||
      target.classList.contains('skill-item') ||
      target.classList.contains('project-card') ||
      target.classList.contains('certificate-card') ||
      target.classList.contains('nav-link');

    if (isClickable) {
      this.isHovering = true;
    }
  };

  private handleMouseOut = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const isClickable =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.classList.contains('clickable') ||
      target.classList.contains('card') ||
      target.classList.contains('skill-item') ||
      target.classList.contains('project-card') ||
      target.classList.contains('certificate-card') ||
      target.classList.contains('nav-link');

    if (isClickable) {
      this.isHovering = false;
    }
  };

  private spawnParticle(): void {
    // Cycle through cyan shades
    this.shadeIndex = (this.shadeIndex + 1) % this.cyanShades.length;

    this.particles.push({
      x: this.mouseX + (Math.random() - 0.5) * 8,
      y: this.mouseY + (Math.random() - 0.5) * 8,
      size: Math.random() * 3 + 1.5,
      opacity: 0.8,
      shade: this.shadeIndex,
      life: 1,
    });

    // Limit particles
    if (this.particles.length > 30) {
      this.particles.shift();
    }
  }

  private animate = (): void => {
    // Smooth follow for dot
    this.dotX += (this.mouseX - this.dotX) * 0.35;
    this.dotY += (this.mouseY - this.dotY) * 0.35;

    // Slower follow for ring (creates trailing effect)
    this.ringX += (this.mouseX - this.ringX) * 0.15;
    this.ringY += (this.mouseY - this.ringY) * 0.15;

    // Update and draw particles
    if (this.ctx) {
      const canvas = this.trailCanvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life -= 0.03;
        p.opacity = p.life * 0.7;
        p.size *= 0.96;

        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        const color = this.cyanShades[p.shade];

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.opacity})`;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${p.opacity * 0.5})`;
        this.ctx.fill();
      }
    }

    this.animationId = requestAnimationFrame(this.animate);
  };
}
