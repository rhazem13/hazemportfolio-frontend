
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface EducationItem {
  degree: string;
  degreeAr: string;
  institution: string;
  institutionAr: string;
  year: string;
  details: string;
  detailsAr: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
      degreeAr: 'بكالوريوس علوم الحاسب',
      institution: 'Suez University',
      institutionAr: 'جامعة السويس',
      year: '2023',
      details: 'Graduated first in class with a 3.91/4.0 GPA',
      detailsAr: 'تخرّجت الأول على دفعتي بمعدل 3.91 من 4.0.',
    },
    {
      degree: 'Web Development Using .NET',
      degreeAr: 'تطوير الويب باستخدام .NET',
      institution: 'ITI',
      institutionAr: 'معهد تكنولوجيا المعلومات (ITI)',
      year: '2021',
      details: 'Professional development program',
      detailsAr: 'برنامج تدريبي في تطوير تطبيقات الويب باستخدام .NET.',
    },
  ];

  getDegree(item: EducationItem): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(item.degreeAr)
      : item.degree;
  }

  getInstitution(item: EducationItem): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(item.institutionAr)
      : item.institution;
  }

  getDetails(item: EducationItem): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(item.detailsAr)
      : item.details;
  }
}
