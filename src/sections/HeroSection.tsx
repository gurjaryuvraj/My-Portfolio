import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton, LINKEDIN_URL } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';
import type { PortfolioMode } from '../data/portfolio';

interface HeroSectionProps {
  mode: PortfolioMode;
  onChangeMode: (mode: PortfolioMode) => void;
}

export function HeroSection({ mode, onChangeMode }: HeroSectionProps) {
  const isDev = mode === 'dev';

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
      {/* Futuristic Neon Pink & Purple Ambient Lighting (Dev Mode) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isDev ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="absolute -top-24 -right-24 w-[540px] h-[540px] rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(236,72,153,0.34) 0%, rgba(168,85,247,0.18) 45%, transparent 72%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-24 w-[520px] h-[520px] rounded-full blur-[130px]"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.32) 0%, rgba(236,72,153,0.16) 45%, transparent 72%)',
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full blur-[115px]"
          style={{
            background:
              'radial-gradient(circle, rgba(217,70,239,0.28) 0%, rgba(124,58,237,0.18) 50%, transparent 74%)',
          }}
        />
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

        {/* Design / Dev Toggle — positioned below "yuvraj" on the right side with vertical breathing room */}
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

      {/* The Living Portrait — centered in hero, no Magnet wrapper */}
      <div className="hero-portrait-wrap" id="magnetWrap">
        <FadeIn delay={0.6} y={30} className="w-full">
          <div
            className="hero-portrait-inner fade-in"
            id="magnetInner"
            style={{
              ['--fade-y' as string]: '30px',
              filter: isDev
                ? 'drop-shadow(0 0 38px rgba(236, 72, 153, 0.34)) drop-shadow(0 0 65px rgba(168, 85, 247, 0.25))'
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
