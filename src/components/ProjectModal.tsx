import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../data/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && project.images.length > 1) {
        setActiveImageIdx((prev) => (prev + 1) % project.images.length);
      } else if (e.key === 'ArrowLeft' && project.images.length > 1) {
        setActiveImageIdx((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.images[activeImageIdx] ?? project.images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111115] text-[#f4f3ef] shadow-2xl"
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 font-mono text-xs tabular-nums text-white/55">
              <span className="text-[#6d5dfc]">{project.index} / 04</span>
              <span aria-hidden="true">·</span>
              <span className="truncate">{project.category}</span>
            </div>
            <h2
              id="project-modal-title"
              className="mt-1 truncate font-display text-xl font-bold tracking-tight sm:text-2xl"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          {/* Interactive Gallery Viewer or Styled Schematic Preview */}
          {currentImage ? (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#08080a]">
              <div className="relative aspect-[16/9.5] w-full overflow-hidden">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain bg-[#08080a]"
                />

                {project.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIdx(
                          (prev) => (prev - 1 + project.images.length) % project.images.length
                        )
                      }
                      aria-label="Previous screenshot"
                      className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:bg-[#6d5dfc]"
                    >
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveImageIdx((prev) => (prev + 1) % project.images.length)
                      }
                      aria-label="Next screenshot"
                      className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition-colors hover:bg-[#6d5dfc]"
                    >
                      <ChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-white/70">
                <span>{currentImage.caption}</span>
                <span className="font-mono tabular-nums text-white/50">
                  {activeImageIdx + 1} / {project.images.length}
                </span>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#141320] via-[#0d0d13] to-[#08080a] p-6 sm:p-10">
              <div className="flex flex-col items-center justify-center gap-4 text-center">
                <svg viewBox="0 0 420 170" className="w-full max-w-md" aria-hidden="true">
                  <rect x="18" y="20" width="120" height="130" rx="10" fill="none" stroke="#6d5dfc" strokeWidth="1.5" />
                  <line x1="36" y1="50" x2="118" y2="50" stroke="#f4f3ef" strokeOpacity="0.6" strokeWidth="1.5" />
                  <line x1="36" y1="72" x2="104" y2="72" stroke="#3b82f6" strokeOpacity="0.7" strokeWidth="1.5" />
                  <line x1="36" y1="94" x2="114" y2="94" stroke="#f4f3ef" strokeOpacity="0.4" strokeWidth="1.5" />
                  <path d="M 138 85 C 190 85, 200 48, 252 48" fill="none" stroke="#34d399" strokeWidth="1.75" />
                  <path d="M 138 85 C 190 85, 200 122, 252 122" fill="none" stroke="#6d5dfc" strokeWidth="1.75" />
                  <rect x="252" y="20" width="150" height="56" rx="10" fill="none" stroke="#34d399" strokeWidth="1.5" />
                  <rect x="252" y="94" width="150" height="56" rx="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                </svg>
                <div className="font-display text-base font-semibold text-[#f4f3ef]">
                  {project.title} — Architecture Preview
                </div>
                <p className="max-w-md text-xs text-white/60">
                  {project.subtitle}
                </p>
              </div>
            </div>
          )}

          {/* Thumbnails */}
          {project.images.length > 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => setActiveImageIdx(i)}
                  aria-label={`View screenshot ${i + 1}: ${img.caption}`}
                  className={`h-14 w-24 overflow-hidden rounded-lg border transition-all ${
                    i === activeImageIdx
                      ? 'border-[#6d5dfc] ring-2 ring-[#6d5dfc]/40'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description & Highlights */}
          <div className="mt-8 grid grid-cols-1 gap-8 border-t border-white/10 pt-7 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h3 className="text-xs font-semibold tracking-wide text-white/50">
                Project Overview
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                {project.description}
              </p>

              <h3 className="mt-6 text-xs font-semibold tracking-wide text-white/50">
                Key Implementation Details
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#34d399]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div>
                <h3 className="text-xs font-semibold tracking-wide text-white/50">
                  Timeline
                </h3>
                <p className="mt-1.5 font-mono text-sm tabular-nums text-[#f4f3ef]">
                  {project.year}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold tracking-wide text-white/50">
                  Technologies & Stack
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm text-white/80">
                  {project.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      {idx > 0 && <span aria-hidden="true" className="text-white/30">·</span>}
                      <span>{tech}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
