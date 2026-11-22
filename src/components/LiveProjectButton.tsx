import React from 'react';

export const GITHUB_URL = 'https://github.com/gurjaryuvraj';

interface LiveProjectButtonProps {
  href?: string;
  className?: string;
}

export function LiveProjectButton({ href = GITHUB_URL, className = '' }: LiveProjectButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D7E2EA] ${className}`}
    >
      Live Project
    </a>
  );
}
