export type Language = 'en' | 'ar';

export enum AnimationType {
  NEON_PULSE = 'Neon Pulse',
  MYSTIC_WAVES = 'Mystic Waves',
  CYBERPUNK_GLITCH = 'Cyberpunk Glitch',
  AURORA_BOREALIS = 'Aurora Borealis',
  LIQUID_METAL = 'Liquid Metal',
  // Placeholder for AI generated ones
  CUSTOM = 'Custom AI'
}

export interface AppState {
  batteryLevel: number;
  isCharging: boolean;
  timeRemaining: number; // in minutes
  economyMode: boolean;
  language: Language;
  currentAnimation: string;
  userAnimations: string[];
}

export interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  }
}