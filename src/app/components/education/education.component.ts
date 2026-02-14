import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface EducationItem {
  degree: string;
  degreeAr: string;
  institution: string;
  institutionAr: string;
  year: string;
  details: string;
  detailsAr: string;
  icon: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  constructor(public translationService: TranslationService) { }

  t(key: string): string {
    return this.translationService.t(key);
  }

  educationItems: EducationItem[] = [
    {
      degree: 'B.Sc. in Computer Science',
      degreeAr: 'بكالوريوس في علوم الحاسب',
      institution: 'Suez University',
      institutionAr: 'جامعة السويس',
      year: '2023',
      details: 'Graduated first in class with a 3.91/4.0 GPA',
      detailsAr: 'تخرجت الأول على الدفعة بمعدل تراكمي 3.91/4.0',
      icon: 'fas fa-graduation-cap',
    },
    {
      degree: 'Web Development Using .Net',
      degreeAr: 'تطوير الويب باستخدام .Net',
      institution: 'ITI',
      institutionAr: 'معهد تكنولوجيا المعلومات',
      year: '2021',
      details: 'Professional development program',
      detailsAr: 'برنامج تطوير مهني',
      icon: 'fas fa-certificate',
    },
  ];

  getDegree(item: EducationItem): string {
    return this.translationService.currentLang() === 'ar'
      ? item.degreeAr
      : item.degree;
  }

  getInstitution(item: EducationItem): string {
    return this.translationService.currentLang() === 'ar'
      ? item.institutionAr
      : item.institution;
  }

  getDetails(item: EducationItem): string {
    return this.translationService.currentLang() === 'ar'
      ? item.detailsAr
      : item.details;
  }
}
