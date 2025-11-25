import type { Locale } from '@/lib/supabase/types'

export const aboutTranslations: Record<Locale, {
  title: string
  intro: string
  nooruiCallout: string
  whyTitle: string
  whyP1: string
  pullQuote: string
  whyP2: string
  techTitle: string
  techP1: string
  techList: {
    rtl: string
    bilingual: string
    a11y: string
    modern: string
  }
  philosophyQuote: string
  philosophyAuthor: string
  adminTitle: string
  adminP1: string
  guestCallout: string
  adminWhat: string
  adminList: string[]
  devTitle: string
  devP1: string
  techHighlightsTitle: string
  table: {
    feature: string
    description: string
    rows: Array<{ feature: string; description: string }>
  }
  devP2: string
  devCallout: string
  getStartedTitle: string
  getStartedP1: string
  getStartedQuote: string
  getStartedCTA: string
  getStartedP2: string
  creatorTitle: string
  creatorP1: string
  creatorCallout: string
  footer: string
}> = {
  en: {
    title: 'About Kitab',
    intro: 'Kitab (كتاب — meaning "book" in Arabic) is a multilingual blog starter template that demonstrates what\'s possible when you build with RTL-first infrastructure from day one.',
    nooruiCallout: 'This entire site — every component, layout, and interaction — is built with noorui-rtl, an open-source design system for bilingual applications.',
    whyTitle: 'Why Kitab Exists',
    whyP1: 'Most blog templates treat right-to-left languages as an afterthought. A CSS override here, a direction toggle there. The result? Broken layouts, inconsistent typography, and frustrated users.',
    pullQuote: 'Switch between languages and watch the entire interface adapt automatically. No flickering. No layout shifts. Just smooth, natural transitions.',
    whyP2: 'Kitab takes a different approach. Every component was built to work seamlessly across four languages — English, French, Arabic, and Urdu — representing both LTR and RTL writing systems.',
    techTitle: 'What Powers This Site',
    techP1: 'The noorui-rtl component library provides over 50 production-ready React components designed with:',
    techList: {
      rtl: 'RTL-first architecture using CSS logical properties',
      bilingual: 'Bilingual support where Arabic and English are equal citizens',
      a11y: 'Full accessibility with WCAG AA compliance',
      modern: 'Modern tooling including Next.js 14, TypeScript, and Tailwind CSS',
    },
    philosophyQuote: 'RTL isn\'t a feature you add. It\'s a constraint that makes your system better.',
    philosophyAuthor: 'The noorui-rtl philosophy',
    adminTitle: 'Explore the Admin Dashboard',
    adminP1: 'Kitab includes a complete content management system showcasing noorui-rtl\'s advanced components in action.',
    guestCallout: 'Guest mode available! You can explore the full admin panel without signing up. Access it from the navigation header.',
    adminWhat: 'What you\'ll find in the dashboard:',
    adminList: [
      'A responsive sidebar layout using DashboardShell',
      'Post management with DataTable featuring sorting, filtering, and pagination',
      'A rich text editor with full RTL support',
      'Image uploads integrated with Supabase Storage',
      'Multi-locale content fields for managing translations',
      'Authentication via Google OAuth',
    ],
    devTitle: 'For Developers',
    devP1: 'Kitab is designed to be both a demo and a starting point. If you\'re building a multilingual application — especially one serving Arabic, Hebrew, Urdu, Farsi, or other RTL languages — this template shows you what proper RTL implementation looks like.',
    techHighlightsTitle: 'Technical Highlights',
    table: {
      feature: 'Feature',
      description: 'Description',
      rows: [
        { feature: 'Direction Switching', description: 'Automatic RTL/LTR based on locale' },
        { feature: 'MDX Components', description: 'Blockquotes, callouts, code blocks, media embeds' },
        { feature: 'Rich Text Editor', description: 'Full bidirectional text support' },
        { feature: 'Image Handling', description: 'Supabase Storage integration' },
        { feature: 'Type Safety', description: 'Full TypeScript coverage' },
        { feature: 'Internationalization', description: '4 languages out of the box' },
      ],
    },
    devP2: 'The source code demonstrates patterns you can adopt in your own projects, from handling bidirectional text to managing multi-locale content.',
    devCallout: 'For local development: Explore all available MDX components at /components-demo to see what\'s possible for your blog content.',
    getStartedTitle: 'Get Started with noorui-rtl',
    getStartedP1: 'Ready to build your own multilingual application?',
    getStartedQuote: 'Whether you\'re building a blog, an e-commerce platform, or a SaaS dashboard for the GCC market — noorui-rtl gives you the foundation to ship faster without sacrificing quality for your RTL users.',
    getStartedCTA: 'Explore noorui-rtl →',
    getStartedP2: 'The documentation includes installation guides, component examples, and best practices for RTL development. Everything is open source and free to use.',
    creatorTitle: 'About the Creator',
    creatorP1: 'Kitab and noorui-rtl are created by Nuno Marques (aka OSITAKA) — a designer and developer passionate about building better infrastructure for multilingual applications, particularly for the GCC market.',
    creatorCallout: 'Want to connect? Find Nuno on GitHub and LinkedIn to follow the journey of building RTL-first design systems in public.',
    footer: 'Kitab is part of the noorui-rtl starter collection. Built with care for developers serving multilingual audiences.',
  },
  fr: {
    title: 'À propos de Kitab',
    intro: 'Kitab (كتاب — signifiant "livre" en arabe) est un modèle de blog multilingue qui démontre ce qui est possible lorsque vous construisez avec une infrastructure RTL dès le premier jour.',
    nooruiCallout: 'Ce site entier — chaque composant, mise en page et interaction — est construit avec noorui-rtl, un système de design open-source pour applications bilingues.',
    whyTitle: 'Pourquoi Kitab existe',
    whyP1: 'La plupart des modèles de blog traitent les langues de droite à gauche comme une réflexion après coup. Un remplacement CSS ici, un basculement de direction là. Le résultat ? Des mises en page cassées, une typographie incohérente et des utilisateurs frustrés.',
    pullQuote: 'Changez de langue et regardez l\'interface entière s\'adapter automatiquement. Pas de scintillement. Pas de décalage de mise en page. Juste des transitions fluides et naturelles.',
    whyP2: 'Kitab adopte une approche différente. Chaque composant a été conçu pour fonctionner de manière transparente dans quatre langues — anglais, français, arabe et ourdou — représentant les systèmes d\'écriture LTR et RTL.',
    techTitle: 'Ce qui alimente ce site',
    techP1: 'La bibliothèque de composants noorui-rtl fournit plus de 50 composants React prêts pour la production conçus avec :',
    techList: {
      rtl: 'Architecture RTL-first utilisant les propriétés logiques CSS',
      bilingual: 'Support bilingue où l\'arabe et l\'anglais sont des citoyens égaux',
      a11y: 'Accessibilité complète avec conformité WCAG AA',
      modern: 'Outillage moderne incluant Next.js 14, TypeScript et Tailwind CSS',
    },
    philosophyQuote: 'Le RTL n\'est pas une fonctionnalité que vous ajoutez. C\'est une contrainte qui améliore votre système.',
    philosophyAuthor: 'La philosophie noorui-rtl',
    adminTitle: 'Explorez le tableau de bord admin',
    adminP1: 'Kitab inclut un système de gestion de contenu complet présentant les composants avancés de noorui-rtl en action.',
    guestCallout: 'Mode invité disponible ! Vous pouvez explorer le panneau d\'administration complet sans inscription. Accédez-y depuis l\'en-tête de navigation.',
    adminWhat: 'Ce que vous trouverez dans le tableau de bord :',
    adminList: [
      'Une mise en page de barre latérale réactive utilisant DashboardShell',
      'Gestion des publications avec DataTable avec tri, filtrage et pagination',
      'Un éditeur de texte enrichi avec support RTL complet',
      'Téléchargements d\'images intégrés avec Supabase Storage',
      'Champs de contenu multi-locaux pour gérer les traductions',
      'Authentification via Google OAuth',
    ],
    devTitle: 'Pour les développeurs',
    devP1: 'Kitab est conçu pour être à la fois une démo et un point de départ. Si vous construisez une application multilingue — en particulier une qui sert l\'arabe, l\'hébreu, l\'ourdou, le farsi ou d\'autres langues RTL — ce modèle vous montre à quoi ressemble une implémentation RTL appropriée.',
    techHighlightsTitle: 'Points forts techniques',
    table: {
      feature: 'Fonctionnalité',
      description: 'Description',
      rows: [
        { feature: 'Changement de direction', description: 'RTL/LTR automatique basé sur la locale' },
        { feature: 'Composants MDX', description: 'Citations, encadrés, blocs de code, intégrations média' },
        { feature: 'Éditeur de texte enrichi', description: 'Support complet du texte bidirectionnel' },
        { feature: 'Gestion des images', description: 'Intégration Supabase Storage' },
        { feature: 'Sécurité des types', description: 'Couverture TypeScript complète' },
        { feature: 'Internationalisation', description: '4 langues prêtes à l\'emploi' },
      ],
    },
    devP2: 'Le code source démontre des modèles que vous pouvez adopter dans vos propres projets, de la gestion du texte bidirectionnel à la gestion du contenu multi-local.',
    devCallout: 'Pour le développement local : Explorez tous les composants MDX disponibles à /components-demo pour voir ce qui est possible pour le contenu de votre blog.',
    getStartedTitle: 'Commencer avec noorui-rtl',
    getStartedP1: 'Prêt à construire votre propre application multilingue ?',
    getStartedQuote: 'Que vous construisiez un blog, une plateforme e-commerce ou un tableau de bord SaaS pour le marché du CCG — noorui-rtl vous donne la base pour expédier plus rapidement sans sacrifier la qualité pour vos utilisateurs RTL.',
    getStartedCTA: 'Explorer noorui-rtl →',
    getStartedP2: 'La documentation inclut des guides d\'installation, des exemples de composants et les meilleures pratiques pour le développement RTL. Tout est open source et gratuit.',
    creatorTitle: 'À propos du créateur',
    creatorP1: 'Kitab et noorui-rtl sont créés par Nuno Marques (alias OSITAKA) — un designer et développeur passionné par la construction de meilleures infrastructures pour les applications multilingues, en particulier pour le marché du CCG.',
    creatorCallout: 'Envie de vous connecter ? Trouvez Nuno sur GitHub et LinkedIn pour suivre le parcours de construction de systèmes de design RTL-first en public.',
    footer: 'Kitab fait partie de la collection de starters noorui-rtl. Construit avec soin pour les développeurs servant des publics multilingues.',
  },
  ar: {
    title: 'عن كتاب',
    intro: 'كتاب (كتاب — وتعني "كتاب" بالعربية) هو قالب مدونة متعدد اللغات يوضح ما هو ممكن عندما تبني ببنية تحتية RTL من اليوم الأول.',
    nooruiCallout: 'هذا الموقع بأكمله — كل مكون وتخطيط وتفاعل — مبني باستخدام noorui-rtl، نظام تصميم مفتوح المصدر للتطبيقات ثنائية اللغة.',
    whyTitle: 'لماذا يوجد كتاب',
    whyP1: 'معظم قوالب المدونات تتعامل مع اللغات من اليمين إلى اليسار كفكرة لاحقة. تجاوز CSS هنا، تبديل اتجاه هناك. النتيجة؟ تخطيطات مكسورة، طباعة غير متسقة، ومستخدمون محبطون.',
    pullQuote: 'قم بالتبديل بين اللغات وشاهد الواجهة بأكملها تتكيف تلقائيًا. لا وميض. لا تحولات في التخطيط. فقط انتقالات سلسة وطبيعية.',
    whyP2: 'كتاب يتبع نهجًا مختلفًا. تم بناء كل مكون ليعمل بسلاسة عبر أربع لغات — الإنجليزية والفرنسية والعربية والأردية — التي تمثل أنظمة الكتابة LTR و RTL.',
    techTitle: 'ما الذي يشغل هذا الموقع',
    techP1: 'توفر مكتبة مكونات noorui-rtl أكثر من 50 مكون React جاهز للإنتاج مصمم مع:',
    techList: {
      rtl: 'بنية RTL-first باستخدام خصائص CSS المنطقية',
      bilingual: 'دعم ثنائي اللغة حيث العربية والإنجليزية مواطنون متساوون',
      a11y: 'إمكانية وصول كاملة مع الامتثال لـ WCAG AA',
      modern: 'أدوات حديثة تشمل Next.js 14 و TypeScript و Tailwind CSS',
    },
    philosophyQuote: 'RTL ليس ميزة تضيفها. إنه قيد يجعل نظامك أفضل.',
    philosophyAuthor: 'فلسفة noorui-rtl',
    adminTitle: 'استكشف لوحة التحكم الإدارية',
    adminP1: 'يتضمن كتاب نظام إدارة محتوى كامل يعرض مكونات noorui-rtl المتقدمة في العمل.',
    guestCallout: 'وضع الضيف متاح! يمكنك استكشاف لوحة الإدارة الكاملة دون تسجيل. يمكن الوصول إليها من رأس التنقل.',
    adminWhat: 'ما ستجده في لوحة التحكم:',
    adminList: [
      'تخطيط شريط جانبي متجاوب باستخدام DashboardShell',
      'إدارة المنشورات باستخدام DataTable مع الفرز والتصفية والترقيم',
      'محرر نصوص غني مع دعم RTL كامل',
      'تحميلات صور متكاملة مع Supabase Storage',
      'حقول محتوى متعددة اللغات لإدارة الترجمات',
      'المصادقة عبر Google OAuth',
    ],
    devTitle: 'للمطورين',
    devP1: 'تم تصميم كتاب ليكون عرضًا توضيحيًا ونقطة انطلاق. إذا كنت تبني تطبيقًا متعدد اللغات — خاصة واحدًا يخدم العربية أو العبرية أو الأردية أو الفارسية أو لغات RTL الأخرى — يوضح لك هذا القالب كيف يبدو التنفيذ الصحيح لـ RTL.',
    techHighlightsTitle: 'أبرز النقاط الفنية',
    table: {
      feature: 'الميزة',
      description: 'الوصف',
      rows: [
        { feature: 'تبديل الاتجاه', description: 'RTL/LTR تلقائي بناءً على اللغة' },
        { feature: 'مكونات MDX', description: 'اقتباسات، إشعارات، كتل كود، تضمينات وسائط' },
        { feature: 'محرر نصوص غني', description: 'دعم كامل للنص ثنائي الاتجاه' },
        { feature: 'معالجة الصور', description: 'تكامل Supabase Storage' },
        { feature: 'أمان الأنواع', description: 'تغطية TypeScript كاملة' },
        { feature: 'التدويل', description: '4 لغات جاهزة للاستخدام' },
      ],
    },
    devP2: 'يوضح الكود المصدري الأنماط التي يمكنك اعتمادها في مشاريعك الخاصة، من التعامل مع النص ثنائي الاتجاه إلى إدارة المحتوى متعدد اللغات.',
    devCallout: 'للتطوير المحلي: استكشف جميع مكونات MDX المتاحة في /components-demo لرؤية ما هو ممكن لمحتوى مدونتك.',
    getStartedTitle: 'ابدأ مع noorui-rtl',
    getStartedP1: 'مستعد لبناء تطبيقك متعدد اللغات الخاص؟',
    getStartedQuote: 'سواء كنت تبني مدونة أو منصة تجارة إلكترونية أو لوحة تحكم SaaS لسوق دول مجلس التعاون الخليجي — يمنحك noorui-rtl الأساس للشحن بشكل أسرع دون التضحية بالجودة لمستخدمي RTL.',
    getStartedCTA: 'استكشف noorui-rtl ←',
    getStartedP2: 'تتضمن الوثائق أدلة التثبيت وأمثلة المكونات وأفضل الممارسات لتطوير RTL. كل شيء مفتوح المصدر ومجاني للاستخدام.',
    creatorTitle: 'عن المنشئ',
    creatorP1: 'تم إنشاء كتاب و noorui-rtl بواسطة نونو ماركيز (المعروف باسم OSITAKA) — مصمم ومطور شغوف ببناء بنية تحتية أفضل للتطبيقات متعددة اللغات، خاصة لسوق دول مجلس التعاون الخليجي.',
    creatorCallout: 'تريد التواصل؟ ابحث عن نونو على GitHub و LinkedIn لمتابعة رحلة بناء أنظمة تصميم RTL-first علنًا.',
    footer: 'كتاب جزء من مجموعة قوالب noorui-rtl. مبني بعناية للمطورين الذين يخدمون جماهير متعددة اللغات.',
  },
  ur: {
    title: 'کتاب کے بارے میں',
    intro: 'کتاب (كتاب — عربی میں "کتاب" کا مطلب) ایک کثیر لسانی بلاگ اسٹارٹر ٹیمپلیٹ ہے جو یہ ظاہر کرتا ہے کہ جب آپ پہلے دن سے RTL بنیادی ڈھانچے کے ساتھ تعمیر کرتے ہیں تو کیا ممکن ہے۔',
    nooruiCallout: 'یہ پوری سائٹ — ہر جزو، ترتیب اور تعامل — noorui-rtl کے ساتھ بنائی گئی ہے، دو لسانی ایپلیکیشنز کے لیے ایک اوپن سورس ڈیزائن سسٹم۔',
    whyTitle: 'کتاب کیوں موجود ہے',
    whyP1: 'زیادہ تر بلاگ ٹیمپلیٹس دائیں سے بائیں زبانوں کو بعد کی سوچ کے طور پر لیتے ہیں۔ یہاں ایک CSS اوور رائیڈ، وہاں سمت کا ٹوگل۔ نتیجہ؟ ٹوٹی ہوئی ترتیبیں، غیر مستقل ٹائپوگرافی، اور مایوس صارفین۔',
    pullQuote: 'زبانوں کے درمیان سوئچ کریں اور پورے انٹرفیس کو خود بخود ڈھلتے ہوئے دیکھیں۔ کوئی جھلملاہٹ نہیں۔ کوئی ترتیب کی تبدیلی نہیں۔ صرف ہموار، قدرتی منتقلی۔',
    whyP2: 'کتاب ایک مختلف نقطہ نظر اختیار کرتی ہے۔ ہر جزو کو چار زبانوں — انگریزی، فرانسیسی، عربی اور اردو — میں بغیر کسی رکاوٹ کے کام کرنے کے لیے بنایا گیا تھا جو LTR اور RTL تحریری نظاموں کی نمائندگی کرتے ہیں۔',
    techTitle: 'اس سائٹ کو کیا طاقت دیتا ہے',
    techP1: 'noorui-rtl کمپوننٹ لائبریری 50 سے زیادہ پروڈکشن کے لیے تیار React کمپوننٹس فراہم کرتی ہے جو ڈیزائن کیے گئے ہیں:',
    techList: {
      rtl: 'CSS منطقی خصوصیات استعمال کرتے ہوئے RTL-first فن تعمیر',
      bilingual: 'دو لسانی معاونت جہاں عربی اور انگریزی برابر کے شہری ہیں',
      a11y: 'WCAG AA تعمیل کے ساتھ مکمل رسائی',
      modern: 'جدید ٹولنگ بشمول Next.js 14، TypeScript، اور Tailwind CSS',
    },
    philosophyQuote: 'RTL ایک خصوصیت نہیں ہے جسے آپ شامل کرتے ہیں۔ یہ ایک رکاوٹ ہے جو آپ کے نظام کو بہتر بناتی ہے۔',
    philosophyAuthor: 'noorui-rtl فلسفہ',
    adminTitle: 'ایڈمن ڈیش بورڈ دریافت کریں',
    adminP1: 'کتاب میں noorui-rtl کے جدید اجزاء کو عمل میں دکھاتے ہوئے ایک مکمل مواد کا انتظامی نظام شامل ہے۔',
    guestCallout: 'مہمان موڈ دستیاب ہے! آپ سائن اپ کیے بغیر مکمل ایڈمن پینل دریافت کر سکتے ہیں۔ نیویگیشن ہیڈر سے اس تک رسائی حاصل کریں۔',
    adminWhat: 'آپ کو ڈیش بورڈ میں کیا ملے گا:',
    adminList: [
      'DashboardShell استعمال کرتے ہوئے ایک ذمہ دار سائیڈ بار ترتیب',
      'ترتیب، فلٹرنگ اور صفحہ بندی کی خصوصیات کے ساتھ DataTable کا استعمال کرتے ہوئے پوسٹ کا انتظام',
      'مکمل RTL معاونت کے ساتھ ایک بھرپور متن ایڈیٹر',
      'Supabase Storage کے ساتھ مربوط تصویر اپ لوڈز',
      'ترجمے کو منظم کرنے کے لیے کثیر مقامی مواد کے شعبے',
      'Google OAuth کے ذریعے تصدیق',
    ],
    devTitle: 'ڈویلپرز کے لیے',
    devP1: 'کتاب کو ایک ڈیمو اور شروعاتی نقطہ دونوں کے طور پر ڈیزائن کیا گیا ہے۔ اگر آپ ایک کثیر لسانی ایپلیکیشن بنا رہے ہیں — خاص طور پر ایک جو عربی، عبرانی، اردو، فارسی یا دیگر RTL زبانوں کی خدمت کر رہا ہے — یہ ٹیمپلیٹ آپ کو دکھاتا ہے کہ مناسب RTL نفاذ کیسا نظر آتا ہے۔',
    techHighlightsTitle: 'تکنیکی جھلکیاں',
    table: {
      feature: 'خصوصیت',
      description: 'تفصیل',
      rows: [
        { feature: 'سمت کی تبدیلی', description: 'لوکیل کی بنیاد پر خودکار RTL/LTR' },
        { feature: 'MDX اجزاء', description: 'اقتباسات، کال آؤٹس، کوڈ بلاکس، میڈیا ایمبیڈز' },
        { feature: 'بھرپور متن ایڈیٹر', description: 'مکمل دو سمتی متن کی معاونت' },
        { feature: 'تصویر کی ہینڈلنگ', description: 'Supabase Storage انضمام' },
        { feature: 'قسم کی حفاظت', description: 'مکمل TypeScript کوریج' },
        { feature: 'بین الاقوامی کاری', description: 'باکس سے باہر 4 زبانیں' },
      ],
    },
    devP2: 'سورس کوڈ ان نمونوں کو ظاہر کرتا ہے جنہیں آپ اپنے پروجیکٹس میں اپنا سکتے ہیں، دو سمتی متن سے نمٹنے سے لے کر کثیر مقامی مواد کو منظم کرنے تک۔',
    devCallout: 'مقامی ترقی کے لیے: /components-demo پر تمام دستیاب MDX اجزاء دریافت کریں تاکہ آپ کے بلاگ کے مواد کے لیے کیا ممکن ہے دیکھ سکیں۔',
    getStartedTitle: 'noorui-rtl کے ساتھ شروع کریں',
    getStartedP1: 'اپنی کثیر لسانی ایپلیکیشن بنانے کے لیے تیار ہیں؟',
    getStartedQuote: 'چاہے آپ ایک بلاگ، ای کامرس پلیٹ فارم، یا GCC مارکیٹ کے لیے SaaS ڈیش بورڈ بنا رہے ہوں — noorui-rtl آپ کو اپنے RTL صارفین کے لیے معیار کی قربانی دیے بغیر تیزی سے بھیجنے کے لیے بنیاد فراہم کرتا ہے۔',
    getStartedCTA: 'noorui-rtl دریافت کریں ←',
    getStartedP2: 'دستاویزات میں انسٹالیشن گائیڈز، جزو کی مثالیں، اور RTL ترقی کے لیے بہترین طریقے شامل ہیں۔ سب کچھ اوپن سورس اور استعمال کے لیے مفت ہے۔',
    creatorTitle: 'تخلیق کار کے بارے میں',
    creatorP1: 'کتاب اور noorui-rtl نونو مارکیز (عرف OSITAKA) کی طرف سے بنائے گئے ہیں — ایک ڈیزائنر اور ڈویلپر جو کثیر لسانی ایپلیکیشنز کے لیے بہتر بنیادی ڈھانچہ بنانے کا شوقین ہے، خاص طور پر GCC مارکیٹ کے لیے۔',
    creatorCallout: 'رابطے میں رہنا چاہتے ہیں؟ RTL-first ڈیزائن سسٹمز کو عوامی طور پر بنانے کے سفر کی پیروی کرنے کے لیے GitHub اور LinkedIn پر نونو تلاش کریں۔',
    footer: 'کتاب noorui-rtl سٹارٹر مجموعہ کا حصہ ہے۔ کثیر لسانی سامعین کی خدمت کرنے والے ڈویلپرز کے لیے احتیاط سے بنایا گیا۔',
  },
}
