import { useEffect, useState } from 'react';

export type TimePhase =
  | 'sunrise'
  | 'morning'
  | 'day'
  | 'sunset'
  | 'twilight'
  | 'night';

export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'rain'
  | 'storm'
  | 'snow'
  | 'windy';

export interface SkyToggleTheme {
  shellBg: string;
  shellBorder: string;
  shellShadow: string;
  activeBg: string;
  activeText: string;
  inactiveText: string;
}

export interface SkyButtonTheme {
  background: string;
  boxShadow: string;
  outlineColor: string;
  textColor: string;
}

export interface SkyTheme {
  timePhase: TimePhase;
  weather: WeatherCondition;
  skyGradient: string;
  celestialGlow: string;
  horizonGlow: string;
  topScrim: string;
  headingColor: string;
  headingTextShadow: string;
  navColor: string;
  taglineColor: string;
  textShadow: string;
  portraitFilter: string;
  toggle: SkyToggleTheme;
  button: SkyButtonTheme;
  // Minimalistic background animation flags
  showSunRays: boolean;
  showStars: boolean;
  showShootingStar: boolean;
  showCloudVeil: boolean;
  cloudVeilOpacity: number;
  showWindStreams: boolean;
  showFogBands: boolean;
  showRainStreaks: boolean;
  rainIntensity: 'light' | 'heavy';
  showSnowMotes: boolean;
  showStormFlash: boolean;
}

export interface VisitorAtmosphere {
  timePhase: TimePhase;
  weather: WeatherCondition;
  skyTheme: SkyTheme;
  isDay: boolean;
  resolved: boolean;
}

function parseIsoHour(isoString?: string): number | null {
  if (!isoString) return null;
  const match = isoString.match(/T(\d{2}):(\d{2})/);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h + m / 60;
}

function resolveTimePhase(
  localHour: number,
  sunriseHour = 6.25,
  sunsetHour = 18.25
): TimePhase {
  if (localHour >= sunriseHour - 0.75 && localHour < sunriseHour + 1.2) {
    return 'sunrise';
  }
  if (localHour >= sunriseHour + 1.2 && localHour < 11.5) {
    return 'morning';
  }
  if (localHour >= 11.5 && localHour < sunsetHour - 1.35) {
    return 'day';
  }
  if (localHour >= sunsetHour - 1.35 && localHour < sunsetHour + 0.75) {
    return 'sunset';
  }
  if (localHour >= sunsetHour + 0.75 && localHour < sunsetHour + 1.75) {
    return 'twilight';
  }
  return 'night';
}

function mapWmoWeatherCode(
  code: number,
  windSpeedKmh: number,
  cloudCover: number
): WeatherCondition {
  if (code === 95 || code === 96 || code === 99) return 'storm';
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return 'snow';
  }
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return 'rain';
  }
  if (code === 45 || code === 48) return 'fog';
  if (windSpeedKmh >= 24 && code <= 3) return 'windy';
  if (code === 3 || cloudCover >= 80) return 'cloudy';
  if (code === 1 || code === 2 || cloudCover >= 25) return 'partly-cloudy';
  return 'clear';
}

const DARK_GLASS_TOGGLE: SkyToggleTheme = {
  shellBg: 'rgba(10, 15, 28, 0.72)',
  shellBorder: 'rgba(226, 238, 248, 0.34)',
  shellShadow: '0 8px 24px rgba(0, 0, 0, 0.42)',
  activeBg: '#F1F5F9',
  activeText: '#090D16',
  inactiveText: 'rgba(241, 245, 249, 0.85)',
};

const DAY_SKY_TOGGLE: SkyToggleTheme = {
  shellBg: 'rgba(8, 28, 56, 0.62)',
  shellBorder: 'rgba(255, 255, 255, 0.38)',
  shellShadow: '0 8px 24px rgba(8, 35, 72, 0.28)',
  activeBg: '#FFFFFF',
  activeText: '#0B2447',
  inactiveText: 'rgba(255, 255, 255, 0.90)',
};

const WARM_HORIZON_TOGGLE: SkyToggleTheme = {
  shellBg: 'rgba(38, 14, 30, 0.66)',
  shellBorder: 'rgba(254, 215, 170, 0.45)',
  shellShadow: '0 8px 26px rgba(45, 12, 24, 0.38)',
  activeBg: '#FFF7ED',
  activeText: '#2A0F1D',
  inactiveText: 'rgba(255, 237, 213, 0.92)',
};

