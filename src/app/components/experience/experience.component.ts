import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface ExperienceItem {
  id: string;
  role: string;
  roleAr: string;
  company: string;
  companyAr?: string;
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
      roleAr: 'مهندس Backend',
      company: 'intella',
      companyAr: 'Intella',
      startDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Build and operate Node.js and TypeScript services for real-time communication workflows and external integrations.',
      summaryAr: 'أبني وأشغّل خدمات بـ Node.js وTypeScript تدعم التواصل الفوري والتكامل مع منصات خارجية.',
      achievements: [
        'Moved shared session state and coordination to Redis for consistent behavior across service instances.',
        'Added Prometheus and Grafana observability for service health and runtime behavior.',
        'Investigated production reliability, performance and session-security issues.',
      ],
      achievementsAr: [
        'نقلت حالة الجلسات المشتركة والتنسيق بين نسخ الخدمة إلى Redis للحفاظ على اتساق عملها.',
        'أضفت مقاييس ولوحات متابعة باستخدام Prometheus وGrafana لرصد صحة الخدمة وأدائها.',
        'تتبّعت مشكلات الموثوقية والأداء وأمان الجلسات في الإنتاج وعالجتها.',
      ],
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
      summaryAr: 'طوّرت وصنت تطبيقات مؤسسية تخدم أعمال المالية واللوجستيات والسلامة باستخدام .NET Core وAngular وWorker Services.',
      achievements: ['Resolved production issues and helped modernize legacy application flows.'],
      achievementsAr: ['عالجت أعطالاً في الإنتاج وساهمت في تحديث أجزاء من تطبيقات قديمة.'],
      technologies: [
        '.NET Core', 'C#', 'Angular', 'Worker Services', 'SQL Server',
      ],
    },
    {
      id: 'freelance-software-engineer-2023',
      role: 'Freelance Software Engineer',
      roleAr: 'مهندس برمجيات مستقل',
      company: 'Client projects',
      companyAr: 'مشاريع لعملاء',
      startDate: new Date('2023-03-01T00:00:00Z'),
      endDate: new Date('2025-05-01T00:00:00Z'),
      summary: 'Delivered client products across commerce, social platforms and logistics, working on APIs, authentication, payments, maps and real-time features.',
      summaryAr: 'نفّذت مشاريع لعملاء في التجارة ومنصات التواصل واللوجستيات، شملت APIs وتسجيل الدخول والمدفوعات والخرائط وميزات Real-time.',
      achievements: [],
      achievementsAr: [],
      technologies: ['Flask', '.NET', 'Laravel', 'React', 'Flutter', 'PostgreSQL', 'PostGIS'],
    },
  ];

  getRole(experience: ExperienceItem): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(experience.roleAr)
      : experience.role;
  }

  getCompany(experience: ExperienceItem): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(experience.companyAr ?? experience.company)
      : experience.company;
  }

  getSummary(experience: ExperienceItem): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(experience.summaryAr)
      : experience.summary;
  }

  getAchievements(experience: ExperienceItem): string[] {
    return this.translationService.currentLang() === 'ar'
      ? experience.achievementsAr.map((item) => this.translationService.format(item))
      : experience.achievements;
  }

  formatDate(date: Date): string {
    const locale = this.translationService.currentLang() === 'ar' ? 'ar-EG-u-nu-latn' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
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
        parts.push(years === 1 ? 'سنة' : years === 2 ? 'سنتان' : `${years} سنوات`);
      } else {
        parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
      }
    }

    if (remainingMonths > 0) {
      if (isArabic) {
        parts.push(remainingMonths === 1 ? 'شهر' : remainingMonths === 2 ? 'شهران' : `${remainingMonths} أشهر`);
      } else {
        parts.push(`${remainingMonths} mo`);
      }
    }

    return parts.join(isArabic ? ' و' : ' ');
  }
}
