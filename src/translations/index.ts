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
    heroTitle: string
    ctaButton: string
    feature1Title: string
    feature1Desc: string
    feature2Title: string
    feature2Desc: string
    feature3Title: string
    feature3Desc: string
    feature4Title: string
    feature4Desc: string
    feature5Title: string
    feature5Desc: string
    feature6Title: string
    feature6Desc: string
    comingSoonTitle: string
    comingSoon1: string
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
  onboarding: {
    settingUp: string
    deployingSafe: string
    safeDeployed: string
    enablingModule: string
    moduleEnabled: string
    creatingSessionKey: string
    sessionKeyCreated: string
    complete: string
    error: string
  }
  tx: {
    pageTitle: string
    pageSubtitle: string
    noSafeWallet: string
    deploySafeFirst: string
    goToSafeDashboard: string
    sendEUR: string
    receiveEUR: string
    balance: string
    sessionKey: string
    expires: string
    expired: string
    active: string
    sessionKeyExpired: string
    goToSafeToCreateKey: string
    noSessionKey: string
    createSessionKeyOnSafe: string
    recipientAddress: string
    recipientPlaceholder: string
    amountEUR: string
    amountPlaceholder: string
    send: string
    requestPayment: string
    refreshBalance: string
    copyAddress: string
    sendToSafeAddress: string
    safeAddress: string
    scanQROrCopy: string
    requestPaymentTitle: string
    amountToRequest: string
    scanQRToSendPayment: string
    loadingQR: string
    generateQR: string
    writeToNFC: string
    nfcNotAvailable: string
    cancel: string
    close: string
    insufficientBalance: string
    incomingPaymentRequest: string
    nfcWriteNotAvailable: string
    nfcWriteNotAvailableDesc: string
    nfcWritten: string
    nfcWrittenDesc: string
    nfcWriteFailed: string
    nfcPermissionDenied: string
    nfcNotSupported: string
    cannotReadNFC: string
    operationCanceled: string
    noNFCTagDetected: string
    pleaseWait: string
    transactionInProgress: string
    error: string
    fillAllFields: string
    sessionKeyExpiredDesc: string
    paid: string
    paidDesc: string
    sent: string
    verifiedIn: string
    connectionError: string
    lostConnection: string
    transactionFailed: string
    failedToGenerateQR: string
    copied: string
    addressCopied: string
    invalidAmount: string
    invalidAmountDesc: string
    nfcTooltip: string
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
      heroTitle: 'Shebam!',
      ctaButton: 'Try it now',
      feature1Title: '100% Free to use (forever)',
      feature1Desc: 'No fees, no subscriptions, no hidden costs',
      feature2Title: 'Super easy to use',
      feature2Desc: 'QR code, NFC - payment in seconds',
      feature3Title: 'Faster than any other payment system',
      feature3Desc: 'Verified in less than 1 second',
      feature4Title: 'Flexible (session keys)',
      feature4Desc: 'Set spending limits and expiry times',
      feature5Title: 'Military-grade secure',
      feature5Desc: 'w3pk + Safe wallet protection',
      feature6Title: 'Legally regulated',
      feature6Desc: 'Compliant onchain euro (EURe)',
      comingSoonTitle: 'Soon',
      comingSoon1: 'Anonymous payment',
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
    onboarding: {
      settingUp: 'Setting up your account',
      deployingSafe: 'Deploying your onchain Safe...',
      safeDeployed: 'Onchain Safe deployed',
      enablingModule: 'Enabling session key module...',
      moduleEnabled: 'Session key module enabled',
      creatingSessionKey: 'Creating session key...',
      sessionKeyCreated: 'Session key created',
      complete: 'Setup complete!',
      error: 'An error occurred during setup',
    },
    tx: {
      pageTitle: 'Payment',
      pageSubtitle: 'Send and receive EUR',
      noSafeWallet: 'No Safe Wallet',
      deploySafeFirst: 'Please deploy a Safe wallet first on the /safe page',
      goToSafeDashboard: 'Go to Safe Dashboard',
      sendEUR: 'Send EUR',
      receiveEUR: 'Receive EUR',
      balance: 'Balance:',
      sessionKey: 'Session Key:',
      expires: 'Expires:',
      expired: 'Expired',
      active: 'Active',
      sessionKeyExpired: 'Session Key Expired',
      goToSafeToCreateKey: 'Go to /safe to create a new session key',
      noSessionKey: 'No Session Key',
      createSessionKeyOnSafe: 'Create a session key on /safe to send transactions',
      recipientAddress: 'Recipient Address',
      recipientPlaceholder: '0x...',
      amountEUR: 'Amount (EUR)',
      amountPlaceholder: '1',
      send: 'Send',
      requestPayment: 'Request Payment',
      refreshBalance: 'Refresh balance',
      copyAddress: 'Copy address',
      sendToSafeAddress: 'Send EUR to your Safe wallet address:',
      safeAddress: 'Safe Address:',
      scanQROrCopy: 'Scan QR code or copy address to receive funds',
      requestPaymentTitle: 'Request Payment',
      amountToRequest: 'Amount to Request (EUR)',
      scanQRToSendPayment: 'Scan this QR code to send payment',
      loadingQR: 'Loading QR code...',
      generateQR: 'Generate QR',
      writeToNFC: 'Write to NFC',
      nfcNotAvailable: 'NFC Not Available',
      cancel: 'Cancel',
      close: 'Close',
      insufficientBalance: 'Insufficient balance',
      incomingPaymentRequest: 'Incoming payment request detected. Would you like to proceed?',
      nfcWriteNotAvailable: 'NFC Write Not Available',
      nfcWriteNotAvailableDesc:
        'NFC writing requires HTTPS, Android device, Chrome browser, and NDEFWriter API support. Visit /nfc to troubleshoot.',
      nfcWritten: '✅ NFC Written!',
      nfcWrittenDesc: 'Hold the tag near your phone to pay.',
      nfcWriteFailed: 'NFC Write Failed',
      nfcPermissionDenied:
        'NFC permission denied. Please allow NFC access in your browser settings.',
      nfcNotSupported: 'NFC is not supported on this device.',
      cannotReadNFC: 'Cannot read NFC tag. Try again.',
      operationCanceled: 'Operation canceled.',
      noNFCTagDetected: 'No NFC tag detected. Try again.',
      pleaseWait: 'Please wait',
      transactionInProgress:
        'A transaction is already being processed or recently sent. Please wait before sending another.',
      error: 'Error',
      fillAllFields: 'Please fill in all fields and create a session key first',
      sessionKeyExpiredDesc: 'Please create a new session key on the /safe page',
      paid: '✅ Paid!',
      paidDesc: 'You received {amount} EUR from {address}...',
      sent: '✅ Sent!',
      verifiedIn: 'Verified in {duration}s',
      connectionError: 'Connection Error',
      lostConnection: 'Lost connection to transaction status',
      transactionFailed: 'Transaction Failed',
      failedToGenerateQR: 'Failed to generate QR code data.',
      copied: 'Copied!',
      addressCopied: 'Address copied to clipboard',
      invalidAmount: 'Invalid Amount',
      invalidAmountDesc: 'Please enter a valid EUR amount.',
      nfcTooltip:
        'NFC write requires HTTPS, Android device, Chrome browser, and NDEFWriter API support. Some devices may have restricted NFC write access.',
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
      heroTitle: 'Shebam!',
      ctaButton: '立即试用',
      feature1Title: '100% 永久免费使用',
      feature1Desc: '无费用、无订阅、无隐藏成本',
      feature2Title: '超级易用',
      feature2Desc: '二维码、NFC - 秒级支付',
      feature3Title: '比任何其他支付系统都快',
      feature3Desc: '不到1秒即可验证',
      feature4Title: '灵活（会话密钥）',
      feature4Desc: '设置支出限额和到期时间',
      feature5Title: '军事级安全',
      feature5Desc: 'w3pk + Safe 钱包保护',
      feature6Title: '合法监管',
      feature6Desc: '合规的链上欧元（EURe）',
      comingSoonTitle: '即将推出',
      comingSoon1: '匿名支付',
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
    onboarding: {
      settingUp: '设置您的账户',
      deployingSafe: '正在部署您的链上Safe...',
      safeDeployed: '链上Safe已部署',
      enablingModule: '正在启用会话密钥模块...',
      moduleEnabled: '会话密钥模块已启用',
      creatingSessionKey: '正在创建会话密钥...',
      sessionKeyCreated: '会话密钥已创建',
      complete: '设置完成！',
      error: '设置过程中发生错误',
    },
    tx: {
      pageTitle: '支付',
      pageSubtitle: '发送和接收欧元',
      noSafeWallet: '没有Safe钱包',
      deploySafeFirst: '请先在/safe页面部署Safe钱包',
      goToSafeDashboard: '转到Safe仪表板',
      sendEUR: '发送欧元',
      receiveEUR: '接收欧元',
      balance: '余额：',
      sessionKey: '会话密钥：',
      expires: '到期时间：',
      expired: '已过期',
      active: '活跃',
      sessionKeyExpired: '会话密钥已过期',
      goToSafeToCreateKey: '前往/safe创建新的会话密钥',
      noSessionKey: '没有会话密钥',
      createSessionKeyOnSafe: '在/safe上创建会话密钥以发送交易',
      recipientAddress: '接收地址',
      recipientPlaceholder: '0x...',
      amountEUR: '金额（欧元）',
      amountPlaceholder: '1',
      send: '发送',
      requestPayment: '请求付款',
      refreshBalance: '刷新余额',
      copyAddress: '复制地址',
      sendToSafeAddress: '发送欧元到您的Safe钱包地址：',
      safeAddress: 'Safe地址：',
      scanQROrCopy: '扫描二维码或复制地址以接收资金',
      requestPaymentTitle: '请求付款',
      amountToRequest: '请求金额（欧元）',
      scanQRToSendPayment: '扫描此二维码发送付款',
      loadingQR: '正在加载二维码...',
      generateQR: '生成二维码',
      writeToNFC: '写入NFC',
      nfcNotAvailable: 'NFC不可用',
      cancel: '取消',
      close: '关闭',
      insufficientBalance: '余额不足',
      incomingPaymentRequest: '检测到传入付款请求。您要继续吗？',
      nfcWriteNotAvailable: 'NFC写入不可用',
      nfcWriteNotAvailableDesc:
        'NFC写入需要HTTPS、Android设备、Chrome浏览器和NDEFWriter API支持。访问/nfc进行故障排除。',
      nfcWritten: '✅ NFC写入成功！',
      nfcWrittenDesc: '将标签靠近手机以付款。',
      nfcWriteFailed: 'NFC写入失败',
      nfcPermissionDenied: 'NFC权限被拒绝。请在浏览器设置中允许NFC访问。',
      nfcNotSupported: '此设备不支持NFC。',
      cannotReadNFC: '无法读取NFC标签。请重试。',
      operationCanceled: '操作已取消。',
      noNFCTagDetected: '未检测到NFC标签。请重试。',
      pleaseWait: '请稍候',
      transactionInProgress: '交易正在处理或最近已发送。请等待后再发送另一笔交易。',
      error: '错误',
      fillAllFields: '请填写所有字段并首先创建会话密钥',
      sessionKeyExpiredDesc: '请在/safe页面创建新的会话密钥',
      paid: '✅ 已付款！',
      paidDesc: '您从{address}...收到了{amount}欧元',
      sent: '✅ 已发送！',
      verifiedIn: '在{duration}秒内验证',
      connectionError: '连接错误',
      lostConnection: '失去与交易状态的连接',
      transactionFailed: '交易失败',
      failedToGenerateQR: '生成二维码数据失败。',
      copied: '已复制！',
      addressCopied: '地址已复制到剪贴板',
      invalidAmount: '无效金额',
      invalidAmountDesc: '请输入有效的欧元金额。',
      nfcTooltip:
        'NFC写入需要HTTPS、Android设备、Chrome浏览器和NDEFWriter API支持。某些设备可能限制了NFC写入访问。',
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
      heroTitle: 'Shebam!',
      ctaButton: 'अभी आज़माएं',
      feature1Title: '100% मुफ्त उपयोग (हमेशा के लिए)',
      feature1Desc: 'कोई शुल्क नहीं, कोई सदस्यता नहीं, कोई छिपी लागत नहीं',
      feature2Title: 'उपयोग में बेहद आसान',
      feature2Desc: 'QR कोड, NFC - सेकंडों में भुगतान',
      feature3Title: 'किसी भी अन्य भुगतान प्रणाली से तेज़',
      feature3Desc: '1 सेकंड से कम में सत्यापित',
      feature4Title: 'लचीला (सत्र कुंजी)',
      feature4Desc: 'खर्च सीमा और समाप्ति समय निर्धारित करें',
      feature5Title: 'सैन्य-ग्रेड सुरक्षित',
      feature5Desc: 'w3pk + Safe वॉलेट सुरक्षा',
      feature6Title: 'कानूनी रूप से विनियमित',
      feature6Desc: 'अनुपालन ऑनचेन यूरो (EURe)',
      comingSoonTitle: 'जल्द ही',
      comingSoon1: 'गुमनाम भुगतान',
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
    onboarding: {
      settingUp: 'अपना खाता सेट अप करना',
      deployingSafe: 'आपका ऑनचेन Safe तैनात किया जा रहा है...',
      safeDeployed: 'ऑनचेन Safe तैनात हो गया',
      enablingModule: 'सत्र कुंजी मॉड्यूल सक्षम किया जा रहा है...',
      moduleEnabled: 'सत्र कुंजी मॉड्यूल सक्षम हो गया',
      creatingSessionKey: 'सत्र कुंजी बनाई जा रही है...',
      sessionKeyCreated: 'सत्र कुंजी बन गई',
      complete: 'सेटअप पूर्ण हो गया!',
      error: 'सेटअप के दौरान एक त्रुटि हुई',
    },
    tx: {
      pageTitle: 'भुगतान',
      pageSubtitle: 'EUR भेजें और प्राप्त करें',
      noSafeWallet: 'कोई Safe वॉलेट नहीं',
      deploySafeFirst: 'कृपया पहले /safe पेज पर Safe वॉलेट तैनात करें',
      goToSafeDashboard: 'Safe डैशबोर्ड पर जाएं',
      sendEUR: 'EUR भेजें',
      receiveEUR: 'EUR प्राप्त करें',
      balance: 'शेष राशि:',
      sessionKey: 'सत्र कुंजी:',
      expires: 'समाप्ति:',
      expired: 'समाप्त हो गई',
      active: 'सक्रिय',
      sessionKeyExpired: 'सत्र कुंजी समाप्त हो गई',
      goToSafeToCreateKey: 'नई सत्र कुंजी बनाने के लिए /safe पर जाएं',
      noSessionKey: 'कोई सत्र कुंजी नहीं',
      createSessionKeyOnSafe: 'लेनदेन भेजने के लिए /safe पर सत्र कुंजी बनाएं',
      recipientAddress: 'प्राप्तकर्ता का पता',
      recipientPlaceholder: '0x...',
      amountEUR: 'राशि (EUR)',
      amountPlaceholder: '1',
      send: 'भेजें',
      requestPayment: 'भुगतान का अनुरोध करें',
      refreshBalance: 'शेष राशि रीफ्रेश करें',
      copyAddress: 'पता कॉपी करें',
      sendToSafeAddress: 'अपने Safe वॉलेट पते पर EUR भेजें:',
      safeAddress: 'Safe पता:',
      scanQROrCopy: 'धन प्राप्त करने के लिए QR कोड स्कैन करें या पता कॉपी करें',
      requestPaymentTitle: 'भुगतान का अनुरोध करें',
      amountToRequest: 'अनुरोध राशि (EUR)',
      scanQRToSendPayment: 'भुगतान भेजने के लिए इस QR कोड को स्कैन करें',
      loadingQR: 'QR कोड लोड हो रहा है...',
      generateQR: 'QR बनाएं',
      writeToNFC: 'NFC पर लिखें',
      nfcNotAvailable: 'NFC उपलब्ध नहीं',
      cancel: 'रद्द करें',
      close: 'बंद करें',
      insufficientBalance: 'अपर्याप्त शेष राशि',
      incomingPaymentRequest: 'आने वाला भुगतान अनुरोध पाया गया। क्या आप जारी रखना चाहते हैं?',
      nfcWriteNotAvailable: 'NFC लिखना उपलब्ध नहीं',
      nfcWriteNotAvailableDesc:
        'NFC लिखने के लिए HTTPS, Android डिवाइस, Chrome ब्राउज़र और NDEFWriter API समर्थन की आवश्यकता होती है। समस्या निवारण के लिए /nfc पर जाएं।',
      nfcWritten: '✅ NFC लिखा गया!',
      nfcWrittenDesc: 'भुगतान करने के लिए टैग को अपने फोन के पास रखें।',
      nfcWriteFailed: 'NFC लिखना विफल',
      nfcPermissionDenied:
        'NFC अनुमति अस्वीकृत। कृपया अपनी ब्राउज़र सेटिंग्स में NFC एक्सेस की अनुमति दें।',
      nfcNotSupported: 'इस डिवाइस पर NFC समर्थित नहीं है।',
      cannotReadNFC: 'NFC टैग नहीं पढ़ सकते। पुनः प्रयास करें।',
      operationCanceled: 'ऑपरेशन रद्द किया गया।',
      noNFCTagDetected: 'कोई NFC टैग नहीं मिला। पुनः प्रयास करें।',
      pleaseWait: 'कृपया प्रतीक्षा करें',
      transactionInProgress:
        'एक लेनदेन पहले से ही प्रोसेस हो रहा है या हाल ही में भेजा गया है। दूसरा भेजने से पहले कृपया प्रतीक्षा करें।',
      error: 'त्रुटि',
      fillAllFields: 'कृपया सभी फ़ील्ड भरें और पहले सत्र कुंजी बनाएं',
      sessionKeyExpiredDesc: 'कृपया /safe पेज पर नई सत्र कुंजी बनाएं',
      paid: '✅ भुगतान हो गया!',
      paidDesc: 'आपको {address}... से {amount} EUR प्राप्त हुए',
      sent: '✅ भेज दिया गया!',
      verifiedIn: '{duration} सेकंड में सत्यापित',
      connectionError: 'कनेक्शन त्रुटि',
      lostConnection: 'लेनदेन स्थिति से कनेक्शन खो गया',
      transactionFailed: 'लेनदेन विफल',
      failedToGenerateQR: 'QR कोड डेटा बनाने में विफल।',
      copied: 'कॉपी किया गया!',
      addressCopied: 'पता क्लिपबोर्ड पर कॉपी किया गया',
      invalidAmount: 'अवैध राशि',
      invalidAmountDesc: 'कृपया वैध EUR राशि दर्ज करें।',
      nfcTooltip:
        'NFC लिखने के लिए HTTPS, Android डिवाइस, Chrome ब्राउज़र और NDEFWriter API समर्थन की आवश्यकता होती है। कुछ उपकरणों पर NFC लेखन पहुंच प्रतिबंधित हो सकती है।',
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
      heroTitle: '¡Shebam!',
      ctaButton: 'Pruébalo ahora',
      feature1Title: '100% Gratis de usar (para siempre)',
      feature1Desc: 'Sin tarifas, sin suscripciones, sin costos ocultos',
      feature2Title: 'Súper fácil de usar',
      feature2Desc: 'Código QR, NFC - pago en segundos',
      feature3Title: 'Más rápido que cualquier otro sistema de pago',
      feature3Desc: 'Verificado en menos de 1 segundo',
      feature4Title: 'Flexible (claves de sesión)',
      feature4Desc: 'Establece límites de gasto y tiempos de expiración',
      feature5Title: 'Seguridad de grado militar',
      feature5Desc: 'Protección w3pk + Safe wallet',
      feature6Title: 'Legalmente regulado',
      feature6Desc: 'Euro en cadena conforme (EURe)',
      comingSoonTitle: 'Próximamente',
      comingSoon1: 'Pago anónimo',
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
    onboarding: {
      settingUp: 'Configurando tu cuenta',
      deployingSafe: 'Desplegando tu Safe en cadena...',
      safeDeployed: 'Safe en cadena desplegada',
      enablingModule: 'Habilitando módulo de clave de sesión...',
      moduleEnabled: 'Módulo de clave de sesión habilitado',
      creatingSessionKey: 'Creando clave de sesión...',
      sessionKeyCreated: 'Clave de sesión creada',
      complete: '¡Configuración completada!',
      error: 'Ocurrió un error durante la configuración',
    },
    tx: {
      pageTitle: 'Pago',
      pageSubtitle: 'Envía y recibe EUR',
      noSafeWallet: 'Sin cartera Safe',
      deploySafeFirst: 'Por favor, implementa primero una cartera Safe en la página /safe',
      goToSafeDashboard: 'Ir al panel de Safe',
      sendEUR: 'Enviar EUR',
      receiveEUR: 'Recibir EUR',
      balance: 'Saldo:',
      sessionKey: 'Clave de sesión:',
      expires: 'Vence:',
      expired: 'Vencida',
      active: 'Activa',
      sessionKeyExpired: 'Clave de sesión vencida',
      goToSafeToCreateKey: 'Ve a /safe para crear una nueva clave de sesión',
      noSessionKey: 'Sin clave de sesión',
      createSessionKeyOnSafe: 'Crea una clave de sesión en /safe para enviar transacciones',
      recipientAddress: 'Dirección del destinatario',
      recipientPlaceholder: '0x...',
      amountEUR: 'Cantidad (EUR)',
      amountPlaceholder: '1',
      send: 'Enviar',
      requestPayment: 'Solicitar pago',
      refreshBalance: 'Actualizar saldo',
      copyAddress: 'Copiar dirección',
      sendToSafeAddress: 'Envía EUR a tu dirección de cartera Safe:',
      safeAddress: 'Dirección Safe:',
      scanQROrCopy: 'Escanea el código QR o copia la dirección para recibir fondos',
      requestPaymentTitle: 'Solicitar pago',
      amountToRequest: 'Cantidad a solicitar (EUR)',
      scanQRToSendPayment: 'Escanea este código QR para enviar el pago',
      loadingQR: 'Cargando código QR...',
      generateQR: 'Generar QR',
      writeToNFC: 'Escribir en NFC',
      nfcNotAvailable: 'NFC no disponible',
      cancel: 'Cancelar',
      close: 'Cerrar',
      insufficientBalance: 'Saldo insuficiente',
      incomingPaymentRequest: 'Se detectó una solicitud de pago entrante. ¿Deseas continuar?',
      nfcWriteNotAvailable: 'Escritura NFC no disponible',
      nfcWriteNotAvailableDesc:
        'La escritura NFC requiere HTTPS, dispositivo Android, navegador Chrome y soporte de API NDEFWriter. Visita /nfc para solucionar problemas.',
      nfcWritten: '✅ ¡NFC escrito!',
      nfcWrittenDesc: 'Acerca la etiqueta a tu teléfono para pagar.',
      nfcWriteFailed: 'Fallo en escritura NFC',
      nfcPermissionDenied:
        'Permiso NFC denegado. Por favor, permite el acceso NFC en la configuración de tu navegador.',
      nfcNotSupported: 'NFC no es compatible con este dispositivo.',
      cannotReadNFC: 'No se puede leer la etiqueta NFC. Intenta de nuevo.',
      operationCanceled: 'Operación cancelada.',
      noNFCTagDetected: 'Ninguna etiqueta NFC detectada. Intenta de nuevo.',
      pleaseWait: 'Por favor, espera',
      transactionInProgress:
        'Una transacción ya está siendo procesada o fue enviada recientemente. Por favor, espera antes de enviar otra.',
      error: 'Error',
      fillAllFields: 'Por favor, completa todos los campos y crea una clave de sesión primero',
      sessionKeyExpiredDesc: 'Por favor, crea una nueva clave de sesión en la página /safe',
      paid: '✅ ¡Pagado!',
      paidDesc: 'Recibiste {amount} EUR de {address}...',
      sent: '✅ ¡Enviado!',
      verifiedIn: 'Verificado en {duration}s',
      connectionError: 'Error de conexión',
      lostConnection: 'Se perdió la conexión con el estado de la transacción',
      transactionFailed: 'Transacción fallida',
      failedToGenerateQR: 'No se pudo generar los datos del código QR.',
      copied: '¡Copiado!',
      addressCopied: 'Dirección copiada al portapapeles',
      invalidAmount: 'Cantidad inválida',
      invalidAmountDesc: 'Por favor, introduce una cantidad EUR válida.',
      nfcTooltip:
        'La escritura NFC requiere HTTPS, dispositivo Android, navegador Chrome y soporte de API NDEFWriter. Algunos dispositivos pueden tener restringido el acceso de escritura NFC.',
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
      heroTitle: 'Shebam !',
      ctaButton: "C'est parti !",
      feature1Title: '100% gratuit (forever)',
      feature1Desc: "Pas de frais, pas d'abonnement, pas de coûts cachés",
      feature2Title: 'Super facile à utiliser',
      feature2Desc: 'Code QR, NFC',
      feature3Title: "Plus rapide que n'importe quel autre système de paiement",
      feature3Desc: "Vérifié en moins d'une seconde",
      feature4Title: 'Flexible (clés de session)',
      feature4Desc: "Définissez des limites de dépenses et des délais d'expiration",
      feature5Title: 'Sécurité de niveau militaire',
      feature5Desc: 'Protection w3pk + Safe wallet',
      feature6Title: 'Légalement réglementé',
      feature6Desc: 'Euro onchain conforme (EURe)',
      comingSoonTitle: 'Bientôt',
      comingSoon1: 'Paiement anonyme',
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
    onboarding: {
      settingUp: 'Configuration de votre compte',
      deployingSafe: 'Déploiement de votre Safe en chaîne...',
      safeDeployed: 'Safe en chaîne déployé',
      enablingModule: 'Activation du module de clé de session...',
      moduleEnabled: 'Module de clé de session activé',
      creatingSessionKey: 'Création de la clé de session...',
      sessionKeyCreated: 'Clé de session créée',
      complete: 'Configuration terminée !',
      error: 'Une erreur est survenue lors de la configuration',
    },
    tx: {
      pageTitle: 'Paiement',
      pageSubtitle: 'Envoyer et recevoir des EUR',
      noSafeWallet: 'Pas de portefeuille Safe',
      deploySafeFirst: "Veuillez déployer d'abord un portefeuille Safe sur la page /safe",
      goToSafeDashboard: 'Aller au tableau de bord Safe',
      sendEUR: 'Envoyer',
      receiveEUR: 'Recevoir',
      balance: 'Solde:',
      sessionKey: 'Session:',
      expires: 'Expire:',
      expired: 'Expiré',
      active: 'Actif',
      sessionKeyExpired: 'Clé de session expirée',
      goToSafeToCreateKey: 'Allez à /safe pour créer une nouvelle clé de session',
      noSessionKey: 'Pas de clé de session',
      createSessionKeyOnSafe: 'Créez une clé de session sur /safe pour envoyer des transactions',
      recipientAddress: 'Adresse du destinataire',
      recipientPlaceholder: '0x...',
      amountEUR: 'Montant (EUR)',
      amountPlaceholder: '1',
      send: 'Envoyer',
      requestPayment: 'Demander un paiement',
      refreshBalance: 'Actualiser le solde',
      copyAddress: "Copier l'adresse",
      sendToSafeAddress: 'Adresse de votre Safe (QR code):',
      safeAddress: 'Adresse de votre Safe:',
      scanQROrCopy: "Scannez le code QR ou copiez l'adresse pour recevoir des fonds",
      requestPaymentTitle: 'Demander un paiement',
      amountToRequest: 'Montant à demander (EUR)',
      scanQRToSendPayment: 'Scannez ce code QR pour envoyer le paiement',
      loadingQR: 'Chargement du code QR...',
      generateQR: 'Générer QR',
      writeToNFC: 'Écrire sur NFC',
      nfcNotAvailable: 'NFC non disponible',
      cancel: 'Annuler',
      close: 'Fermer',
      insufficientBalance: 'Solde insuffisant',
      incomingPaymentRequest: 'Demande de paiement entrante détectée. Voulez-vous continuer?',
      nfcWriteNotAvailable: 'Écriture NFC non disponible',
      nfcWriteNotAvailableDesc:
        "L'écriture NFC nécessite HTTPS, un appareil Android, le navigateur Chrome et le support de l'API NDEFWriter. Visitez /nfc pour dépanner.",
      nfcWritten: '✅ NFC écrit!',
      nfcWrittenDesc: "Tenez l'étiquette près de votre téléphone pour payer.",
      nfcWriteFailed: "Échec de l'écriture NFC",
      nfcPermissionDenied:
        "Permission NFC refusée. Veuillez permettre l'accès NFC dans les paramètres de votre navigateur.",
      nfcNotSupported: "NFC n'est pas pris en charge sur cet appareil.",
      cannotReadNFC: "Impossible de lire l'étiquette NFC. Réessayez.",
      operationCanceled: 'Opération annulée.',
      noNFCTagDetected: 'Aucune étiquette NFC détectée. Réessayez.',
      pleaseWait: 'Veuillez patienter',
      transactionInProgress:
        "Une transaction est déjà en cours de traitement ou a été envoyée récemment. Veuillez patienter avant d'en envoyer une autre.",
      error: 'Erreur',
      fillAllFields: "Veuillez remplir tous les champs et créer d'abord une clé de session",
      sessionKeyExpiredDesc: 'Veuillez créer une nouvelle clé de session sur la page /safe',
      paid: '✅ Payé!',
      paidDesc: 'Vous avez reçu {amount} EUR de {address}...',
      sent: '✅ Envoyé!',
      verifiedIn: 'Vérifié dans {duration}s',
      connectionError: 'Erreur de connexion',
      lostConnection: "Connexion perdue à l'état de la transaction",
      transactionFailed: 'Échec de la transaction',
      failedToGenerateQR: 'Impossible de générer les données du code QR.',
      copied: 'Copié!',
      addressCopied: 'Adresse copiée dans le presse-papiers',
      invalidAmount: 'Montant invalide',
      invalidAmountDesc: 'Veuillez entrer un montant EUR valide.',
      nfcTooltip:
        "L'écriture NFC nécessite HTTPS, un appareil Android, le navigateur Chrome et le support de l'API NDEFWriter. Certains appareils peuvent avoir l'accès en écriture NFC restreint.",
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
      heroTitle: 'Shebam!',
      ctaButton: 'جربه الآن',
      feature1Title: '100% مجاني للاستخدام (للأبد)',
      feature1Desc: 'لا رسوم، لا اشتراكات، لا تكاليف خفية',
      feature2Title: 'سهل الاستخدام للغاية',
      feature2Desc: 'رمز QR، NFC - الدفع في ثوانٍ',
      feature3Title: 'أسرع من أي نظام دفع آخر',
      feature3Desc: 'يتم التحقق في أقل من ثانية واحدة',
      feature4Title: 'مرن (مفاتيح الجلسة)',
      feature4Desc: 'حدد حدود الإنفاق وأوقات انتهاء الصلاحية',
      feature5Title: 'آمن بدرجة عسكرية',
      feature5Desc: 'حماية w3pk + Safe wallet',
      feature6Title: 'منظم قانونياً',
      feature6Desc: 'يورو على السلسلة متوافق (EURe)',
      comingSoonTitle: 'قريباً',
      comingSoon1: 'دفع مجهول',
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
    onboarding: {
      settingUp: 'إعداد حسابك',
      deployingSafe: 'نشر Safe الخاص بك على السلسلة...',
      safeDeployed: 'تم نشر Safe على السلسلة',
      enablingModule: 'تمكين وحدة مفتاح الجلسة...',
      moduleEnabled: 'تم تمكين وحدة مفتاح الجلسة',
      creatingSessionKey: 'إنشاء مفتاح الجلسة...',
      sessionKeyCreated: 'تم إنشاء مفتاح الجلسة',
      complete: 'اكتمل الإعداد!',
      error: 'حدث خطأ أثناء الإعداد',
    },
    tx: {
      pageTitle: 'الدفع',
      pageSubtitle: 'إرسال واستقبال EUR',
      noSafeWallet: 'لا توجد محفظة Safe',
      deploySafeFirst: 'يرجى نشر محفظة Safe أولاً على صفحة /safe',
      goToSafeDashboard: 'انتقل إلى لوحة تحكم Safe',
      sendEUR: 'إرسال EUR',
      receiveEUR: 'استقبال EUR',
      balance: 'الرصيد:',
      sessionKey: 'مفتاح الجلسة:',
      expires: 'ينتهي في:',
      expired: 'منتهية الصلاحية',
      active: 'نشط',
      sessionKeyExpired: 'مفتاح الجلسة منتهي الصلاحية',
      goToSafeToCreateKey: 'انتقل إلى /safe لإنشاء مفتاح جلسة جديد',
      noSessionKey: 'لا يوجد مفتاح جلسة',
      createSessionKeyOnSafe: 'أنشئ مفتاح جلسة على /safe لإرسال المعاملات',
      recipientAddress: 'عنوان المتلقي',
      recipientPlaceholder: '0x...',
      amountEUR: 'المبلغ (EUR)',
      amountPlaceholder: '1',
      send: 'إرسال',
      requestPayment: 'طلب دفع',
      refreshBalance: 'تحديث الرصيد',
      copyAddress: 'نسخ العنوان',
      sendToSafeAddress: 'أرسل EUR إلى عنوان محفظة Safe الخاص بك:',
      safeAddress: 'عنوان Safe:',
      scanQROrCopy: 'امسح رمز QR أو انسخ العنوان لاستقبال الأموال',
      requestPaymentTitle: 'طلب دفع',
      amountToRequest: 'المبلغ المطلوب (EUR)',
      scanQRToSendPayment: 'امسح رمز QR هذا لإرسال الدفع',
      loadingQR: 'جاري تحميل رمز QR...',
      generateQR: 'توليد QR',
      writeToNFC: 'الكتابة إلى NFC',
      nfcNotAvailable: 'NFC غير متاح',
      cancel: 'إلغاء',
      close: 'إغلاق',
      insufficientBalance: 'رصيد غير كافي',
      incomingPaymentRequest: 'تم الكشف عن طلب دفع وارد. هل تريد المتابعة؟',
      nfcWriteNotAvailable: 'كتابة NFC غير متاحة',
      nfcWriteNotAvailableDesc:
        'تتطلب كتابة NFC HTTPS وجهاز Android ومتصفح Chrome ودعم NDEFWriter API. قم بزيارة /nfc لحل المشاكل.',
      nfcWritten: '✅ تم الكتابة إلى NFC!',
      nfcWrittenDesc: 'امسك العلامة بالقرب من هاتفك للدفع.',
      nfcWriteFailed: 'فشل الكتابة إلى NFC',
      nfcPermissionDenied: 'تم رفض إذن NFC. يرجى السماح بوصول NFC في إعدادات المتصفح الخاص بك.',
      nfcNotSupported: 'NFC غير مدعوم على هذا الجهاز.',
      cannotReadNFC: 'لا يمكن قراءة علامة NFC. حاول مرة أخرى.',
      operationCanceled: 'تم إلغاء العملية.',
      noNFCTagDetected: 'لم يتم الكشف عن علامة NFC. حاول مرة أخرى.',
      pleaseWait: 'يرجى الانتظار',
      transactionInProgress:
        'تتم معالجة معاملة بالفعل أو تم إرسالها مؤخراً. يرجى الانتظار قبل إرسال معاملة أخرى.',
      error: 'خطأ',
      fillAllFields: 'يرجى ملء جميع الحقول وإنشاء مفتاح جلسة أولاً',
      sessionKeyExpiredDesc: 'يرجى إنشاء مفتاح جلسة جديد على صفحة /safe',
      paid: '✅ تم الدفع!',
      paidDesc: 'لقد استقبلت {amount} EUR من {address}...',
      sent: '✅ تم الإرسال!',
      verifiedIn: 'تم التحقق من خلال {duration}s',
      connectionError: 'خطأ في الاتصال',
      lostConnection: 'فقدان الاتصال بحالة المعاملة',
      transactionFailed: 'فشلت المعاملة',
      failedToGenerateQR: 'فشل توليد بيانات رمز QR.',
      copied: 'تم النسخ!',
      addressCopied: 'تم نسخ العنوان إلى الحافظة',
      invalidAmount: 'مبلغ غير صحيح',
      invalidAmountDesc: 'يرجى إدخال مبلغ EUR صحيح.',
      nfcTooltip:
        'تتطلب كتابة NFC HTTPS وجهاز Android ومتصفح Chrome ودعم NDEFWriter API. قد تقيد بعض الأجهزة وصول كتابة NFC.',
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
      heroTitle: 'Shebam!',
      ctaButton: 'এখনই চেষ্টা করুন',
      feature1Title: '100% বিনামূল্যে ব্যবহার (চিরতরে)',
      feature1Desc: 'কোনো ফি নেই, কোনো সাবস্ক্রিপশন নেই, কোনো লুকানো খরচ নেই',
      feature2Title: 'ব্যবহার করা অত্যন্ত সহজ',
      feature2Desc: 'QR কোড, NFC - সেকেন্ডে পেমেন্ট',
      feature3Title: 'অন্য যেকোনো পেমেন্ট সিস্টেম থেকে দ্রুততর',
      feature3Desc: '1 সেকেন্ডেরও কম সময়ে যাচাই করা হয়',
      feature4Title: 'নমনীয় (সেশন কী)',
      feature4Desc: 'খরচের সীমা এবং মেয়াদ শেষের সময় নির্ধারণ করুন',
      feature5Title: 'সামরিক-গ্রেড নিরাপত্তা',
      feature5Desc: 'w3pk + Safe ওয়ালেট সুরক্ষা',
      feature6Title: 'আইনত নিয়ন্ত্রিত',
      feature6Desc: 'অনুগত অনচেইন ইউরো (EURe)',
      comingSoonTitle: 'শীঘ্রই আসছে',
      comingSoon1: 'বেনামী পেমেন্ট',
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
    onboarding: {
      settingUp: 'আপনার অ্যাকাউন্ট সেট আপ করা হচ্ছে',
      deployingSafe: 'আপনার অনচেইন Safe ডিপ্লয় করা হচ্ছে...',
      safeDeployed: 'অনচেইন Safe ডিপ্লয় হয়েছে',
      enablingModule: 'সেশন কী মডিউল সক্ষম করা হচ্ছে...',
      moduleEnabled: 'সেশন কী মডিউল সক্ষম হয়েছে',
      creatingSessionKey: 'সেশন কী তৈরি করা হচ্ছে...',
      sessionKeyCreated: 'সেশন কী তৈরি হয়েছে',
      complete: 'সেটআপ সম্পন্ন হয়েছে!',
      error: 'সেটআপের সময় একটি ত্রুটি ঘটেছে',
    },
    tx: {
      pageTitle: 'পেমেন্ট',
      pageSubtitle: 'EUR পাঠান এবং গ্রহণ করুন',
      noSafeWallet: 'কোনো Safe ওয়ালেট নেই',
      deploySafeFirst: '/safe পৃষ্ঠায় প্রথমে একটি Safe ওয়ালেট স্থাপন করুন',
      goToSafeDashboard: 'Safe ড্যাশবোর্ডে যান',
      sendEUR: 'EUR পাঠান',
      receiveEUR: 'EUR গ্রহণ করুন',
      balance: 'ব্যালেন্স:',
      sessionKey: 'সেশন কী:',
      expires: 'মেয়াদ শেষ:',
      expired: 'মেয়াদ উত্তীর্ণ',
      active: 'সক্রিয়',
      sessionKeyExpired: 'সেশন কী মেয়াদ উত্তীর্ণ',
      goToSafeToCreateKey: '/safe এ নতুন সেশন কী তৈরি করতে যান',
      noSessionKey: 'কোনো সেশন কী নেই',
      createSessionKeyOnSafe: 'লেনদেন পাঠাতে /safe এ সেশন কী তৈরি করুন',
      recipientAddress: 'প্রাপকের ঠিকানা',
      recipientPlaceholder: '0x...',
      amountEUR: 'পরিমাণ (EUR)',
      amountPlaceholder: '1',
      send: 'পাঠান',
      requestPayment: 'পেমেন্ট অনুরোধ করুন',
      refreshBalance: 'ব্যালেন্স রিফ্রেশ করুন',
      copyAddress: 'ঠিকানা কপি করুন',
      sendToSafeAddress: 'আপনার Safe ওয়ালেট ঠিকানায় EUR পাঠান:',
      safeAddress: 'Safe ঠিকানা:',
      scanQROrCopy: 'তহবিল পেতে QR কোড স্ক্যান করুন বা ঠিকানা কপি করুন',
      requestPaymentTitle: 'পেমেন্ট অনুরোধ করুন',
      amountToRequest: 'অনুরোধ করা পরিমাণ (EUR)',
      scanQRToSendPayment: 'পেমেন্ট পাঠাতে এই QR কোড স্ক্যান করুন',
      loadingQR: 'QR কোড লোড হচ্ছে...',
      generateQR: 'QR তৈরি করুন',
      writeToNFC: 'NFC এ লিখুন',
      nfcNotAvailable: 'NFC উপলব্ধ নেই',
      cancel: 'বাতিল করুন',
      close: 'বন্ধ করুন',
      insufficientBalance: 'অপর্যাপ্ত ব্যালেন্স',
      incomingPaymentRequest: 'আসন্ন পেমেন্ট অনুরোধ সনাক্ত করা হয়েছে। আপনি চালিয়ে যেতে চান?',
      nfcWriteNotAvailable: 'NFC লেখা উপলব্ধ নেই',
      nfcWriteNotAvailableDesc:
        'NFC লেখার জন্য HTTPS, Android ডিভাইস, Chrome ব্রাউজার এবং NDEFWriter API সমর্থন প্রয়োজন। সমস্যা সমাধানের জন্য /nfc দেখুন।',
      nfcWritten: '✅ NFC লেখা হয়েছে!',
      nfcWrittenDesc: 'পেমেন্ট করতে ট্যাগটি আপনার ফোনের কাছে ধরুন।',
      nfcWriteFailed: 'NFC লেখা ব্যর্থ',
      nfcPermissionDenied:
        'NFC অনুমতি প্রত্যাখ্যান করা হয়েছে। আপনার ব্রাউজার সেটিংসে NFC অ্যাক্সেস অনুমতি দিন।',
      nfcNotSupported: 'এই ডিভাইসে NFC সমর্থিত নয়।',
      cannotReadNFC: 'NFC ট্যাগ পড়তে পারছি না। আবার চেষ্টা করুন।',
      operationCanceled: 'অপারেশন বাতিল করা হয়েছে।',
      noNFCTagDetected: 'কোনো NFC ট্যাগ সনাক্ত করা হয়নি। আবার চেষ্টা করুন।',
      pleaseWait: 'অনুগ্রহ করে অপেক্ষা করুন',
      transactionInProgress:
        'একটি লেনদেন ইতিমধ্যে প্রক্রিয়া করা হচ্ছে বা সম্প্রতি পাঠানো হয়েছে। অন্য একটি পাঠানোর আগে অনুগ্রহ করে অপেক্ষা করুন।',
      error: 'ত্রুটি',
      fillAllFields: 'অনুগ্রহ করে সমস্ত ফিল্ড পূরণ করুন এবং প্রথমে সেশন কী তৈরি করুন',
      sessionKeyExpiredDesc: '/safe পৃষ্ঠায় একটি নতুন সেশন কী তৈরি করুন',
      paid: '✅ পেমেন্ট করা হয়েছে!',
      paidDesc: 'আপনি {address}... থেকে {amount} EUR পেয়েছেন',
      sent: '✅ পাঠানো হয়েছে!',
      verifiedIn: '{duration}s এ যাচাই করা হয়েছে',
      connectionError: 'সংযোগ ত্রুটি',
      lostConnection: 'লেনদেন স্ট্যাটাসের সাথে সংযোগ হারিয়ে গেছে',
      transactionFailed: 'লেনদেন ব্যর্থ',
      failedToGenerateQR: 'QR কোড ডেটা তৈরি করতে ব্যর্থ।',
      copied: 'কপি করা হয়েছে!',
      addressCopied: 'ঠিকানা ক্লিপবোর্ডে কপি করা হয়েছে',
      invalidAmount: 'অবৈধ পরিমাণ',
      invalidAmountDesc: 'অনুগ্রহ করে একটি বৈধ EUR পরিমাণ প্রবেश করুন।',
      nfcTooltip:
        'NFC লেখার জন্য HTTPS, Android ডিভাইস, Chrome ব্রাউজার এবং NDEFWriter API সমর্থন প্রয়োজন। কিছু ডিভাইসে NFC লেখার অ্যাক্সেস সীমাবদ্ধ হতে পারে।',
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
      heroTitle: 'Shebam!',
      ctaButton: 'Попробуйте сейчас',
      feature1Title: '100% Бесплатно (навсегда)',
      feature1Desc: 'Без комиссий, без подписок, без скрытых расходов',
      feature2Title: 'Очень просто использовать',
      feature2Desc: 'QR-код, NFC - оплата за секунды',
      feature3Title: 'Быстрее любой другой платежной системы',
      feature3Desc: 'Проверка за менее чем 1 секунду',
      feature4Title: 'Гибкость (ключи сеанса)',
      feature4Desc: 'Установите лимиты расходов и сроки действия',
      feature5Title: 'Безопасность военного уровня',
      feature5Desc: 'Защита w3pk + Safe кошелька',
      feature6Title: 'Юридически регулируется',
      feature6Desc: 'Соответствующее евро на блокчейне (EURe)',
      comingSoonTitle: 'Скоро',
      comingSoon1: 'Анонимный платеж',
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
    onboarding: {
      settingUp: 'Настройка вашего аккаунта',
      deployingSafe: 'Развертывание вашего Safe на блокчейне...',
      safeDeployed: 'Safe на блокчейне развернут',
      enablingModule: 'Включение модуля ключа сеанса...',
      moduleEnabled: 'Модуль ключа сеанса включен',
      creatingSessionKey: 'Создание ключа сеанса...',
      sessionKeyCreated: 'Ключ сеанса создан',
      complete: 'Настройка завершена!',
      error: 'Произошла ошибка при настройке',
    },
    tx: {
      pageTitle: 'Платеж',
      pageSubtitle: 'Отправляйте и получайте EUR',
      noSafeWallet: 'Нет кошелька Safe',
      deploySafeFirst: 'Пожалуйста, сначала разверните кошелек Safe на странице /safe',
      goToSafeDashboard: 'Перейти на панель управления Safe',
      sendEUR: 'Отправить EUR',
      receiveEUR: 'Получить EUR',
      balance: 'Баланс:',
      sessionKey: 'Ключ сеанса:',
      expires: 'Истекает:',
      expired: 'Истекло',
      active: 'Активно',
      sessionKeyExpired: 'Ключ сеанса истек',
      goToSafeToCreateKey: 'Перейдите на /safe для создания нового ключа сеанса',
      noSessionKey: 'Нет ключа сеанса',
      createSessionKeyOnSafe: 'Создайте ключ сеанса на /safe для отправки транзакций',
      recipientAddress: 'Адрес получателя',
      recipientPlaceholder: '0x...',
      amountEUR: 'Сумма (EUR)',
      amountPlaceholder: '1',
      send: 'Отправить',
      requestPayment: 'Запросить платеж',
      refreshBalance: 'Обновить баланс',
      copyAddress: 'Скопировать адрес',
      sendToSafeAddress: 'Отправьте EUR на адрес вашего кошелька Safe:',
      safeAddress: 'Адрес Safe:',
      scanQROrCopy: 'Отсканируйте QR-код или скопируйте адрес для получения средств',
      requestPaymentTitle: 'Запросить платеж',
      amountToRequest: 'Сумма к запросу (EUR)',
      scanQRToSendPayment: 'Отсканируйте этот QR-код для отправки платежа',
      loadingQR: 'Загрузка QR-кода...',
      generateQR: 'Создать QR',
      writeToNFC: 'Записать в NFC',
      nfcNotAvailable: 'NFC недоступен',
      cancel: 'Отмена',
      close: 'Закрыть',
      insufficientBalance: 'Недостаточно средств',
      incomingPaymentRequest: 'Обнаружен входящий запрос платежа. Вы хотите продолжить?',
      nfcWriteNotAvailable: 'Запись в NFC недоступна',
      nfcWriteNotAvailableDesc:
        'Запись в NFC требует HTTPS, устройства Android, браузера Chrome и поддержки API NDEFWriter. Посетите /nfc для устранения неполадок.',
      nfcWritten: '✅ Записано в NFC!',
      nfcWrittenDesc: 'Поднесите метку к телефону для оплаты.',
      nfcWriteFailed: 'Ошибка записи в NFC',
      nfcPermissionDenied:
        'Разрешение NFC отклонено. Пожалуйста, разрешите доступ NFC в настройках браузера.',
      nfcNotSupported: 'NFC не поддерживается на этом устройстве.',
      cannotReadNFC: 'Не удается прочитать метку NFC. Попробуйте еще раз.',
      operationCanceled: 'Операция отменена.',
      noNFCTagDetected: 'Метка NFC не обнаружена. Попробуйте еще раз.',
      pleaseWait: 'Пожалуйста, подождите',
      transactionInProgress:
        'Транзакция уже обрабатывается или недавно была отправлена. Пожалуйста, подождите перед отправкой другой.',
      error: 'Ошибка',
      fillAllFields: 'Пожалуйста, заполните все поля и сначала создайте ключ сеанса',
      sessionKeyExpiredDesc: 'Пожалуйста, создайте новый ключ сеанса на странице /safe',
      paid: '✅ Оплачено!',
      paidDesc: 'Вы получили {amount} EUR от {address}...',
      sent: '✅ Отправлено!',
      verifiedIn: 'Проверено через {duration}s',
      connectionError: 'Ошибка соединения',
      lostConnection: 'Потеряно соединение с состоянием транзакции',
      transactionFailed: 'Ошибка транзакции',
      failedToGenerateQR: 'Не удалось создать данные QR-кода.',
      copied: 'Скопировано!',
      addressCopied: 'Адрес скопирован в буфер обмена',
      invalidAmount: 'Неверная сумма',
      invalidAmountDesc: 'Пожалуйста, введите правильную сумму EUR.',
      nfcTooltip:
        'Запись в NFC требует HTTPS, устройства Android, браузера Chrome и поддержки API NDEFWriter. Некоторые устройства могут иметь ограниченный доступ к записи NFC.',
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
      heroTitle: 'Shebam!',
      ctaButton: 'Experimente agora',
      feature1Title: '100% Grátis para usar (para sempre)',
      feature1Desc: 'Sem taxas, sem assinaturas, sem custos ocultos',
      feature2Title: 'Super fácil de usar',
      feature2Desc: 'Código QR, NFC - pagamento em segundos',
      feature3Title: 'Mais rápido que qualquer outro sistema de pagamento',
      feature3Desc: 'Verificado em menos de 1 segundo',
      feature4Title: 'Flexível (chaves de sessão)',
      feature4Desc: 'Defina limites de gastos e prazos de validade',
      feature5Title: 'Segurança de nível militar',
      feature5Desc: 'Proteção w3pk + Safe wallet',
      feature6Title: 'Legalmente regulamentado',
      feature6Desc: 'Euro em cadeia conforme (EURe)',
      comingSoonTitle: 'Em breve',
      comingSoon1: 'Pagamento anônimo',
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
    onboarding: {
      settingUp: 'Configurando sua conta',
      deployingSafe: 'Implantando sua Safe na blockchain...',
      safeDeployed: 'Safe na blockchain implantada',
      enablingModule: 'Habilitando módulo de chave de sessão...',
      moduleEnabled: 'Módulo de chave de sessão habilitado',
      creatingSessionKey: 'Criando chave de sessão...',
      sessionKeyCreated: 'Chave de sessão criada',
      complete: 'Configuração concluída!',
      error: 'Ocorreu um erro durante a configuração',
    },
    tx: {
      pageTitle: 'Pagamento',
      pageSubtitle: 'Envie e receba EUR',
      noSafeWallet: 'Sem carteira Safe',
      deploySafeFirst: 'Por favor, implante primeiro uma carteira Safe na página /safe',
      goToSafeDashboard: 'Ir para o painel do Safe',
      sendEUR: 'Enviar EUR',
      receiveEUR: 'Receber EUR',
      balance: 'Saldo:',
      sessionKey: 'Chave de sessão:',
      expires: 'Expira em:',
      expired: 'Expirada',
      active: 'Ativa',
      sessionKeyExpired: 'Chave de sessão expirada',
      goToSafeToCreateKey: 'Vá para /safe para criar uma nova chave de sessão',
      noSessionKey: 'Sem chave de sessão',
      createSessionKeyOnSafe: 'Crie uma chave de sessão em /safe para enviar transações',
      recipientAddress: 'Endereço do destinatário',
      recipientPlaceholder: '0x...',
      amountEUR: 'Valor (EUR)',
      amountPlaceholder: '1',
      send: 'Enviar',
      requestPayment: 'Solicitar pagamento',
      refreshBalance: 'Atualizar saldo',
      copyAddress: 'Copiar endereço',
      sendToSafeAddress: 'Envie EUR para o endereço de sua carteira Safe:',
      safeAddress: 'Endereço Safe:',
      scanQROrCopy: 'Escaneie o código QR ou copie o endereço para receber fundos',
      requestPaymentTitle: 'Solicitar pagamento',
      amountToRequest: 'Valor a solicitar (EUR)',
      scanQRToSendPayment: 'Escaneie este código QR para enviar o pagamento',
      loadingQR: 'Carregando código QR...',
      generateQR: 'Gerar QR',
      writeToNFC: 'Escrever para NFC',
      nfcNotAvailable: 'NFC não disponível',
      cancel: 'Cancelar',
      close: 'Fechar',
      insufficientBalance: 'Saldo insuficiente',
      incomingPaymentRequest: 'Solicitação de pagamento recebida detectada. Deseja continuar?',
      nfcWriteNotAvailable: 'Escrita NFC não disponível',
      nfcWriteNotAvailableDesc:
        'A escrita NFC requer HTTPS, dispositivo Android, navegador Chrome e suporte à API NDEFWriter. Visite /nfc para solucionar problemas.',
      nfcWritten: '✅ Escrito em NFC!',
      nfcWrittenDesc: 'Aproxime a etiqueta de seu telefone para pagar.',
      nfcWriteFailed: 'Falha na escrita NFC',
      nfcPermissionDenied:
        'Permissão NFC negada. Por favor, permita o acesso NFC nas configurações do navegador.',
      nfcNotSupported: 'NFC não é suportado neste dispositivo.',
      cannotReadNFC: 'Não é possível ler a etiqueta NFC. Tente novamente.',
      operationCanceled: 'Operação cancelada.',
      noNFCTagDetected: 'Nenhuma etiqueta NFC detectada. Tente novamente.',
      pleaseWait: 'Por favor, aguarde',
      transactionInProgress:
        'Uma transação já está sendo processada ou foi enviada recentemente. Por favor, aguarde antes de enviar outra.',
      error: 'Erro',
      fillAllFields: 'Por favor, preencha todos os campos e crie uma chave de sessão primeiro',
      sessionKeyExpiredDesc: 'Por favor, crie uma nova chave de sessão na página /safe',
      paid: '✅ Pago!',
      paidDesc: 'Você recebeu {amount} EUR de {address}...',
      sent: '✅ Enviado!',
      verifiedIn: 'Verificado em {duration}s',
      connectionError: 'Erro de conexão',
      lostConnection: 'Conexão perdida com o status da transação',
      transactionFailed: 'Falha na transação',
      failedToGenerateQR: 'Falha ao gerar dados do código QR.',
      copied: 'Copiado!',
      addressCopied: 'Endereço copiado para a área de transferência',
      invalidAmount: 'Valor inválido',
      invalidAmountDesc: 'Por favor, insira um valor EUR válido.',
      nfcTooltip:
        'A escrita NFC requer HTTPS, dispositivo Android, navegador Chrome e suporte à API NDEFWriter. Alguns dispositivos podem ter acesso restrito à escrita NFC.',
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
      heroTitle: 'Shebam!',
      ctaButton: 'ابھی آزمائیں',
      feature1Title: '100% استعمال کرنے کے لیے مفت (ہمیشہ کے لیے)',
      feature1Desc: 'کوئی فیس نہیں، کوئی سبسکرپشن نہیں، کوئی چھپی ہوئی لاگت نہیں',
      feature2Title: 'استعمال میں انتہائی آسان',
      feature2Desc: 'QR کوڈ، NFC - سیکنڈوں میں ادائیگی',
      feature3Title: 'کسی بھی دوسرے ادائیگی کے نظام سے تیز',
      feature3Desc: '1 سیکنڈ سے کم میں تصدیق شدہ',
      feature4Title: 'لچکدار (سیشن کیز)',
      feature4Desc: 'خرچ کی حدیں اور میعاد ختم ہونے کا وقت مقرر کریں',
      feature5Title: 'فوجی درجے کی حفاظت',
      feature5Desc: 'w3pk + Safe والٹ تحفظ',
      feature6Title: 'قانونی طور پر منظم',
      feature6Desc: 'مطابق آن چین یورو (EURe)',
      comingSoonTitle: 'جلد آرہا ہے',
      comingSoon1: 'گمنام ادائیگی',
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
    onboarding: {
      settingUp: 'اپنا اکاؤنٹ سیٹ اپ کیا جا رہا ہے',
      deployingSafe: 'آپ کا آن چین Safe تعینات کیا جا رہا ہے...',
      safeDeployed: 'آن چین Safe تعینات ہو گیا',
      enablingModule: 'سیشن کلید ماڈیول فعال کیا جا رہا ہے...',
      moduleEnabled: 'سیشن کلید ماڈیول فعال ہو گیا',
      creatingSessionKey: 'سیشن کلید بنائی جا رہی ہے...',
      sessionKeyCreated: 'سیشن کلید بن گئی',
      complete: 'سیٹ اپ مکمل ہو گیا!',
      error: 'سیٹ اپ کے دوران ایک خرابی پیش آگئی',
    },
    tx: {
      pageTitle: 'ادائیگی',
      pageSubtitle: 'EUR بھیجیں اور حاصل کریں',
      noSafeWallet: 'کوئی Safe ویلٹ نہیں',
      deploySafeFirst: '/safe صفحہ پر پہلے Safe ویلٹ تعینات کریں',
      goToSafeDashboard: 'Safe ڈیش بورڈ پر جائیں',
      sendEUR: 'EUR بھیجیں',
      receiveEUR: 'EUR حاصل کریں',
      balance: 'بیلنس:',
      sessionKey: 'سیشن کلید:',
      expires: 'ختم ہوتا ہے:',
      expired: 'ختم',
      active: 'فعال',
      sessionKeyExpired: 'سیشن کلید ختم ہو گئی',
      goToSafeToCreateKey: '/safe پر نئی سیشن کلید بنانے جائیں',
      noSessionKey: 'کوئی سیشن کلید نہیں',
      createSessionKeyOnSafe: 'لین دین بھیجنے کے لیے /safe پر سیشن کلید بنائیں',
      recipientAddress: 'وصول کنندہ کا پتہ',
      recipientPlaceholder: '0x...',
      amountEUR: 'رقم (EUR)',
      amountPlaceholder: '1',
      send: 'بھیجیں',
      requestPayment: 'ادائیگی کی درخواست کریں',
      refreshBalance: 'بیلنس تازہ کریں',
      copyAddress: 'پتہ کاپی کریں',
      sendToSafeAddress: 'اپنے Safe ویلٹ پتہ پر EUR بھیجیں:',
      safeAddress: 'Safe پتہ:',
      scanQROrCopy: 'فنڈز حاصل کرنے کے لیے QR کوڈ سکین کریں یا پتہ کاپی کریں',
      requestPaymentTitle: 'ادائیگی کی درخواست کریں',
      amountToRequest: 'درخواست کی گئی رقم (EUR)',
      scanQRToSendPayment: 'ادائیگی بھیجنے کے لیے یہ QR کوڈ سکین کریں',
      loadingQR: 'QR کوڈ لوڈ ہو رہا ہے...',
      generateQR: 'QR بنائیں',
      writeToNFC: 'NFC میں لکھیں',
      nfcNotAvailable: 'NFC دستیاب نہیں',
      cancel: 'منسوخ کریں',
      close: 'بند کریں',
      insufficientBalance: 'ناکافی بیلنس',
      incomingPaymentRequest:
        'آنے والی ادائیگی کی درخواست کا پتہ چلا۔ کیا آپ جاری رکھنا چاہتے ہیں؟',
      nfcWriteNotAvailable: 'NFC میں لکھنا دستیاب نہیں',
      nfcWriteNotAvailableDesc:
        'NFC میں لکھنے کے لیے HTTPS، Android ڈیوائس، Chrome براؤزر اور NDEFWriter API کی معاونت کی ضرورت ہے۔ مسائل کو حل کرنے کے لیے /nfc دیکھیں۔',
      nfcWritten: '✅ NFC میں لکھا گیا!',
      nfcWrittenDesc: 'ادائیگی کے لیے ٹیگ کو اپنے فون کے قریب رکھیں۔',
      nfcWriteFailed: 'NFC میں لکھنا ناکام',
      nfcPermissionDenied:
        'NFC اجازت مسترد۔ براہ کرم اپنے براؤزر کی ترتیبات میں NFC رسائی کی اجازت دیں۔',
      nfcNotSupported: 'NFC اس ڈیوائس پر معاون نہیں ہے۔',
      cannotReadNFC: 'NFC ٹیگ نہیں پڑھ سکتے۔ دوبارہ کوشش کریں۔',
      operationCanceled: 'آپریشن منسوخ۔',
      noNFCTagDetected: 'کوئی NFC ٹیگ نہیں ملا۔ دوبارہ کوشش کریں۔',
      pleaseWait: 'براہ کرم انتظار کریں',
      transactionInProgress:
        'ایک لین دین پہلے سے ہی کام میں ہے یا ابھی بھیجا گیا ہے۔ براہ کرم دوسرا بھیجنے سے پہلے انتظار کریں۔',
      error: 'خرابی',
      fillAllFields: 'براہ کرم تمام فیلڈز بھریں اور پہلے سیشن کلید بنائیں',
      sessionKeyExpiredDesc: '/safe صفحہ پر نئی سیشن کلید بنائیں',
      paid: '✅ ادا!',
      paidDesc: 'آپ نے {address}... سے {amount} EUR حاصل کیے',
      sent: '✅ بھیجا گیا!',
      verifiedIn: '{duration}s میں تصدیق شدہ',
      connectionError: 'رابطہ کی خرابی',
      lostConnection: 'لین دین کی حالت سے رابطہ کھو گیا',
      transactionFailed: 'لین دین ناکام',
      failedToGenerateQR: 'QR کوڈ ڈیٹا بنانے میں ناکام۔',
      copied: 'کاپی ہو گیا!',
      addressCopied: 'پتہ کلپ بورڈ میں کاپی ہو گیا',
      invalidAmount: 'غلط رقم',
      invalidAmountDesc: 'براہ کرم درست EUR رقم درج کریں۔',
      nfcTooltip:
        'NFC میں لکھنے کے لیے HTTPS، Android ڈیوائس، Chrome براؤزر اور NDEFWriter API کی معاونت کی ضرورت ہے۔ کچھ ڈیوائسز میں NFC میں لکھنے کی رسائی محدود ہو سکتی ہے۔',
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
