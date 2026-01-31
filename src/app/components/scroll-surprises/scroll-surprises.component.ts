import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ScrollEffectsService,
  ScrollProgress,
} from '../../services/scroll-effects.service';

@Component({
  selector: 'app-scroll-surprises',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-effects-container" *ngIf="isBrowser">
      <!-- Scroll progress indicator - Cyan only -->
      <div class="scroll-progress-bar" [style.width.%]="scrollPercentage">
        <div class="progress-glow"></div>
      </div>

      <!-- Section indicator dots -->
      <div class="section-indicators">
        <div
          *ngFor="let section of sections; let i = index"
          class="indicator-dot"
          [class.active]="currentSection === section"
          [class.visited]="visitedSections.has(section)"
          (click)="scrollToSection(section)"
          [title]="section"
        >
          <div class="dot-ring"></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .scroll-effects-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
      }

      /* Cyan-only progress bar */
      .scroll-progress-bar {
        position: fixed;
        top: 0;
        left: 0;
        height: 5px;
        background: linear-gradient(
          90deg,
          #005f5f,
          #008080,
          #00a0a0,
          #00c8c8,
          #00ffff,
          #00c8c8,
          #00a0a0
        );
        background-size: 200% 100%;
        animation: cyanFlow 4s linear infinite;
        z-index: 10003;
        transition: width 0.15s ease-out;
        box-shadow: 0 0 8px rgba(0, 255, 255, 0.5);
      }

      .progress-glow {
        position: absolute;
        right: -3px;
        top: -5px;
        width: 16px;
        height: 16px;
        background: radial-gradient(
          circle,
          rgba(0, 255, 255, 0.95),
          rgba(0, 200, 200, 0.5),
          transparent
        );
        border-radius: 50%;
        filter: blur(2px);
      }

      @keyframes cyanFlow {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 200% 50%;
        }
      }

      /* Section indicator dots */
      .section-indicators {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 12px;
        z-index: 10002;
        pointer-events: auto;
      }

      .indicator-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: var(--border-color);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
      }

      .indicator-dot:hover {
        background: var(--primary-color);
        transform: scale(1.2);
      }

      .indicator-dot.visited {
        background: var(--primary-color);
        opacity: 0.5;
      }

      .indicator-dot.active {
        background: var(--primary-color);
        opacity: 1;
        box-shadow: 0 0 10px var(--primary-color);
      }

      .dot-ring {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        border: 1px solid var(--primary-color);
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease;
      }

      .indicator-dot.active .dot-ring {
        opacity: 0.4;
      }

      @media (max-width: 768px) {
        .section-indicators {
          right: 10px;
          gap: 8px;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
        }

        .scroll-progress-bar {
          height: 4px;
        }
      }
    `,
  ],
})
export class ScrollSurprisesComponent implements OnInit, OnDestroy {
  isBrowser = false;
  scrollPercentage = 0;
  currentSection: string | null = null;
  visitedSections = new Set<string>();
  sections = [
    'hero',
    'about',
    'education',
    'experience',
    'certificates',
    'skills',
    'projects',
    'contact',
  ];

  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private scrollEffects: ScrollEffectsService,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Subscribe to scroll progress
    this.subscriptions.push(
      this.scrollEffects.scrollProgress.subscribe(
        (progress: ScrollProgress) => {
          this.scrollPercentage = progress.percentage;
          this.currentSection = progress.section;
        },
      ),
    );

    // Subscribe to section reached events
    this.subscriptions.push(
      this.scrollEffects.sectionReached.subscribe((section: string) => {
        this.visitedSections.add(section);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  scrollToSection(section: string): void {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
