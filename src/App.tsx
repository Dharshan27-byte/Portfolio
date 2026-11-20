import { useCallback, useEffect, useState } from 'react';
import { ProjectItem, SECTIONS } from './data/portfolio';
import { useReducedMotion } from './hooks/useReducedMotion';
import { CursorAura } from './components/CursorAura';
import { Navbar } from './components/Navbar';
import { ProgressRail } from './components/ProgressRail';
import { FloatingMenu } from './components/FloatingMenu';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EngineeringFocus } from './components/EngineeringFocus';
import { WorkSection } from './components/WorkSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactFooter } from './components/ContactFooter';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';

const LIGHT_SECTION_IDS = new Set(['about', 'focus', 'timeline', 'contact']);

export function App() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(docHeight > 0 ? Math.min(1, Math.max(0, y / docHeight)) : 0);

      const mid = window.innerHeight * 0.4;
      let current = 'hero';
      for (const sec of SECTIONS) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid) {
          current = sec.id;
        }
      }
      setActiveSectionId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [reducedMotion]
  );

  const isLightSurface = LIGHT_SECTION_IDS.has(activeSectionId);

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#f4f3ef]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-[#6d5dfc] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <CursorAura isLightSurface={isLightSurface} />

      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onNavigate={scrollToSection}
      />

      <ProgressRail
        activeSectionId={activeSectionId}
        scrollPercent={scrollPercent}
        isLightSurface={isLightSurface}
        onNavigate={scrollToSection}
      />

      <FloatingMenu
        activeSectionId={activeSectionId}
        onNavigate={scrollToSection}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main id="main-content">
        <HeroSection
          scrollY={scrollY}
          onExploreWork={() => scrollToSection('work')}
          onContact={() => scrollToSection('contact')}
          onOpenResume={() => setResumeOpen(true)}
          onScrollNext={() => scrollToSection('about')}
        />

        <AboutSection />

        <EngineeringFocus />

        <WorkSection
          scrollY={scrollY}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <TimelineSection />

        <SkillsSection />

        <ContactFooter
          onOpenResume={() => setResumeOpen(true)}
          onBackToTop={() => scrollToSection('hero')}
        />
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default App;
