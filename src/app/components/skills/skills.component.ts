import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./styles/skills.component.scss'],
})
export class SkillsComponent {
  skillCategories = [
    {
      title: 'Programming Languages',
      icon: 'fas fa-code',
      skills: [
        { name: 'C#', icon: 'fab fa-microsoft' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'TypeScript', icon: 'fab fa-js' },
        { name: 'SQL', icon: 'fas fa-database' },
      ],
    },
    {
      title: 'Backend Development',
      icon: 'fas fa-server',
      skills: [
        { name: '.NET CORE', icon: 'fab fa-windows' },
        { name: 'Flask', icon: 'fab fa-python' },
      ],
    },
    {
      title: 'Frontend Development',
      icon: 'fas fa-laptop-code',
      skills: [
        { name: 'Angular', icon: 'fab fa-angular' },
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'SCSS', icon: 'fab fa-sass' },
      ],
    },
    {
      title: 'Databases',
      icon: 'fas fa-database',
      skills: [
        { name: 'MS SQL Server', icon: 'fas fa-database' },
        { name: 'PostgreSQL', icon: 'fas fa-database' },
      ],
    },
    {
      title: 'DevOps & Tools',
      icon: 'fas fa-tools',
      skills: [
        { name: 'GitHub Actions', icon: 'fab fa-github' },
        { name: 'Git', icon: 'fab fa-git-alt' },
      ],
    },
    {
      title: 'Other Skills',
      icon: 'fas fa-brain',
      skills: [
        { name: 'Problem Solving', icon: 'fas fa-puzzle-piece' },
        { name: 'Redis', icon: 'fas fa-database' },
        { name: 'RTC', icon: 'fas fa-comments' },
        { name: 'OOP', icon: 'fas fa-cubes' },
        { name: 'Clean Code', icon: 'fas fa-code' },
      ],
    },
  ];
}
