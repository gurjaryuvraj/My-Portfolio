import React from 'react';
import type { SkyTheme } from '../hooks/useVisitorWeather';

interface DesignWeatherStageProps {
  active: boolean;
  skyTheme: SkyTheme;
}

const AMBIENT_STARS = [
  { top: '9%', left: '11%', size: 2, delay: 0.2, duration: 3.4 },
  { top: '14%', left: '22%', size: 2.5, delay: 1.4, duration: 4.1 },
  { top: '19%', left: '34%', size: 1.8, delay: 2.3, duration: 3.8 },
  { top: '11%', left: '47%', size: 2, delay: 0.9, duration: 4.6 },
  { top: '16%', left: '63%', size: 2.8, delay: 0.4, duration: 3.2 },
  { top: '12%', left: '78%', size: 2, delay: 1.8, duration: 4.4 },
  { top: '20%', left: '89%', size: 2.5, delay: 1.1, duration: 3.6 },
  { top: '29%', left: '15%', size: 1.8, delay: 2.7, duration: 4.0 },
  { top: '34%', left: '27%', size: 2.2, delay: 0.6, duration: 3.5 },
  { top: '27%', left: '72%', size: 2.4, delay: 2.1, duration: 4.3 },
  { top: '36%', left: '84%', size: 2, delay: 1.5, duration: 3.7 },
  { top: '44%', left: '9%', size: 2, delay: 2.9, duration: 4.2 },
  { top: '48%', left: '91%', size: 2.2, delay: 0.7, duration: 3.9 },
  { top: '56%', left: '18%', size: 1.8, delay: 1.9, duration: 4.5 },
  { top: '58%', left: '81%', size: 1.8, delay: 2.5, duration: 3.6 },
  { top: '24%', left: '54%', size: 1.6, delay: 1.2, duration: 4.1 },
];

const SUBTLE_RAIN_STREAKS = [
  { left: '9%', delay: 0.0, duration: 1.35 },
  { left: '17%', delay: 0.55, duration: 1.15 },
  { left: '25%', delay: 0.25, duration: 1.45 },
  { left: '33%', delay: 0.85, duration: 1.25 },
  { left: '67%', delay: 0.4, duration: 1.3 },
  { left: '75%', delay: 0.95, duration: 1.2 },
  { left: '83%', delay: 0.15, duration: 1.4 },
  { left: '91%', delay: 0.7, duration: 1.25 },
];

const SUBTLE_SNOW_MOTES = [
  { left: '10%', size: 3.5, delay: 0.2, duration: 8.5 },
  { left: '21%', size: 2.5, delay: 2.1, duration: 9.8 },
  { left: '32%', size: 3, delay: 4.0, duration: 7.8 },
  { left: '68%', size: 3, delay: 1.4, duration: 8.9 },
  { left: '79%', size: 3.5, delay: 3.2, duration: 9.4 },
  { left: '89%', size: 2.5, delay: 5.1, duration: 8.2 },
];

export function DesignWeatherStage({
  active,
  skyTheme,
}: DesignWeatherStageProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Dynamic Time-of-Day & Weather Sky Gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyTheme.skyGradient }}
      />

      {/* Soft Celestial Sun / Moon Atmospheric Bloom */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyTheme.celestialGlow }}
      />

      {/* Soft Horizon Glow */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyTheme.horizonGlow }}
      />

      {/* Minor Background Detail: Twinkling Stars (Night & Twilight) */}
      {skyTheme.showAmbientStars && (
        <div className="absolute inset-0">
          {AMBIENT_STARS.map((star, idx) => (
            <span
              key={idx}
              className="design-star-twinkle absolute rounded-full bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                animationDuration: `${star.duration}s`,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
              }}
            />
          ))}
        </div>
      )}

      {/* Minor Background Detail: Soft Atmospheric Mist Sheen (Fog / Overcast) */}
      {skyTheme.showSubtleMist && (
        <div
          className="absolute inset-0 opacity-45"
          style={{
            background:
              'radial-gradient(ellipse at 25% 40%, rgba(255,255,255,0.16) 0%, transparent 55%), radial-gradient(ellipse at 78% 60%, rgba(226,232,240,0.16) 0%, transparent 58%)',
          }}
        />
      )}

      {/* Minor Background Detail: Faint Fine Drizzle Streaks (Rain / Storm) */}
      {skyTheme.showSubtleRain && (
        <div className="absolute inset-0 overflow-hidden">
          {SUBTLE_RAIN_STREAKS.map((streak, idx) => (
            <span
              key={idx}
              className="design-rain-streak absolute -top-24 w-px h-24"
              style={{
                left: streak.left,
                animationDelay: `${streak.delay}s`,
                animationDuration: `${streak.duration}s`,
                background:
                  'linear-gradient(180deg, rgba(224,242,254,0) 0%, rgba(224,242,254,0.34) 70%, rgba(255,255,255,0.45) 100%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Minor Background Detail: Tiny Faint Snow Motes (Snow) */}
      {skyTheme.showSubtleSnow && (
        <div className="absolute inset-0 overflow-hidden">
          {SUBTLE_SNOW_MOTES.map((mote, idx) => (
            <span
              key={idx}
              className="design-snow-mote absolute -top-4 rounded-full bg-white/75"
              style={{
                left: mote.left,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                animationDelay: `${mote.delay}s`,
                animationDuration: `${mote.duration}s`,
                boxShadow: '0 0 6px rgba(255, 255, 255, 0.65)',
              }}
            />
          ))}
        </div>
      )}

      {/* Minor Background Detail: Distant Soft Sheet-Lightning Shimmer (Storm) */}
      {skyTheme.showStormFlash && (
        <div className="design-storm-flash absolute inset-0 bg-sky-200/20" />
      )}

      {/* Smooth Seamless Bottom Transition into the Dark #0C0C0C About Section */}
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,12,12,0) 0%, rgba(12,12,12,0.55) 68%, #0C0C0C 100%)',
        }}
      />
    </div>
  );
}
