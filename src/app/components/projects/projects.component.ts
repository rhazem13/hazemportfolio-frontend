import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

interface CaseStudy {
  title: string;
  context: string;
  contextAr: string;
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
      context: 'Academic · Backend and geospatial data',
      contextAr: 'مشروع أكاديمي · خدمات خلفية وبيانات جغرافية',
      problem: 'Support location-based social features and frequent reads in an application backend.',
      problemAr: 'دعم ميزات اجتماعية تعتمد على الموقع وطلبات قراءة متكررة في الخدمة الخلفية.',
      contribution: 'Designed and implemented core Flask APIs and backend logic.',
      contributionAr: 'صممت ونفذت واجهات Flask والمنطق الأساسي للخدمة الخلفية.',
      engineering: 'Used PostgreSQL with PostGIS for geotagging and nearby-friend queries; added Redis caching for frequently requested data.',
      engineeringAr: 'استخدمت PostgreSQL وPostGIS للاستعلامات الجغرافية والأصدقاء القريبين، وأضفت Redis لتخزين البيانات كثيرة الطلب مؤقتاً.',
      technologies: ['Flask', 'PostgreSQL', 'PostGIS', 'Redis', 'REST APIs'],
    },
    {
      title: 'Charity Donations',
      context: 'Client project · Payments and access control',
      contextAr: 'مشروع عميل · مدفوعات وصلاحيات',
      problem: 'Coordinate donation flows across donors, charities and administrators.',
      problemAr: 'تنسيق التبرعات بين المتبرعين والجمعيات والمشرفين.',
      contribution: 'Built Flask APIs for donation workflows, role-based access and PayPal payments, alongside a React interface.',
      contributionAr: 'بنيت واجهات Flask لمسارات التبرع والصلاحيات حسب الدور ومدفوعات PayPal، إلى جانب واجهة React.',
      engineering: 'Connected access control and payment handling to the donation flow; integrated image-based document validation.',
      engineeringAr: 'ربطت صلاحيات الوصول ومعالجة المدفوعات بمسار التبرع، ودمجت فحص المستندات بالصور.',
      technologies: ['Flask', 'PostgreSQL', 'PayPal', 'React'],
    },
  ];
}
