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
      contribution: 'Built a React and Flask application with role-based access, donation workflows and PayPal integration.',
      contributionAr: 'بنيت تطبيق React وFlask بصلاحيات حسب الدور ومسارات التبرع وتكامل PayPal.',
      engineering: 'Collected and labeled a dataset, trained a YOLO model and integrated image-based document validation into the application.',
      engineeringAr: 'جمعت وصنفت مجموعة بيانات ودربت نموذج YOLO ودمجت فحص المستندات بالصور داخل التطبيق.',
      technologies: ['Flask', 'React', 'PostgreSQL', 'PayPal', 'YOLO'],
    },
    {
      title: 'AskCity',
      context: 'Client project · Real-time social platform',
      contextAr: 'مشروع عميل · منصة اجتماعية فورية',
      problem: 'Bring video, chat and location features into one cross-platform social product.',
      problemAr: 'الجمع بين الفيديو والمحادثة والخرائط في منتج اجتماعي متعدد المنصات.',
      contribution: 'Developed a Flutter app and PHP admin dashboard, with feeds, user interactions and Google Maps features.',
      contributionAr: 'طورت تطبيق Flutter ولوحة إدارة PHP مع المنشورات وتفاعلات المستخدمين وميزات خرائط Google.',
      engineering: 'Integrated Agora video calls and streams, Back4App real-time chat and Firebase phone authentication.',
      engineeringAr: 'دمجت مكالمات وبث Agora ومحادثات Back4App الفورية ومصادقة الهاتف عبر Firebase.',
      technologies: ['Flutter', 'PHP', 'Back4App', 'Agora', 'Firebase'],
    },
  ];
}
