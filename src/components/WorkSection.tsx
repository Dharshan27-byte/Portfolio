import React from 'react';
import { ArrowRight, Images } from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface WorkSectionProps {
  scrollY: number;
  onSelectProject: (project: ProjectItem) => void;
}

const ProjectShowcaseRow: React.FC<{
  project: ProjectItem;
  idx: number;
  scrollY: number;
  reducedMotion: boolean;
  onSelect: (project: ProjectItem) => void;
}> = ({ project, idx, scrollY, reducedMotion, onSelect }) => {
  const { ref, inView } = useInView<HTMLElement>(0.1);
  const parallax = reducedMotion ? 0 : Math.sin(scrollY * 0.0018 + idx * 1.4) * 10;
  const primaryImage = project.images[0];

  return (
    <article
      ref={ref}
      className={`border-b border-white/10 py-10 sm:py-14 transition-all duration-700 ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Full-Bleed Atmospheric Card (inspired by 00:51–00:57 in video) */}
      <div
        onClick={() => onSelect(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project);
          }
        }}
        role="button"
        tabIndex={0}
        data-cursor-label="View →"
        aria-label={`Inspect ${project.title}: ${project.subtitle}`}
        className="group relative flex min-h-[420px] cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-[#111115] p-6 transition-colors duration-200 hover:border-[#6d5dfc]/65 sm:min-h-[500px] sm:p-10 lg:min-h-[540px] lg:p-12"
      >
        {/* Atmospheric Backdrop Image or Styled Domain Schematic */}
        {primaryImage ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
            style={{
              transform: `translate3d(0, ${parallax}px, 0) scale(1.04)`,
            }}
          >
            <img
              src={primaryImage.src}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-top opacity-45 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/70 to-[#08080a]/55" />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-[#141320] via-[#0d0d13] to-[#08080a]"
          >
            <svg
              viewBox="0 0 800 420"
              className="h-full w-full opacity-55 transition-transform duration-500 group-hover:scale-[1.03]"
            >
              <defs>
                <pattern id={`grid-${project.id}`} width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.12)" />
                </pattern>
              </defs>
              <rect width="800" height="420" fill={`url(#grid-${project.id})`} />
              <g stroke="#6d5dfc" strokeOpacity="0.45" strokeWidth="1.5" fill="none">
                <rect x="90" y="76" width="210" height="240" rx="14" />
                <line x1="120" y1="120" x2="265" y2="120" />
                <line x1="120" y1="148" x2="240" y2="148" stroke="#3b82f6" strokeOpacity="0.5" />
                <line x1="120" y1="176" x2="255" y2="176" />
                <path d="M 300 196 C 365 196, 395 140, 465 140" stroke="#34d399" strokeOpacity="0.65" />
                <path d="M 300 196 C 365 196, 395 256, 465 256" stroke="#6d5dfc" strokeOpacity="0.65" />
                <rect x="465" y="88" width="240" height="96" rx="12" stroke="#34d399" strokeOpacity="0.5" />
                <rect x="465" y="210" width="240" height="96" rx="12" stroke="#3b82f6" strokeOpacity="0.5" />
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/55 to-transparent" />
          </div>
        )}

        {/* Top Row: Category & Counter */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-white/75">
          <div className="flex items-center gap-2.5">
            <span>{project.category}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span className="font-mono tabular-nums text-white/60">{project.year}</span>
          </div>
          <span className="font-mono tabular-nums text-white/80">
            {project.index} / 04
          </span>
        </div>

        {/* Center/Bottom Editorial Content */}
        <div className="relative z-10 mt-auto grid grid-cols-1 items-end gap-8 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h3
              className="font-display text-4xl font-bold tracking-tight text-[#f4f3ef] transition-transform duration-300 group-hover:translate-x-1 sm:text-5xl lg:text-6xl"
              style={{ textWrap: 'balance' }}
            >
              {project.title}
            </h3>
            <p className="mt-2 text-sm font-medium text-white/80 sm:text-base">
              {project.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:col-span-6">
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
                {project.summary}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/60">
                {project.technologies.map((tech, i) => (
                  <React.Fragment key={tech}>
                    {i > 0 && <span aria-hidden="true" className="text-white/25">·</span>}
                    <span>{tech}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Circular Violet CTA Button (00:53 in video) */}
            <div className="flex shrink-0 items-center gap-3">
              <span className="inline-flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-full bg-[#6d5dfc] text-center text-[11px] font-semibold text-white shadow-lg shadow-[#6d5dfc]/30 transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#5c4ce8]">
                <span>View</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Supplied Screenshot Preview Strip */}
      {project.images.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="grid flex-1 grid-cols-3 gap-2.5 sm:grid-cols-5">
            {project.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => onSelect(project)}
                aria-label={`Open ${project.title} screenshot ${i + 1}`}
                className="overflow-hidden rounded-lg border border-white/10 bg-[#111115] opacity-75 transition-all hover:border-[#6d5dfc]/60 hover:opacity-100"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="aspect-[16/10] w-full object-cover object-top"
                />
              </button>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 font-mono text-xs tabular-nums text-white/50">
            <Images className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{project.images.length} screenshots</span>
          </span>
        </div>
      )}
    </article>
  );
};

export const WorkSection: React.FC<WorkSectionProps> = ({
  scrollY,
  onSelectProject,
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="work"
      className="border-t border-white/10 bg-[#08080a] py-20 text-[#f4f3ef] sm:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-xs font-medium text-white/60">
          <div className="flex items-center gap-4">
            <span className="font-mono tabular-nums text-[#6d5dfc]">04</span>
            <span>Selected Work</span>
          </div>
          <span>Four featured builds & prototypes</span>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
          <h2
            className="font-display text-3xl font-bold tracking-tight text-[#f4f3ef] sm:text-5xl"
            style={{ textWrap: 'balance' }}
          >
            Work built across healthcare, fitness, automation, and AI learning.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Hover any project card and click to open the full screenshot gallery and technical breakdown.
          </p>
        </div>

        <div>
          {PROJECTS.map((project, idx) => (
            <ProjectShowcaseRow
              key={project.id}
              project={project}
              idx={idx}
              scrollY={scrollY}
              reducedMotion={reducedMotion}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
