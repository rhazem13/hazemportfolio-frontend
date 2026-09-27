import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, NgZone, OnDestroy, PLATFORM_ID, ViewChild, inject } from '@angular/core';

type Shard = { progress: number; lane: number; length: number; speed: number; tone: number };

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/hero.component.scss'],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('shardsHost') private shardsHost?: ElementRef<HTMLElement>;
  @ViewChild('shardsCanvas') private shardsCanvas?: ElementRef<HTMLCanvasElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly zone = inject(NgZone);
  private readonly shards: Shard[] = Array.from({ length: 260 }, (_, index) => {
    const random = (salt: number) => ((Math.sin(index * 127.1 + salt * 311.7) * 43758.5453) % 1 + 1) % 1;
    return {
      progress: random(1),
      lane: random(2) * 2 - 1,
      length: 7 + random(3) * 22,
      speed: 0.04 + random(4) * 0.055,
      tone: index % 9,
    };
  });
  private readonly pointer = { x: -1000, y: -1000, strength: 0, targetStrength: 0 };
  private frame = 0;
  private lastTime = 0;
  private width = 0;
  private height = 0;
  private resizeObserver?: ResizeObserver;
  private themeObserver?: MutationObserver;
  private reducedMotion?: MediaQueryList;
  private onMotionChange?: () => void;
  private colors = ['#315d77', '#a45f3f', '#526572'];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId) || !this.shardsHost || !this.shardsCanvas) return;

    const host = this.shardsHost.nativeElement;
    const canvas = this.shardsCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;

    this.zone.runOutsideAngular(() => {
      const resize = () => {
        const bounds = host.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        this.width = bounds.width;
        this.height = bounds.height;
        canvas.width = Math.round(this.width * ratio);
        canvas.height = Math.round(this.height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.draw(context, 0);
      };
      const syncColors = () => {
        const styles = getComputedStyle(host);
        this.colors = ['--accent-color', '--signal-color', '--text-secondary']
          .map((name) => styles.getPropertyValue(name).trim());
        if (this.reducedMotion?.matches) this.draw(context, 0);
      };
      const animate = (time: number) => {
        const step = Math.min((time - (this.lastTime || time)) / 1000, 0.05);
        this.lastTime = time;
        this.pointer.strength += (this.pointer.targetStrength - this.pointer.strength) * 0.12;
        for (const shard of this.shards) shard.progress = (shard.progress + step * shard.speed) % 1;
        this.draw(context, time / 1000);
        this.frame = requestAnimationFrame(animate);
      };
      const refreshMotion = () => {
        cancelAnimationFrame(this.frame);
        this.lastTime = 0;
        if (this.reducedMotion?.matches) this.draw(context, 0);
        else this.frame = requestAnimationFrame(animate);
      };

      host.addEventListener('pointermove', this.onPointerMove);
      host.addEventListener('pointerleave', this.onPointerLeave);
      this.resizeObserver = new ResizeObserver(resize);
      this.resizeObserver.observe(host);
      this.themeObserver = new MutationObserver(syncColors);
      this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      this.onMotionChange = refreshMotion;
      this.reducedMotion.addEventListener('change', this.onMotionChange);
      syncColors();
      resize();
      refreshMotion();
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.themeObserver?.disconnect();
    if (this.onMotionChange) this.reducedMotion?.removeEventListener('change', this.onMotionChange);
    this.shardsHost?.nativeElement.removeEventListener('pointermove', this.onPointerMove);
    this.shardsHost?.nativeElement.removeEventListener('pointerleave', this.onPointerLeave);
  }

  private readonly onPointerMove = (event: PointerEvent) => {
    const bounds = this.shardsHost?.nativeElement.getBoundingClientRect();
    if (!bounds) return;
    this.pointer.x = event.clientX - bounds.left;
    this.pointer.y = event.clientY - bounds.top;
    this.pointer.targetStrength = 1;
  };
  private readonly onPointerLeave = () => { this.pointer.targetStrength = 0; };

  private draw(context: CanvasRenderingContext2D, time: number): void {
    const { width, height } = this;
    context.clearRect(0, 0, width, height);
    for (const shard of this.shards) {
      const { progress, lane, length, tone } = shard;
      let x = progress * (width + 80) - 40;
      const phase = progress * 5.4 + time * 0.28;
      let y = height * (0.5 + 0.22 * Math.sin(phase) + lane * 0.19);
      const dx = x - this.pointer.x;
      const dy = y - this.pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 105 && distance > 0) {
        const force = ((105 - distance) / 105) ** 2 * 48 * this.pointer.strength;
        x += (dx / distance) * force;
        y += (dy / distance) * force;
      }
      const angle = Math.atan2(height * 0.22 * 5.4 * Math.cos(phase), width);
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.fillStyle = this.colors[tone === 0 ? 1 : tone < 5 ? 0 : 2];
      context.globalAlpha = tone === 0 ? 0.7 : 0.32 + (1 - Math.abs(lane)) * 0.38;
      context.beginPath();
      context.moveTo(-length * 0.5, -length * 0.17);
      context.lineTo(length * 0.52, 0);
      context.lineTo(-length * 0.5, length * 0.17);
      context.closePath();
      context.fill();
      context.globalAlpha *= 0.6;
      context.strokeStyle = this.colors[tone === 0 ? 1 : 0];
      context.lineWidth = 0.65;
      context.beginPath();
      context.moveTo(-length * 0.5, -length * 0.17);
      context.lineTo(length * 0.52, 0);
      context.stroke();
      context.restore();
    }
  }
}