const SLATE_COOL_TOGGLE: SkyToggleTheme = {
  shellBg: 'rgba(15, 23, 42, 0.68)',
  shellBorder: 'rgba(226, 232, 240, 0.38)',
  shellShadow: '0 8px 24px rgba(15, 23, 42, 0.36)',
  activeBg: '#F8FAFC',
  activeText: '#0F172A',
  inactiveText: 'rgba(241, 245, 249, 0.88)',
};

const DAY_SKY_BUTTON: SkyButtonTheme = {
  background: 'linear-gradient(135deg, #09203F 0%, #164E8A 58%, #0284C7 100%)',
  boxShadow: '0 8px 22px rgba(8, 36, 72, 0.36), inset 0 1px 1px rgba(255,255,255,0.28)',
  outlineColor: 'rgba(255, 255, 255, 0.92)',
  textColor: '#FFFFFF',
};

const WARM_HORIZON_BUTTON: SkyButtonTheme = {
  background: 'linear-gradient(135deg, #2D0F24 0%, #832245 55%, #C2410C 100%)',
  boxShadow: '0 8px 24px rgba(59, 7, 36, 0.42), inset 0 1px 1px rgba(255,237,213,0.28)',
  outlineColor: 'rgba(255, 247, 237, 0.92)',
  textColor: '#FFFBF5',
};

const NIGHT_BUTTON: SkyButtonTheme = {
  background: 'linear-gradient(135deg, #172554 0%, #3730A3 55%, #0369A1 100%)',
  boxShadow: '0 8px 26px rgba(15, 23, 66, 0.55), inset 0 1px 1px rgba(191,219,254,0.32)',
  outlineColor: 'rgba(224, 242, 254, 0.90)',
  textColor: '#FFFFFF',
};

const COOL_WEATHER_BUTTON: SkyButtonTheme = {
  background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 60%, #334155 100%)',
  boxShadow: '0 8px 24px rgba(15, 23, 42, 0.45), inset 0 1px 1px rgba(226,232,240,0.25)',
  outlineColor: 'rgba(241, 245, 249, 0.90)',
  textColor: '#FFFFFF',
};

const SNOW_BUTTON: SkyButtonTheme = {
  background: 'linear-gradient(135deg, #0C2340 0%, #1D4E89 60%, #0284C7 100%)',
  boxShadow: '0 8px 22px rgba(12, 35, 64, 0.36), inset 0 1px 1px rgba(224,242,254,0.35)',
  outlineColor: 'rgba(240, 249, 255, 0.95)',
  textColor: '#FFFFFF',
};

const STORM_BUTTON: SkyButtonTheme = {
  background: 'linear-gradient(135deg, #0F172A 0%, #312E81 58%, #475569 100%)',
  boxShadow: '0 8px 26px rgba(2, 6, 23, 0.55), inset 0 1px 1px rgba(199,210,254,0.28)',
  outlineColor: 'rgba(226, 232, 240, 0.90)',
  textColor: '#FFFFFF',
};

