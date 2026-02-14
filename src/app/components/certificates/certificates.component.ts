import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

import { TranslationService } from '../../services/translation.service';

interface CertificateItem {
  id: string;
  title: string;
  titleAr: string;
  issuer: string;
  issuerAr: string;
  icon: string;
  credentialUrl?: string;
  focusAreas: string[];
  focusAreasAr: string[];
  certificateAsset: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./styles/certificates.component.scss'],
})
export class CertificatesComponent {
  constructor(public translationService: TranslationService) { }

  t(key: string): string {
    return this.translationService.t(key);
  }

  private readonly certificateItems = signal<CertificateItem[]>([
    {
      id: 'cs-suez-university',
      title: 'Computer Science',
      titleAr: 'علوم الحاسب',
      issuer: 'Suez University',
      issuerAr: 'جامعة السويس',
      icon: 'assets/icons/suezuniversity.jpg',
      certificateAsset: 'assets/certificates/ComputerScienceBsc.pdf',
      focusAreas: [
        'Systems Fundamentals',
        'Algorithms',
        'Software Engineering',
      ],
      focusAreasAr: ['أساسيات الأنظمة', 'الخوارزميات', 'هندسة البرمجيات'],
    },
    {
      id: 'web-dev-dotnet-iti',
      title: 'Web Development using .NET',
      titleAr: 'تطوير الويب باستخدام .NET',
      issuer: 'Information Technology Institute (ITI)',
      issuerAr: 'معهد تكنولوجيا المعلومات',
      icon: 'assets/icons/iti-logo.png',
      certificateAsset: 'assets/certificates/itihazem.pdf',
      focusAreas: ['ASP.NET', 'Entity Framework', 'Cloud Ready APIs'],
      focusAreasAr: ['ASP.NET', 'Entity Framework', 'واجهات سحابية'],
    },
    {
      id: 'algorithmic-toolbox-ucsd',
      title: 'Algorithmic Toolbox',
      titleAr: 'صندوق أدوات الخوارزميات',
      issuer: 'University of California, San Diego',
      issuerAr: 'جامعة كاليفورنيا، سان دييغو',
      icon: 'assets/icons/us-san-diego.png',
      certificateAsset: 'assets/certificates/algorithmic-toolbox.pdf',
      focusAreas: [
        'Greedy Strategies',
        'Divide and Conquer',
        'Dynamic Programming',
      ],
      focusAreasAr: [
        'الاستراتيجيات الجشعة',
        'فرِّق تَسُد',
        'البرمجة الديناميكية',
      ],
    },
    {
      id: 'design-patterns-ualberta',
      title: 'Design Patterns',
      titleAr: 'أنماط التصميم',
      issuer: 'University of Alberta',
      issuerAr: 'جامعة ألبرتا',
      icon: 'assets/icons/university-of-alberta.jpg',
      certificateAsset: 'assets/certificates/designpatterns.pdf',
      focusAreas: ['Object-Oriented Design', 'Reusable Architectures', 'SOLID'],
      focusAreasAr: [
        'التصميم كائني التوجه',
        'بنيات قابلة لإعادة الاستخدام',
        'SOLID',
      ],
    },
    {
      id: 'object-oriented-design-ualberta',
      title: 'Object-Oriented Design',
      titleAr: 'التصميم كائني التوجه',
      issuer: 'University of Alberta',
      issuerAr: 'جامعة ألبرتا',
      icon: 'assets/icons/university-of-alberta.jpg',
      certificateAsset: 'assets/certificates/object-oriented-design.pdf',
      focusAreas: ['Domain Modeling', 'UML', 'Design Heuristics'],
      focusAreasAr: ['نمذجة النطاق', 'UML', 'مبادئ التصميم'],
    },
    {
      id: 'software-architecture-ualberta',
      title: 'Software Architecture',
      titleAr: 'هندسة البرمجيات',
      issuer: 'University of Alberta',
      issuerAr: 'جامعة ألبرتا',
      icon: 'assets/icons/university-of-alberta.jpg',
      certificateAsset: 'assets/certificates/software-architecture.pdf',
      focusAreas: [
        'Architecture Styles',
        'Quality Attributes',
        'Trade-off Analysis',
      ],
      focusAreasAr: ['أنماط الهندسة', 'سمات الجودة', 'تحليل المقايضات'],
    },
    {
      id: 'solid-principles-udemy',
      title: 'SOLID Principles in C# for Software Architecture & Design',
      titleAr: 'مبادئ SOLID في C# لهندسة وتصميم البرمجيات',
      issuer: 'Udemy',
      issuerAr: 'يوديمي',
      icon: 'assets/icons/Udemy_logo.svg.png',
      certificateAsset: 'assets/certificates/solid.pdf',
      focusAreas: ['SOLID', 'Refactoring', 'Testable Code'],
      focusAreasAr: ['SOLID', 'إعادة الهيكلة', 'كود قابل للاختبار'],
    },
    {
      id: 'image-processing-datacamp',
      title: 'Image Processing with Python Track',
      titleAr: 'مسار معالجة الصور بـ Python',
      issuer: 'DataCamp',
      issuerAr: 'داتا كامب',
      icon: 'assets/icons/datacamp.png',
      certificateAsset: 'assets/certificates/imageprocessingtrack.pdf',
      focusAreas: ['Computer Vision', 'NumPy', 'scikit-image'],
      focusAreasAr: ['الرؤية الحاسوبية', 'NumPy', 'scikit-image'],
    },
    {
      id: 'intermediate-python-datacamp',
      title: 'Intermediate Python',
      titleAr: 'Python المتوسط',
      issuer: 'DataCamp',
      issuerAr: 'داتا كامب',
      icon: 'assets/icons/datacamp.png',
      certificateAsset: 'assets/certificates/intermediatepython.pdf',
      focusAreas: ['Pythonic Patterns', 'Collections', 'Iterators'],
      focusAreasAr: ['أنماط Python', 'المجموعات', 'المكررات'],
    },
    {
      id: 'python-classes-umich',
      title: 'Python Classes and Inheritance',
      titleAr: 'الفئات والوراثة في Python',
      issuer: 'University of Michigan',
      issuerAr: 'جامعة ميشيغان',
      icon: 'assets/icons/university-of-mchigan.png',
      certificateAsset:
        'assets/certificates/python-classes-and-inheritance.pdf',
      focusAreas: ['Object-Oriented Python', 'Design Patterns', 'Inheritance'],
      focusAreasAr: ['Python كائني التوجه', 'أنماط التصميم', 'الوراثة'],
    },
    {
      id: 'version-control-git-atlassian',
      title: 'Version Control with Git',
      titleAr: 'التحكم في الإصدارات مع Git',
      issuer: 'Atlassian University',
      issuerAr: 'جامعة أتلاسيان',
      icon: 'assets/icons/atlassianuniversity.png',
      certificateAsset: 'assets/certificates/versioncontrolwithgit.pdf',
      focusAreas: ['Git Workflows', 'Branching Strategies', 'Collaboration'],
      focusAreasAr: ['سير عمل Git', 'استراتيجيات التفرع', 'التعاون'],
    },
  ]);

  readonly certificates = computed(() => this.certificateItems());

  getTitle(cert: CertificateItem): string {
    return this.translationService.currentLang() === 'ar'
      ? cert.titleAr
      : cert.title;
  }

  getIssuer(cert: CertificateItem): string {
    return this.translationService.currentLang() === 'ar'
      ? cert.issuerAr
      : cert.issuer;
  }

  getFocusAreas(cert: CertificateItem): string[] {
    return this.translationService.currentLang() === 'ar'
      ? cert.focusAreasAr
      : cert.focusAreas;
  }
}
