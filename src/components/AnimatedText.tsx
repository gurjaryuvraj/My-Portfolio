import React, { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedCharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function AnimatedChar({ char, progress, range }: AnimatedCharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const { words, totalChars } = useMemo(() => {
    const tokens = text.split(' ');
    let cursor = 0;
    const mapped = tokens.map((word) => {
      const startIndex = cursor;
      cursor += word.length + 1;
      return { word, startIndex };
    });
    return { words: mapped, totalChars: Math.max(1, text.length) };
  }, [text]);

  return (
    <p ref={containerRef} className={className} style={style} aria-label={text}>
      {words.map(({ word, startIndex }, wordIdx) => (
        <React.Fragment key={`${word}-${wordIdx}`}>
          <span className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split('').map((char, charIdx) => {
              const globalIdx = startIndex + charIdx;
              const start = globalIdx / totalChars;
              const end = Math.min(1, (globalIdx + 1) / totalChars);
              return (
                <AnimatedChar
                  key={`${wordIdx}-${charIdx}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
          {wordIdx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
}
