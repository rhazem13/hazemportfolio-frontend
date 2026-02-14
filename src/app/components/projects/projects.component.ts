import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { TranslationService } from '../../services/translation.service';

interface Project {
  title: string;
  description: string;
  descriptionAr: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  isPrivate?: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./styles/projects.component.scss'],
})
export class ProjectsComponent {
  constructor(public translationService: TranslationService) {
    // Initialize all descriptions as collapsed
    this.expandedProjects = this.projects.map(() => false);
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  projects: Project[] = [
    {
      title: 'TeebaSystems',
      description:
        'A professional landing page for a software company, designed to showcase their solutions and services.',
      descriptionAr:
        'صفحة هبوط احترافية لشركة برمجيات، مصممة لعرض حلولهم وخدماتهم.',
      image: 'assets/tebapc_result.webp',
      githubUrl: '',
      isPrivate: true,
      liveUrl: 'https://www.teebasystems.com.eg/',
      technologies: ['React', 'SCSS', 'Reactstrap'],
    },
    {
      title: 'Naqaa',
      description:
        'A bilingual full-stack e-commerce platform dedicated to selling organic fertilizers and promoting sustainable agriculture with a modern user experience. It includes an advanced dashboard for inventory management and order tracking system, built with Node.js, React.js, and PostgreSQL.',
      descriptionAr:
        'منصة تجارة إلكترونية متكاملة (Full-Stack) تدعم اللغتين، مخصصة لبيع الأسمدة العضوية وتعزيز الزراعة المستدامة بتجربة مستخدم عصرية. تتضمن لوحة تحكم متقدمة لإدارة المخزون ونظام تتبع للطلبات، معتمدة على تقنيات Node.js وReact.js وقواعد بيانات PostgreSQL.',
      image: 'assets/Naqaa_result.webp',
      githubUrl: '',
      isPrivate: true,
      technologies: ['React.js', 'Node.js', 'PostgreSQL', 'Express.js'],
    },
    {
      title: 'SEMS Conference 2023',
      description:
        'The project is a promotional website for the Saudi Emergency Medical Services (SEMS) Conference 2023, organized by the Saudi Red Crescent Authority to highlight emergency medical advancements. It is built using HTML5 and CSS3 (incorporating Bootstrap, Animate.css, and FontAwesome), with JavaScript handling the interactive elements and responsive design.',
      descriptionAr:
        'هذا المشروع عبارة عن موقع ترويجي لمؤتمر الخدمات الطبية الطارئة السعودي (SEMS) 2023، الذي تنظمه هيئة الهلال الأحمر السعودي لتسليط الضوء على التطورات الطبية الطارئة. تم بناؤه باستخدام HTML5 و CSS3 (بما في ذلك Bootstrap و Animate.css و FontAwesome)، مع استخدام JavaScript للتعامل مع العناصر التفاعلية والتصميم المتجاوب.',
      image: 'assets/sems_result.webp',
      githubUrl: '',
      isPrivate: true,
      liveUrl: 'https://semslanding.netlify.app/',
      technologies: [
        'HTML5 & CSS3',
        'JavaScript & jQuery',
        'Bootstrap',
        'Animate.css',
      ],
    },
    {
      title: 'BeFriends',
      description:
        'A social networking platform that helps connect people with similar interests and hobbies.',
      descriptionAr:
        'منصة تواصل اجتماعي تساعد في ربط الأشخاص ذوي الاهتمامات والهوايات المتشابهة.',
      image: 'assets/befriends_result.webp',
      githubUrl: 'https://github.com/rhazem13/BeFriends',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework'],
    },
    {
      title: 'ESCANOR',
      description:
        'An e-commerce clothing store platform with modern design and seamless shopping experience.',
      descriptionAr: 'منصة متجر ملابس إلكتروني بتصميم عصري وتجربة تسوق سلسة.',
      image: 'assets/escanor_result.webp',
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
      descriptionAr:
        'منصة تربط المتبرعين بالمنظمات الخيرية وتتبع التبرعات، مع ميزة التعرف على الصور بالذكاء الاصطناعي باستخدام YOLOv5.',
      image: 'assets/charity_result.webp',
      githubUrl: 'https://github.com/rhazem13/Charity',
      technologies: ['React', 'Flask', 'PostgreSQL', 'YOLOv5', 'Python'],
    },
    {
      title: 'PromptShare',
      description:
        'A community-driven platform for sharing and discovering AI prompts.',
      descriptionAr: 'منصة مجتمعية لمشاركة واكتشاف مطالبات الذكاء الاصطناعي.',
      image: 'assets/promptshare_result.webp',
      githubUrl: 'https://github.com/rhazem13/PromptShare',
      technologies: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    },
    {
      title: 'Coligo',
      description:
        'A student quizz application built with React for the frontend and Express.js with MongoDB for the backend.',
      descriptionAr:
        'تطبيق اختبارات للطلاب مبني باستخدام React للواجهة و Express.js مع MongoDB للخادم.',
      image: 'assets/coligo_result.webp',
      githubUrl: 'https://github.com/rhazem13/anyway-student-quizz-frontend',
      liveUrl: 'https://www.youtube.com/watch?v=pz84OtMB9ZU',
      technologies: ['React', 'Express.js', 'MongoDB'],
    },
    {
      title: 'Employee Manager',
      description:
        'A simple employee manager application built with Angular for the frontend and .NET Core with Sql Server for the backend.',
      descriptionAr:
        'تطبيق بسيط لإدارة الموظفين مبني باستخدام Angular للواجهة و .NET Core مع SQL Server للخادم.',
      image: 'assets/employeemanager_result.webp',
      githubUrl: 'https://github.com/rhazem13/employeemanager_frontend',
      liveUrl: 'https://www.youtube.com/watch?v=VSpK8Iqligk&t',
      technologies: ['Angular', '.NET Core', 'SQL Server', 'Entity Framework'],
    },
  ];

  // Track expanded state for each project description
  expandedProjects: boolean[] = [];

  getDescription(project: Project): string {
    return this.translationService.currentLang() === 'ar'
      ? project.descriptionAr
      : project.description;
  }

  toggleDescription(index: number): void {
    this.expandedProjects[index] = !this.expandedProjects[index];
  }
}
