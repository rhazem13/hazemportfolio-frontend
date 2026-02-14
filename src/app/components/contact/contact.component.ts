import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslationService } from '../../services/translation.service';
import { Contact3dSceneComponent } from '../contact-3d-scene/contact-3d-scene.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Contact3dSceneComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  submitSuccess = false;

  contactInfo = {
    email: 'rhazem13@yahoo.com',
    location: 'Al Arbeen, Suez',
    locationAr: 'الأربعين، السويس',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/rhazem13',
        icon: 'fab fa-github',
      },
      {
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/rhazem13',
        icon: 'fab fa-linkedin',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/rhazem13',
        icon: 'fas fa-code',
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

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      const mailtoLink = `mailto:${this.contactInfo.email
        }?subject=${encodeURIComponent(
          formData.subject,
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
        )}`;

      window.location.href = mailtoLink;

      // Reset form and show success message
      this.submitSuccess = true;
      this.contactForm.reset();
      this.submitted = false;

      // Reset success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }
  }

  // Getter for easy access to form fields in template
  get f() {
    return this.contactForm.controls;
  }
}
