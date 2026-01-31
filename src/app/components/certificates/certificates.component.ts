import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  icon: string;
  credentialUrl?: string;
  focusAreas: string[];
  certificateAsset: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './certificates.component.html',
  styleUrls: ['./styles/certificates.component.scss'],
})
export class CertificatesComponent {
  readonly sectionTitle = 'Certificates';
  readonly sectionSubtitle =
    'Continual learning across computer science, engineering patterns, and platform craftsmanship.';

  private readonly certificateItems = signal<CertificateItem[]>([
    {
      id: 'cs-suez-university',
      title: 'Computer Science',
      issuer: 'Suez University',
      icon: 'assets/icons/suezuniversity.jpg',
      certificateAsset: 'assets/certificates/ComputerScienceBsc.pdf',
      focusAreas: [
        'Systems Fundamentals',
        'Algorithms',
        'Software Engineering',
      ],
    },
    {
      id: 'web-dev-dotnet-iti',
      title: 'Web Development using .NET',
      issuer: 'Information Technology Institute (ITI)',
      icon: 'assets/icons/iti-logo.png',
      certificateAsset: 'assets/certificates/itihazem.pdf',
      focusAreas: ['ASP.NET', 'Entity Framework', 'Cloud Ready APIs'],
    },
    {
      id: 'algorithmic-toolbox-ucsd',
      title: 'Algorithmic Toolbox',
      issuer: 'University of California, San Diego',
      icon: 'assets/icons/us-san-diego.png',
      certificateAsset: 'assets/certificates/algorithmic-toolbox.pdf',
      focusAreas: [
        'Greedy Strategies',
        'Divide and Conquer',
        'Dynamic Programming',
      ],
    },
    {
      id: 'design-patterns-ualberta',
      title: 'Design Patterns',
      issuer: 'University of Alberta',
      icon: 'assets/icons/university-of-alberta.jpg',
      certificateAsset: 'assets/certificates/designpatterns.pdf',
      focusAreas: ['Object-Oriented Design', 'Reusable Architectures', 'SOLID'],
    },
    {
      id: 'object-oriented-design-ualberta',
      title: 'Object-Oriented Design',
      issuer: 'University of Alberta',
      icon: 'assets/icons/university-of-alberta.jpg',
      certificateAsset: 'assets/certificates/object-oriented-design.pdf',
      focusAreas: ['Domain Modeling', 'UML', 'Design Heuristics'],
    },
    {
      id: 'software-architecture-ualberta',
      title: 'Software Architecture',
      issuer: 'University of Alberta',
      icon: 'assets/icons/university-of-alberta.jpg',
      certificateAsset: 'assets/certificates/software-architecture.pdf',
      focusAreas: [
        'Architecture Styles',
        'Quality Attributes',
        'Trade-off Analysis',
      ],
    },
    {
      id: 'solid-principles-udemy',
      title: 'SOLID Principles in C# for Software Architecture & Design',
      issuer: 'Udemy',
      icon: 'assets/icons/Udemy_logo.svg.png',
      certificateAsset: 'assets/certificates/solid.pdf',
      focusAreas: ['SOLID', 'Refactoring', 'Testable Code'],
    },
    {
      id: 'image-processing-datacamp',
      title: 'Image Processing with Python Track',
      issuer: 'DataCamp',
      icon: 'assets/icons/datacamp.png',
      certificateAsset: 'assets/certificates/imageprocessingtrack.pdf',
      focusAreas: ['Computer Vision', 'NumPy', 'scikit-image'],
    },
    {
      id: 'intermediate-python-datacamp',
      title: 'Intermediate Python',
      issuer: 'DataCamp',
      icon: 'assets/icons/datacamp.png',
      certificateAsset: 'assets/certificates/intermediatepython.pdf',
      focusAreas: ['Pythonic Patterns', 'Collections', 'Iterators'],
    },
    {
      id: 'python-classes-umich',
      title: 'Python Classes and Inheritance',
      issuer: 'University of Michigan',
      icon: 'assets/icons/university-of-mchigan.png',
      certificateAsset:
        'assets/certificates/python-classes-and-inheritance.pdf',
      focusAreas: ['Object-Oriented Python', 'Design Patterns', 'Inheritance'],
    },
    {
      id: 'version-control-git-atlassian',
      title: 'Version Control with Git',
      issuer: 'Atlassian University',
      icon: 'assets/icons/atlassianuniversity.png',
      certificateAsset: 'assets/certificates/versioncontrolwithgit.pdf',
      focusAreas: ['Git Workflows', 'Branching Strategies', 'Collaboration'],
    },
  ]);

  readonly certificates = computed(() => this.certificateItems());
}
