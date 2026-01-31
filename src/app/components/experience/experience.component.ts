import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
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
  technologies: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './experience.component.html',
  styleUrls: ['./styles/experience.component.scss'],
})
export class ExperienceComponent {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  readonly experiences: ExperienceItem[] = [
    {
      id: 'dp-world-software-engineer-2025',
      role: 'Software Engineer',
      roleAr: 'مهندس برمجيات',
      company: 'DP World',
      startDate: new Date('2025-06-17T00:00:00Z'),
      summary:
        'Developing high-performance, complex web applications that support logistics, finance, safety, and other mission-critical domains.',
      summaryAr:
        'تطوير تطبيقات ويب عالية الأداء ومعقدة تدعم اللوجستيات والمالية والسلامة وغيرها من المجالات الحيوية.',
      achievements: [],
      technologies: [
        'TypeScript',
        'Angular',
        '.NET CORE',
        'Azure',
        'Microsoft SQL Server',
        'Oracle DB',
      ],
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

  getExperienceDuration(experience: ExperienceItem): string {
    const start = experience.startDate;
    const end = experience.endDate ?? new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

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
