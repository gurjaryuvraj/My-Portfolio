import React from 'react';
import type { PortfolioMode } from '../data/portfolio';

export const GITHUB_URL = 'https://github.com/gurjaryuvraj';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
  mode?: PortfolioMode;
  className?: string;
}

export function LiveProjectButton({
  href = GITHUB_URL,
  label = 'Live Project',
  mode = 'design',
  className = '',
}: LiveProjectButtonProps) {
  const isDev = mode === 'dev';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full border-2 font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isDev
          ? 'border-[#F472B6] text-[#FDF2F8] hover:bg-[#EC4899]/20 shadow-[0_0_20px_rgba(236,72,153,0.28)] focus-visible:outline-[#F472B6]'
          : 'border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 focus-visible:outline-[#D7E2EA]'
      } ${className}`}
    >
      {label}
    </a>
  );
}
