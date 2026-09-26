import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

export type Language = 'en' | 'ar';

export interface Translations {
  [key: string]: string | Translations;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly platformId = inject(PLATFORM_ID);

  currentLang = signal<Language>('en');
  lang = this.currentLang.asReadonly();

  isRTL = computed(() => this.currentLang() === 'ar');

  private translations: Record<Language, Translations> = {
    en: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        projects: 'Projects',
        certificates: 'Certificates',
        contact: 'Contact',
      },

      // Hero Section
      hero: {
        eyebrow: 'Cairo, Egypt · Open to remote roles',
        greeting: 'Hazem Ragab',
        role: 'Backend software engineer',
        title: 'Production APIs, real-time systems and distributed services.',
        description:
          'At Intella, I build production real-time backend services with Node.js/TypeScript, Redis, Docker and Kubernetes. Previously at DP World, I delivered enterprise .NET and C# applications. Open to international remote teams.',
        viewWork: 'Explore my work',
        downloadResume: 'Read my CV',
        email: 'Email',
        socialLabel: 'Professional profiles',
        imageAlt: 'Hazem Ragab seated on a mountain overlooking the landscape',
        currentLabel: 'Current role',
        currentValue: 'Backend Engineer · Intella',
      },

      // About Section
      about: {
        kicker: 'Profile',
        title: 'What I work on',
        lead: 'I build backend services where latency, concurrency and reliability matter.',
        description:
          'My current work spans real-time audio, external integrations and multi-instance coordination. I also bring enterprise .NET experience and commercial client work across payments, logistics and location-based systems.',
        resume: 'View full CV',
        evidenceLabel: 'Engineering evidence',
        currentTitle: 'Current role',
        currentValue: 'Backend Engineer at Intella',
        domainsTitle: 'Operational domains',
        domainsValue: 'Real-time audio · Integrations · Enterprise operations',
        stackTitle: 'Core stack',
        stackValue: 'Node.js · TypeScript · Redis · PostgreSQL',
        foundationTitle: 'Academic foundation',
        foundationValue: 'First in class · 3.91 / 4.0 GPA',
      },

      // Experience Section
      experience: {
        title: 'Experience',
        kicker: 'Experience',
        subtitle:
          'Backend and software engineering across product teams and client work.',
        present: 'Present',
        justStarted: 'Just getting started',
        yr: 'yr',
        yrs: 'yrs',
        mo: 'mo',
        roles: {
          softwareEngineer: 'Software Engineer',
        },
        companies: {
          dpWorld: 'DP World',
        },
        summaries: {
          dpWorld:
            'Developing high-performance, complex web applications that support logistics, finance, safety, and other mission-critical domains.',
        },
      },

      // Skills Section
      skills: {
        kicker: 'Capabilities',
        title: 'What I work with',
        subtitle:
          'Tools I have used to build, ship and debug backend systems.',
        categories: {
          programming: 'Programming Languages',
          backend: 'Backend Development',
          frontend: 'Frontend Development',
          databases: 'Databases',
          devops: 'DevOps & Tools',
          other: 'Other Skills',
        },
        items: {
          problemSolving: 'Problem Solving',
          cleanCode: 'Clean Code',
        },
      },

      // Projects Section
      projects: {
        kicker: 'Selected work',
        title: 'Selected work',
        subtitle:
          'A few examples of the decisions behind the software.',
        viewGithub: 'View on GitHub',
        livePreview: 'Live Preview',
        privateCode: 'Private repository',
        technologiesLabel: 'Technologies used',
        viewArchive: 'View project archive',
        showFeatured: 'Show selected work only',
        readMore: 'Read more',
        showLess: 'Show less',
        descriptions: {
          befriends:
            'A social networking platform that helps connect people with similar interests and hobbies.',
          escanor:
            'An e-commerce clothing store platform with modern design and seamless shopping experience.',
          charity:
            'A platform connecting donors with charitable organizations and tracking donations, featuring AI-powered image recognition using YOLOv5.',
          promptshare:
            'A community-driven platform for sharing and discovering AI prompts.',
          coligo:
            'A student quizz application built with React for the frontend and Express.js with MongoDB for the backend.',
          employeeManager:
            'A simple employee manager application built with Angular for the frontend and .NET Core with Sql Server for the backend.',
        },
      },

