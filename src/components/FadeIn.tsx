import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

type MotionTag =
  | 'div'
  | 'section'
  | 'header'
  | 'nav'
  | 'article'
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3';

const motionElements: Record<MotionTag, React.ComponentType<HTMLMotionProps<'div'>>> = {
  div: motion.create('div') as React.ComponentType<HTMLMotionProps<'div'>>,
  section: motion.create('section') as React.ComponentType<HTMLMotionProps<'div'>>,
  header: motion.create('header') as React.ComponentType<HTMLMotionProps<'div'>>,
  nav: motion.create('nav') as React.ComponentType<HTMLMotionProps<'div'>>,
  article: motion.create('article') as React.ComponentType<HTMLMotionProps<'div'>>,
  span: motion.create('span') as React.ComponentType<HTMLMotionProps<'div'>>,
  p: motion.create('p') as React.ComponentType<HTMLMotionProps<'div'>>,
  h1: motion.create('h1') as React.ComponentType<HTMLMotionProps<'div'>>,
  h2: motion.create('h2') as React.ComponentType<HTMLMotionProps<'div'>>,
  h3: motion.create('h3') as React.ComponentType<HTMLMotionProps<'div'>>,
};

interface FadeInProps {
  children: React.ReactNode;
  as?: MotionTag;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  const Component = motionElements[as];

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </Component>
  );
}
