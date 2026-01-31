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
        greeting: "Hi, I'm Hazem Ragab",
        title: 'Full-Stack Software Engineer',
        description:
          'Specializing in efficient APIs and responsive frontends, with a deep passion for problem solving and algorithms. Building robust, scalable applications using modern technologies.',
        viewWork: 'View My Work',
        contactMe: 'Contact Me',
      },

      // About Section
      about: {
        title: 'About Me',
        lead: 'A detail-oriented Software Engineer passionate about crafting efficient solutions and turning complex problems into elegant code.',
        description:
          'I specialize in building robust, scalable applications with a focus on clean architecture and optimal performance. As a recent Computer Science graduate and the top of my class, I combine strong theoretical foundations with practical development experience through various successful freelance projects.',
        problemSolver: 'Problem Solver',
        cleanCode: 'Clean Code Advocate',
        fullStack: 'Full Stack Developer',
      },

      // Experience Section
      experience: {
        title: 'Experience',
        kicker: 'Experience',
        subtitle:
          'Delivering resilient products and collaborative engineering culture.',
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
        title: 'Skills & Technologies',
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
        title: 'Personal Projects',
        subtitle:
          'A collection of projects I built to learn and experiment with different technologies',
        viewGithub: 'View on GitHub',
        livePreview: 'Live Preview',
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
          'Professional certifications and achievements that showcase my expertise',
        kicker: 'credentials',
        viewCredential: 'View credential',
        download: 'Download certificate',
      },

      // Contact Section
      contact: {
        title: 'Get In Touch',
        subtitle: "Let's Connect",
        description:
          'Feel free to reach out for opportunities, collaborations, or just to say hello!',
        email: 'Email',
        location: 'Location',
        social: 'Social',
        form: {
          name: 'Name',
          namePlaceholder: 'Your name',
          email: 'Email',
          emailPlaceholder: 'Your email',
          subject: 'Subject',
          subjectPlaceholder: 'Subject',
          message: 'Message',
          messagePlaceholder: 'Your message',
          send: 'Send Message',
          success: "Thank you for your message! I'll get back to you soon.",
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
        greeting: 'مرحباً، أنا حازم رجب',
        title: 'مهندس برمجيات متكامل',
        description:
          'متخصص في بناء واجهات برمجية فعّالة وواجهات مستخدم متجاوبة، مع شغف عميق بحل المشكلات والخوارزميات. أبني تطبيقات قوية وقابلة للتوسع باستخدام أحدث التقنيات.',
        viewWork: 'استعرض أعمالي',
        contactMe: 'تواصل معي',
      },

      // About Section
      about: {
        title: 'نبذة عني',
        lead: 'مهندس برمجيات دقيق في التفاصيل، شغوف بصياغة حلول فعّالة وتحويل المشكلات المعقدة إلى أكواد أنيقة.',
        description:
          'أتخصص في بناء تطبيقات قوية وقابلة للتوسع مع التركيز على البنية النظيفة والأداء الأمثل. كخريج حديث في علوم الحاسب وأول دفعتي، أجمع بين الأسس النظرية القوية والخبرة العملية في التطوير من خلال مشاريع حرة ناجحة متعددة.',
        problemSolver: 'محلل مشكلات',
        cleanCode: 'مناصر للكود النظيف',
        fullStack: 'مطور متكامل',
      },

      // Experience Section
      experience: {
        title: 'الخبرات',
        kicker: 'الخبرات',
        subtitle: 'تقديم منتجات متينة وثقافة هندسية تعاونية.',
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
            'تطوير تطبيقات ويب معقدة عالية الأداء تدعم قطاعات اللوجستيات والمالية والسلامة وغيرها من المجالات الحيوية.',
        },
      },

      // Skills Section
      skills: {
        title: 'المهارات والتقنيات',
        categories: {
          programming: 'لغات البرمجة',
          backend: 'تطوير الـ Backend',
          frontend: 'تطوير الـ Frontend',
          databases: 'قواعد البيانات',
          devops: 'DevOps والأدوات',
          other: 'مهارات أخرى',
        },
        items: {
          problemSolving: 'حل المشكلات',
          cleanCode: 'Clean Code',
        },
      },

      // Projects Section
      projects: {
        title: 'المشاريع الشخصية',
        subtitle:
          'مجموعة من المشاريع التي بنيتها للتعلم والتجربة مع تقنيات مختلفة',
        viewGithub: 'عرض على GitHub',
        livePreview: 'معاينة مباشرة',
        readMore: 'اقرأ المزيد',
        showLess: 'عرض أقل',
        descriptions: {
          befriends:
            'منصة تواصل اجتماعي تساعد على ربط الأشخاص ذوي الاهتمامات والهوايات المتشابهة.',
          escanor: 'منصة متجر إلكتروني للملابس بتصميم عصري وتجربة تسوق سلسة.',
          charity:
            'منصة تربط المتبرعين بالمنظمات الخيرية وتتبع التبرعات، مع خاصية التعرف على الصور بالذكاء الاصطناعي باستخدام YOLOv5.',
          promptshare: 'منصة مجتمعية لمشاركة واكتشاف أوامر الذكاء الاصطناعي.',
          coligo:
            'تطبيق اختبارات للطلاب مبني بـ React للواجهة الأمامية و Express.js مع MongoDB للواجهة الخلفية.',
          employeeManager:
            'تطبيق بسيط لإدارة الموظفين مبني بـ Angular للواجهة الأمامية و .NET Core مع Sql Server للواجهة الخلفية.',
        },
      },

      // Education Section
      education: {
        title: 'التعليم',
        degrees: {
          bsc: 'بكالوريوس علوم الحاسب',
          webDev: 'تطوير الويب باستخدام .Net',
        },
        institutions: {
          suez: 'جامعة السويس',
          iti: 'معهد تكنولوجيا المعلومات',
        },
        details: {
          suez: 'تخرجت الأول على دفعتي بمعدل 3.91 من 4.0',
          iti: 'برنامج تطوير احترافي',
        },
      },

      // Certificates Section
      certificates: {
        title: 'الشهادات المهنية',
        subtitle: 'شهادات وإنجازات مهنية تعكس خبرتي',
        kicker: 'أوراق الاعتماد',
        viewCredential: 'عرض الشهادة',
        download: 'تحميل الشهادة',
      },

      // Contact Section
      contact: {
        title: 'تواصل معي',
        subtitle: 'دعنا نتواصل',
        description:
          'لا تتردد في التواصل للحصول على فرص أو تعاون أو حتى لمجرد إلقاء التحية!',
        email: 'البريد الإلكتروني',
        location: 'الموقع',
        social: 'التواصل الاجتماعي',
        form: {
          name: 'الاسم',
          namePlaceholder: 'اسمك',
          email: 'البريد الإلكتروني',
          emailPlaceholder: 'بريدك الإلكتروني',
          subject: 'الموضوع',
          subjectPlaceholder: 'الموضوع',
          message: 'الرسالة',
          messagePlaceholder: 'رسالتك',
          send: 'إرسال الرسالة',
          success: 'شكراً لرسالتك! سأرد عليك قريباً.',
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
