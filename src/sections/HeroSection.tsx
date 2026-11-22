import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { ContactButton, LINKEDIN_URL } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';

export function HeroSection() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative h-screen flex flex-col justify-between bg-[#0C0C0C]"
      style={{ overflowX: 'clip' }}
    >
      {/* Top Navbar */}
      <FadeIn as="header" delay={0} y={-20} className="relative z-20 w-full pointer-events-none">
        <nav
          aria-label="Primary"
          className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 pointer-events-none"
        >
          <a
            href="#about"
            onClick={(e) => handleScrollTo(e, 'about')}
            className="pointer-events-auto text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, 'services')}
            className="pointer-events-auto text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            Price
          </a>
          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="pointer-events-auto text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            Projects
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 whitespace-nowrap"
          >
            Contact
          </a>
        </nav>
      </FadeIn>

      {/* Massive Hero Heading */}
      <div className="relative z-0 w-full overflow-hidden pointer-events-none">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center text-[11.5vw] sm:text-[12.5vw] md:text-[13.5vw] lg:text-[14.2vw] mt-6 sm:mt-4 md:-mt-5 select-none">
            Hey iam yuvraj
          </h1>
        </FadeIn>
      </div>

      {/* The Living Portrait — centered in hero, no Magnet wrapper */}
      <div className="hero-portrait-wrap" id="magnetWrap">
        <FadeIn delay={0.6} y={30} className="w-full">
          <div
            className="hero-portrait-inner fade-in"
            id="magnetInner"
            style={{ ['--fade-y' as string]: '30px' }}
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
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            a 3d creator driven by crafting striking and unforgettable projects
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
