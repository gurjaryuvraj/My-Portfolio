import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton, LINKEDIN_URL } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';
import type { PortfolioMode } from '../data/portfolio';

interface DevFaceLighting {
  name: string;
  orbColor: string;
  topRight: string;
  bottomLeft: string;
  center: string;
  ringColor: string;
  gridColor: string;
  portraitGlow: string;
  portraitHoverGlow: string;
}

const DEV_LIGHTING_THEMES: DevFaceLighting[] = [
  {
    name: 'Neural',
    orbColor: '#00E5FF',
    topRight: 'radial-gradient(circle, rgba(236,72,153,0.36) 0%, rgba(168,85,247,0.18) 45%, transparent 72%)',
    bottomLeft: 'radial-gradient(circle, rgba(0,229,255,0.30) 0%, rgba(124,58,237,0.16) 45%, transparent 72%)',
    center: 'radial-gradient(circle, rgba(217,70,239,0.28) 0%, rgba(0,229,255,0.16) 50%, transparent 74%)',
    ringColor: 'rgba(0, 229, 255, 0.24)',
    gridColor: 'rgba(236, 72, 153, 0.14)',
    portraitGlow: 'drop-shadow(0 0 36px rgba(236,72,153,0.36)) drop-shadow(0 0 64px rgba(0,229,255,0.24))',
    portraitHoverGlow: 'drop-shadow(0 0 46px rgba(0,229,255,0.52)) drop-shadow(0 0 85px rgba(236,72,153,0.38))',
  },
  {
    name: 'Holo',
    orbColor: '#F472B6',
    topRight: 'radial-gradient(circle, rgba(244,114,182,0.40) 0%, rgba(192,132,252,0.22) 45%, transparent 72%)',
    bottomLeft: 'radial-gradient(circle, rgba(56,189,248,0.34) 0%, rgba(244,114,182,0.18) 45%, transparent 72%)',
    center: 'radial-gradient(circle, rgba(192,132,252,0.34) 0%, rgba(56,189,248,0.20) 50%, transparent 74%)',
    ringColor: 'rgba(244, 114, 182, 0.28)',
    gridColor: 'rgba(56, 189, 248, 0.15)',
    portraitGlow: 'drop-shadow(0 0 40px rgba(244,114,182,0.42)) drop-shadow(0 0 70px rgba(56,189,248,0.28))',
    portraitHoverGlow: 'drop-shadow(0 0 54px rgba(244,114,182,0.58)) drop-shadow(0 0 92px rgba(56,189,248,0.45))',
  },
  {
    name: 'Mesh',
    orbColor: '#22D3EE',
    topRight: 'radial-gradient(circle, rgba(34,211,238,0.36) 0%, rgba(59,130,246,0.20) 45%, transparent 72%)',
    bottomLeft: 'radial-gradient(circle, rgba(59,130,246,0.34) 0%, rgba(232,121,249,0.16) 45%, transparent 72%)',
    center: 'radial-gradient(circle, rgba(34,211,238,0.30) 0%, rgba(59,130,246,0.20) 50%, transparent 74%)',
    ringColor: 'rgba(34, 211, 238, 0.30)',
    gridColor: 'rgba(59, 130, 246, 0.18)',
    portraitGlow: 'drop-shadow(0 0 38px rgba(34,211,238,0.42)) drop-shadow(0 0 68px rgba(59,130,246,0.28))',
    portraitHoverGlow: 'drop-shadow(0 0 52px rgba(34,211,238,0.60)) drop-shadow(0 0 90px rgba(232,121,249,0.36))',
  },
  {
    name: 'Quantum',
    orbColor: '#E879F9',
    topRight: 'radial-gradient(circle, rgba(192,38,211,0.42) 0%, rgba(250,204,21,0.16) 48%, transparent 72%)',
    bottomLeft: 'radial-gradient(circle, rgba(147,51,234,0.38) 0%, rgba(236,72,153,0.22) 45%, transparent 72%)',
    center: 'radial-gradient(circle, rgba(236,72,153,0.34) 0%, rgba(168,85,247,0.24) 50%, transparent 74%)',
    ringColor: 'rgba(250, 204, 21, 0.24)',
    gridColor: 'rgba(192, 38, 211, 0.18)',
    portraitGlow: 'drop-shadow(0 0 42px rgba(192,38,211,0.45)) drop-shadow(0 0 72px rgba(250,204,21,0.22))',
    portraitHoverGlow: 'drop-shadow(0 0 56px rgba(236,72,153,0.60)) drop-shadow(0 0 95px rgba(250,204,21,0.38))',
  },
  {
    name: 'Matrix',
    orbColor: '#10B981',
    topRight: 'radial-gradient(circle, rgba(16,185,129,0.34) 0%, rgba(6,182,212,0.18) 45%, transparent 72%)',
    bottomLeft: 'radial-gradient(circle, rgba(6,182,212,0.32) 0%, rgba(124,58,237,0.18) 45%, transparent 72%)',
    center: 'radial-gradient(circle, rgba(16,185,129,0.26) 0%, rgba(6,182,212,0.20) 50%, transparent 74%)',
    ringColor: 'rgba(16, 185, 129, 0.28)',
    gridColor: 'rgba(6, 182, 212, 0.16)',
    portraitGlow: 'drop-shadow(0 0 38px rgba(16,185,129,0.40)) drop-shadow(0 0 68px rgba(6,182,212,0.26))',
    portraitHoverGlow: 'drop-shadow(0 0 52px rgba(16,185,129,0.58)) drop-shadow(0 0 90px rgba(6,182,212,0.42))',
  },
];

