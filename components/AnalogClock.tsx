import React, { useEffect, useState } from 'react';

export const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsRatio = time.getSeconds() / 60;
  const minutesRatio = (secondsRatio + time.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + time.getHours()) / 12;
  const dayOfMonth = time.getDate();

  return (
    <div className="w-20 h-20 relative rounded-full border-2 border-neon bg-black/80 shadow-[0_0_10px_#00FF00]">
      {/* Dial markers & Numbers */}
      {[...Array(12)].map((_, i) => {
        const num = i + 1;
        const rotation = num * 30;
        // Calculate position for numbers (radius approx 32px inside a 40px radius circle)
        const angleRad = (rotation - 90) * (Math.PI / 180);
        const radius = 26; // distance from center
        const x = 50 + radius * Math.cos(angleRad); // 50 is center percentage (but we use pixels here relative to center)
        const y = 50 + radius * Math.sin(angleRad);

        return (
          <React.Fragment key={i}>
            {/* Tick Marker */}
            <div
              className="absolute w-0.5 h-1 bg-neon/30 left-1/2 top-1"
              style={{
                transformOrigin: '0 36px',
                transform: `translateX(-50%) rotate(${rotation}deg)`,
              }}
            />
            {/* Number */}
            <div 
              className="absolute text-[8px] font-bold text-neon/80 w-4 h-4 flex items-center justify-center"
              style={{
                left: `calc(50% + ${radius * Math.cos(angleRad)}px)`,
                top: `calc(50% + ${radius * Math.sin(angleRad)}px)`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {num}
            </div>
          </React.Fragment>
        );
      })}
      
      {/* Date Window (at 3 o'clock position) */}
      <div className="absolute top-1/2 right-3 -translate-y-1/2 w-4 h-3 bg-gray-800 border border-gray-600 rounded flex items-center justify-center">
        <span className="text-[8px] text-neon font-mono leading-none">{dayOfMonth}</span>
      </div>

      {/* Hour Hand */}
      <div
        className="absolute w-1 h-5 bg-neon left-1/2 top-1/2 origin-bottom -translate-x-1/2 -translate-y-full rounded-full z-10"
        style={{ transform: `translate(-50%, -100%) rotate(${hoursRatio * 360}deg)` }}
      />
      {/* Minute Hand */}
      <div
        className="absolute w-0.5 h-7 bg-neon/80 left-1/2 top-1/2 origin-bottom -translate-x-1/2 -translate-y-full rounded-full z-10"
        style={{ transform: `translate(-50%, -100%) rotate(${minutesRatio * 360}deg)` }}
      />
      {/* Second Hand */}
      <div
        className="absolute w-[1px] h-8 bg-red-500 left-1/2 top-1/2 origin-bottom -translate-x-1/2 -translate-y-full z-20"
        style={{ transform: `translate(-50%, -100%) rotate(${secondsRatio * 360}deg)` }}
      />
      {/* Center Dot */}
      <div className="absolute w-1.5 h-1.5 bg-neon rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30" />
    </div>
  );
};