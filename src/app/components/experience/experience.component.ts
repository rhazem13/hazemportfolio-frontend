import { Component, ChangeDetectionStrategy } from '@angular/core';

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
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/experience.component.scss'],
})
export class ExperienceComponent {
  readonly experiences: ExperienceItem[] = [
    {
      id: 'intella-backend-engineer-2026',
      role: 'Backend Engineer',
      company: 'intella',
      startDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Build and operate Node.js and TypeScript services for real-time communication workflows and external integrations.',
      achievements: [
        'Moved shared session state and coordination to Redis for consistent behavior across service instances.',
        'Added Prometheus metrics and Grafana dashboards to make service health easier to inspect.',
        'Debugged performance problems and session security issues in production.',
      ],
      technologies: ['Node.js', 'TypeScript', 'WebSockets', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
    },
    {
      id: 'dp-world-software-engineer-2025',
      role: 'Software Engineer',
      company: 'DP World',
      startDate: new Date('2025-06-01T00:00:00Z'),
      endDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Built and maintained enterprise applications supporting finance, logistics and safety operations with .NET Core, Angular and background Worker Services.',
      achievements: ['Fixed production issues and updated older application flows.'],
      technologies: [
        '.NET Core', 'C#', 'Angular', 'Worker Services', 'SQL Server',
      ],
    },
    {
      id: 'freelance-software-engineer-2023',
      role: 'Freelance Software Engineer',
      company: 'Client projects',
      startDate: new Date('2023-03-01T00:00:00Z'),
      endDate: new Date('2025-05-01T00:00:00Z'),
      summary: 'Built APIs and product features for commerce, social and logistics clients, including payments and maps.',
      achievements: [],
      technologies: ['Flask', '.NET', 'Laravel', 'React', 'Flutter', 'PostgreSQL', 'PostGIS'],
    },
  ];

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(date);
  }
}
