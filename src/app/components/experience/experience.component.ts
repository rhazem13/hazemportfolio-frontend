import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  location?: string;
  summary: string;
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
  readonly sectionTitle = 'Experience';
  readonly sectionSubtitle =
    'Delivering resilient products and collaborative engineering culture.';

  readonly experiences: ExperienceItem[] = [
    {
      id: 'dp-world-software-engineer-2025',
      role: 'Software Engineer',
      company: 'DP World',
      startDate: new Date('2025-06-17T00:00:00Z'),
      summary:
        'Developing high-performance, complex web applications that support logistics, finance, safety, and other mission-critical domains.',
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

  getExperienceDuration(experience: ExperienceItem): string {
    const start = experience.startDate;
    const end = experience.endDate ?? new Date();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    if (months <= 0) {
      return 'Just getting started';
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    const parts: string[] = [];

    if (years > 0) {
      parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
    }

    if (remainingMonths > 0) {
      parts.push(`${remainingMonths} mo`);
    }

    return parts.join(' ');
  }
}
