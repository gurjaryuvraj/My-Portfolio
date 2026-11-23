import React from 'react';
import { FadeIn } from '../components/FadeIn';
import {
  DESIGN_SERVICES,
  DEV_SERVICES,
  type PortfolioMode,
} from '../data/portfolio';

interface ServicesSectionProps {
  mode: PortfolioMode;
}

export function ServicesSection({ mode }: ServicesSectionProps) {
  const isDev = mode === 'dev';
  const services = isDev ? DEV_SERVICES : DESIGN_SERVICES;

  return (
    <section
      id="services"
      className={`relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-28 sm:pb-36 md:pb-44 transition-colors duration-500 ${
        isDev
          ? 'bg-[#FCF7FF] text-[#140724] shadow-[0_-10px_60px_rgba(236,72,153,0.22)]'
          : 'bg-[#FFFFFF] text-[#0C0C0C]'
      }`}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className={`font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-28 ${
            isDev ? 'text-[#1A082E]' : 'text-[#0C0C0C]'
          }`}
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {services.map((service, index) => (
          <FadeIn key={`${mode}-${service.number}`} delay={index * 0.1} y={30}>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: isDev
                  ? '1px solid rgba(168, 85, 247, 0.24)'
                  : '1px solid rgba(12, 12, 12, 0.15)',
                borderBottom:
                  index === services.length - 1
                    ? isDev
                      ? '1px solid rgba(168, 85, 247, 0.24)'
                      : '1px solid rgba(12, 12, 12, 0.15)'
                    : undefined,
              }}
            >
              <span
                className={`font-black leading-none tabular-nums shrink-0 sm:min-w-[140px] md:min-w-[180px] ${
                  isDev ? 'dev-neon-number' : 'text-[#0C0C0C]'
                }`}
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>

              <div className="flex flex-col gap-2 sm:gap-3">
                <h3
                  className={`font-medium uppercase leading-tight tracking-wide ${
                    isDev ? 'text-[#1A082E]' : 'text-[#0C0C0C]'
                  }`}
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className={`font-light leading-relaxed max-w-2xl ${
                    isDev ? 'text-[#2D144B]' : 'text-[#0C0C0C]'
                  }`}
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    opacity: isDev ? 0.72 : 0.6,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
