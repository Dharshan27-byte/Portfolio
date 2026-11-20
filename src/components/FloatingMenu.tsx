import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { PROFILE, SECTIONS } from '../data/portfolio';

interface FloatingMenuProps {
  activeSectionId: string;
  onNavigate: (id: string) => void;
  onOpenResume: () => void;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  activeSectionId,
  onNavigate,
  onOpenResume,
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string>(activeSectionId);

  useEffect(() => {
    setHoveredId(activeSectionId);
  }, [activeSectionId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const activeItem = SECTIONS.find((s) => s.id === hoveredId) ?? SECTIONS[0];

  const handleSelect = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="editorial-menu-overlay"
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        className={`fixed right-5 bottom-5 z-50 flex h-13 w-13 items-center justify-center rounded-full border transition-all duration-200 sm:right-8 sm:bottom-8 ${
          open
            ? 'border-white/25 bg-[#101014] text-white shadow-xl'
            : 'border-white/15 bg-[#6d5dfc] text-white shadow-lg shadow-[#6d5dfc]/25 hover:scale-105 hover:bg-[#5c4ce8]'
        }`}
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>

      {open && (
        <div
          id="editorial-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[#08080a] px-6 py-20 text-[#f4f3ef] sm:px-10 lg:px-16"
        >
          <div className="mx-auto grid w-full max-w-[1360px] flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <nav aria-label="Full navigation" className="lg:col-span-7">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {SECTIONS.map((sec) => {
                  const isFocused = sec.id === hoveredId;
                  return (
                    <li key={sec.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setHoveredId(sec.id)}
                        onFocus={() => setHoveredId(sec.id)}
                        onClick={() => handleSelect(sec.id)}
                        className="group flex w-full items-baseline justify-between gap-4 py-3.5 text-left transition-colors sm:py-4"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span className="font-mono text-xs tabular-nums text-white/40 group-hover:text-[#6d5dfc]">
                            {sec.number}
                          </span>
                          <span
                            className={`font-display text-2xl font-bold tracking-tight transition-all duration-200 sm:text-4xl lg:text-[2.75rem] ${
                              isFocused
                                ? 'translate-x-2 text-[#f4f3ef]'
                                : 'text-white/50 group-hover:text-[#f4f3ef]'
                            }`}
                          >
                            {sec.label}
                          </span>
                        </div>
                        <span className="hidden text-xs text-white/45 sm:inline-block">
                          {sec.subtitle}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right: Oversized Dynamic Index + Studio Vignette Portrait (00:18–00:26 in video) */}
            <div className="hidden lg:flex lg:col-span-5 flex-col items-end justify-center gap-6">
              <div className="font-mono text-7xl font-bold tabular-nums tracking-tighter text-white/20">
                {activeItem.number}
              </div>

              <div className="group relative w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/12 bg-[#0b0b0f]">
                <div className="relative aspect-[4/4.4] w-full overflow-hidden">
                  <img
                    src={PROFILE.portrait}
                    alt={PROFILE.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top grayscale contrast-125 transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
                </div>
                <div className="relative z-10 border-t border-white/10 p-4">
                  <div className="font-display text-sm font-semibold text-[#f4f3ef]">
                    {PROFILE.name}
                  </div>
                  <div className="mt-0.5 text-xs text-white/60">
                    {PROFILE.role} · {PROFILE.collegeShort}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 flex w-full max-w-[1360px] flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60">
            <div>{PROFILE.location}</div>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href={`mailto:${PROFILE.email}`}
                className="inline-flex items-center gap-1 text-[#f4f3ef] transition-colors hover:text-[#34d399]"
              >
                <span>{PROFILE.email}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                className="text-[#f4f3ef] transition-colors hover:text-[#3b82f6]"
              >
                {PROFILE.phone}
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenResume();
                }}
                className="inline-flex items-center gap-1.5 text-[#f4f3ef] transition-colors hover:text-[#6d5dfc]"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Open Resume</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
