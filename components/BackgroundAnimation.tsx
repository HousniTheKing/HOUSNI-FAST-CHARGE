import React from 'react';
import { AnimationType } from '../types';

interface Props {
  type: string;
}

export const BackgroundAnimation: React.FC<Props> = ({ type }) => {
  // Common base classes for full screen background
  const baseClass = "absolute inset-0 -z-10 overflow-hidden pointer-events-none";

  const renderEffect = () => {
    switch (type) {
      case AnimationType.NEON_PULSE:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="absolute w-[300px] h-[300px] rounded-full border-4 border-neon/20 animate-[ping_3s_ease-in-out_infinite]"></div>
            <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-neon/10 animate-[ping_4s_ease-in-out_infinite_1s]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,0,0.15)_0%,_rgba(0,0,0,1)_70%)]"></div>
          </div>
        );
      case AnimationType.MYSTIC_WAVES:
        return (
          <div className="w-full h-full opacity-30">
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,_#000000,_#00FF00,_#000000)] animate-spin-slow opacity-20 blur-3xl"></div>
          </div>
        );
      case AnimationType.CYBERPUNK_GLITCH:
        return (
          <div className="w-full h-full bg-[url('https://picsum.photos/seed/glitch/800/1200')] bg-cover bg-center opacity-10 mix-blend-screen filter grayscale contrast-125">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon/5 to-transparent animate-pulse"></div>
          </div>
        );
      case AnimationType.AURORA_BOREALIS:
        return (
          <div className="w-full h-full bg-gradient-to-br from-black via-[#001a00] to-black">
             <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-neon/20 to-transparent blur-3xl animate-float opacity-40"></div>
             <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900/30 to-transparent blur-3xl animate-[pulse_4s_infinite] opacity-40"></div>
          </div>
        );
      case AnimationType.LIQUID_METAL:
         return (
          <div className="w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#222_0%,_#000_100%)]"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-neon/5 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
         );
      default:
        // Generic fallback for custom/AI names
        return (
          <div className="w-full h-full">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,0,0.05)_0%,_rgba(0,0,0,1)_80%)]"></div>
             <div className="w-full h-full flex items-center justify-center">
               <div className="text-neon/20 font-bold text-9xl opacity-10 animate-pulse">{type.charAt(0)}</div>
             </div>
          </div>
        );
    }
  };

  return <div className={baseClass}>{renderEffect()}</div>;
};