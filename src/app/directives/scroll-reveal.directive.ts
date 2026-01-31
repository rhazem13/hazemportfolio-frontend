import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

export type ScrollAnimation =
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'rotateIn'
  | 'flipIn'
  | 'bounceIn'
  | 'slideInSpiral'
  | 'glitchIn'
  | 'typewriter'
  | 'parallax'
  | 'tilt3d'
  | 'rainbow'
  | 'shake'
  | 'jello';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input('appScrollReveal') animation: ScrollAnimation = 'fadeInUp';
  @Input() delay: number = 0;
  /**
   * How much of the element must be visible before triggering (0 = any intersection)
   * Use 0 for earliest possible trigger. Can be overridden per element.
   */
  @Input() threshold: number = 0;

  /**
   * rootMargin allows pre-triggering before the element fully enters the viewport
   * default uses a positive bottom margin so elements animate when ~150px away
   */
  @Input() rootMargin: string = '0px 0px 150px 0px';

  @Input() once: boolean = true;

  private observer: IntersectionObserver | null = null;
  private isBrowser: boolean;
  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Set initial hidden state with GPU acceleration hints for mobile
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
    this.renderer.setStyle(
      this.el.nativeElement,
      'will-change',
      'transform, opacity',
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'backface-visibility',
      'hidden',
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      '-webkit-backface-visibility',
      'hidden',
    );
    this.setInitialTransform();

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!this.once || !this.hasAnimated)) {
            this.animateIn();
            this.hasAnimated = true;
          } else if (!entry.isIntersecting && !this.once) {
            this.resetAnimation();
          }
        });
      },
      { threshold: this.threshold, rootMargin: this.rootMargin },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setInitialTransform(): void {
    const transforms: Record<ScrollAnimation, string> = {
      fadeInUp: 'translate3d(0, 20px, 0)',
      fadeInDown: 'translate3d(0, -20px, 0)',
      fadeInLeft: 'translate3d(-25px, 0, 0)',
      fadeInRight: 'translate3d(25px, 0, 0)',
      scaleIn: 'scale3d(0.9, 0.9, 1)',
      rotateIn: 'rotate(-8deg) scale(0.95)',
      flipIn: 'perspective(600px) rotateX(-45deg)',
      bounceIn: 'scale3d(0.7, 0.7, 1)',
      slideInSpiral: 'rotate(60deg) scale(0.7) translate3d(0, 30px, 0)',
      glitchIn: 'skewX(15deg) scale(1.05)',
      typewriter: 'translateX(0)',
      parallax: 'translateY(0)',
      tilt3d: 'perspective(1000px) rotateY(15deg) rotateX(10deg)',
      rainbow: 'translate3d(0, 15px, 0)',
      shake: 'translate3d(0, 15px, 0)',
      jello: 'skewX(0deg) skewY(0deg)',
    };

    const transform = transforms[this.animation] || 'translateY(60px)';
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);

    // Special handling for typewriter effect
    if (this.animation === 'typewriter') {
      this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');
      this.renderer.setStyle(this.el.nativeElement, 'whiteSpace', 'nowrap');
      this.renderer.setStyle(this.el.nativeElement, 'width', '0');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    }
  }

  private animateIn(): void {
    setTimeout(() => {
      const durations: Record<ScrollAnimation, string> = {
        fadeInUp: '0.1s',
        fadeInDown: '0.1s',
        fadeInLeft: '0.1s',
        fadeInRight: '0.1s',
        scaleIn: '0.1s',
        rotateIn: '0.25s',
        flipIn: '0.25s',
        bounceIn: '0.1s',
        slideInSpiral: '0.15s',
        glitchIn: '0.1s',
        typewriter: '0.15s',
        parallax: '0.25s',
        tilt3d: '0.15s',
        rainbow: '0.15s',
        shake: '0.15s',
        jello: '0.3s',
      };

      const easings: Record<ScrollAnimation, string> = {
        fadeInUp: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fadeInDown: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fadeInLeft: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fadeInRight: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        scaleIn: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        rotateIn: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        flipIn: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        slideInSpiral: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        glitchIn: 'steps(5, end)',
        typewriter: 'steps(40, end)',
        parallax: 'linear',
        tilt3d: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        rainbow: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        shake: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        jello: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      };

      const duration = durations[this.animation] || '0.8s';
      const easing = easings[this.animation] || 'ease';

      if (this.animation === 'typewriter') {
        this.renderer.setStyle(
          this.el.nativeElement,
          'transition',
          `width ${duration} ${easing}`,
        );
        this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
      } else if (this.animation === 'glitchIn') {
        this.playGlitchAnimation();
      } else if (this.animation === 'shake') {
        this.playShakeAnimation();
      } else if (this.animation === 'jello') {
        this.playJelloAnimation();
      } else if (this.animation === 'rainbow') {
        this.playRainbowAnimation();
      } else {
        this.renderer.setStyle(
          this.el.nativeElement,
          'transition',
          `transform ${duration} ${easing}, opacity ${duration} ${easing}`,
        );
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(
          this.el.nativeElement,
          'transform',
          'translate3d(0, 0, 0)',
        );
      }
    }, this.delay);
  }

  private playGlitchAnimation(): void {
    const el = this.el.nativeElement;
    const frames = [
      { transform: 'skewX(30deg) scale(1.2)', opacity: '0' },
      { transform: 'skewX(-20deg) scale(1.1)', opacity: '0.5' },
      { transform: 'skewX(10deg) scale(1.05)', opacity: '0.7' },
      { transform: 'skewX(-5deg) scale(1)', opacity: '0.9' },
      { transform: 'skewX(0deg) scale(1)', opacity: '1' },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i >= frames.length) {
        clearInterval(interval);
        return;
      }
      this.renderer.setStyle(el, 'transform', frames[i].transform);
      this.renderer.setStyle(el, 'opacity', frames[i].opacity);
      i++;
    }, 80);
  }

  private playShakeAnimation(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '1');
    this.renderer.setStyle(el, 'transform', 'translateY(0)');
    this.renderer.addClass(el, 'animate-shake');
    setTimeout(() => {
      this.renderer.removeClass(el, 'animate-shake');
    }, 820);
  }

  private playJelloAnimation(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'opacity', '1');
    this.renderer.addClass(el, 'animate-jello');
    setTimeout(() => {
      this.renderer.removeClass(el, 'animate-jello');
    }, 1000);
  }

  private playRainbowAnimation(): void {
    const el = this.el.nativeElement;
    this.renderer.setStyle(el, 'transition', 'all 0.8s ease');
    this.renderer.setStyle(el, 'opacity', '1');
    this.renderer.setStyle(el, 'transform', 'translateY(0)');
    this.renderer.addClass(el, 'animate-rainbow');
  }

  private resetAnimation(): void {
    this.setInitialTransform();
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
  }
}
