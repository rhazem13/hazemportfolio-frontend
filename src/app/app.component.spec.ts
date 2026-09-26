import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('keeps every navigation link connected to a rendered section', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const links = compiled.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]');
    for (const link of links) {
      const id = link.getAttribute('href');
      expect(compiled.querySelector(id!), id!).not.toBeNull();
    }
  });
});
