import React, { useState } from 'react';
import { X, Sparkles, Globe, Youtube, Facebook, Instagram } from 'lucide-react';
import { AppState, Language } from '../types';
import { TEXTS, SOCIAL_LINKS } from '../constants';
import { suggestAnimationName } from '../services/geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

export const SettingsModal: React.FC<Props> = ({ isOpen, onClose, appState, setAppState }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const t = TEXTS;
  const lang = appState.language;

  if (!isOpen) return null;

  const handleLanguageToggle = () => {
    setAppState(prev => ({ ...prev, language: prev.language === 'en' ? 'ar' : 'en' }));
  };

  const handleSelectAnimation = (name: string) => {
    setAppState(prev => ({ ...prev, currentAnimation: name }));
  };

  const handleGenerateAI = async () => {
    setIsGenerating(true);
    const newName = await suggestAnimationName(appState.userAnimations);
    setAppState(prev => ({
      ...prev,
      userAnimations: [...prev.userAnimations, newName],
      currentAnimation: newName
    }));
    setIsGenerating(false);
  };

  const SocialIcon = ({ name }: { name: string }) => {
    if (name === 'YouTube') return <Youtube size={20} />;
    if (name === 'Facebook') return <Facebook size={20} />;
    return <Instagram size={20} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0a] border border-neon rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(0,255,0,0.2)] flex flex-col" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-neon/20">
          <h2 className="text-xl font-bold text-neon">{t.settings[lang]}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Language Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <Globe size={18} className="text-neon" />
              <span>Language / اللغة</span>
            </div>
            <button 
              onClick={handleLanguageToggle}
              className="px-3 py-1 rounded bg-neon/10 border border-neon text-neon text-sm font-bold hover:bg-neon/20 transition-colors"
            >
              {lang === 'en' ? 'English' : 'العربية'}
            </button>
          </div>

          {/* Animations List */}
          <div>
            <h3 className="text-white mb-3 font-medium border-b border-gray-800 pb-1">{t.chooseAnimation[lang]}</h3>
            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {appState.userAnimations.map((anim) => (
                <button
                  key={anim}
                  onClick={() => handleSelectAnimation(anim)}
                  className={`text-left px-4 py-3 rounded border transition-all ${
                    appState.currentAnimation === anim 
                      ? 'border-neon bg-neon/20 text-white shadow-[0_0_10px_rgba(0,255,0,0.3)]' 
                      : 'border-gray-800 bg-gray-900/50 text-gray-400 hover:border-neon/50 hover:text-gray-200'
                  }`}
                >
                  {anim}
                </button>
              ))}
            </div>
          </div>

          {/* AI Button */}
          <button
            onClick={handleGenerateAI}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded bg-gradient-to-r from-indigo-900 to-purple-900 border border-purple-500/50 text-white font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
          >
            <Sparkles size={18} className={isGenerating ? "animate-spin" : ""} />
            {isGenerating ? t.generating[lang] : t.suggestAI[lang]}
          </button>

          {/* Socials */}
          <div>
             <h3 className="text-white mb-3 font-medium border-b border-gray-800 pb-1">{t.socials[lang]}</h3>
             <div className="flex justify-center gap-4">
               {SOCIAL_LINKS.map(link => (
                 <a 
                   key={link.name} 
                   href={link.url} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-gray-400 hover:text-neon transition-colors flex flex-col items-center gap-2 group w-24"
                 >
                   <div className="p-2 rounded-full bg-white/5 group-hover:bg-neon/20 transition-colors">
                     <SocialIcon name={link.name} />
                   </div>
                   <span className="text-[9px] font-bold uppercase text-center leading-tight">{link.label}</span>
                 </a>
               ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};