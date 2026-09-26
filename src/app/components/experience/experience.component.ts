import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface ExperienceItem {
  id: string;
  role: string;
  roleAr: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  summary: string;
  summaryAr: string;
  achievements: string[];
  achievementsAr: string[];
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/experience.component.scss'],
})
export class ExperienceComponent {
  constructor(public translationService: TranslationService) { }

  t(key: string): string {
    return this.translationService.t(key);
  }

  readonly experiences: ExperienceItem[] = [
    {
      id: 'intella-backend-engineer-2026',
      role: 'Backend Engineer',
      roleAr: 'مهندس برمجيات خلفية',
      company: 'intella',
      startDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Build and maintain backend services and external integrations for real-time products, with a focus on reliability.',
      summaryAr: 'أبني وأصون خدمات خلفية وتكاملات خارجية لمنتجات فورية، مع التركيز على الموثوقية.',
      achievements: [],
      achievementsAr: [],
      technologies: ['Node.js', 'TypeScript', 'WebSockets', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
    },
    {
      id: 'dp-world-software-engineer-2025',
      role: 'Software Engineer',
      roleAr: 'مهندس برمجيات',
      company: 'DP World',
      startDate: new Date('2025-06-01T00:00:00Z'),
      endDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Built and maintained enterprise applications supporting finance, logistics and safety operations with .NET Core, Angular and background Worker Services.',
      summaryAr: 'طورت وصنت تطبيقات مؤسسية للمالية واللوجستيات والسلامة باستخدام .NET Core وAngular وخدمات الخلفية.',
      achievements: ['Resolved production issues and helped modernize legacy application flows.'],
      achievementsAr: ['عالجت مشكلات إنتاجية وساهمت في تحديث مسارات تطبيقات قديمة.'],
      technologies: [
        '.NET Core', 'C#', 'Angular', 'Worker Services', 'SQL Server',
      ],
    },
    {
      id: 'freelance-software-engineer-2023',
      role: 'Freelance Software Engineer',
      roleAr: 'مهندس برمجيات مستقل',
      company: 'Client projects',
      startDate: new Date('2023-03-01T00:00:00Z'),
      endDate: new Date('2025-08-01T00:00:00Z'),
      summary: 'Delivered client products across commerce, social platforms and logistics, working on APIs, authentication, payments, maps and real-time features.',
      summaryAr: 'أنجزت منتجات لعملاء في التجارة الإلكترونية والمنصات الاجتماعية واللوجستيات، شملت واجهات برمجة التطبيقات والمصادقة والمدفوعات والخرائط والميزات الفورية.',
      achievements: [],
      achievementsAr: [],
      technologies: ['Flask', '.NET', 'Laravel', 'React', 'Flutter', 'PostgreSQL', 'PostGIS'],
    },
  ];

  getRole(experience: ExperienceItem): string {
    return this.translationService.currentLang() === 'ar'
      ? experience.roleAr
      : experience.role;
  }

  getSummary(experience: ExperienceItem): string {
    return this.translationService.currentLang() === 'ar'
      ? experience.summaryAr
      : experience.summary;
  }

  getAchievements(experience: ExperienceItem): string[] {
    return this.translationService.currentLang() === 'ar'
      ? experience.achievementsAr
      : experience.achievements;
  }

  getExperienceDuration(experience: ExperienceItem): string {
    const start = experience.startDate;
    const end = experience.endDate ?? new Date();

    let months =
      (end.getUTCFullYear() - start.getUTCFullYear()) * 12 +
      (end.getUTCMonth() - start.getUTCMonth());

    if (end.getUTCDate() < start.getUTCDate()) {
      months -= 1;
    }

    if (months <= 0) {
      return this.t('experience.justStarted');
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const parts: string[] = [];
    const isArabic = this.translationService.currentLang() === 'ar';

    if (years > 0) {
      if (isArabic) {
        parts.push(`${years} ${years === 1 ? 'سنة' : 'سنوات'}`);
      } else {
        parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
      }
    }

    if (remainingMonths > 0) {
      if (isArabic) {
        parts.push(
          `${remainingMonths} ${remainingMonths === 1 ? 'شهر' : 'أشهر'}`,
        );
      } else {
        parts.push(`${remainingMonths} mo`);
      }
    }

    return parts.join(' ');
  }
}