      // Education Section
      education: {
        title: 'Education',
        kicker: 'Foundation',
        subtitle: 'Computer science foundations and hands-on training.',
        degrees: {
          bsc: 'B.Sc. in Computer Science',
          webDev: 'Web Development Using .NET',
        },
        institutions: {
          suez: 'Suez University',
          iti: 'ITI',
        },
        details: {
          suez: 'Graduated first in class with a 3.91/4.0 GPA',
          iti: 'Professional development program',
        },
      },

      // Certificates Section
      certificates: {
        title: 'Certifications',
        subtitle:
          'Selected credentials that reinforce my engineering and computer science foundation.',
        kicker: 'Credentials',
        download: 'Download certificate',
        focusAreasLabel: 'Focus areas covered',
        viewAll: 'View all 11 credentials',
        showFeatured: 'Show selected credentials only',
      },

      // Contact Section
      contact: {
        title: 'Let’s talk',
        subtitle: 'Contact',
        description:
          'Open to international remote Backend Engineer and Software Engineer roles. Email is the quickest way to reach me.',
        actionsLabel: 'Direct contact options',
        emailAction: 'Email me',
        openProfile: 'Open profile',
        resumeLabel: 'Résumé',
        resumeAction: 'Download resume',
        email: 'Email',
        location: 'Location',
        social: 'Social',
        form: {
          heading: 'Start an email',
          note: 'Submitting opens your email app with the message filled in. Nothing is sent automatically.',
          name: 'Name',
          namePlaceholder: 'Your name',
          email: 'Email',
          emailPlaceholder: 'Your email',
          subject: 'Subject',
          subjectPlaceholder: 'Subject',
          message: 'Message',
          messagePlaceholder: 'Your message',
          send: 'Draft email',
        },
        errors: {
          nameRequired: 'Name is required',
          nameMinLength: 'Name must be at least 2 characters',
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email',
          subjectRequired: 'Subject is required',
          messageRequired: 'Message is required',
          messageMinLength: 'Message must be at least 10 characters',
        },
      },

