import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslationService } from '../../services/translation.service';

interface Skill {
  name: string;
  nameAr?: string;
  icon: string;
}

interface SkillCategory {
  titleKey: string;
  titleEn: string;
  titleAr: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./styles/skills.component.scss'],
})
export class SkillsComponent {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  skillCategories: SkillCategory[] = [
    {
      titleKey: 'programming',
      titleEn: 'Programming Languages',
      titleAr: 'لغات البرمجة',
      icon: 'fas fa-code',
      skills: [
        { name: 'C#', icon: 'fab fa-microsoft' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'TypeScript', icon: 'fab fa-js' },
        { name: 'SQL', icon: 'fas fa-database' },
      ],
    },
    {
      titleKey: 'backend',
      titleEn: 'Backend Development',
      titleAr: 'تطوير الـ Backend',
      icon: 'fas fa-server',
      skills: [
        { name: '.NET CORE', icon: 'fab fa-windows' },
        { name: 'Flask', icon: 'fab fa-python' },
      ],
    },
    {
      titleKey: 'frontend',
      titleEn: 'Frontend Development',
      titleAr: 'تطوير الـ Frontend',
      icon: 'fas fa-laptop-code',
      skills: [
        { name: 'Angular', icon: 'fab fa-angular' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'SCSS', icon: 'fab fa-sass' },
      ],
    },
    {
      titleKey: 'databases',
      titleEn: 'Databases',
      titleAr: 'قواعد البيانات',
      icon: 'fas fa-database',
      skills: [
        { name: 'MS SQL Server', icon: 'fas fa-database' },
        { name: 'PostgreSQL', icon: 'fas fa-database' },
      ],
    },
    {
      titleKey: 'devops',
      titleEn: 'DevOps & Tools',
      titleAr: 'DevOps والأدوات',
      icon: 'fas fa-tools',
      skills: [
        { name: 'GitHub Actions', icon: 'fab fa-github' },
        { name: 'Git', icon: 'fab fa-git-alt' },
      ],
    },
    {
      titleKey: 'other',
      titleEn: 'Other Skills',
      titleAr: 'مهارات أخرى',
      icon: 'fas fa-brain',
      skills: [
        {
          name: 'Problem Solving',
          nameAr: 'حل المشكلات',
          icon: 'fas fa-puzzle-piece',
        },
        { name: 'Redis', icon: 'fas fa-database' },
        { name: 'RTC', icon: 'fas fa-comments' },
        { name: 'OOP', icon: 'fas fa-cubes' },
        { name: 'Clean Code', nameAr: 'Clean Code', icon: 'fas fa-code' },
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
