import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('offers direct links to the work and resume', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector<HTMLAnchorElement>('a[href="#experience"]')).not.toBeNull();
    expect(element.querySelector<HTMLAnchorElement>('a[href="/assets/Hazem_Ragab_Resume.pdf"]')).not.toBeNull();
  });
});