interface HeroSectionProps {
  mode: PortfolioMode;
  onChangeMode: (mode: PortfolioMode) => void;
}

export function HeroSection({ mode, onChangeMode }: HeroSectionProps) {
  const isDev = mode === 'dev';
  const [devThemeIndex, setDevThemeIndex] = useState(0);
  const [devHoveringFace, setDevHoveringFace] = useState(false);
  const [devHoloWave, setDevHoloWave] = useState(false);
  const [devBurstId, setDevBurstId] = useState(0);

  useEffect(() => {
    const handleDevTheme = (e: Event) => {
      const detail = (
        e as CustomEvent<{
          themeIndex: number;
          hovering: boolean;
          burstId: number;
          holoWave?: boolean;
        }>
      ).detail;
      if (!detail) return;
      setDevThemeIndex(detail.themeIndex);
      setDevHoveringFace(Boolean(detail.hovering));
      setDevHoloWave(Boolean(detail.holoWave));
      setDevBurstId(detail.burstId);
    };
    window.addEventListener('dev-face-theme', handleDevTheme);
    return () => window.removeEventListener('dev-face-theme', handleDevTheme);
  }, []);

  // During the 3D Holographic Transformation Wave, swell ambient lighting into bright holographic prism colors
  const activeLighting = devHoloWave
    ? DEV_LIGHTING_THEMES[1]
    : (DEV_LIGHTING_THEMES[devThemeIndex] ?? DEV_LIGHTING_THEMES[0]);
  const boostGlow = devHoveringFace || devHoloWave;

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative h-screen flex flex-col justify-between bg-[#0C0C0C] transition-colors duration-500"
      style={{ overflowX: 'clip' }}
    >
      {/* Dynamic Cyber-AI Ambient Lighting & Neural Field (Dev Mode — shifts with face graphic) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          isDev ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Subtle Perspective Cyber Grid */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: boostGlow ? 0.58 : 0.28,
            backgroundImage: `linear-gradient(${activeLighting.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${activeLighting.gridColor} 1px, transparent 1px)`,
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(circle at 50% 52%, black 18%, transparent 72%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 52%, black 18%, transparent 72%)',
          }}
        />

        {/* Reactive 3-Point Volumetric Spotlights */}
        <div
          className="absolute -top-24 -right-24 w-[560px] h-[560px] rounded-full blur-[130px] transition-all duration-700"
          style={{
            background: activeLighting.topRight,
            transform: boostGlow ? 'scale(1.14)' : 'scale(1)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-[540px] h-[540px] rounded-full blur-[130px] transition-all duration-700"
          style={{
            background: activeLighting.bottomLeft,
            transform: boostGlow ? 'scale(1.14)' : 'scale(1)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[115px] transition-all duration-700"
          style={{
            background: activeLighting.center,
            transform: boostGlow
              ? 'translate(-50%, -50%) scale(1.20)'
              : 'translate(-50%, -50%) scale(1)',
          }}
        />

        {/* Orbital Holographic Rings Centered Behind Portrait */}
        <div
          className="dev-orbit-slow absolute left-1/2 top-1/2 w-[min(78vw,640px)] h-[min(78vw,640px)] rounded-full border border-dashed transition-colors duration-700"
          style={{
            borderColor: activeLighting.ringColor,
            opacity: boostGlow ? 0.75 : 0.34,
          }}
        />
        <div
          className="dev-orbit-reverse absolute left-1/2 top-1/2 w-[min(62vw,500px)] h-[min(62vw,500px)] rounded-full border transition-colors duration-700"
          style={{
            borderColor: activeLighting.ringColor,
            opacity: boostGlow ? 0.58 : 0.22,
          }}
        />

        {/* Expanding Shockwave Pulse Ring on Face Morph Click */}
        {isDev && devBurstId > 0 && (
          <motion.div
            key={devBurstId}
            initial={{ scale: 0.35, opacity: 0.75 }}
            animate={{ scale: 2.05, opacity: 0 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border-2"
            style={{
              borderColor: activeLighting.orbColor,
              boxShadow: `0 0 42px ${activeLighting.orbColor}`,
            }}
          />
        )}
      </div>

      {/* Top Navbar */}
      <FadeIn as="header" delay={0} y={-20} className="relative z-20 w-full pointer-events-none">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pointer-events-none"
        >
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            className={`pointer-events-auto font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-all duration-200 whitespace-nowrap ${
              isDev ? 'text-[#F5D0FE]' : 'text-[#D7E2EA]'
            }`}
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, 'services')}
            className={`pointer-events-auto font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-all duration-200 whitespace-nowrap ${
              isDev ? 'text-[#F5D0FE]' : 'text-[#D7E2EA]'
            }`}
          >
            Price
          </a>
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, 'projects')}
            className={`pointer-events-auto font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-all duration-200 whitespace-nowrap ${
              isDev ? 'text-[#F5D0FE]' : 'text-[#D7E2EA]'
            }`}
          >
            Projects
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`pointer-events-auto font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-all duration-200 whitespace-nowrap ${
              isDev ? 'text-[#F5D0FE]' : 'text-[#D7E2EA]'
            }`}
          >
            Contact
          </a>
        </nav>
      </FadeIn>

      {/* Massive Hero Heading + Right-Aligned Design/Dev Toggle Below It */}
      <div className="relative z-20 w-full pointer-events-none">
        <div className="relative z-0 w-full overflow-hidden pointer-events-none">
          <FadeIn delay={0.15} y={40} className="w-full">
            <h1
              className={`${
                isDev ? 'hero-heading-dev' : 'hero-heading'
              } font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[11.5vw] sm:text-[12.5vw] md:text-[13.5vw] lg:text-[14.2vw] mt-6 sm:mt-4 md:-mt-5 select-none transition-all duration-500`}
            >
              Hey iam yuvraj
            </h1>
          </FadeIn>
        </div>

        {/* Design / Dev Toggle — positioned cleanly below "yuvraj" on the right side */}
        <FadeIn
          delay={0.28}
          y={16}
          className="relative z-30 flex justify-end px-6 md:px-10 mt-6 sm:mt-8 md:mt-10 pointer-events-none"
        >
          <div
            role="tablist"
            aria-label="Switch portfolio mode between Design and Dev"
            className={`pointer-events-auto inline-flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md transition-all duration-300 ${
              isDev
                ? 'bg-[#170926]/85 border-[#EC4899]/60 shadow-[0_0_28px_rgba(236,72,153,0.35)]'
                : 'bg-[#141518]/85 border-[#D7E2EA]/35 shadow-[0_8px_24px_rgba(0,0,0,0.45)]'
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isDev}
              onClick={() => onChangeMode('design')}
              className={`relative z-10 inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                !isDev ? 'text-[#0C0C0C]' : 'text-[#F5D0FE]/75 hover:text-[#FDF2F8]'
              }`}
            >
              {!isDev && (
                <motion.span
                  layoutId="mode-toggle-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-full bg-[#D7E2EA]"
                />
              )}
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Design</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={isDev}
              onClick={() => onChangeMode('dev')}
              className={`relative z-10 inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                isDev ? 'text-white' : 'text-[#D7E2EA]/75 hover:text-white'
              }`}
            >
              {isDev && (
                <motion.span
                  layoutId="mode-toggle-pill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background:
                      'linear-gradient(120deg, #EC4899 0%, #A855F7 60%, #7C3AED 100%)',
                    boxShadow: '0 0 18px rgba(236, 72, 153, 0.55)',
                  }}
                />
              )}
              <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Dev</span>
            </button>
          </div>
        </FadeIn>
      </div>

      {/* The Living Portrait — centered in hero */}
      <div className="hero-portrait-wrap" id="magnetWrap">
        <FadeIn delay={0.6} y={30} className="w-full">
          <div
            className="hero-portrait-inner fade-in transition-[filter] duration-500"
            id="magnetInner"
            style={{
              ['--fade-y' as string]: '30px',
              filter: isDev
                ? boostGlow
                  ? activeLighting.portraitHoverGlow
                  : activeLighting.portraitGlow
                : 'none',
            }}
            data-delay="600"
          >
            <img
              id="faceFallback"
              src="/src/assets/images/portrait_rest_1795368453047.jpg"
              alt="Portrait"
              className="aspect-square invisible"
              referrerPolicy="no-referrer"
            />
            <canvas id="faceGl" aria-hidden="true" />
            <canvas id="faceParticles" aria-hidden="true" />
            <div id="faceProps" aria-hidden="true">
              <svg id="faceFly" viewBox="0 0 32 32">
                <path
                  className="wing"
                  d="M15 15C12 9.500 4.500 8.500 2 13c2.500 4.500 10 4.500 13 2z"
                />
                <path
                  className="wing r"
                  d="M17 15c3-5.500 10.500-6.500 13-2-2.500 4.500-10 4.500-13 2z"
                />
                <ellipse cx="16" cy="19.500" rx="4" ry="6.500" />
                <circle cx="16" cy="11.500" r="3.300" />
              </svg>
              <svg id="faceHand" viewBox="0 0 32 32">
                <path
                  className="open"
                  d="M10.500 16.500V8.200a1.800 1.800 0 0 1 3.600 0V14v-8a1.800 1.800 0 0 1 3.600 0V14 7a1.800 1.800 0 0 1 3.600 0v8-5a1.800 1.800 0 0 1 3.600 0v10.500c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-3.500-5.600c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.600 1z"
                />
                <path
                  className="grab"
                  d="M10.500 17v-3.300a1.800 1.800 0 0 1 3.600 0V14v-1.800a1.800 1.800 0 0 1 3.600 0V14v-1.300a1.800 1.800 0 0 1 3.600 0V14v-.3a1.800 1.800 0 0 1 3.600 0v6.800c0 5-3.400 8.500-8.400 8.500-3.600 0-5.700-1.600-7.600-4.600l-2.300-3.700c-.6-1 .1-2.200 1.200-2.400 1-.2 1.900.2 2.700 1z"
                />
              </svg>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-20 flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 mt-auto pointer-events-none">
        <FadeIn delay={0.35} y={20} className="pointer-events-auto">
          <p
            className={`font-light uppercase tracking-wide leading-snug max-w-[175px] sm:max-w-[235px] md:max-w-[280px] transition-colors duration-300 ${
              isDev ? 'text-[#F5D0FE]' : 'text-[#D7E2EA]'
            }`}
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {isDev
              ? 'a software developer driven by building fast, scalable and futuristic products'
              : 'a 3d creator driven by crafting striking and unforgettable projects'}
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} className="pointer-events-auto">
          <Magnet>
            <ContactButton />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
