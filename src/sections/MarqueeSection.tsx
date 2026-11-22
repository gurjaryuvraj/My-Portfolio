import React, { useEffect, useRef } from 'react';
import { MARQUEE_IMAGES } from '../data/portfolio';

const ROW_1_BASE = MARQUEE_IMAGES.slice(0, 11);
const ROW_2_BASE = MARQUEE_IMAGES.slice(11, 21);

const ROW_1_ITEMS = [...ROW_1_BASE, ...ROW_1_BASE, ...ROW_1_BASE];
const ROW_2_ITEMS = [...ROW_2_BASE, ...ROW_2_BASE, ...ROW_2_BASE];

// 11 tiles * (420px + 12px gap) = 4752px; keeps Row 1 filled on the left as it moves right
const ROW_1_COPY_WIDTH = ROW_1_BASE.length * 432;

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const updateTransform = () => {
      rafId = 0;
      const section = sectionRef.current;
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      if (!section || !row1 || !row2) return;

      const sectionTop = section.offsetTop;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      row1.style.transform = `translateX(${offset - 200}px)`;
      row2.style.transform = `translateX(${-(offset - 200)}px)`;
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateTransform);
      }
    };

    updateTransform();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Selected 3D Motion Showcase"
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        {/* Row 1: moves RIGHT on scroll */}
        <div
          ref={row1Ref}
          className="flex gap-3 w-max"
          style={{
            marginLeft: `-${ROW_1_COPY_WIDTH}px`,
            willChange: 'transform',
          }}
        >
          {ROW_1_ITEMS.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#151518]"
            >
              <img
                src={src}
                alt={`3D motion showcase preview ${(idx % ROW_1_BASE.length) + 1}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover block"
              />
            </div>
          ))}
        </div>

        {/* Row 2: moves LEFT on scroll */}
        <div
          ref={row2Ref}
          className="flex gap-3 w-max"
          style={{ willChange: 'transform' }}
        >
          {ROW_2_ITEMS.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-[#151518]"
            >
              <img
                src={src}
                alt={`3D motion showcase preview ${(idx % ROW_2_BASE.length) + 12}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
