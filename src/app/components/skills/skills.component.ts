
import { Component, ChangeDetectionStrategy } from '@angular/core';

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
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
  skillCategories: SkillCategory[] = [
    {
      title: 'Backend',
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
      title: 'Data & coordination',
      skills: [
        { name: 'Redis' },
        { name: 'PostgreSQL' },
        { name: 'PostGIS' },
        { name: 'SQL Server' },
      ],
    },
    {
      title: 'Infrastructure & delivery',
      skills: [
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'Azure' },
        { name: 'CI/CD' },
        { name: 'GitHub Actions' },
      ],
    },
    {
      title: 'Observability',
      skills: [
        { name: 'Prometheus' },
        { name: 'Grafana' },
      ],
    },
    {
      title: 'Engineering',
      skills: [
        { name: 'Distributed systems' },
        { name: 'Concurrency' },
        { name: 'Authentication & authorization' },
        { name: 'Performance debugging' },
        { name: 'Unit testing' },
      ],
    },
    {
      title: 'Additional product experience',
      skills: [
        { name: 'Angular' },
        { name: 'React' },
        { name: 'Flutter' },
        { name: 'Laravel' },
      ],
    },
  ];

}
