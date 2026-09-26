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
        eyebrow: 'Hazem Ragab · Suez, Egypt',
        greeting: 'Backend Software Engineer',
        title: 'Real-time backend systems that hold up in production.',
        description:
          'At Intella, I work on live audio integrations, concurrency, performance and reliability with Node.js, TypeScript and Redis. Previously, I built enterprise software at DP World.',
        viewWork: 'See engineering work',
        downloadResume: 'View CV',
        socialLabel: 'Professional profiles',
        imageAlt: 'Hazem Ragab seated on a mountain overlooking the landscape',
        currentLabel: 'Current role',
        currentValue: 'Backend Engineer · Intella',
        evidence: 'Production engineering',
        quotaValue: '~5×',
        quotaLabel: 'potential over-consumption prevented through quota accounting fix',
        latencyValue: '18.3 s → 222 ms',
        latencyLabel: 'recording finalization in a 60-second gap case',
        systemsLabel: 'Working on now',
        systemsValue: 'Live audio · WebSockets · Redis · multi-instance services',
        proofLabel: 'Professional snapshot',
        stackLabel: 'Core stack',
        stackValue: 'Node.js · TypeScript · Redis',
        foundationLabel: 'Previous role',
        foundationValue: 'Software Engineer · DP World',
        locationLabel: 'Commercial work',
        locationValue: 'Client and company systems since 2023',
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
          'Production systems, measurable improvements and commercial software delivery.',
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
        title: 'Skills & Technologies',
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
        title: 'Selected engineering work',
        subtitle:
          'Three examples of the problems I owned and the systems behind them.',
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
        subtitle: 'Academic grounding that supports practical engineering decisions.',
        degrees: {
          bsc: 'B.Sc. in Computer Science',
          webDev: 'Web Development Using .Net',
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
        title: 'Get In Touch',
        subtitle: "Let's Connect",
        description:
          'Hiring for a backend or software engineering role? I am open to international remote opportunities.',
        actionsLabel: 'Direct contact options',
        emailAction: 'Email me',
        openProfile: 'Open profile',
        resumeLabel: 'Résumé',
        resumeAction: 'Download PDF',
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
        eyebrow: 'حازم رجب · السويس، مصر',
        greeting: 'مهندس برمجيات خلفية',
        title: 'أنظمة خلفية فورية تعمل بثبات في بيئات الإنتاج.',
        description:
          'أعمل في إنتيلا على تكاملات الصوت المباشر والتزامن والأداء والموثوقية باستخدام Node.js وTypeScript وRedis. عملت سابقاً على أنظمة مؤسسية في دي بي ورلد.',
        viewWork: 'عرض العمل الهندسي',
        downloadResume: 'عرض السيرة الذاتية',
        socialLabel: 'الحسابات المهنية',
        imageAlt: 'حازم رجب جالس على جبل، يتأمل المناظر الطبيعية',
        currentLabel: 'الدور الحالي',
        currentValue: 'مهندس برمجيات خلفية · إنتيلا',
        evidence: 'أثر هندسي في الإنتاج',
        quotaValue: 'نحو 5×',
        quotaLabel: 'استهلاك زائد محتمل منعته معالجة حساب حصص الجلسات',
        latencyValue: '18.3s → 222ms',
        latencyLabel: 'زمن إنهاء تسجيل في حالة فجوة مدتها 60 ثانية',
        systemsLabel: 'أعمل حالياً على',
        systemsValue: 'الصوت المباشر · WebSockets · Redis · خدمات متعددة النسخ',
        proofLabel: 'ملخص مهني',
        stackLabel: 'التقنيات الأساسية',
        stackValue: 'Node.js · TypeScript · Redis',
        foundationLabel: 'الوظيفة السابقة',
        foundationValue: 'مهندس برمجيات · دي بي ورلد',
        locationLabel: 'الخبرة التجارية',
        locationValue: 'أنظمة للعملاء والشركات منذ 2023',
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
        subtitle: 'أنظمة إنتاجية وتحسينات قابلة للقياس وتسليم برمجيات تجارية.',
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
        title: 'المهارات والتقنيات',
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
        title: 'أعمال هندسية مختارة',
        subtitle:
          'ثلاثة أمثلة على المشكلات التي توليت حلها والأنظمة التي تقف وراءها.',
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
        subtitle: 'أساس أكاديمي يدعم القرارات الهندسية العملية.',
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
        title: 'تواصل معي',
        subtitle: 'دعنا نتواصل',
        description:
          'إذا كنت توظف مهندس برمجيات خلفية أو مهندس برمجيات، فأنا متاح لفرص العمل الدولية عن بُعد.',
        actionsLabel: 'خيارات التواصل المباشر',
        emailAction: 'راسلني',
        openProfile: 'فتح الملف الشخصي',
        resumeLabel: 'السيرة الذاتية',
        resumeAction: 'تحميل PDF',
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
