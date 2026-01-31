import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  educationItems = [
    {
      degree: 'B.Sc. in Computer Science',
      institution: 'Suez University',
      year: '2023',
      details: 'Graduated first in class with a 3.91/4.0 GPA',
      icon: 'fas fa-graduation-cap',
    },
    {
      degree: 'Web Development Using .Net',
      institution: 'ITI',
      year: '2021',
      details: 'Professional development program',
      icon: 'fas fa-certificate',
    },
  ];
}