export function buildSkyTheme(
  timePhase: TimePhase,
  weather: WeatherCondition
): SkyTheme {
  const isNightLike = timePhase === 'night' || timePhase === 'twilight';
  const isHorizon = timePhase === 'sunrise' || timePhase === 'sunset';

  const baseFlags = {
    showSunRays: false,
    showStars: false,
    showShootingStar: false,
    showCloudVeil: false,
    cloudVeilOpacity: 0,
    showWindStreams: false,
    showFogBands: false,
    showRainStreaks: false,
    rainIntensity: 'light' as 'light' | 'heavy',
    showSnowMotes: false,
    showStormFlash: false,
  };

  // 1. STORMY (Thunderstorms)
  if (weather === 'storm') {
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #04060E 0%, #0C1326 44%, #1A2540 80%, #0E1320 100%)'
        : isHorizon
        ? 'linear-gradient(180deg, #131126 0%, #2A2242 46%, #4D3854 78%, #1E182B 100%)'
        : 'linear-gradient(180deg, #101829 0%, #22314A 46%, #364763 78%, #182130 100%)',
      celestialGlow:
        'radial-gradient(circle at 66% 24%, rgba(129, 161, 224, 0.24) 0%, transparent 56%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 92%, rgba(99, 126, 179, 0.26) 0%, transparent 62%)',
      topScrim: 'linear-gradient(180deg, rgba(2,6,23,0.34) 0%, transparent 100%)',
      headingColor: '#F1F5F9',
      headingTextShadow: '0 8px 30px rgba(2, 6, 23, 0.65)',
      navColor: '#F1F5F9',
      taglineColor: '#E2E8F0',
      textShadow: '0 2px 12px rgba(2, 6, 23, 0.6)',
      portraitFilter:
        'drop-shadow(0 18px 44px rgba(2, 6, 23, 0.62)) drop-shadow(0 0 32px rgba(148, 163, 184, 0.16))',
      toggle: DARK_GLASS_TOGGLE,
      button: STORM_BUTTON,
      showCloudVeil: true,
      cloudVeilOpacity: 0.34,
      showRainStreaks: true,
      rainIntensity: 'heavy',
      showStormFlash: true,
    };
  }

  // 2. RAINY / DRIZZLE
  if (weather === 'rain') {
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #050C17 0%, #0F1F33 46%, #1B334D 82%, #0D1724 100%)'
        : isHorizon
        ? 'linear-gradient(180deg, #1D283D 0%, #3A4B63 46%, #746778 78%, #343447 100%)'
        : 'linear-gradient(180deg, #1D344A 0%, #34526E 46%, #577894 82%, #2F4559 100%)',
      celestialGlow:
        'radial-gradient(circle at 50% 22%, rgba(186, 218, 245, 0.20) 0%, transparent 58%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 92%, rgba(148, 188, 218, 0.24) 0%, transparent 64%)',
      topScrim: 'linear-gradient(180deg, rgba(8,18,32,0.32) 0%, transparent 100%)',
      headingColor: '#F8FAFC',
      headingTextShadow: '0 6px 26px rgba(10, 22, 38, 0.5)',
      navColor: '#F8FAFC',
      taglineColor: '#E2E8F0',
      textShadow: '0 2px 10px rgba(10, 22, 38, 0.48)',
      portraitFilter:
        'drop-shadow(0 18px 40px rgba(10, 22, 38, 0.48)) drop-shadow(0 0 28px rgba(125, 211, 252, 0.14))',
      toggle: SLATE_COOL_TOGGLE,
      button: COOL_WEATHER_BUTTON,
      showCloudVeil: true,
      cloudVeilOpacity: 0.26,
      showRainStreaks: true,
      rainIntensity: 'light',
    };
  }

  // 3. SNOWY (Cold Regions)
  if (weather === 'snow') {
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #071224 0%, #122845 46%, #24456B 82%, #101E33 100%)'
        : isHorizon
        ? 'linear-gradient(180deg, #2B3B5E 0%, #61749C 46%, #C4B4C9 80%, #585D78 100%)'
        : 'linear-gradient(180deg, #2D5A85 0%, #5E8EB8 46%, #A8CCE6 82%, #5D82A3 100%)',
      celestialGlow:
        'radial-gradient(circle at 54% 22%, rgba(224, 242, 254, 0.36) 0%, transparent 58%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 90%, rgba(224, 242, 254, 0.32) 0%, transparent 65%)',
      topScrim: 'linear-gradient(180deg, rgba(12,35,64,0.34) 0%, transparent 100%)',
      headingColor: '#FFFFFF',
      headingTextShadow: '0 6px 26px rgba(12, 35, 64, 0.44)',
      navColor: '#FFFFFF',
      taglineColor: '#F0F9FF',
      textShadow: '0 2px 12px rgba(12, 35, 64, 0.45)',
      portraitFilter:
        'drop-shadow(0 16px 38px rgba(12, 35, 64, 0.38)) drop-shadow(0 0 34px rgba(224, 242, 254, 0.24))',
      toggle: isNightLike ? DARK_GLASS_TOGGLE : DAY_SKY_TOGGLE,
      button: SNOW_BUTTON,
      showStars: isNightLike,
      showSnowMotes: true,
      showFogBands: true,
    };
  }

  // 4. FOGGY / MISTY
  if (weather === 'fog') {
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #0D151F 0%, #1C2A38 48%, #304254 84%, #151E29 100%)'
        : isHorizon
        ? 'linear-gradient(180deg, #434761 0%, #7B748A 46%, #C2A8A8 80%, #5F5361 100%)'
        : 'linear-gradient(180deg, #42586B 0%, #6E8599 48%, #A6BAC9 84%, #5A6F82 100%)',
      celestialGlow:
        'radial-gradient(circle at 50% 34%, rgba(241, 245, 249, 0.28) 0%, transparent 62%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 88%, rgba(226, 232, 240, 0.32) 0%, transparent 68%)',
      topScrim: 'linear-gradient(180deg, rgba(15,23,42,0.34) 0%, transparent 100%)',
      headingColor: '#FFFFFF',
      headingTextShadow: '0 6px 26px rgba(15, 23, 42, 0.44)',
      navColor: '#FFFFFF',
      taglineColor: '#F1F5F9',
      textShadow: '0 2px 12px rgba(15, 23, 42, 0.44)',
      portraitFilter:
        'drop-shadow(0 16px 38px rgba(15, 23, 42, 0.38)) drop-shadow(0 0 30px rgba(241, 245, 249, 0.20))',
      toggle: isHorizon ? WARM_HORIZON_TOGGLE : SLATE_COOL_TOGGLE,
      button: isHorizon ? WARM_HORIZON_BUTTON : COOL_WEATHER_BUTTON,
      showFogBands: true,
    };
  }

  // 5. CLOUDY / OVERCAST
  if (weather === 'cloudy') {
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #090E17 0%, #152030 48%, #25344A 84%, #111826 100%)'
        : isHorizon
        ? 'linear-gradient(180deg, #2B2F4A 0%, #5A516B 44%, #A37278 78%, #453545 100%)'
        : 'linear-gradient(180deg, #354961 0%, #5B728C 48%, #8BA1B8 84%, #4B6078 100%)',
      celestialGlow:
        'radial-gradient(circle at 56% 24%, rgba(226, 232, 240, 0.24) 0%, transparent 56%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 90%, rgba(203, 213, 225, 0.24) 0%, transparent 65%)',
      topScrim: 'linear-gradient(180deg, rgba(15,23,42,0.34) 0%, transparent 100%)',
      headingColor: '#FFFFFF',
      headingTextShadow: '0 6px 26px rgba(15, 23, 42, 0.46)',
      navColor: '#F8FAFC',
      taglineColor: '#F1F5F9',
      textShadow: '0 2px 12px rgba(15, 23, 42, 0.44)',
      portraitFilter: 'drop-shadow(0 16px 40px rgba(15, 23, 42, 0.44))',
      toggle: isHorizon ? WARM_HORIZON_TOGGLE : SLATE_COOL_TOGGLE,
      button: isHorizon ? WARM_HORIZON_BUTTON : COOL_WEATHER_BUTTON,
      showCloudVeil: true,
      cloudVeilOpacity: 0.46,
    };
  }

  // 6. WINDY
  if (weather === 'windy') {
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #05101F 0%, #0E233B 46%, #1B3E5C 84%, #0B1929 100%)'
        : isHorizon
        ? 'linear-gradient(180deg, #1E2E52 0%, #4E5B80 42%, #C97D6D 74%, #E8B584 94%, #4D3847 100%)'
        : 'linear-gradient(180deg, #0E5485 0%, #247FB0 46%, #6FC0DB 82%, #397CA1 100%)',
      celestialGlow: isNightLike
        ? 'radial-gradient(circle at 75% 22%, rgba(186, 230, 253, 0.24) 0%, transparent 56%)'
        : 'radial-gradient(circle at 74% 24%, rgba(240, 249, 255, 0.42) 0%, transparent 60%)',
      horizonGlow: isHorizon
        ? 'radial-gradient(ellipse at 50% 92%, rgba(251, 146, 60, 0.44) 0%, transparent 68%)'
        : 'radial-gradient(ellipse at 50% 92%, rgba(186, 230, 253, 0.34) 0%, transparent 66%)',
      topScrim: 'linear-gradient(180deg, rgba(8,28,50,0.32) 0%, transparent 100%)',
      headingColor: isHorizon ? '#FFFBF2' : '#FFFFFF',
      headingTextShadow: isHorizon
        ? '0 6px 28px rgba(59, 17, 36, 0.46)'
        : '0 6px 26px rgba(8, 42, 72, 0.42)',
      navColor: '#FFFFFF',
      taglineColor: '#F0F9FF',
      textShadow: '0 2px 12px rgba(8, 36, 64, 0.44)',
      portraitFilter:
        'drop-shadow(0 18px 40px rgba(8, 36, 64, 0.38)) drop-shadow(0 0 34px rgba(186, 230, 253, 0.22))',
      toggle: isNightLike
        ? DARK_GLASS_TOGGLE
        : isHorizon
        ? WARM_HORIZON_TOGGLE
        : DAY_SKY_TOGGLE,
      button: isNightLike
        ? NIGHT_BUTTON
        : isHorizon
        ? WARM_HORIZON_BUTTON
        : DAY_SKY_BUTTON,
      showStars: isNightLike,
      showWindStreams: true,
      showCloudVeil: true,
      cloudVeilOpacity: 0.22,
    };
  }

  // 7. PARTLY CLOUDY
  if (weather === 'partly-cloudy') {
    if (timePhase === 'sunrise') {
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #25335E 0%, #6A5D8F 30%, #CC8393 56%, #F2A885 78%, #F8DFB8 95%, #69444B 100%)',
        celestialGlow:
          'radial-gradient(circle at 74% 66%, rgba(254, 240, 138, 0.46) 0%, transparent 60%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(253, 186, 116, 0.44) 0%, transparent 72%)',
        topScrim: 'linear-gradient(180deg, rgba(30,22,52,0.34) 0%, transparent 100%)',
        headingColor: '#FFFDF7',
        headingTextShadow: '0 6px 28px rgba(62, 22, 24, 0.45)',
        navColor: '#FFF7ED',
        taglineColor: '#FFEDD5',
        textShadow: '0 2px 12px rgba(62, 22, 24, 0.45)',
        portraitFilter:
          'drop-shadow(0 16px 40px rgba(62, 22, 24, 0.34)) drop-shadow(0 0 36px rgba(253, 186, 116, 0.28))',
        toggle: WARM_HORIZON_TOGGLE,
        button: WARM_HORIZON_BUTTON,
        showSunRays: true,
        showCloudVeil: true,
        cloudVeilOpacity: 0.34,
      };
    }
    if (timePhase === 'sunset') {
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #1E1D45 0%, #583578 30%, #B8527B 56%, #E88266 78%, #F4C284 95%, #523044 100%)',
        celestialGlow:
          'radial-gradient(circle at 26% 68%, rgba(253, 224, 71, 0.42) 0%, transparent 60%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(251, 146, 60, 0.46) 0%, transparent 72%)',
        topScrim: 'linear-gradient(180deg, rgba(24,16,50,0.34) 0%, transparent 100%)',
        headingColor: '#FFFBF2',
        headingTextShadow: '0 6px 28px rgba(52, 12, 38, 0.5)',
        navColor: '#FFF7ED',
        taglineColor: '#FFEDD5',
        textShadow: '0 2px 12px rgba(52, 12, 38, 0.48)',
        portraitFilter:
          'drop-shadow(0 18px 42px rgba(52, 12, 38, 0.42)) drop-shadow(0 0 38px rgba(251, 146, 60, 0.28))',
        toggle: WARM_HORIZON_TOGGLE,
        button: WARM_HORIZON_BUTTON,
        showSunRays: true,
        showCloudVeil: true,
        cloudVeilOpacity: 0.36,
      };
    }
    if (isNightLike) {
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          timePhase === 'twilight'
            ? 'linear-gradient(180deg, #090E24 0%, #1D254D 44%, #42396B 76%, #1A1A2E 100%)'
            : 'linear-gradient(180deg, #070D1C 0%, #12213B 46%, #223759 84%, #0E1626 100%)',
        celestialGlow:
          'radial-gradient(circle at 74% 22%, rgba(191, 219, 254, 0.24) 0%, transparent 58%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(96, 138, 196, 0.22) 0%, transparent 66%)',
        topScrim: 'linear-gradient(180deg, rgba(4,8,20,0.32) 0%, transparent 100%)',
        headingColor: '#EBF3FA',
        headingTextShadow: '0 8px 28px rgba(2, 6, 23, 0.58)',
        navColor: '#E2EDF7',
        taglineColor: '#D7E2EA',
        textShadow: '0 2px 10px rgba(2, 6, 23, 0.52)',
        portraitFilter:
          'drop-shadow(0 18px 44px rgba(2, 6, 23, 0.56)) drop-shadow(0 0 34px rgba(147, 197, 253, 0.16))',
        toggle: DARK_GLASS_TOGGLE,
        button: NIGHT_BUTTON,
        showStars: true,
        showCloudVeil: true,
        cloudVeilOpacity: 0.30,
      };
    }
    // Morning / Day partly cloudy
    return {
      ...baseFlags,
      timePhase,
      weather,
      skyGradient:
        timePhase === 'morning'
          ? 'linear-gradient(180deg, #216AB0 0%, #4D98D8 46%, #9BCBEE 82%, #5A94C4 100%)'
          : 'linear-gradient(180deg, #1A5C9E 0%, #3E87C9 46%, #88BEE6 82%, #4B81B5 100%)',
      celestialGlow:
        'radial-gradient(circle at 74% 20%, rgba(255, 251, 230, 0.44) 0%, transparent 58%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 92%, rgba(224, 242, 254, 0.38) 0%, transparent 66%)',
      topScrim: 'linear-gradient(180deg, rgba(12,48,88,0.32) 0%, transparent 100%)',
      headingColor: '#FFFFFF',
      headingTextShadow: '0 6px 26px rgba(10, 44, 82, 0.40)',
      navColor: '#FFFFFF',
      taglineColor: '#F0F9FF',
      textShadow: '0 2px 12px rgba(10, 44, 82, 0.42)',
      portraitFilter:
        'drop-shadow(0 18px 40px rgba(10, 44, 82, 0.34)) drop-shadow(0 0 36px rgba(224, 242, 254, 0.28))',
      toggle: DAY_SKY_TOGGLE,
      button: DAY_SKY_BUTTON,
      showSunRays: true,
      showCloudVeil: true,
      cloudVeilOpacity: 0.34,
    };
  }

  // 8. SUNNY / CLEAR — Full Time-of-Day Progression
  switch (timePhase) {
    case 'sunrise':
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #1E2952 0%, #5B4B8A 26%, #C86D85 52%, #F4976C 76%, #FDE2A8 95%, #7C443C 100%)',
        celestialGlow:
          'radial-gradient(circle at 74% 68%, rgba(254, 240, 138, 0.58) 0%, rgba(251, 146, 60, 0.28) 34%, transparent 64%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(253, 186, 116, 0.56) 0%, rgba(244, 114, 182, 0.22) 48%, transparent 74%)',
        topScrim: 'linear-gradient(180deg, rgba(30,22,58,0.32) 0%, transparent 100%)',
        headingColor: '#FFFBF2',
        headingTextShadow: '0 6px 28px rgba(67, 20, 7, 0.46)',
        navColor: '#FFF7ED',
        taglineColor: '#FFEDD5',
        textShadow: '0 2px 12px rgba(67, 20, 7, 0.46)',
        portraitFilter:
          'drop-shadow(0 16px 40px rgba(67, 20, 7, 0.36)) drop-shadow(0 0 42px rgba(253, 186, 116, 0.34))',
        toggle: WARM_HORIZON_TOGGLE,
        button: WARM_HORIZON_BUTTON,
        showSunRays: true,
      };

    case 'morning':
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #0F67C2 0%, #2F96EE 44%, #7AD0FC 80%, #4A9AD6 100%)',
        celestialGlow:
          'radial-gradient(circle at 78% 20%, rgba(255, 250, 214, 0.56) 0%, rgba(186, 230, 253, 0.26) 36%, transparent 64%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(224, 242, 254, 0.44) 0%, transparent 66%)',
        topScrim: 'linear-gradient(180deg, rgba(10,50,96,0.30) 0%, transparent 100%)',
        headingColor: '#FFFFFF',
        headingTextShadow: '0 6px 28px rgba(10, 56, 98, 0.38)',
        navColor: '#FFFFFF',
        taglineColor: '#F0F9FF',
        textShadow: '0 2px 10px rgba(10, 56, 98, 0.38)',
        portraitFilter:
          'drop-shadow(0 18px 40px rgba(10, 56, 98, 0.34)) drop-shadow(0 0 40px rgba(224, 242, 254, 0.32))',
        toggle: DAY_SKY_TOGGLE,
        button: DAY_SKY_BUTTON,
        showSunRays: true,
      };

    case 'day':
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #0B52A6 0%, #207ED6 45%, #63B8F5 82%, #3A80C2 100%)',
        celestialGlow:
          'radial-gradient(circle at 68% 18%, rgba(255, 252, 224, 0.52) 0%, rgba(147, 197, 253, 0.24) 38%, transparent 65%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(186, 230, 253, 0.40) 0%, transparent 66%)',
        topScrim: 'linear-gradient(180deg, rgba(8,42,88,0.30) 0%, transparent 100%)',
        headingColor: '#FFFFFF',
        headingTextShadow: '0 6px 28px rgba(10, 46, 92, 0.40)',
        navColor: '#FFFFFF',
        taglineColor: '#F0F9FF',
        textShadow: '0 2px 10px rgba(10, 46, 92, 0.40)',
        portraitFilter:
          'drop-shadow(0 18px 40px rgba(10, 46, 92, 0.36)) drop-shadow(0 0 38px rgba(186, 230, 253, 0.28))',
        toggle: DAY_SKY_TOGGLE,
        button: DAY_SKY_BUTTON,
        showSunRays: true,
      };

    case 'sunset':
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #17153B 0%, #4A246D 26%, #B83B6F 52%, #F06C4E 76%, #FBBF5C 94%, #5A2838 100%)',
        celestialGlow:
          'radial-gradient(circle at 26% 70%, rgba(253, 224, 71, 0.54) 0%, rgba(249, 115, 22, 0.28) 36%, transparent 66%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(251, 146, 60, 0.58) 0%, rgba(219, 39, 119, 0.24) 48%, transparent 74%)',
        topScrim: 'linear-gradient(180deg, rgba(23,16,52,0.34) 0%, transparent 100%)',
        headingColor: '#FFF8EC',
        headingTextShadow: '0 6px 30px rgba(59, 7, 36, 0.52)',
        navColor: '#FFF7ED',
        taglineColor: '#FFEDD5',
        textShadow: '0 2px 12px rgba(59, 7, 36, 0.48)',
        portraitFilter:
          'drop-shadow(0 18px 42px rgba(59, 7, 36, 0.44)) drop-shadow(0 0 42px rgba(251, 146, 60, 0.34))',
        toggle: WARM_HORIZON_TOGGLE,
        button: WARM_HORIZON_BUTTON,
        showSunRays: true,
      };

    case 'twilight':
      return {
        ...baseFlags,
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #070B1E 0%, #161C45 42%, #3B2D66 74%, #6D446B 92%, #181426 100%)',
        celestialGlow:
          'radial-gradient(circle at 75% 24%, rgba(196, 181, 253, 0.28) 0%, transparent 56%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(244, 114, 182, 0.28) 0%, rgba(99, 102, 241, 0.16) 46%, transparent 72%)',
        topScrim: 'linear-gradient(180deg, rgba(7,11,30,0.30) 0%, transparent 100%)',
        headingColor: '#F5F3FF',
        headingTextShadow: '0 8px 28px rgba(7, 11, 30, 0.56)',
        navColor: '#F5F3FF',
        taglineColor: '#EDE9FE',
        textShadow: '0 2px 12px rgba(7, 11, 30, 0.52)',
        portraitFilter:
          'drop-shadow(0 18px 44px rgba(7, 11, 30, 0.56)) drop-shadow(0 0 36px rgba(167, 139, 250, 0.24))',
        toggle: DARK_GLASS_TOGGLE,
        button: NIGHT_BUTTON,
        showStars: true,
        showShootingStar: true,
      };

    case 'night':
    default:
      return {
        ...baseFlags,
        timePhase: 'night',
        weather,
        skyGradient:
          'linear-gradient(180deg, #030612 0%, #081229 48%, #122244 84%, #0B0F1A 100%)',
        celestialGlow:
          'radial-gradient(circle at 76% 22%, rgba(186, 218, 255, 0.26) 0%, rgba(96, 165, 250, 0.08) 38%, transparent 62%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(56, 107, 178, 0.22) 0%, transparent 66%)',
        topScrim: 'linear-gradient(180deg, rgba(3,6,18,0.28) 0%, transparent 100%)',
        headingColor: '#E8F0F8',
        headingTextShadow: '0 8px 28px rgba(2, 6, 23, 0.65)',
        navColor: '#E2EDF7',
        taglineColor: '#D7E2EA',
        textShadow: '0 2px 10px rgba(2, 6, 23, 0.55)',
        portraitFilter:
          'drop-shadow(0 18px 44px rgba(2, 6, 23, 0.62)) drop-shadow(0 0 36px rgba(147, 197, 253, 0.16))',
        toggle: DARK_GLASS_TOGGLE,
        button: NIGHT_BUTTON,
        showStars: true,
        showShootingStar: true,
      };
  }
}

