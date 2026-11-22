import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  initialImageIndex?: number;
  onClose: () => void;
}

export function ProjectModal({
  project,
  initialImageIndex = 0,
  onClose,
}: ProjectModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialImageIndex);

  useEffect(() => {
    setActiveIndex(initialImageIndex);
  }, [project, initialImageIndex]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIndex((prev) => (prev + 1) % 3);
      if (e.key === 'ArrowLeft') setActiveIndex((prev) => (prev + 2) % 3);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const images = project
    ? [project.col1Image1, project.col1Image2, project.col2Image]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[36px] sm:rounded-[48px] border-2 border-[#D7E2EA]/80 bg-[#0C0C0C] p-5 sm:p-8 text-[#D7E2EA]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-black text-4xl sm:text-6xl leading-none tabular-nums text-[#D7E2EA]">
                  {project.number}
                </span>
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-[#D7E2EA]/60 font-light">
                    {project.category} · {project.year} · {project.role}
                  </p>
                  <h2
                    id="project-modal-title"
                    className="text-xl sm:text-3xl font-semibold uppercase tracking-wide text-[#D7E2EA] mt-1"
                  >
                    {project.name}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project preview"
                className="p-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active High-Res Visual */}
            <div className="relative w-full aspect-[16/10] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#151518]">
              <img
                src={images[activeIndex]}
                alt={`${project.name} render ${activeIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev + 2) % 3)}
                  aria-label="Previous render"
                  className="pointer-events-auto p-3 rounded-full bg-black/60 border border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 rounded-full bg-black/60 text-xs uppercase tracking-widest text-[#D7E2EA] tabular-nums">
                  0{activeIndex + 1} / 03
                </span>
                <button
                  type="button"
                  onClick={() => setActiveIndex((prev) => (prev + 1) % 3)}
                  aria-label="Next render"
                  className="pointer-events-auto p-3 rounded-full bg-black/60 border border-[#D7E2EA]/40 text-[#D7E2EA] hover:bg-black/80 transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnails & Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
              <div className="flex flex-col gap-3">
                <p className="text-sm sm:text-base font-light leading-relaxed text-[#D7E2EA]/80 max-w-2xl">
                  {project.summary}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#D7E2EA]/55">
                  {project.deliverables.map((item, idx) => (
                    <React.Fragment key={item}>
                      <span>{item}</span>
                      {idx < project.deliverables.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Select render ${idx + 1}`}
                    className={`w-16 h-12 sm:w-20 sm:h-14 rounded-2xl overflow-hidden border-2 transition-opacity cursor-pointer ${
                      activeIndex === idx
                        ? 'border-[#D7E2EA] opacity-100'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#D7E2EA]/15 flex flex-wrap items-center justify-end gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-2.5 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              >
                View on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/yuvraj-gurjar-a95377253/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#D7E2EA]/40 text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-2.5 text-xs sm:text-sm hover:bg-[#D7E2EA]/10 transition-colors cursor-pointer"
              >
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
