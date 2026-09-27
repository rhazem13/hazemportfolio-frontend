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
      company: 'Intella',
      startDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Build and operate Node.js and TypeScript services for real-time voice and messaging integrations across WebSockets, SIP, and external communication platforms.',
      achievements: [
        'Solved a multi-instance session-coordination issue by moving shared metadata and state to Redis, allowing HTTP setup and subsequent WebSocket connections to work correctly across independently routed pods.',
        'Diagnosed a production performance regression caused by code obfuscation and validated the fix with Prometheus/Grafana instrumentation, reducing p99 event-loop lag from ~347 ms to ~10 ms.',
        'Designed resilient WebSocket reconnection with grace periods, retry jitter, and consistent-hash routing to preserve call and chat sessions through transient disconnects.',
        'Built automated end-to-end and load-testing tooling with Playwright and synthesized speech to simulate real calls and measure latency/audio degradation under concurrency; the tooling was adopted and extended by the testing team.',
        'Authored an ADR defining service identity, credential boundaries, and authentication flows across client, backend, relay, and AI-service boundaries.',
      ],
      technologies: ['Node.js', 'TypeScript', 'WebSockets', 'SIP', 'Redis', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Playwright'],
    },
    {
      id: 'dp-world-software-engineer-2025',
      role: 'Software Engineer',
      company: 'DP World',
      startDate: new Date('2025-06-01T00:00:00Z'),
      endDate: new Date('2026-04-01T00:00:00Z'),
      summary: 'Built backend systems and internal platforms across finance and port operations with .NET Core, Angular, SQL Server, and background Worker Services.',
      achievements: [
        'Designed and built a multi-tenant finance, contracts, and billing backend from scratch, owning the database schema, APIs, and tenant isolation with EF Core global query filters.',
        'Built a reusable NuGet file-validation package using MIME and magic-byte checks to detect spoofed uploads; validated it against 18,000+ test files and made it reusable across team projects.',
        'Took ownership of a core port-operations platform handling truck, vessel, and container scheduling and movements; added rail and finance functionality, maintained integrations, and fixed production issues.',
        'Automated reconciliation of paid-but-unsettled receipts with a .NET Worker Service, including payment-provider verification, retries, multi-receipt handling, and settlement synchronization across systems.',
        'Introduced Seq for centralized logging and email alerts across multiple applications, and modernized legacy .NET/Angular systems through rebuilds, upgrades, and refactoring.',
      ],
      technologies: [
        '.NET Core', 'C#', 'EF Core', 'Angular', 'SQL Server', 'Worker Services', 'NuGet', 'Seq',
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
