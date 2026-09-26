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
    location: 'Cairo, Egypt',
    locationAr: 'القاهرة، مصر',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/rhazem13',
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/hazem-ragab-mohammed/',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/rhazem13/',
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
