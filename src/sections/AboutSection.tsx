import React from 'react';
import { FadeIn } from '../components/FadeIn';
import { AnimatedText } from '../components/AnimatedText';
import { ContactButton } from '../components/ContactButton';
import { Magnet } from '../components/Magnet';
import { ABOUT_DECORATIONS } from '../data/portfolio';

interface AboutSectionProps {
  onOpenContact: () => void;
}

const ABOUT_COPY =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

export function AboutSection({ onOpenContact }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
    >
      {/* Top-left Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0"
      >
        <img
          src={ABOUT_DECORATIONS.moon}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-left 3D object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0"
      >
        <img
          src={ABOUT_DECORATIONS.objectBottomLeft}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain"
        />
      </FadeIn>

      {/* Top-right Lego icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0"
      >
        <img
          src={ABOUT_DECORATIONS.lego}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain"
        />
      </FadeIn>

      {/* Bottom-right 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none select-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0"
      >
        <img
          src={ABOUT_DECORATIONS.groupBottomRight}
          alt=""
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain"
        />
      </FadeIn>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_COPY}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.15} y={20}>
          <Magnet>
            <ContactButton onClick={onOpenContact} />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
