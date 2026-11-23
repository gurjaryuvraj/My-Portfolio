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

export interface SkyTheme {
  timePhase: TimePhase;
  weather: WeatherCondition;
  skyGradient: string;
  celestialGlow: string;
  horizonGlow: string;
  isBrightSky: boolean;
  headingColor: string;
  headingTextShadow: string;
  textColorClass: string;
  textShadow: string;
  portraitFilter: string;
  showAmbientStars: boolean;
  showStormFlash: boolean;
  showSubtleRain: boolean;
  showSubtleSnow: boolean;
  showSubtleMist: boolean;
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
  if (windSpeedKmh >= 26 && code <= 3) return 'windy';
  if (code === 3 || cloudCover >= 82) return 'cloudy';
  if (code === 1 || code === 2 || cloudCover >= 28) return 'partly-cloudy';
  return 'clear';
}

export function buildSkyTheme(
  timePhase: TimePhase,
  weather: WeatherCondition
): SkyTheme {
  const isNightLike = timePhase === 'night' || timePhase === 'twilight';

  // 1. Thunderstorm
  if (weather === 'storm') {
    return {
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #060812 0%, #101729 48%, #1C2640 82%, #111624 100%)'
        : 'linear-gradient(180deg, #161F30 0%, #27354D 45%, #3C4D68 78%, #1F2838 100%)',
      celestialGlow:
        'radial-gradient(circle at 65% 24%, rgba(125, 162, 224, 0.22) 0%, transparent 56%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 92%, rgba(99, 126, 179, 0.24) 0%, transparent 62%)',
      isBrightSky: false,
      headingColor: '#E8EFF7',
      headingTextShadow: '0 8px 28px rgba(2, 6, 23, 0.55)',
      textColorClass: 'text-[#E2E8F0]',
      textShadow: '0 2px 12px rgba(2, 6, 23, 0.55)',
      portraitFilter:
        'drop-shadow(0 18px 44px rgba(15, 23, 42, 0.58)) drop-shadow(0 0 32px rgba(148, 163, 184, 0.16))',
      showAmbientStars: false,
      showStormFlash: true,
      showSubtleRain: true,
      showSubtleSnow: false,
      showSubtleMist: false,
    };
  }

  // 2. Rain / Drizzle
  if (weather === 'rain') {
    return {
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #060C16 0%, #101E30 48%, #1B3048 84%, #101A28 100%)'
        : timePhase === 'sunrise' || timePhase === 'sunset'
        ? 'linear-gradient(180deg, #212C40 0%, #3E4C63 45%, #736C7B 78%, #3B3B4B 100%)'
        : 'linear-gradient(180deg, #253A52 0%, #3E5874 48%, #63809C 82%, #394E63 100%)',
      celestialGlow:
        'radial-gradient(circle at 50% 25%, rgba(186, 214, 240, 0.20) 0%, transparent 60%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 92%, rgba(148, 184, 214, 0.24) 0%, transparent 64%)',
      isBrightSky: false,
      headingColor: '#F1F5F9',
      headingTextShadow: '0 6px 26px rgba(15, 23, 42, 0.45)',
      textColorClass: 'text-[#F1F5F9]',
      textShadow: '0 2px 10px rgba(15, 23, 42, 0.45)',
      portraitFilter:
        'drop-shadow(0 18px 40px rgba(15, 23, 42, 0.46)) drop-shadow(0 0 28px rgba(125, 211, 252, 0.14))',
      showAmbientStars: false,
      showStormFlash: false,
      showSubtleRain: true,
      showSubtleSnow: false,
      showSubtleMist: false,
    };
  }

  // 3. Snow
  if (weather === 'snow') {
    return {
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #091324 0%, #162945 48%, #284266 84%, #131F33 100%)'
        : 'linear-gradient(180deg, #3C6389 0%, #6D94B8 46%, #AFCADF 82%, #6E8BA6 100%)',
      celestialGlow:
        'radial-gradient(circle at 52% 24%, rgba(224, 242, 254, 0.34) 0%, transparent 58%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 90%, rgba(226, 240, 255, 0.30) 0%, transparent 65%)',
      isBrightSky: !isNightLike,
      headingColor: '#FFFFFF',
      headingTextShadow: '0 6px 24px rgba(15, 38, 66, 0.38)',
      textColorClass: 'text-white',
      textShadow: '0 2px 12px rgba(15, 38, 66, 0.38)',
      portraitFilter:
        'drop-shadow(0 16px 38px rgba(15, 38, 66, 0.36)) drop-shadow(0 0 34px rgba(224, 242, 254, 0.22))',
      showAmbientStars: isNightLike,
      showStormFlash: false,
      showSubtleRain: false,
      showSubtleSnow: true,
      showSubtleMist: false,
    };
  }

  // 4. Fog / Mist
  if (weather === 'fog') {
    return {
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #0D141E 0%, #1C2836 48%, #2E3F50 84%, #161F2A 100%)'
        : timePhase === 'sunrise' || timePhase === 'sunset'
        ? 'linear-gradient(180deg, #4B4E69 0%, #867B8E 45%, #C9A9A6 80%, #6D5B67 100%)'
        : 'linear-gradient(180deg, #465C70 0%, #748B9F 48%, #A8BCCB 84%, #65798C 100%)',
      celestialGlow:
        'radial-gradient(circle at 50% 35%, rgba(241, 245, 249, 0.26) 0%, transparent 62%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 88%, rgba(226, 232, 240, 0.28) 0%, transparent 68%)',
      isBrightSky: !isNightLike,
      headingColor: '#FFFFFF',
      headingTextShadow: '0 6px 24px rgba(15, 23, 42, 0.38)',
      textColorClass: 'text-white',
      textShadow: '0 2px 10px rgba(15, 23, 42, 0.36)',
      portraitFilter:
        'drop-shadow(0 16px 38px rgba(15, 23, 42, 0.36)) drop-shadow(0 0 30px rgba(241, 245, 249, 0.18))',
      showAmbientStars: false,
      showStormFlash: false,
      showSubtleRain: false,
      showSubtleSnow: false,
      showSubtleMist: true,
    };
  }

  // 5. Overcast / Cloudy
  if (weather === 'cloudy') {
    return {
      timePhase,
      weather,
      skyGradient: isNightLike
        ? 'linear-gradient(180deg, #080C15 0%, #141E2E 50%, #233045 84%, #111827 100%)'
        : timePhase === 'sunrise' || timePhase === 'sunset'
        ? 'linear-gradient(180deg, #2D314A 0%, #5D536B 44%, #A87676 78%, #473747 100%)'
        : 'linear-gradient(180deg, #3A4E67 0%, #607892 48%, #8FA5BC 84%, #52667D 100%)',
      celestialGlow:
        'radial-gradient(circle at 55% 24%, rgba(226, 232, 240, 0.22) 0%, transparent 56%)',
      horizonGlow:
        'radial-gradient(ellipse at 50% 90%, rgba(203, 213, 225, 0.22) 0%, transparent 65%)',
      isBrightSky: false,
      headingColor: '#F8FAFC',
      headingTextShadow: '0 6px 24px rgba(15, 23, 42, 0.42)',
      textColorClass: 'text-[#F8FAFC]',
      textShadow: '0 2px 10px rgba(15, 23, 42, 0.38)',
      portraitFilter: 'drop-shadow(0 16px 40px rgba(15, 23, 42, 0.42))',
      showAmbientStars: false,
      showStormFlash: false,
      showSubtleRain: false,
      showSubtleSnow: false,
      showSubtleMist: true,
    };
  }

  // 6. Clear / Partly Cloudy / Windy — Full Time-of-Day Progression
  switch (timePhase) {
    case 'sunrise':
      return {
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #1E2952 0%, #5B4B8A 26%, #C86D85 52%, #F4976C 76%, #FDE2A8 95%, #7C443C 100%)',
        celestialGlow:
          'radial-gradient(circle at 74% 68%, rgba(254, 240, 138, 0.56) 0%, rgba(251, 146, 60, 0.26) 34%, transparent 64%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(253, 186, 116, 0.55) 0%, rgba(244, 114, 182, 0.22) 48%, transparent 74%)',
        isBrightSky: true,
        headingColor: '#FFFBF2',
        headingTextShadow: '0 6px 28px rgba(67, 20, 7, 0.42)',
        textColorClass: 'text-[#FFF7ED]',
        textShadow: '0 2px 12px rgba(67, 20, 7, 0.42)',
        portraitFilter:
          'drop-shadow(0 16px 40px rgba(67, 20, 7, 0.34)) drop-shadow(0 0 42px rgba(253, 186, 116, 0.32))',
        showAmbientStars: false,
        showStormFlash: false,
        showSubtleRain: false,
        showSubtleSnow: false,
        showSubtleMist: false,
      };

    case 'morning':
      return {
        timePhase,
        weather,
        skyGradient:
          weather === 'partly-cloudy'
            ? 'linear-gradient(180deg, #1B6FB8 0%, #3F9CE6 45%, #84C9F8 80%, #5A9FD4 100%)'
            : 'linear-gradient(180deg, #1368BE 0%, #3498EE 44%, #7DD0FC 80%, #4E9CD8 100%)',
        celestialGlow:
          'radial-gradient(circle at 78% 22%, rgba(255, 250, 220, 0.52) 0%, rgba(186, 230, 253, 0.25) 36%, transparent 64%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(224, 242, 254, 0.42) 0%, transparent 66%)',
        isBrightSky: true,
        headingColor: '#FFFFFF',
        headingTextShadow: '0 6px 28px rgba(12, 74, 110, 0.34)',
        textColorClass: 'text-white',
        textShadow: '0 2px 10px rgba(12, 74, 110, 0.34)',
        portraitFilter:
          'drop-shadow(0 18px 40px rgba(12, 74, 110, 0.32)) drop-shadow(0 0 38px rgba(224, 242, 254, 0.30))',
        showAmbientStars: false,
        showStormFlash: false,
        showSubtleRain: false,
        showSubtleSnow: false,
        showSubtleMist: false,
      };

    case 'day':
      return {
        timePhase,
        weather,
        skyGradient:
          weather === 'partly-cloudy'
            ? 'linear-gradient(180deg, #165DA8 0%, #338AD9 46%, #74BEF2 82%, #4787C2 100%)'
            : 'linear-gradient(180deg, #0D55A6 0%, #2480D8 45%, #65B9F5 82%, #3D83C4 100%)',
        celestialGlow:
          'radial-gradient(circle at 68% 18%, rgba(255, 252, 232, 0.48) 0%, rgba(147, 197, 253, 0.22) 38%, transparent 65%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(186, 230, 253, 0.38) 0%, transparent 66%)',
        isBrightSky: true,
        headingColor: '#FFFFFF',
        headingTextShadow: '0 6px 28px rgba(12, 54, 102, 0.36)',
        textColorClass: 'text-white',
        textShadow: '0 2px 10px rgba(12, 54, 102, 0.36)',
        portraitFilter:
          'drop-shadow(0 18px 40px rgba(12, 54, 102, 0.34)) drop-shadow(0 0 36px rgba(186, 230, 253, 0.26))',
        showAmbientStars: false,
        showStormFlash: false,
        showSubtleRain: false,
        showSubtleSnow: false,
        showSubtleMist: false,
      };

    case 'sunset':
      return {
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #17153B 0%, #4A246D 26%, #B83B6F 52%, #F06C4E 76%, #FBBF5C 94%, #5A2838 100%)',
        celestialGlow:
          'radial-gradient(circle at 26% 70%, rgba(253, 224, 71, 0.50) 0%, rgba(249, 115, 22, 0.28) 36%, transparent 66%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 92%, rgba(251, 146, 60, 0.56) 0%, rgba(219, 39, 119, 0.24) 48%, transparent 74%)',
        isBrightSky: false,
        headingColor: '#FFF8EC',
        headingTextShadow: '0 6px 30px rgba(59, 7, 36, 0.48)',
        textColorClass: 'text-[#FFF7ED]',
        textShadow: '0 2px 12px rgba(59, 7, 36, 0.46)',
        portraitFilter:
          'drop-shadow(0 18px 42px rgba(59, 7, 36, 0.42)) drop-shadow(0 0 42px rgba(251, 146, 60, 0.32))',
        showAmbientStars: false,
        showStormFlash: false,
        showSubtleRain: false,
        showSubtleSnow: false,
        showSubtleMist: false,
      };

    case 'twilight':
      return {
        timePhase,
        weather,
        skyGradient:
          'linear-gradient(180deg, #070B1E 0%, #161C45 42%, #3B2D66 74%, #6D446B 92%, #181426 100%)',
        celestialGlow:
          'radial-gradient(circle at 75% 24%, rgba(196, 181, 253, 0.26) 0%, transparent 56%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(244, 114, 182, 0.28) 0%, rgba(99, 102, 241, 0.16) 46%, transparent 72%)',
        isBrightSky: false,
        headingColor: '#F3EEFF',
        headingTextShadow: '0 8px 28px rgba(7, 11, 30, 0.54)',
        textColorClass: 'text-[#EDE9FE]',
        textShadow: '0 2px 12px rgba(7, 11, 30, 0.5)',
        portraitFilter:
          'drop-shadow(0 18px 44px rgba(7, 11, 30, 0.55)) drop-shadow(0 0 36px rgba(167, 139, 250, 0.24))',
        showAmbientStars: true,
        showStormFlash: false,
        showSubtleRain: false,
        showSubtleSnow: false,
        showSubtleMist: false,
      };

    case 'night':
    default:
      return {
        timePhase: 'night',
        weather,
        skyGradient:
          'linear-gradient(180deg, #040712 0%, #091226 48%, #122140 84%, #0B0F1A 100%)',
        celestialGlow:
          'radial-gradient(circle at 76% 22%, rgba(186, 218, 255, 0.24) 0%, rgba(96, 165, 250, 0.08) 38%, transparent 62%)',
        horizonGlow:
          'radial-gradient(ellipse at 50% 94%, rgba(56, 107, 178, 0.22) 0%, transparent 66%)',
        isBrightSky: false,
        headingColor: '#DCE8F4',
        headingTextShadow: '0 8px 28px rgba(2, 6, 23, 0.62)',
        textColorClass: 'text-[#D7E2EA]',
        textShadow: '0 2px 10px rgba(2, 6, 23, 0.5)',
        portraitFilter:
          'drop-shadow(0 18px 44px rgba(2, 6, 23, 0.6)) drop-shadow(0 0 36px rgba(147, 197, 253, 0.16))',
        showAmbientStars: true,
        showStormFlash: false,
        showSubtleRain: false,
        showSubtleSnow: false,
        showSubtleMist: false,
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