      // Footer
      footer: {
        copyright: '© 2026 Hazem. All rights reserved.',
      },
    },

    ar: {
      // Navigation
      nav: {
        home: 'الرئيسية',
        about: 'نبذة عني',
        experience: 'الخبرات',
        education: 'التعليم',
        skills: 'المهارات',
        projects: 'المشاريع',
        certificates: 'الشهادات',
        contact: 'تواصل معي',
      },

      // Hero Section
      hero: {
        eyebrow: 'القاهرة، مصر · متاح للعمل عن بُعد',
        greeting: 'حازم رجب',
        role: 'مهندس برمجيات خلفية',
        title: 'واجهات إنتاجية وأنظمة فورية وخدمات موزعة.',
        description:
          'أبني في إنتيلا خدمات خلفية إنتاجية وفورية باستخدام Node.js وTypeScript وRedis وDocker وKubernetes. عملت سابقاً في دي بي ورلد على تطبيقات مؤسسية باستخدام .NET وC#. متاح للعمل مع فرق دولية عن بُعد.',
        viewWork: 'استكشف أعمالي',
        downloadResume: 'اقرأ سيرتي الذاتية',
        email: 'البريد الإلكتروني',
        socialLabel: 'الحسابات المهنية',
        imageAlt: 'حازم رجب جالس على جبل، يتأمل المناظر الطبيعية',
        currentLabel: 'الدور الحالي',
        currentValue: 'مهندس برمجيات خلفية · إنتيلا',
      },

      // About Section
      about: {
        kicker: 'الملف المهني',
        title: 'مجالات عملي',
        lead: 'أبني خدمات خلفية تتطلب زمناً منخفضاً للاستجابة وإدارة التزامن والموثوقية.',
        description:
          'يشمل عملي الحالي الصوت الفوري والتكاملات الخارجية وتنسيق الحالة عبر عدة نسخ من الخدمة. ولدي خبرة في أنظمة .NET المؤسسية ومشاريع تجارية في المدفوعات واللوجستيات والخرائط.',
        resume: 'عرض السيرة الذاتية',
        evidenceLabel: 'دلائل الكفاءة الهندسية',
        currentTitle: 'الدور الحالي',
        currentValue: 'مهندس برمجيات خلفية في إنتيلا',
        domainsTitle: 'مجالات التشغيل',
        domainsValue: 'الصوت الفوري · التكاملات · أنظمة المؤسسات',
        stackTitle: 'التقنيات الأساسية',
        stackValue: 'Node.js · TypeScript · Redis · PostgreSQL',
        foundationTitle: 'الأساس الأكاديمي',
        foundationValue: 'الأول على الدفعة · معدل 3.91 من 4.0',
      },

      // Experience Section
      experience: {
        title: 'الخبرات',
        kicker: 'الخبرات',
        subtitle: 'خبرة في هندسة البرمجيات الخلفية والمنتجات ومشاريع العملاء.',
        present: 'الحالي',
        justStarted: 'بداية جديدة',
        yr: 'سنة',
        yrs: 'سنوات',
        mo: 'شهر',
        roles: {
          softwareEngineer: 'مهندس برمجيات',
        },
        companies: {
          dpWorld: 'دي بي ورلد',
        },
        summaries: {
          dpWorld:
            'تطوير تطبيقات ويب متقدمة وعالية الأداء تدعم قطاعات اللوجستيات والمالية والسلامة وغيرها من المجالات الحيوية.',
        },
      },

      // Skills Section
      skills: {
        kicker: 'القدرات',
        title: 'التقنيات التي أعمل بها',
        subtitle:
          'أدوات استخدمتها لبناء الأنظمة الخلفية ونشرها وتشخيص مشكلاتها.',
        categories: {
          programming: 'لغات البرمجة',
          backend: 'تطوير الواجهة الخلفية',
          frontend: 'تطوير الواجهة الأمامية',
          databases: 'قواعد البيانات',
          devops: 'عمليات التطوير والأدوات',
          other: 'مهارات أخرى',
        },
        items: {
          problemSolving: 'حل المشكلات',
          cleanCode: 'الكود النظيف',
        },
      },

      // Projects Section
      projects: {
        kicker: 'أعمال مختارة',
        title: 'أعمال مختارة',
        subtitle: 'أمثلة على القرارات الهندسية وراء البرمجيات.',
        viewGithub: 'عرض على GitHub',
        livePreview: 'معاينة مباشرة',
        privateCode: 'مستودع خاص',
        technologiesLabel: 'التقنيات المستخدمة',
        viewArchive: 'عرض أرشيف المشاريع',
        showFeatured: 'عرض الأعمال المختارة فقط',
        readMore: 'اقرأ المزيد',
        showLess: 'عرض أقل',
        descriptions: {
          befriends:
            'منصة تواصل اجتماعي تساعد على ربط الأشخاص ذوي الاهتمامات والهوايات المتشابهة.',
          escanor: 'منصة للتجارة الإلكترونية في مجال الأزياء، بتصميم عصري وتجربة تسوق سلسة.',
          charity:
            'منصة تربط المتبرعين بالمنظمات الخيرية وتتبع التبرعات، مع خاصية التعرف على الصور بالذكاء الاصطناعي باستخدام YOLOv5.',
          promptshare: 'منصة مجتمعية لمشاركة واكتشاف أوامر الذكاء الاصطناعي.',
          coligo:
            'تطبيق اختبارات للطلاب مبني باستخدام React للواجهة الأمامية وExpress.js مع MongoDB للواجهة الخلفية.',
          employeeManager:
            'تطبيق لإدارة الموظفين مبني باستخدام Angular للواجهة الأمامية و.NET Core مع SQL Server للواجهة الخلفية.',
        },
      },

      // Education Section
      education: {
        title: 'التعليم',
        kicker: 'الأساس الأكاديمي',
        subtitle: 'أساس في علوم الحاسب وتدريب عملي.',
        degrees: {
          bsc: 'بكالوريوس علوم الحاسب',
          webDev: 'تطوير الويب باستخدام .NET',
        },
        institutions: {
          suez: 'جامعة السويس',
          iti: 'معهد تكنولوجيا المعلومات',
        },
        details: {
          suez: 'الأول على الدفعة بمعدل 3.91 من 4.0',
          iti: 'برنامج احترافي لتطوير الويب',
        },
      },

      // Certificates Section
      certificates: {
        title: 'الشهادات المهنية',
        subtitle: 'شهادات مختارة تعزز خبرتي في الهندسة وعلوم الحاسب.',
        kicker: 'أوراق الاعتماد',
        download: 'تحميل الشهادة',
        focusAreasLabel: 'المجالات التي تغطيها الشهادة',
        viewAll: 'عرض جميع الشهادات الإحدى عشرة',
        showFeatured: 'عرض الشهادات المختارة فقط',
      },

      // Contact Section
      contact: {
        title: 'لنتحدث',
        subtitle: 'التواصل',
        description:
          'أنا متاح لفرص هندسة البرمجيات الخلفية، بما فيها العمل الدولي عن بُعد. البريد الإلكتروني هو أسرع وسيلة للتواصل معي.',
        actionsLabel: 'خيارات التواصل المباشر',
        emailAction: 'راسلني',
        openProfile: 'فتح الملف الشخصي',
        resumeLabel: 'السيرة الذاتية',
        resumeAction: 'تحميل السيرة الذاتية',
        email: 'البريد الإلكتروني',
        location: 'الموقع',
        social: 'التواصل الاجتماعي',
        form: {
        heading: 'إنشاء رسالة بريد إلكتروني',
          note: 'عند الإرسال، سيفتح تطبيق البريد لديك مع تعبئة الرسالة. لن يتم إرسال أي شيء تلقائياً.',
          name: 'الاسم',
          namePlaceholder: 'اسمك',
          email: 'البريد الإلكتروني',
          emailPlaceholder: 'بريدك الإلكتروني',
          subject: 'الموضوع',
          subjectPlaceholder: 'الموضوع',
          message: 'الرسالة',
          messagePlaceholder: 'رسالتك',
          send: 'إنشاء مسودة بريد',
        },
        errors: {
          nameRequired: 'الاسم مطلوب',
          nameMinLength: 'يجب أن يكون الاسم حرفين على الأقل',
          emailRequired: 'البريد الإلكتروني مطلوب',
          emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
          subjectRequired: 'الموضوع مطلوب',
          messageRequired: 'الرسالة مطلوبة',
          messageMinLength: 'يجب أن تكون الرسالة 10 أحرف على الأقل',
        },
      },

      // Footer
      footer: {
        copyright: '© 2026 حازم. جميع الحقوق محفوظة.',
      },
    },
  };

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () =>
          this.initializeLanguage(),
        );
      } else {
        this.initializeLanguage();
      }
    }
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('language') as Language | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      this.setLanguage(savedLang);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      const lang: Language = browserLang.startsWith('ar') ? 'ar' : 'en';
      this.setLanguage(lang);
    }
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
      document.documentElement.setAttribute('lang', lang);
      document.documentElement.setAttribute(
        'dir',
        lang === 'ar' ? 'rtl' : 'ltr',
      );
      document.body.classList.toggle('rtl', lang === 'ar');
    }
  }

  toggleLanguage(): void {
    const newLang: Language = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }

  /**
   * Get a translation by key path (e.g., 'hero.greeting')
   */
  t(key: string): string {
    const keys = key.split('.');
    let result: Translations | string = this.translations[this.currentLang()];

    for (const k of keys) {
      if (typeof result === 'object' && result !== null && k in result) {
        result = result[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof result === 'string' ? result : key;
  }

  /**
   * Get all translations for a section
   */
  getSection(section: string): Translations {
    const translations = this.translations[this.currentLang()];
    return (translations[section] as Translations) || {};
  }
}
