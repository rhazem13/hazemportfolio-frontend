import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface CaseStudy {
  title: string;
  context: string;
  contextAr: string;
  projectType: string;
  projectTypeAr: string;
  problem: string;
  problemAr: string;
  contribution: string;
  contributionAr: string;
  engineering: string;
  engineeringAr: string;
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
  constructor(public translationService: TranslationService) {}

  t(key: string): string { return this.translationService.t(key); }
  localized(english: string, arabic: string): string {
    return this.translationService.currentLang() === 'ar' ? arabic : english;
  }

  readonly projects: CaseStudy[] = [
    {
      title: 'Memory Mate',
      context: 'Backend APIs and geospatial data',
      contextAr: 'واجهات خلفية وبيانات جغرافية',
      projectType: 'Academic project',
      projectTypeAr: 'مشروع أكاديمي',
      problem: 'The backend needed to find nearby users and serve frequently requested data efficiently.',
      problemAr: 'احتاجت الخدمة الخلفية إلى العثور على المستخدمين القريبين وتقديم البيانات كثيرة الطلب بكفاءة.',
      contribution: 'Built Flask APIs for geotagging and nearby-friend features.',
      contributionAr: 'بنيت واجهات Flask لتحديد المواقع وميزات العثور على الأصدقاء القريبين.',
      engineering: 'Used PostGIS for nearby queries and Redis to cache frequently requested data.',
      engineeringAr: 'استخدمت PostGIS للاستعلامات عن المواقع القريبة وRedis لتخزين البيانات كثيرة الطلب مؤقتاً.',
      technologies: ['Flask', 'PostgreSQL', 'PostGIS', 'Redis', 'REST APIs'],
    },
    {
      title: 'Charity Donations',
      context: 'Payments and access control',
      contextAr: 'مدفوعات وصلاحيات',
      projectType: 'Client project',
      projectTypeAr: 'مشروع عميل',
      problem: 'Coordinate donation flows across donors, charities and administrators.',
      problemAr: 'تنسيق التبرعات بين المتبرعين والجمعيات والمشرفين.',
      contribution: 'Built Flask APIs and a React interface for donation workflows.',
      contributionAr: 'بنيت واجهات Flask وواجهة React لمسارات التبرع.',
      engineering: 'Implemented role-based access, PayPal integration and image-based document validation.',
      engineeringAr: 'نفذت صلاحيات حسب الدور وتكامل PayPal وفحص المستندات بالصور.',
      technologies: ['Flask', 'PostgreSQL', 'PayPal', 'React'],
    },
  ];
}
