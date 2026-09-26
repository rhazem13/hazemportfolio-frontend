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
    return this.translationService.currentLang() === 'ar'
      ? this.translationService.format(arabic)
      : english;
  }

  readonly projects: CaseStudy[] = [
    {
      title: 'Memory Mate',
      context: 'Backend APIs and geospatial data',
      contextAr: 'Backend APIs وبيانات مكانية',
      projectType: 'Academic project',
      projectTypeAr: 'مشروع أكاديمي',
      problem: 'The backend needed to find nearby users and serve frequently requested data efficiently.',
      problemAr: 'احتاج التطبيق إلى البحث عن المستخدمين القريبين والتعامل بكفاءة مع الطلبات المتكررة على البيانات.',
      contribution: 'Built Flask APIs for geotagging and nearby-friend features.',
      contributionAr: 'طوّرت APIs بـ Flask لربط المحتوى بالموقع وإظهار الأصدقاء القريبين.',
      engineering: 'Used PostGIS for nearby queries and Redis to cache frequently requested data.',
      engineeringAr: 'استخدمت PostGIS لاستعلامات القرب، وRedis لتخزين البيانات كثيرة الطلب مؤقتاً.',
      technologies: ['Flask', 'PostgreSQL', 'PostGIS', 'Redis', 'REST APIs'],
    },
    {
      title: 'Charity Donations',
      context: 'Payments and access control',
      contextAr: 'المدفوعات وإدارة الصلاحيات',
      projectType: 'Client project',
      projectTypeAr: 'مشروع لعميل',
      problem: 'Coordinate donation flows across donors, charities and administrators.',
      problemAr: 'احتاج التطبيق إلى تنظيم التبرعات بين المتبرعين والجمعيات والمسؤولين.',
      contribution: 'Built Flask APIs and a React interface for donation workflows.',
      contributionAr: 'طوّرت APIs بـ Flask وواجهة React لإدارة التبرعات.',
      engineering: 'Implemented role-based access, PayPal integration and image-based document validation.',
      engineeringAr: 'طبّقت صلاحيات حسب الدور، وربطت PayPal، وأضفت التحقق من المستندات بالصور.',
      technologies: ['Flask', 'PostgreSQL', 'PayPal', 'React'],
    },
  ];
}