async function fetchJsonWithTimeout<T>(url: string, ms = 4500): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    window.clearTimeout(timer);
  }
}

async function resolveApproxIpCoords(): Promise<{
  latitude: number;
  longitude: number;
} | null> {
  try {
    const d = await fetchJsonWithTimeout<{
      success?: boolean;
      latitude?: number;
      longitude?: number;
    }>('https://ipwho.is/', 4000);
    if (
      d &&
      d.success !== false &&
      typeof d.latitude === 'number' &&
      typeof d.longitude === 'number'
    ) {
      return { latitude: d.latitude, longitude: d.longitude };
    }
  } catch {
    // Fall through
  }

  try {
    const d = await fetchJsonWithTimeout<{
      latitude?: string | number;
      longitude?: string | number;
    }>('https://get.geojs.io/v1/ip/geo.json', 4000);
    const lat = Number(d?.latitude);
    const lon = Number(d?.longitude);
    if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
      return { latitude: lat, longitude: lon };
    }
  } catch {
    // Fall through
  }

  try {
    const d = await fetchJsonWithTimeout<{
      latitude?: number;
      longitude?: number;
    }>('https://ipapi.co/json/', 4000);
    if (typeof d?.latitude === 'number' && typeof d?.longitude === 'number') {
      return { latitude: d.latitude, longitude: d.longitude };
    }
  } catch {
    // Fallback to local clock
  }

  return null;
}

