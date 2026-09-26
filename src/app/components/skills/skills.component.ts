
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface Skill {
  name: string;
}

interface SkillCategory {
  titleEn: string;
  titleAr: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/skills.component.scss'],
})
export class SkillsComponent {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  skillCategories: SkillCategory[] = [
    {
      titleEn: 'Backend',
      titleAr: 'Backend',
      skills: [
        { name: 'Node.js' },
        { name: 'TypeScript' },
        { name: '.NET Core' },
        { name: 'C#' },
        { name: 'Python' },
        { name: 'Flask' },
        { name: 'REST APIs' },
        { name: 'WebSockets' },
      ],
    },
    {
      titleEn: 'Data & coordination',
      titleAr: 'البيانات والتنسيق',
      skills: [
        { name: 'Redis' },
        { name: 'PostgreSQL' },
        { name: 'PostGIS' },
        { name: 'SQL Server' },
      ],
    },
    {
      titleEn: 'Infrastructure & delivery',
      titleAr: 'البنية التحتية والنشر',
      skills: [
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'Azure' },
        { name: 'CI/CD' },
        { name: 'GitHub Actions' },
      ],
    },
    {
      titleEn: 'Observability',
      titleAr: 'Observability',
      skills: [
        { name: 'Prometheus' },
        { name: 'Grafana' },
        { name: 'Production reliability' },
      ],
    },
    {
      titleEn: 'Engineering',
      titleAr: 'هندسة البرمجيات',
      skills: [
        { name: 'Distributed systems' },
        { name: 'Concurrency' },
        { name: 'Multi-instance systems' },
        { name: 'Authentication & authorization' },
        { name: 'Performance debugging' },
        { name: 'Unit testing' },
      ],
    },
    {
      titleEn: 'Additional product experience',
      titleAr: 'خبرة أخرى في تطوير المنتجات',
      skills: [
        { name: 'Angular' },
        { name: 'React' },
        { name: 'Flutter' },
        { name: 'Laravel' },
      ],
    },
  ];

  getCategoryTitle(category: SkillCategory): string {
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(category.titleAr)
      : category.titleEn;
  }
}
