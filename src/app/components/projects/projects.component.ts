import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CaseStudy {
  title: string;
  context: string;
  projectType: string;
  problem: string;
  contribution: string;
  engineering: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: ['./styles/projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProjectsComponent {
  readonly projects: CaseStudy[] = [
    {
      title: 'Memory Mate',
      context: 'Backend APIs and geospatial data',
      projectType: 'Academic project',
      problem: 'The backend needed to find nearby users and serve frequently requested data efficiently.',
      contribution: 'Built Flask APIs for geotagging and nearby-friend features.',
      engineering: 'Used PostGIS for nearby queries and Redis to cache frequently requested data.',
      technologies: ['Flask', 'PostgreSQL', 'PostGIS', 'Redis', 'REST APIs'],
    },
    {
      title: 'Charity Donations',
      context: 'Payments and access control',
      projectType: 'Client project',
      problem: 'Coordinate donation flows across donors, charities and administrators.',
      contribution: 'Built Flask APIs and a React interface for donation workflows.',
      engineering: 'Implemented role-based access, PayPal integration and image-based document validation.',
      technologies: ['Flask', 'PostgreSQL', 'PayPal', 'React'],
    },
  ];
}
