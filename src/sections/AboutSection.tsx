import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';
import {
  DESIGN_ABOUT_DECORATIONS,
  DEV_ABOUT_DECORATIONS,
  type PortfolioMode,
} from '../data/portfolio';

const DESIGN_ABOUT_COPY =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

const DEV_ABOUT_COPY =
  "Focused on full-stack software engineering, image-processing tools, and machine learning pipelines, i build fast, scalable products like iasify.in alongside open-source systems and computational research. Let's build something incredible together!";

interface AboutSectionProps {
  mode: PortfolioMode;
}

export function AboutSection({ mode }: AboutSectionProps) {
  const isDev = mode === 'dev';
  const decorations = isDev ? DEV_ABOUT_DECORATIONS : DESIGN_ABOUT_DECORATIONS;
  const aboutCopy = isDev ? DEV_ABOUT_COPY : DESIGN_ABOUT_COPY;
  const imgBlendClass = isDev ? 'mix-blend-screen rounded-3xl' : '';

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Subtle Neon Pink-Purple Corner Glows in Dev Mode */}
      {isDev && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute top-[6%] left-[4%] w-[280px] h-[280px] rounded-full blur-[110px]"
            style={{ background: 'rgba(236, 72, 153, 0.22)' }}
          />
          <div
            className="absolute bottom-[8%] right-[6%] w-[320px] h-[320px] rounded-full blur-[120px]"
            style={{ background: 'rgba(168, 85, 247, 0.24)' }}
          />
        </div>
      )}

      {/* Top-left 3D decorative element */}
      <FadeIn
        key={`about-tl-${mode}`}
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0"
      >
        <img
          src={decorations.topLeft}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain ${imgBlendClass}`}
        />
      </FadeIn>

      {/* Bottom-left 3D decorative element */}
      <FadeIn
        key={`about-bl-${mode}`}
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0"
      >
        <img
          src={decorations.bottomLeft}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain ${imgBlendClass}`}
        />
      </FadeIn>

      {/* Top-right 3D decorative element */}
      <FadeIn
        key={`about-tr-${mode}`}
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0"
      >
        <img
          src={decorations.topRight}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain ${imgBlendClass}`}
        />
      </FadeIn>

      {/* Bottom-right 3D decorative element */}
      <FadeIn
        key={`about-br-${mode}`}
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0"
      >
        <img
          src={decorations.bottomRight}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain ${imgBlendClass}`}
        />
      </FadeIn>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className={`${
                isDev ? 'hero-heading-dev' : 'hero-heading'
              } font-black uppercase leading-none tracking-tight text-center transition-all duration-500`}
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            key={`about-text-${mode}`}
            text={aboutCopy}
            className={`${
              isDev ? 'text-[#F5D0FE]' : 'text-[#D7E2EA]'
            } font-medium text-center leading-relaxed max-w-[560px]`}
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.15} y={20}>
          <Magnet>
            <ContactButton />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
