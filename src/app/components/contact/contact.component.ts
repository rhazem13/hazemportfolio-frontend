import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;

  contactInfo = {
    email: 'rhazem13@yahoo.com',
    location: 'Al Arbaeen, Suez, Egypt',
    locationAr: 'الأربعين، السويس',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/rhazem13',
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/rhazem13',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/rhazem13',
      },
    ],
  };

  constructor(
    private fb: FormBuilder,
    public translationService: TranslationService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  getLocation(): string {
    return this.translationService.currentLang() === 'ar'
      ? this.contactInfo.locationAr
      : this.contactInfo.location;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    const formFields = this.contactForm.getRawValue();
    const subject = encodeURIComponent(formFields.subject);
    const body = encodeURIComponent(
      `Name: ${formFields.name}\nEmail: ${formFields.email}\n\nMessage:\n${formFields.message}`,
    );

    window.location.href = `mailto:${this.contactInfo.email}?subject=${subject}&body=${body}`;
    this.submitted = false;
  }

  get f() {
    return this.contactForm.controls;
  }
}
