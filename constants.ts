import { AnimationType, Translations } from './types';

export const INITIAL_ANIMATIONS = [
  AnimationType.NEON_PULSE,
  AnimationType.MYSTIC_WAVES,
  AnimationType.CYBERPUNK_GLITCH,
  AnimationType.AURORA_BOREALIS,
  AnimationType.LIQUID_METAL
];

export const TEXTS: Translations = {
  appTitle: { en: "Housni Fast Charge", ar: "حسني للشحن السريع" },
  charging: { en: "Charging...", ar: "جاري الشحن..." },
  charged: { en: "Fully Charged", ar: "مشحون بالكامل" },
  notCharging: { en: "Not Charging", ar: "لا يتم الشحن" },
  timeLeft: { en: "until full", ar: "حتى يكتمل" },
  enableEconomy: { en: "Enable Ultra Economy", ar: "تفعيل الاقتصاد الفائق" },
  disableEconomy: { en: "Disable Ultra Economy", ar: "تعطيل الاقتصاد الفائق" },
  settings: { en: "Settings", ar: "الإعدادات" },
  chooseAnimation: { en: "Choose Animation", ar: "اختر الرسوم المتحركة" },
  suggestAI: { en: "Suggest New Animation (AI)", ar: "اقتراح بالذكاء الاصطناعي" },
  socials: { en: "Follow Us", ar: "تابعنا" },
  wifiOff: { en: "WiFi Off", ar: "وايفاي متوقف" },
  btOff: { en: "BT Off", ar: "بلوتوث متوقف" },
  brightnessLow: { en: "Dimmed", ar: "سطوع منخفض" },
  airplaneOn: { en: "Airplane On", ar: "وضع الطيران" },
  appsKilled: { en: "Apps Killed", ar: "إيقاف التطبيقات" },
  copyright: { en: "Copyright by Housni Bouemir 2026", ar: "Copyright by Housni Bouemir 2026" },
  addAnim: { en: "Add", ar: "إضافة" },
  generating: { en: "Thinking...", ar: "جاري التفكير..." },
};

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/housni.king/', label: 'HOUSNI.KING' },
  { name: 'Facebook', url: 'https://www.facebook.com/housni.bouemir', label: 'HOUSNI BOUEMIR' },
  { name: 'YouTube', url: 'https://www.youtube.com/@HOUSNITHEKING', label: 'HOUSNITHEKING' }
];