import React, { useState, useEffect } from 'react';
import { Settings, Zap, Wifi, Bluetooth, Sun, BatteryCharging, Plane, Layers } from 'lucide-react';
import { AppState, AnimationType } from './types';
import { INITIAL_ANIMATIONS, TEXTS } from './constants';
import { AnalogClock } from './components/AnalogClock';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import { SettingsModal } from './components/SettingsModal';

function App() {
  // --- State Management ---
  const [appState, setAppState] = useState<AppState>({
    batteryLevel: 42, // Mock initial value
    isCharging: true,
    timeRemaining: 35, // Minutes
    economyMode: false,
    language: 'en',
    currentAnimation: AnimationType.NEON_PULSE,
    userAnimations: [...INITIAL_ANIMATIONS]
  });

  const [showSettings, setShowSettings] = useState(false);

  // --- Mock Battery & Date Logic ---
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update time/date every minute
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      
      // Mock charging progress
      if (appState.isCharging && appState.batteryLevel < 100) {
         setAppState(prev => ({ 
           ...prev, 
           batteryLevel: Math.min(prev.batteryLevel + 1, 100),
           timeRemaining: Math.max(prev.timeRemaining - 2, 0)
         }));
      }
    }, 3000); // Fast simulation for demo

    return () => clearInterval(interval);
  }, [appState.isCharging, appState.batteryLevel]);

  // --- Custom Date Formatter ---
  // Goal: "Day Name" (Localized), "Month" (Localized), "Day Number" (Always English Digits)
  const getFormattedDate = () => {
    const langCode = appState.language === 'ar' ? 'ar-SA' : 'en-US';
    
    const dayName = new Intl.DateTimeFormat(langCode, { weekday: 'long' }).format(currentDate);
    const monthName = new Intl.DateTimeFormat(langCode, { month: 'short' }).format(currentDate);
    const dayNumber = currentDate.getDate(); // Javascript .getDate() returns standard 1-31 numbers (English format)

    // Assemble: "Monday, Jul 22" or "الاثنين, يوليو 22"
    return `${dayName}, ${monthName} ${dayNumber}`;
  };

  const formattedDate = getFormattedDate();
  const t = TEXTS;
  const lang = appState.language;
  // Main layout direction matches language, but specific parts will override this
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  // --- Render Helpers ---
  const getChargeStatus = () => {
    if (!appState.isCharging) return t.notCharging[lang];
    if (appState.batteryLevel === 100) return t.charged[lang];
    return t.charging[lang];
  };

  // --- Dynamic Circle Renderer ---
  const renderChargingCircle = () => {
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (appState.batteryLevel / 100) * circumference;

    // Common SVG props
    const svgCommon = "absolute w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(0,255,0,0.6)] transition-all duration-500";

    switch (appState.currentAnimation) {
      case AnimationType.MYSTIC_WAVES:
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-neon/40 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-neon/20 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <svg className={svgCommon}>
              <circle cx="50%" cy="50%" r="48%" stroke="#111" strokeWidth="4" fill="black" fillOpacity="0.6" />
              <circle
                cx="50%" cy="50%" r="48%"
                stroke="#00FF00" strokeWidth="6" fill="none"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
          </div>
        );

      case AnimationType.CYBERPUNK_GLITCH:
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
             {/* Hexagon-ish / Tech border */}
             <div className="absolute inset-0 border-4 border-neon/30 clip-path-polygon animate-pulse" 
                  style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
             </div>
             {/* Glitch lines */}
             <div className="absolute w-full h-1 bg-neon/50 top-1/2 animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
             
             <svg className={svgCommon}>
               <circle cx="50%" cy="50%" r="48%" stroke="#000" strokeWidth="10" fill="black" fillOpacity="0.8" />
               {/* Segmented Progress */}
               <circle
                 cx="50%" cy="50%" r="48%"
                 stroke="#00FF00" strokeWidth="8" fill="none"
                 strokeDasharray={`${circumference / 40} ${circumference / 40}`} // Dotted/Segmented
                 strokeDashoffset={strokeDashoffset} // This moves the dots, slightly different logic needed for fill, but works as visual style
                 pathLength={100} // Normalize for segmenting
                 className="transition-all duration-1000 ease-out"
               />
               {/* Actual fill line for clarity underneath */}
               <circle
                 cx="50%" cy="50%" r="48%"
                 stroke="#00FF00" strokeWidth="2" fill="none"
                 strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                 strokeLinecap="butt"
                 className="opacity-50"
               />
             </svg>
          </div>
        );

      case AnimationType.AURORA_BOREALIS:
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
             {/* Soft Glow Background */}
             <div className="absolute inset-0 rounded-full bg-neon/10 blur-xl animate-pulse"></div>
             
             <svg className={svgCommon}>
               <defs>
                 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                   <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                   <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                 </filter>
               </defs>
               <circle cx="50%" cy="50%" r="46%" stroke="#003300" strokeWidth="8" fill="black" fillOpacity="0.4" />
               <circle
                 cx="50%" cy="50%" r="46%"
                 stroke="#00FF00" strokeWidth="8" fill="none"
                 filter="url(#glow)"
                 strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                 strokeLinecap="round"
                 className="transition-all duration-1000 ease-out"
               />
             </svg>
          </div>
        );

      case AnimationType.LIQUID_METAL:
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Thick Metallic Ring */}
            <div className="absolute inset-0 rounded-full border-[12px] border-gray-800 shadow-[inset_0_0_20px_rgba(0,0,0,1)]"></div>
            
            <svg className={svgCommon}>
               <defs>
                 <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#00FF00" />
                   <stop offset="50%" stopColor="#88FF88" />
                   <stop offset="100%" stopColor="#00FF00" />
                 </linearGradient>
               </defs>
               <circle cx="50%" cy="50%" r="44%" stroke="#111" strokeWidth="12" fill="black" fillOpacity="0.7" />
               <circle
                 cx="50%" cy="50%" r="44%"
                 stroke="url(#liquidGradient)" strokeWidth="12" fill="none"
                 strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                 strokeLinecap="round"
                 className="transition-all duration-1000 ease-out"
               />
             </svg>
          </div>
        );

      case AnimationType.NEON_PULSE:
      default:
        return (
          <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Standard Pulse Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-neon/20 animate-[ping_2s_infinite]"></div>
            <svg className={svgCommon}>
               <circle cx="50%" cy="50%" r="48%" stroke="#1a1a1a" strokeWidth="8" fill="black" fillOpacity="0.6" />
               <circle
                 cx="50%" cy="50%" r="48%"
                 stroke="#00FF00" strokeWidth="8" fill="none"
                 strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                 strokeLinecap="round"
                 className="transition-all duration-1000 ease-out"
               />
            </svg>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative w-full h-screen flex flex-col overflow-hidden font-sans transition-all duration-500 ${appState.economyMode ? 'brightness-50 grayscale-[0.8]' : ''}`}
      dir={dir}
    >
      {/* Background Layer */}
      <BackgroundAnimation type={appState.currentAnimation} />

      {/* --- HEADER --- */}
      {/* Forced LTR and English for Header as requested */}
      <header 
        className="relative z-10 flex flex-row items-start justify-between p-6"
        dir="ltr"
      >
        {/* Left: Settings & Language Indicator */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full bg-black/30 border border-neon/30 text-neon hover:bg-neon/10 hover:shadow-[0_0_15px_#00FF00] transition-all"
          >
            <Settings size={24} />
          </button>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center">
            {/* This shows the current active language code */}
            {lang.toUpperCase()}
          </div>
        </div>

        {/* Center: Title (Forced English, Neon Green) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-6 text-center w-full pointer-events-none px-12">
          <h1 className="text-xl md:text-2xl font-bold text-neon tracking-wider drop-shadow-[0_0_10px_#00FF00] uppercase font-mono">
            {t.appTitle['en']}
          </h1>
        </div>

        {/* Right: Analog Clock */}
        <div className="flex-shrink-0 scale-110 origin-top-right">
          <AnalogClock />
        </div>
      </header>

      {/* --- BODY (Main Charging Circle) --- */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10">
        
        {/* Render the dynamic circle based on animation type */}
        {renderChargingCircle()}

        {/* Inner Content (Absolute positioned over the circle) */}
        <div className="absolute flex flex-col items-center justify-center text-center z-20 pointer-events-none">
          {/* Charging Icon */}
          {appState.isCharging && (
            <Zap 
              size={32} 
              className="text-neon mb-2 animate-bounce" 
              fill="#00FF00"
            />
          )}
          
          {/* Percentage */}
          <div className="text-7xl md:text-8xl font-bold text-white tabular-nums tracking-tighter leading-none filter drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
            {appState.batteryLevel}<span className="text-3xl text-neon">%</span>
          </div>

          {/* Date (Mix of Arabic Name + English Number) */}
          <div className="mt-4 px-4 py-1 rounded-full bg-neon/10 border border-neon/30 text-neon text-sm md:text-base font-medium backdrop-blur-md">
            {formattedDate}
          </div>

          {/* Status Text */}
          <div className="mt-6 text-gray-300 font-light text-sm tracking-widest uppercase">
            {getChargeStatus()}
          </div>

          {/* Time Remaining */}
          {appState.isCharging && appState.batteryLevel < 100 && (
              <div className="text-xs text-gray-500 mt-1">
                {appState.timeRemaining} min {t.timeLeft[lang]}
              </div>
          )}
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center gap-4 pb-8">
        
        {/* Economy Mode Status Icons (Only visible when active) */}
        {appState.economyMode && (
          <div className="flex gap-4 md:gap-6 animate-pulse flex-wrap justify-center bg-black/40 p-2 rounded-lg backdrop-blur-sm border border-red-900/30">
             <div className="flex flex-col items-center text-red-500">
                <Wifi size={18} className="opacity-50" />
                <span className="text-[9px] mt-1 whitespace-nowrap">{t.wifiOff[lang]}</span>
             </div>
             <div className="flex flex-col items-center text-red-500">
                <Bluetooth size={18} className="opacity-50" />
                <span className="text-[9px] mt-1 whitespace-nowrap">{t.btOff[lang]}</span>
             </div>
             <div className="flex flex-col items-center text-blue-400">
                <Plane size={18} className="opacity-70" />
                <span className="text-[9px] mt-1 whitespace-nowrap">{t.airplaneOn[lang]}</span>
             </div>
             <div className="flex flex-col items-center text-purple-500">
                <Layers size={18} className="opacity-70" />
                <span className="text-[9px] mt-1 whitespace-nowrap">{t.appsKilled[lang]}</span>
             </div>
             <div className="flex flex-col items-center text-yellow-500">
                <Sun size={18} className="opacity-50" />
                <span className="text-[9px] mt-1 whitespace-nowrap">{t.brightnessLow[lang]}</span>
             </div>
          </div>
        )}

        {/* Economy Toggle Button */}
        <button
          onClick={() => setAppState(prev => ({ ...prev, economyMode: !prev.economyMode }))}
          className={`
            flex items-center gap-3 px-6 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all transform active:scale-95 w-full max-w-xs justify-center
            ${appState.economyMode 
              ? 'bg-red-900/80 text-red-200 border border-red-500 shadow-[0_0_20px_rgba(255,0,0,0.4)]' 
              : 'bg-neon/10 text-neon border border-neon shadow-[0_0_15px_rgba(0,255,0,0.2)] hover:bg-neon hover:text-black'
            }
          `}
        >
          <BatteryCharging size={20} />
          {appState.economyMode ? t.disableEconomy[lang] : t.enableEconomy[lang]}
        </button>

        {/* Copyright - Updated specific text */}
        <div className="text-[10px] text-gray-600 mt-2 font-mono" dir="ltr">
          {t.copyright['en']}
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
        appState={appState}
        setAppState={setAppState}
      />
    </div>
  );
}

export default App;