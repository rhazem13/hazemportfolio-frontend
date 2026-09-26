
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface Skill {
  name: string;
  nameAr?: string;
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
      titleAr: 'الخدمات الخلفية',
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
      titleAr: 'المراقبة',
      skills: [
        { name: 'Prometheus' },
        { name: 'Grafana' },
        { name: 'Production reliability', nameAr: 'موثوقية الإنتاج' },
      ],
    },
    {
      titleEn: 'Engineering',
      titleAr: 'الممارسة الهندسية',
      skills: [
        { name: 'Distributed systems', nameAr: 'الأنظمة الموزعة' },
        { name: 'Concurrency', nameAr: 'إدارة التزامن' },
        { name: 'Multi-instance systems', nameAr: 'أنظمة متعددة النسخ' },
        { name: 'Authentication & authorization', nameAr: 'المصادقة والصلاحيات' },
        { name: 'Performance debugging', nameAr: 'تشخيص الأداء' },
        { name: 'Unit testing', nameAr: 'اختبارات الوحدات' },
      ],
    },
    {
      titleEn: 'Additional product experience',
      titleAr: 'خبرة إضافية في المنتجات',
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
      ? category.titleAr
      : category.titleEn;
  }

  getSkillName(skill: Skill): string {
    return this.translationService.currentLang() === 'ar' && skill.nameAr
      ? skill.nameAr
      : skill.name;
  }
}
