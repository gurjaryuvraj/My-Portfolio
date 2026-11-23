import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { FadeIn } from '../components/FadeIn';
import { LiveProjectButton } from '../components/LiveProjectButton';
import {
  DESIGN_PROJECTS,
  DEV_PROJECTS,
  isVideoAsset,
  type PortfolioMode,
  type ProjectItem,
} from '../data/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  mode: PortfolioMode;
  onSelectProject: (project: ProjectItem, imageIndex?: number) => void;
}

function ProjectCard({
  project,
  index,
  totalCards,
  progress,
  mode,
  onSelectProject,
}: ProjectCardProps) {
  const isDev = mode === 'dev';
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const rangeStart = index / totalCards;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);

  return (
    <div className="h-[85vh] sticky top-24 md:top-32 flex items-start justify-center">
      <motion.article
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className={`relative w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 origin-top transition-shadow duration-500 ${
          isDev
            ? 'border-[#D946EF]/75 shadow-[0_0_48px_rgba(168,85,247,0.22)]'
            : 'border-[#D7E2EA]'
        }`}
      >
        {/* Top Row: Number, Category + Name, Live Project Button */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 px-2 sm:px-4">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <span
              className={`font-black leading-none tabular-nums shrink-0 ${
                isDev ? 'hero-heading-dev' : 'text-[#D7E2EA]'
              }`}
              style={{ fontSize: 'clamp(2.75rem, 8vw, 110px)' }}
            >
              {project.number}
            </span>

            <div className="flex flex-col gap-0.5 sm:gap-1">
              <span
                className={`text-xs sm:text-sm uppercase tracking-widest font-light ${
                  isDev ? 'text-[#F0ABFC]/75' : 'text-[#D7E2EA]/60'
                }`}
              >
                {project.category}
              </span>
              <h3
                className={`font-medium uppercase leading-tight tracking-wide ${
                  isDev ? 'text-[#FDF2F8]' : 'text-[#D7E2EA]'
                }`}
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton href={project.liveUrl} mode={mode} />
        </div>

        {/* Bottom Row: Two-Column Image Grid (40% Left / 60% Right) */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-3 sm:gap-4 md:gap-6">
          {/* Left Column (40%): 2 Stacked Images */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
            <button
              type="button"
              onClick={() => onSelectProject(project, 0)}
              aria-label={`View ${project.name} preview 1`}
              className="group relative w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#151518] cursor-pointer block focus-visible:outline-2 focus-visible:outline-[#D7E2EA]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} visual 1`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>

            <button
              type="button"
              onClick={() => onSelectProject(project, 1)}
              aria-label={`View ${project.name} preview 2`}
              className="group relative w-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#151518] cursor-pointer block focus-visible:outline-2 focus-visible:outline-[#D7E2EA]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} visual 2`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </div>

          {/* Right Column (60%): 1 Tall Featured Visual (Image or Video) */}
          <button
            type="button"
            onClick={() => onSelectProject(project, 2)}
            aria-label={`View ${project.name} featured visual`}
            className="group relative w-full h-[220px] md:h-full overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] bg-[#151518] cursor-pointer block focus-visible:outline-2 focus-visible:outline-[#D7E2EA]"
          >
            {isVideoAsset(project.col2Image) ? (
              <video
                src={project.col2Image}
                poster={project.col1Image1}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <img
                src={project.col2Image}
                alt={`${project.name} featured visual`}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            )}
          </button>
        </div>
      </motion.article>
    </div>
  );
}

interface ProjectsSectionProps {
  mode: PortfolioMode;
  onSelectProject: (project: ProjectItem, imageIndex?: number) => void;
}

export function ProjectsSection({ mode, onSelectProject }: ProjectsSectionProps) {
  const isDev = mode === 'dev';
  const projects = isDev ? DEV_PROJECTS : DESIGN_PROJECTS;
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      className={`relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24 sm:pb-32 ${
        isDev ? 'shadow-[0_-14px_65px_rgba(236,72,153,0.24)]' : ''
      }`}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className={`${
            isDev ? 'hero-heading-dev' : 'hero-heading'
          } font-black uppercase leading-none tracking-tight text-center mb-14 sm:mb-20 md:mb-24 transition-all duration-500`}
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div ref={stackRef} className="max-w-7xl mx-auto relative">
        {projects.map((project, index) => (
          <ProjectCard
            key={`${mode}-${project.number}`}
            project={project}
            index={index}
            totalCards={projects.length}
            progress={scrollYProgress}
            mode={mode}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
