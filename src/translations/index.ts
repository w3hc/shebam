/**
 * Translation system for the application
 * Contains all text strings organized by language
 */

import { Language } from '@/utils/i18n'

// Define the structure of our translations
type TranslationKeys = {
  common: {
    login: string
    logout: string
    register: string
    pleaseLogin: string
  }
  home: {
    title: string
    subtitle: string
    greeting: string
    greetingSubtitle: string
  }
  navigation: { settings: string }
  settings: {
    title: string
    loginRequired: string
  }
  header: {
    intro: string
    faster: string
    and: string
    cheaper: string
    thanAnyExisting: string
    onchainEuro: string
    legallyRegulated: string
    testNetwork: string
    mainNetwork: string
  }
}

// Define translations for each supported language
type Translations = {
  [key in Language]: TranslationKeys
}

export const translations: Translations = {
  // English
  en: {
    common: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register',
      pleaseLogin: 'Please login',
    },
    home: {
      title: 'Welcome!',
      subtitle: "It's a pleasure to have you here!",
      greeting: 'Welcome!',
      greetingSubtitle: 'Relax and enjoy life!',
    },
    navigation: {
      settings: 'Settings',
    },
    settings: {
      title: 'Settings',
      loginRequired: 'Please login to access your settings',
    },
    header: {
      intro: 'Shebam is',
      faster: 'faster',
      and: 'and',
      cheaper: 'cheaper',
      thanAnyExisting:
        "than ANY existing payment system. We're using an onchain euro that is legally",
      onchainEuro: 'onchain euro',
      legallyRegulated: 'regulated',
      testNetwork:
        ". We're using a test network right now, but it will work exactly the same on the main network.",
      mainNetwork: 'main network',
    },
  },

  // Mandarin Chinese
  zh: {
    common: {
      login: '登录',
      logout: '登出',
      register: '注册',
      pleaseLogin: '请登录',
    },
    home: {
      title: '欢迎！',
      subtitle: '很高兴您来到这里！',
      greeting: '欢迎！',
      greetingSubtitle: '放松并享受生活！',
    },
    navigation: {
      settings: '设置',
    },
    settings: {
      title: '设置',
      loginRequired: '请登录以访问您的设置',
    },
    header: {
      intro: 'Shebam',
      faster: '更快',
      and: '且',
      cheaper: '更便宜',
      thanAnyExisting: '比任何现有的支付系统都要好。我们使用的是合法的',
      onchainEuro: '链上欧元',
      legallyRegulated: '受监管',
      testNetwork: '。我们目前使用测试网络，但在主网络上运行方式完全相同。',
      mainNetwork: '主网络',
    },
  },

  // Hindi
  hi: {
    common: {
      login: 'लॉगिन',
      logout: 'लॉगआउट',
      register: 'रजिस्टर करें',
      pleaseLogin: 'कृपया लॉगिन करें',
    },
    home: {
      title: 'स्वागत है!',
      subtitle: 'आपका यहाँ स्वागत है!',
      greeting: 'स्वागत है!',
      greetingSubtitle: 'आराम करें और जीवन का आनंद लें!',
    },
    navigation: {
      settings: 'सेटिंग्स',
    },
    settings: {
      title: 'सेटिंग्स',
      loginRequired: 'अपनी सेटिंग्स एक्सेस करने के लिए कृपया लॉगिन करें',
    },
    header: {
      intro: 'Shebam',
      faster: 'तेज़',
      and: 'और',
      cheaper: 'सस्ता',
      thanAnyExisting: 'किसी भी मौजूदा भुगतान प्रणाली से बेहतर है। हम एक कानूनी रूप से',
      onchainEuro: 'ऑनचेन यूरो',
      legallyRegulated: 'विनियमित',
      testNetwork:
        'का उपयोग कर रहे हैं। हम अभी एक टेस्ट नेटवर्क का उपयोग कर रहे हैं, लेकिन यह मुख्य नेटवर्क पर भी बिल्कुल उसी तरह काम करेगा।',
      mainNetwork: 'मुख्य नेटवर्क',
    },
  },

  // Spanish
  es: {
    common: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse',
      pleaseLogin: 'Por favor inicia sesión',
    },
    home: {
      title: '¡Bienvenido!',
      subtitle: '¡Es un placer tenerte aquí!',
      greeting: '¡Bienvenido!',
      greetingSubtitle: '¡Relájate y disfruta de la vida!',
    },
    navigation: {
      settings: 'Configuración',
    },
    settings: {
      title: 'Configuración',
      loginRequired: 'Por favor inicia sesión para acceder a tu configuración',
    },
    header: {
      intro: 'Shebam es',
      faster: 'más rápido',
      and: 'y',
      cheaper: 'más barato',
      thanAnyExisting:
        'que CUALQUIER sistema de pago existente. Estamos usando un euro en cadena que está legalmente',
      onchainEuro: 'euro en cadena',
      legallyRegulated: 'regulado',
      testNetwork:
        '. Estamos usando una red de prueba ahora, pero funcionará exactamente igual en la red principal.',
      mainNetwork: 'red principal',
    },
  },

  // French
  fr: {
    common: {
      login: 'Connexion',
      logout: 'Déconnexion',
      register: "S'inscrire",
      pleaseLogin: 'Veuillez vous connecter',
    },
    home: {
      title: 'Bienvenue !',
      subtitle: "C'est un plaisir de vous avoir ici !",
      greeting: 'Bienvenue !',
      greetingSubtitle: 'Détendez-vous et profitez de la vie !',
    },
    navigation: {
      settings: 'Paramètres',
    },
    settings: {
      title: 'Paramètres',
      loginRequired: 'Veuillez vous connecter pour accéder à vos paramètres',
    },
    header: {
      intro: 'Shebam est',
      faster: 'plus rapide',
      and: 'et',
      cheaper: 'moins cher',
      thanAnyExisting:
        "que N'IMPORTE QUEL système de paiement existant. Nous utilisons un euro onchain qui est légalement",
      onchainEuro: 'euro en chaîne',
      legallyRegulated: 'réglementé',
      testNetwork:
        '. Nous utilisons un réseau de test pour le moment, mais ça fonctionnera exactement de la même manière sur le réseau principal.',
      mainNetwork: 'réseau principal',
    },
  },

  // Arabic
  ar: {
    common: {
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      register: 'التسجيل',
      pleaseLogin: 'الرجاء تسجيل الدخول',
    },
    home: {
      title: 'مرحباً!',
      subtitle: 'يسعدنا وجودك هنا!',
      greeting: 'مرحباً!',
      greetingSubtitle: 'استرخ واستمتع بالحياة!',
    },
    navigation: {
      settings: 'الإعدادات',
    },
    settings: {
      title: 'الإعدادات',
      loginRequired: 'يرجى تسجيل الدخول للوصول إلى إعداداتك',
    },
    header: {
      intro: 'Shebam',
      faster: 'أسرع',
      and: 'و',
      cheaper: 'أرخص',
      thanAnyExisting: 'من أي نظام دفع موجود. نحن نستخدم يورو على السلسلة',
      onchainEuro: 'يورو على السلسلة',
      legallyRegulated: 'منظم قانونياً',
      testNetwork:
        '. نحن نستخدم شبكة تجريبية الآن، لكنها ستعمل بنفس الطريقة تماماً على الشبكة الرئيسية.',
      mainNetwork: 'الشبكة الرئيسية',
    },
  },

  // Bengali
  bn: {
    common: {
      login: 'লগ ইন',
      logout: 'লগ আউট',
      register: 'নিবন্ধন করুন',
      pleaseLogin: 'অনুগ্রহ করে লগইন করুন',
    },
    home: {
      title: 'স্বাগতম!',
      subtitle: 'আপনাকে এখানে পেয়ে আনন্দিত!',
      greeting: 'স্বাগতম!',
      greetingSubtitle: 'আরাম করুন এবং জীবন উপভোগ করুন!',
    },
    navigation: {
      settings: 'সেটিংস',
    },
    settings: {
      title: 'সেটিংস',
      loginRequired: 'আপনার সেটিংস অ্যাক্সেস করতে অনুগ্রহ করে লগইন করুন',
    },
    header: {
      intro: 'Shebam',
      faster: 'দ্রুততর',
      and: 'এবং',
      cheaper: 'সস্তা',
      thanAnyExisting: 'যেকোনো বিদ্যমান পেমেন্ট সিস্টেম থেকে ভালো। আমরা একটি আইনত',
      onchainEuro: 'অনচেইন ইউরো',
      legallyRegulated: 'নিয়ন্ত্রিত',
      testNetwork:
        'ব্যবহার করছি। আমরা এখন একটি টেস্ট নেটওয়ার্ক ব্যবহার করছি, তবে এটি প্রধান নেটওয়ার্কে ঠিক একইভাবে কাজ করবে।',
      mainNetwork: 'প্রধান নেটওয়ার্ক',
    },
  },

  // Russian
  ru: {
    common: {
      login: 'Вход',
      logout: 'Выход',
      register: 'Регистрация',
      pleaseLogin: 'Пожалуйста, войдите',
    },
    home: {
      title: 'Добро пожаловать!',
      subtitle: 'Рады видеть вас здесь!',
      greeting: 'Добро пожаловать!',
      greetingSubtitle: 'Расслабьтесь и наслаждайтесь жизнью!',
    },
    navigation: {
      settings: 'Настройки',
    },
    settings: {
      title: 'Настройки',
      loginRequired: 'Пожалуйста, войдите, чтобы получить доступ к настройкам',
    },
    header: {
      intro: 'Shebam',
      faster: 'быстрее',
      and: 'и',
      cheaper: 'дешевле',
      thanAnyExisting:
        'чем ЛЮБАЯ существующая платежная система. Мы используем евро на блокчейне, которое законно',
      onchainEuro: 'евро на блокчейне',
      legallyRegulated: 'регулируется',
      testNetwork:
        '. Мы сейчас используем тестовую сеть, но в основной сети все будет работать точно так же.',
      mainNetwork: 'основная сеть',
    },
  },

  // Portuguese
  pt: {
    common: {
      login: 'Entrar',
      logout: 'Sair',
      register: 'Registrar',
      pleaseLogin: 'Por favor faça login',
    },
    home: {
      title: 'Bem-vindo!',
      subtitle: 'É um prazer tê-lo aqui!',
      greeting: 'Bem-vindo!',
      greetingSubtitle: 'Relaxe e aproveite a vida!',
    },
    navigation: {
      settings: 'Configurações',
    },
    settings: {
      title: 'Configurações',
      loginRequired: 'Por favor faça login para acessar suas configurações',
    },
    header: {
      intro: 'Shebam é',
      faster: 'mais rápido',
      and: 'e',
      cheaper: 'mais barato',
      thanAnyExisting:
        'do que QUALQUER sistema de pagamento existente. Estamos usando um euro na blockchain que é legalmente',
      onchainEuro: 'euro na blockchain',
      legallyRegulated: 'regulamentado',
      testNetwork:
        '. Estamos usando uma rede de teste agora, mas funcionará exatamente da mesma forma na rede principal.',
      mainNetwork: 'rede principal',
    },
  },

  // Urdu
  ur: {
    common: {
      login: 'لاگ ان',
      logout: 'لاگ آؤٹ',
      register: 'رجسٹر کریں',
      pleaseLogin: 'براہ کرم لاگ ان کریں',
    },
    home: {
      title: 'خوش آمدید!',
      subtitle: 'آپ کا یہاں ہونا خوشی کی بات ہے!',
      greeting: 'خوش آمدید!',
      greetingSubtitle: 'آرام کریں اور زندگی سے لطف اندوز ہوں!',
    },
    navigation: {
      settings: 'ترتیبات',
    },
    settings: {
      title: 'ترتیبات',
      loginRequired: 'اپنی ترتیبات تک رسائی کے لیے براہ کرم لاگ ان کریں',
    },
    header: {
      intro: 'Shebam',
      faster: 'تیز تر',
      and: 'اور',
      cheaper: 'سستا',
      thanAnyExisting:
        'کسی بھی موجودہ ادائیگی کے نظام سے بہتر ہے۔ ہم ایک آن چین یورو استعمال کر رہے ہیں جو قانونی طور پر',
      onchainEuro: 'آن چین یورو',
      legallyRegulated: 'منظم',
      testNetwork:
        'ہے۔ ہم ابھی ٹیسٹ نیٹ ورک استعمال کر رہے ہیں، لیکن یہ مرکزی نیٹ ورک پر بالکل اسی طرح کام کرے گا۔',
      mainNetwork: 'مرکزی نیٹ ورک',
    },
  },
}

/**
 * Get translations for the current language
 * @param language Current language code
 * @returns Translation object for the specified language
 */
export function getTranslations(language: Language) {
  return translations[language]
}

/**
 * Hook to use translations in components
 * @param language Current language code
 * @returns Translation object for the specified language
 */
export function useTranslations(language: Language) {
  return translations[language]
}
