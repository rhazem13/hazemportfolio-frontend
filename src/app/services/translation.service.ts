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
        skip: 'Skip to main content',
        primaryLabel: 'Primary navigation',
        homeLabel: 'Hazem Ragab, home',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        switchToArabic: 'Switch to Arabic',
        switchToEnglish: 'Switch to English',
        useLightTheme: 'Use light theme',
        useDarkTheme: 'Use dark theme',
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
        skip: 'الانتقال إلى المحتوى',
        primaryLabel: 'التنقل الرئيسي',
        homeLabel: 'حازم رجب، الصفحة الرئيسية',
        openMenu: 'فتح القائمة',
        closeMenu: 'إغلاق القائمة',
        switchToArabic: 'التبديل إلى العربية',
        switchToEnglish: 'التبديل إلى الإنجليزية',
        useLightTheme: 'تفعيل الوضع الفاتح',
        useDarkTheme: 'تفعيل الوضع الداكن',
      },

      // Hero Section
      hero: {
        eyebrow: 'القاهرة، مصر · متاح للعمل عن بُعد',
        greeting: 'حازم رجب',
        role: 'مهندس Backend',
        title: 'أبني APIs وأنظمة Real-time وخدمات موزّعة تعمل في الإنتاج.',
        description:
          'أعمل في Intella على خدمات Backend للتواصل الفوري في الإنتاج، باستخدام Node.js/TypeScript مع Redis وDocker وKubernetes. وقبلها طوّرت تطبيقات مؤسسية بـ .NET وC# في DP World. متاح للعمل عن بُعد مع فرق دولية.',
        viewWork: 'اطّلع على خبرتي',
        downloadResume: 'عرض السيرة الذاتية',
        email: 'البريد الإلكتروني',
        socialLabel: 'روابطي المهنية',
        imageAlt: 'حازم رجب في مشهد جبلي',
        currentLabel: 'العمل الحالي',
        currentValue: 'Backend Engineer · Intella',
      },

      // About Section
      about: {
        kicker: 'نبذة مهنية',
        title: 'ما أعمل عليه',
        lead: 'أعمل على خدمات Backend يكون فيها وقت الاستجابة والتزامن والاعتمادية عوامل أساسية.',
        description:
          'يركز عملي الحالي على الصوت الفوري والتكامل مع منصات خارجية وتنسيق الحالة بين نسخ الخدمة. وعملت أيضاً على تطبيقات .NET المؤسسية ومشاريع لعملاء في المدفوعات واللوجستيات والخدمات المعتمدة على الموقع.',
        resume: 'عرض السيرة الذاتية',
        evidenceLabel: 'ملخص الخبرة',
        currentTitle: 'العمل الحالي',
        currentValue: 'Backend Engineer في Intella',
        domainsTitle: 'مجالات العمل',
        domainsValue: 'الصوت الفوري · التكاملات · تطبيقات الشركات',
        stackTitle: 'التقنيات الأساسية',
        stackValue: 'Node.js · TypeScript · Redis · PostgreSQL',
        foundationTitle: 'الدراسة',
        foundationValue: 'الأول على الدفعة · معدل 3.91 من 4.0',
      },

      // Experience Section
      experience: {
        title: 'الخبرات',
        kicker: 'المسار المهني',
        subtitle: 'من خدمات Backend في الإنتاج إلى تطبيقات الشركات ومشاريع العملاء.',
        present: 'حتى الآن',
        justStarted: 'أقل من شهر',
        yr: 'سنة',
        yrs: 'سنوات',
        mo: 'شهر',
        roles: {
          softwareEngineer: 'مهندس برمجيات',
        },
        companies: {
          dpWorld: 'DP World',
        },
        summaries: {
          dpWorld:
            'عملت على تطبيقات .NET تدعم أعمال اللوجستيات والمالية والسلامة.',
        },
      },

      // Skills Section
      skills: {
        kicker: 'المهارات',
        title: 'التقنيات التي أستخدمها',
        subtitle:
          'أدوات أستخدمها لبناء خدمات Backend وتشغيلها وحل مشكلاتها.',
        categories: {
          programming: 'لغات البرمجة',
          backend: 'Backend',
          frontend: 'Frontend',
          databases: 'قواعد البيانات',
          devops: 'البنية التحتية والأدوات',
          other: 'مهارات أخرى',
        },
        items: {
          problemSolving: 'حل المشكلات',
          cleanCode: 'كتابة كود واضح',
        },
      },

      // Projects Section
      projects: {
        kicker: 'المشاريع',
        title: 'أعمال مختارة',
        subtitle: 'أمثلة على عملي في بناء APIs والتعامل مع البيانات والمدفوعات.',
        viewGithub: 'عرض على GitHub',
        livePreview: 'معاينة مباشرة',
        privateCode: 'مستودع خاص',
        technologiesLabel: 'التقنيات المستخدمة',
        viewArchive: 'كل المشاريع',
        showFeatured: 'الأعمال المختارة فقط',
        readMore: 'المزيد',
        showLess: 'أقل',
        descriptions: {
          befriends:
            'منصة تواصل تجمع الأشخاص الذين يشتركون في الاهتمامات والهوايات.',
          escanor: 'متجر إلكتروني للملابس يتيح تصفح المنتجات وإتمام الشراء.',
          charity:
            'منصة لإدارة التبرعات بين المتبرعين والجمعيات، مع التحقق من المستندات باستخدام YOLOv5.',
          promptshare: 'منصة لمشاركة أوامر الذكاء الاصطناعي والبحث عنها.',
          coligo:
            'تطبيق اختبارات للطلاب بواجهة React وخدمات Express.js وقاعدة MongoDB.',
          employeeManager:
            'تطبيق لإدارة الموظفين بواجهة Angular وخدمات .NET Core وقاعدة SQL Server.',
        },
      },

      // Education Section
      education: {
        title: 'التعليم',
        kicker: 'المؤهلات',
        subtitle: 'دراسة علوم الحاسب وتدريب عملي على .NET.',
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
          iti: 'برنامج تدريبي متخصص في تطوير الويب',
        },
      },

      // Certificates Section
      certificates: {
        title: 'الشهادات',
        subtitle: 'شهادات في البرمجة وتصميم البرمجيات وعلوم الحاسب.',
        kicker: 'التعلّم المستمر',
        download: 'تحميل الشهادة',
        focusAreasLabel: 'الموضوعات',
        viewAll: 'عرض الشهادات كلها',
        showFeatured: 'الشهادات المختارة فقط',
      },

      // Contact Section
      contact: {
        title: 'تواصل معي',
        subtitle: 'التواصل',
        description:
          'متاح لفرص Backend Engineer وSoftware Engineer مع فرق دولية تعمل عن بُعد. للتواصل، راسلني على البريد الإلكتروني.',
        actionsLabel: 'روابط التواصل',
        emailAction: 'راسلني',
        openProfile: 'عرض الحساب',
        resumeLabel: 'السيرة الذاتية',
        resumeAction: 'تحميل السيرة الذاتية',
        email: 'البريد الإلكتروني',
        location: 'الموقع',
        social: 'التواصل الاجتماعي',
        form: {
          heading: 'راسلني بالبريد',
          note: 'سيفتح تطبيق البريد مع رسالة جاهزة للمراجعة. لن تُرسل تلقائياً.',
          name: 'الاسم',
          namePlaceholder: 'اسمك',
          email: 'البريد الإلكتروني',
          emailPlaceholder: 'بريدك الإلكتروني',
          subject: 'الموضوع',
          subjectPlaceholder: 'الموضوع',
          message: 'الرسالة',
          messagePlaceholder: 'رسالتك',
          send: 'فتح مسودة الرسالة',
        },
        errors: {
          nameRequired: 'الاسم مطلوب',
          nameMinLength: 'اكتب حرفين على الأقل في الاسم',
          emailRequired: 'البريد الإلكتروني مطلوب',
          emailInvalid: 'تأكد من صحة عنوان البريد الإلكتروني',
          subjectRequired: 'الموضوع مطلوب',
          messageRequired: 'الرسالة مطلوبة',
          messageMinLength: 'اكتب 10 أحرف على الأقل في الرسالة',
        },
      },

      // Footer
      footer: {
        copyright: '© 2026 حازم رجب. جميع الحقوق محفوظة.',
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

    return typeof result === 'string' ? this.format(result) : key;
  }

  format(text: string): string {
    if (this.currentLang() !== 'ar') return text;

    // Keep English technical names in their reading order inside RTL sentences.
    return text.replace(
      /\.NET(?: Core)?|[A-Za-z][A-Za-z0-9.+#/-]*(?: [A-Za-z][A-Za-z0-9.+#/-]*)*/g,
      (term) => term.endsWith('.')
        ? `\u2066${term.slice(0, -1)}\u2069.`
        : `\u2066${term}\u2069`,
    );
  }

  /**
   * Get all translations for a section
   */
  getSection(section: string): Translations {
    const translations = this.translations[this.currentLang()];
    return (translations[section] as Translations) || {};
  }
}
