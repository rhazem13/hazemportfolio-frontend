import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  description: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./styles/projects.component.scss'],
})
export class ProjectsComponent {
  sectionTitle = 'Personal Projects';
  sectionSubtitle =
    'A collection of projects I built to learn and experiment with different technologies';

  projects: Project[] = [
    {
      title: 'BeFriends',
      description:
        'A social networking platform that helps connect people with similar interests and hobbies.',
      image: 'assets/befriends.png',
      githubUrl: 'https://github.com/rhazem13/BeFriends',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework'],
    },
    {
      title: 'ESCANOR',
      description:
        'An e-commerce clothing store platform with modern design and seamless shopping experience.',
      image: 'assets/escanor.png',
      githubUrl: 'https://github.com/rhazem13/ClothingStoreV2',
      technologies: [
        'ASP.NET Core MVC',
        'C#',
        'SQL Server',
        'Entity Framework',
        'Bootstrap',
      ],
    },
    {
      title: 'Charity',
      description:
        'A platform connecting donors with charitable organizations and tracking donations, featuring AI-powered image recognition using YOLOv5.',
      image: 'assets/charity.png',
      githubUrl: 'https://github.com/rhazem13/Charity',
      technologies: ['React', 'Flask', 'PostgreSQL', 'YOLOv5', 'Python'],
    },
    {
      title: 'PromptShare',
      description:
        'A community-driven platform for sharing and discovering AI prompts.',
      image: 'assets/promptshare.png',
      githubUrl: 'https://github.com/rhazem13/PromptShare',
      technologies: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    },
    {
      title: 'Coligo',
      description:
        'A student quizz application built with React for the frontend and Express.js with MongoDB for the backend.',
      image: 'assets/coligo.png',
      githubUrl: 'https://github.com/rhazem13/anyway-student-quizz-frontend',
      liveUrl: 'https://www.youtube.com/watch?v=pz84OtMB9ZU',
      technologies: ['React', 'Express.js', 'MongoDB'],
    },
    {
      title: 'Employee Manager',
      description:
        'A simple employee manager application built with Angular for the frontend and .NET Core with Sql Server for the backend.',
      image: 'assets/employeemanager.png',
      githubUrl: 'https://github.com/rhazem13/employeemanager_frontend',
      liveUrl: 'https://www.youtube.com/watch?v=VSpK8Iqligk&t',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework'],
    },
  ];
}
