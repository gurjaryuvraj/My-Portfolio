import React from 'react';
import type { SkyButtonTheme } from '../hooks/useVisitorWeather';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/yuvraj-gurjar-a95377253/';

interface ContactButtonProps {
  href?: string;
  className?: string;
  theme?: SkyButtonTheme;
}

export function ContactButton({
  href = LINKEDIN_URL,
  className = '',
  theme,
}: ContactButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`contact-btn inline-block rounded-full font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-white ${className}`}
      style={{
        color: theme ? theme.textColor : '#FFFFFF',
        background: theme
          ? theme.background
          : 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: theme
          ? theme.boxShadow
          : '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: `2px solid ${theme ? theme.outlineColor : '#FFFFFF'}`,
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </a>
  );
}
