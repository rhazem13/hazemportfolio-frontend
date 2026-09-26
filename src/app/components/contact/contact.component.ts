import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactInfo = {
    email: 'h.ragab.dev@gmail.com',
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

  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  getLocation(): string {
    return this.translationService.currentLang() === 'ar'
      ? this.contactInfo.locationAr
      : this.contactInfo.location;
  }

}
