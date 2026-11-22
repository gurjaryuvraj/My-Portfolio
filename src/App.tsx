import React, { useEffect, useState } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import type { ProjectItem } from './data/portfolio';

declare global {
  interface Window {
    __bootFaceEngine?: () => void;
    __faceEngine?: boolean;
  }
}

export default function App() {
  const [activeProject, setActiveProject] = useState<{
    project: ProjectItem;
    imageIndex: number;
  } | null>(null);

  useEffect(() => {
    if (typeof window.__bootFaceEngine === 'function') {
      window.__bootFaceEngine();
    }
  }, []);

  const handleSelectProject = (project: ProjectItem, imageIndex = 0) => {
    setActiveProject({ project, imageIndex });
  };

  return (
    <main
      className="min-h-screen w-full bg-[#0C0C0C] text-[#D7E2EA]"
      style={{ overflowX: 'clip' }}
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection onSelectProject={handleSelectProject} />

      <ProjectModal
        project={activeProject?.project ?? null}
        initialImageIndex={activeProject?.imageIndex ?? 0}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}
