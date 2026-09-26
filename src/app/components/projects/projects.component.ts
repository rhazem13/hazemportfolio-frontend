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
      problem: 'The app needed nearby-friend search and quicker access to frequently requested data.',
      contribution: 'Built Flask APIs for geotagging and nearby-friend features.',
      engineering: 'Used PostGIS for nearby queries and Redis to cache frequently requested data.',
      technologies: ['Flask', 'PostgreSQL', 'PostGIS', 'Redis', 'REST APIs'],
    },
    {
      title: 'Charity Donations',
      context: 'Payments and access control',
      projectType: 'Client project',
      problem: 'The app needed to track donations between donors and charities, with a way for admins to manage them.',
      contribution: 'Built the Flask API and React screens for submitting and managing donations.',
      engineering: 'Added role-based permissions, PayPal integration and checks on document images.',
      technologies: ['Flask', 'PostgreSQL', 'PayPal', 'React'],
    },
  ];
}
