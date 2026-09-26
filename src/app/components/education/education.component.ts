
import { Component, ChangeDetectionStrategy } from '@angular/core';

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./education.component.scss'],
})
export class EducationComponent {
  educationItems: EducationItem[] = [
    {
      degree: 'B.Sc. in Computer Science',
      institution: 'Suez University',
      year: '2023',
      details: 'Graduated first in class with a 3.91/4.0 GPA',
    },
    {
      degree: 'Web Development Using .NET',
      institution: 'ITI',
      year: '2021',
      details: 'Professional development program',
    },
  ];

}
