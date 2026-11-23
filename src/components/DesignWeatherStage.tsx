import React from 'react';
import type { SkyTheme } from '../hooks/useVisitorWeather';

interface DesignWeatherStageProps {
  active: boolean;
  skyTheme: SkyTheme;
}

const AMBIENT_STARS = [
  { top: '8%', left: '10%', size: 2, delay: 0.2, duration: 3.4 },
  { top: '13%', left: '21%', size: 2.5, delay: 1.4, duration: 4.1 },
  { top: '18%', left: '33%', size: 1.8, delay: 2.3, duration: 3.8 },
  { top: '10%', left: '46%', size: 2, delay: 0.9, duration: 4.6 },
  { top: '15%', left: '62%', size: 2.8, delay: 0.4, duration: 3.2 },
  { top: '11%', left: '77%', size: 2, delay: 1.8, duration: 4.4 },
  { top: '19%', left: '89%', size: 2.5, delay: 1.1, duration: 3.6 },
  { top: '28%', left: '14%', size: 1.8, delay: 2.7, duration: 4.0 },
  { top: '33%', left: '26%', size: 2.2, delay: 0.6, duration: 3.5 },
  { top: '26%', left: '73%', size: 2.4, delay: 2.1, duration: 4.3 },
  { top: '35%', left: '85%', size: 2, delay: 1.5, duration: 3.7 },
  { top: '43%', left: '9%', size: 2, delay: 2.9, duration: 4.2 },
  { top: '47%', left: '91%', size: 2.2, delay: 0.7, duration: 3.9 },
  { top: '55%', left: '17%', size: 1.8, delay: 1.9, duration: 4.5 },
  { top: '57%', left: '82%', size: 1.8, delay: 2.5, duration: 3.6 },
  { top: '23%', left: '54%', size: 1.6, delay: 1.2, duration: 4.1 },
];

const LIGHT_RAIN_STREAKS = [
  { left: '8%', delay: 0.0, duration: 1.4, height: 88 },
  { left: '16%', delay: 0.55, duration: 1.2, height: 74 },
  { left: '24%', delay: 0.25, duration: 1.5, height: 96 },
  { left: '33%', delay: 0.85, duration: 1.3, height: 80 },
  { left: '44%', delay: 0.45, duration: 1.35, height: 70 },
  { left: '57%', delay: 0.72, duration: 1.45, height: 76 },
  { left: '67%', delay: 0.35, duration: 1.3, height: 92 },
  { left: '76%', delay: 0.95, duration: 1.2, height: 82 },
  { left: '84%', delay: 0.15, duration: 1.42, height: 90 },
  { left: '92%', delay: 0.68, duration: 1.28, height: 78 },
];

const HEAVY_RAIN_EXTRA = [
  { left: '12%', delay: 0.32, duration: 0.95, height: 112 },
  { left: '29%', delay: 0.62, duration: 0.9, height: 105 },
  { left: '71%', delay: 0.18, duration: 0.92, height: 115 },
  { left: '88%', delay: 0.48, duration: 0.88, height: 108 },
];

const WIND_STREAMS = [
  { top: '22%', width: 220, delay: 0.0, duration: 5.4, opacity: 0.36 },
  { top: '34%', width: 310, delay: 1.8, duration: 4.6, opacity: 0.30 },
  { top: '48%', width: 260, delay: 3.1, duration: 5.0, opacity: 0.34 },
  { top: '63%', width: 280, delay: 0.9, duration: 4.8, opacity: 0.28 },
  { top: '76%', width: 200, delay: 2.5, duration: 5.6, opacity: 0.24 },
];

const SNOW_MOTES = [
  { left: '7%', size: 3.5, delay: 0.2, duration: 8.5 },
  { left: '15%', size: 2.5, delay: 3.1, duration: 10.2 },
  { left: '24%', size: 4, delay: 1.6, duration: 7.8 },
  { left: '34%', size: 2.5, delay: 4.4, duration: 9.6 },
  { left: '46%', size: 3, delay: 2.3, duration: 8.9 },
  { left: '58%', size: 2.5, delay: 5.2, duration: 9.4 },
  { left: '69%', size: 3.5, delay: 1.1, duration: 8.3 },
  { left: '78%', size: 4, delay: 3.6, duration: 9.1 },
  { left: '86%', size: 2.5, delay: 0.7, duration: 10.0 },
  { left: '93%', size: 3, delay: 2.8, duration: 8.6 },
];