function getInitialClockAtmosphere(): VisitorAtmosphere {
  const now = new Date();
  const localHour = now.getHours() + now.getMinutes() / 60;
  const timePhase = resolveTimePhase(localHour);
  const weather: WeatherCondition = 'clear';
  return {
    timePhase,
    weather,
    skyTheme: buildSkyTheme(timePhase, weather),
    isDay: timePhase !== 'night' && timePhase !== 'twilight',
    resolved: false,
  };
}

export function useVisitorWeather(): VisitorAtmosphere {
  const [atmosphere, setAtmosphere] = useState<VisitorAtmosphere>(
    getInitialClockAtmosphere
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAtmosphere() {
      const coords = await resolveApproxIpCoords();
      if (cancelled || !coords) return;

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${encodeURIComponent(coords.latitude.toFixed(3))}` +
          `&longitude=${encodeURIComponent(coords.longitude.toFixed(3))}` +
          `&current=temperature_2m,weather_code,is_day,cloud_cover,wind_speed_10m,precipitation` +
          `&daily=sunrise,sunset` +
          `&timezone=auto`;

        const data = await fetchJsonWithTimeout<{
          current?: {
            time?: string;
            weather_code?: number;
            is_day?: number;
            cloud_cover?: number;
            wind_speed_10m?: number;
          };
          daily?: {
            sunrise?: string[];
            sunset?: string[];
          };
        }>(url, 5000);

        if (cancelled || !data?.current) return;

        const now = new Date();
        const fallbackHour = now.getHours() + now.getMinutes() / 60;
        const localHour = parseIsoHour(data.current.time) ?? fallbackHour;
        const sunriseHour = parseIsoHour(data.daily?.sunrise?.[0]) ?? 6.25;
        const sunsetHour = parseIsoHour(data.daily?.sunset?.[0]) ?? 18.25;

        const timePhase = resolveTimePhase(localHour, sunriseHour, sunsetHour);
        const weather = mapWmoWeatherCode(
          data.current.weather_code ?? 0,
          data.current.wind_speed_10m ?? 0,
          data.current.cloud_cover ?? 0
        );
        const isDay =
          typeof data.current.is_day === 'number'
            ? data.current.is_day === 1
            : timePhase !== 'night' && timePhase !== 'twilight';

        setAtmosphere({
          timePhase,
          weather,
          skyTheme: buildSkyTheme(timePhase, weather),
          isDay,
          resolved: true,
        });
      } catch {
        // Keep local clock atmosphere gracefully
      }
    }

    loadAtmosphere();
    return () => {
      cancelled = true;
    };
  }, []);

  return atmosphere;
}
