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
    // Animations disabled by user request
    return;
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }


}