export function DesignWeatherStage({
  active,
  skyTheme,
}: DesignWeatherStageProps) {
  const rainStreaks =
    skyTheme.rainIntensity === 'heavy'
      ? [...LIGHT_RAIN_STREAKS, ...HEAVY_RAIN_EXTRA]
      : LIGHT_RAIN_STREAKS;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Dynamic Time-of-Day & Weather Sky Gradient */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyTheme.skyGradient }}
      />

      {/* 2. Breathing Celestial Radiance (Sun / Moon) */}
      <div
        className="design-sun-breathe absolute inset-0 transition-all duration-1000"
        style={{ background: skyTheme.celestialGlow }}
      />

      {/* 3. Atmospheric Horizon Glow */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{ background: skyTheme.horizonGlow }}
      />

      {/* 4. Sunny / Sunrise / Sunset Minimalistic Soft Light Shafts */}
      {skyTheme.showSunRays && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="design-sunbeam-sway absolute -top-24 right-[8%] w-[42vw] max-w-[560px] h-[110vh] origin-top"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,252,235,0.20) 0%, rgba(255,252,235,0.06) 52%, transparent 86%)',
              transform: 'rotate(20deg)',
              filter: 'blur(34px)',
            }}
          />
          <div
            className="design-sunbeam-sway-alt absolute -top-24 right-[22%] w-[28vw] max-w-[380px] h-[100vh] origin-top"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,250,224,0.14) 0%, rgba(255,250,224,0.04) 50%, transparent 82%)',
              transform: 'rotate(12deg)',
              filter: 'blur(28px)',
            }}
          />
        </div>
      )}

      {/* 5. Partly Cloudy / Overcast / Storm Soft Drifting Atmospheric Cloud Veils */}
      {skyTheme.showCloudVeil && (
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: skyTheme.cloudVeilOpacity }}
        >
          <div
            className="design-veil-drift absolute top-[8%] -left-[25%] w-[95vw] h-[42vh] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.44) 0%, rgba(226,232,240,0.16) 48%, transparent 74%)',
              filter: 'blur(52px)',
            }}
          />
          <div
            className="design-veil-drift-slow absolute top-[34%] -left-[20%] w-[85vw] h-[38vh] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(241,245,249,0.34) 0%, rgba(203,213,225,0.12) 50%, transparent 74%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
      )}

      {/* 6. Foggy / Misty Soft Layered Horizontal Mist Bands */}
      {skyTheme.showFogBands && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="design-fog-drift absolute top-[24%] -left-[18%] w-[136vw] h-[26vh]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(241,245,249,0.22) 28%, rgba(241,245,249,0.30) 54%, rgba(241,245,249,0.16) 78%, transparent 100%)',
              filter: 'blur(36px)',
            }}
          />
          <div
            className="design-fog-drift-reverse absolute top-[54%] -left-[18%] w-[136vw] h-[28vh]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(226,232,240,0.18) 25%, rgba(255,255,255,0.26) 52%, rgba(226,232,240,0.18) 80%, transparent 100%)',
              filter: 'blur(42px)',
            }}
          />
        </div>
      )}

      {/* 7. Windy Minimalistic Sleek Translucent Air-Stream Hairlines */}
      {skyTheme.showWindStreams && (
        <div className="absolute inset-0 overflow-hidden">
          {WIND_STREAMS.map((stream, idx) => (
            <span
              key={idx}
              className="design-wind-stream absolute -left-80 h-[1.5px] rounded-full"
              style={{
                top: stream.top,
                width: `${stream.width}px`,
                opacity: stream.opacity,
                animationDelay: `${stream.delay}s`,
                animationDuration: `${stream.duration}s`,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(240,249,255,0.85) 55%, rgba(255,255,255,0) 100%)',
              }}
            />
          ))}
        </div>
      )}

      {/* 8. Night & Twilight Minimalistic Twinkling Stars + Occasional Distant Shooting Line */}
      {skyTheme.showStars && (
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
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.85)',
              }}
            />
          ))}

          {skyTheme.showShootingStar && (
            <span
              className="design-shooting-line absolute top-[18%] -left-40 w-36 h-[1.5px] rounded-full"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(224,242,254,0.65) 70%, rgba(255,255,255,0.95) 100%)',
              }}
            />
          )}
        </div>
      )}

      {/* 9. Rainy / Stormy Minimalistic Fine Falling Rain Streaks */}
      {skyTheme.showRainStreaks && (
        <div className="absolute inset-0 overflow-hidden">
          {rainStreaks.map((streak, idx) => (
            <span
              key={idx}
              className="design-rain-streak absolute -top-28 w-px"
              style={{
                left: streak.left,
                height: `${streak.height}px`,
                animationDelay: `${streak.delay}s`,
                animationDuration: `${streak.duration}s`,
                background:
                  'linear-gradient(180deg, rgba(224,242,254,0) 0%, rgba(224,242,254,0.34) 70%, rgba(255,255,255,0.48) 100%)',
              }}
            />
          ))}
        </div>
      )}

      {/* 10. Snowy Minimalistic Drifting Snow Motes */}
      {skyTheme.showSnowMotes && (
        <div className="absolute inset-0 overflow-hidden">
          {SNOW_MOTES.map((mote, idx) => (
            <span
              key={idx}
              className="design-snow-mote absolute -top-4 rounded-full bg-white/80"
              style={{
                left: mote.left,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                animationDelay: `${mote.delay}s`,
                animationDuration: `${mote.duration}s`,
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.72)',
              }}
            />
          ))}
        </div>
      )}

      {/* 11. Stormy Distant Ambient Sheet-Lightning Shimmer */}
      {skyTheme.showStormFlash && (
        <div className="design-storm-flash absolute inset-0 bg-sky-200/20" />
      )}

      {/* Subtle Top Readability Scrim for Navbar Links on Bright Skies */}
      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{ background: skyTheme.topScrim }}
      />

      {/* Seamless Bottom Transition into the Dark #0C0C0C About Section */}
      <div
        className="absolute inset-x-0 bottom-0 h-36"
        style={{
          background:
            'linear-gradient(180deg, rgba(12,12,12,0) 0%, rgba(12,12,12,0.58) 68%, #0C0C0C 100%)',
        }}
      />
    </div>
  );
}
