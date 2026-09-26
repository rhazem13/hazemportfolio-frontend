import { Component, ChangeDetectionStrategy } from '@angular/core';

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

}
