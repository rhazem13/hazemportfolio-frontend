import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('exposes validation errors instead of opening an incomplete email', () => {
    component.onSubmit();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(component.submitted).toBe(true);
    expect(element.querySelectorAll('[role="alert"]').length).toBe(4);
  });
});
