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
  @Input() threshold: number = 0.15;
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

    // Set initial hidden state
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'none');
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
      { threshold: this.threshold, rootMargin: '0px 0px -50px 0px' },
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
      fadeInUp: 'translateY(30px)',
      fadeInDown: 'translateY(-30px)',
      fadeInLeft: 'translateX(-40px)',
      fadeInRight: 'translateX(40px)',
      scaleIn: 'scale(0.85)',
      rotateIn: 'rotate(-10deg) scale(0.9)',
      flipIn: 'perspective(600px) rotateX(-60deg)',
      bounceIn: 'scale(0.5)',
      slideInSpiral: 'rotate(90deg) scale(0.5) translateY(50px)',
      glitchIn: 'skewX(20deg) scale(1.1)',
      typewriter: 'translateX(0)',
      parallax: 'translateY(0)',
      tilt3d: 'perspective(1000px) rotateY(20deg) rotateX(15deg)',
      rainbow: 'translateY(20px)',
      shake: 'translateY(20px)',
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
        fadeInUp: '0.4s',
        fadeInDown: '0.4s',
        fadeInLeft: '0.4s',
        fadeInRight: '0.4s',
        scaleIn: '0.35s',
        rotateIn: '0.4s',
        flipIn: '0.4s',
        bounceIn: '0.45s',
        slideInSpiral: '0.5s',
        glitchIn: '0.3s',
        typewriter: '1s',
        parallax: '0.4s',
        tilt3d: '0.5s',
        rainbow: '0.4s',
        shake: '0.4s',
        jello: '0.5s',
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
          `all ${duration} ${easing}`,
        );
        this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
        this.renderer.setStyle(this.el.nativeElement, 'transform', 'none');
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
