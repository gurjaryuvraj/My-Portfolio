import React, { useCallback, useEffect, useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import type { PortfolioMode, ProjectItem } from './data/portfolio';

declare global {
  interface Window {
    __bootFaceEngine?: () => void;
    __faceEngine?: boolean;
  }
}

function getModeFromPath(pathname: string): PortfolioMode {
  const clean = pathname.toLowerCase().replace(/\/+$/, '');
  if (clean === '/dev' || clean.endsWith('/dev')) return 'dev';
  return 'design';
}

export default function App() {
  const [mode, setMode] = useState<PortfolioMode>(() =>
    getModeFromPath(window.location.pathname)
  );
  const [activeProject, setActiveProject] = useState<{
    project: ProjectItem;
    imageIndex: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window.__bootFaceEngine === 'function') {
      window.__bootFaceEngine();
    }
  }, []);

  // Normalize root "/" to "/design" and sync browser Back/Forward navigation
  useEffect(() => {
    const clean = window.location.pathname.toLowerCase().replace(/\/+$/, '');
    if (clean === '' || clean === '/') {
      window.history.replaceState(null, '', '/design');
    }

    const handlePopState = () => {
      setMode(getModeFromPath(window.location.pathname));
      setActiveProject(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const isDev = mode === 'dev';
    document.title = isDev
      ? 'Yuvraj Gurjar -- Software & ML Developer'
      : 'Yuvraj Gurjar -- 3D Creator';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        isDev
          ? 'Software & Machine Learning Developer portfolio of Yuvraj Gurjar — creator of IASify.in, Node-Based Image Processor, and DNA Sequence Data Analytics.'
          : '3D Creator portfolio of Yuvraj Gurjar (@creatiing) featuring interactive WebGL portrait, 3D interior lighting, aviation, and atmospheric environment renders.'
      );
    }
  }, [mode]);

  const handleChangeMode = useCallback(
    (nextMode: PortfolioMode) => {
      if (nextMode === mode) return;
      const targetPath = nextMode === 'dev' ? '/dev' : '/design';
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      setActiveProject(null);
      setMode(nextMode);
    },
    [mode]
  );

  const handleSelectProject = (project: ProjectItem, imageIndex = 0) => {
    setActiveProject({ project, imageIndex });
  };

  return (
    <main
      className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA]"
      style={{ overflowX: 'clip' }}
    >
      <HeroSection mode={mode} onChangeMode={handleChangeMode} />
      <AboutSection mode={mode} />
      <ServicesSection mode={mode} />
      <ProjectsSection mode={mode} onSelectProject={handleSelectProject} />

      <ProjectModal
        project={activeProject?.project ?? null}
        initialImageIndex={activeProject?.imageIndex ?? 0}
        mode={mode}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}
