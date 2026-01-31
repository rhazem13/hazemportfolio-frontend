import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, Subject, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export interface ScrollProgress {
  percentage: number;
  direction: 'up' | 'down';
  section: string | null;
  velocity: number;
}

@Injectable({
  providedIn: 'root',
})
export class ScrollEffectsService {
  private scrollProgress$ = new BehaviorSubject<ScrollProgress>({
    percentage: 0,
    direction: 'down',
    section: null,
    velocity: 0,
  });

  private sectionReached$ = new Subject<string>();

  private lastScrollTop = 0;
  private lastTimestamp = 0;
  private isBrowser: boolean;
  private sections: string[] = [
    'hero',
    'about',
    'education',
    'experience',
    'certificates',
    'skills',
    'projects',
    'contact',
  ];
  private visitedSections = new Set<string>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initScrollListener();
    }
  }

  get scrollProgress(): Observable<ScrollProgress> {
    return this.scrollProgress$.asObservable();
  }

  get sectionReached(): Observable<string> {
    return this.sectionReached$.asObservable();
  }

  private initScrollListener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll')
        .pipe(throttleTime(16))
        .subscribe(() => this.handleScroll());
    });
  }

  private handleScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const now = performance.now();
    const timeDelta = now - this.lastTimestamp;
    const scrollDelta = scrollTop - this.lastScrollTop;
    const velocity = timeDelta > 0 ? Math.abs(scrollDelta) / timeDelta : 0;

    const direction = scrollTop > this.lastScrollTop ? 'down' : 'up';

    // Find current section
    const currentSection = this.getCurrentSection();

    this.ngZone.run(() => {
      this.scrollProgress$.next({
        percentage,
        direction,
        section: currentSection,
        velocity,
      });

      // Check for new sections reached
      if (currentSection && !this.visitedSections.has(currentSection)) {
        this.visitedSections.add(currentSection);
        this.sectionReached$.next(currentSection);
      }
    });

    this.lastScrollTop = scrollTop;
    this.lastTimestamp = now;
  }

  private getCurrentSection(): string | null {
    if (!this.isBrowser) return null;

    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (let i = this.sections.length - 1; i >= 0; i--) {
      const sectionId = this.sections[i];
      const element = document.getElementById(sectionId);
      if (element && element.offsetTop <= scrollPosition) {
        return sectionId;
      }
    }
    return this.sections[0];
  }

  resetVisitedSections(): void {
    this.visitedSections.clear();
  }
}
