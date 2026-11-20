import React, { useState } from 'react';
import { SECTIONS } from '../data/portfolio';

interface ProgressRailProps {
  activeSectionId: string;
  scrollPercent: number;
  isLightSurface: boolean;
  onNavigate: (id: string) => void;
}

export const ProgressRail: React.FC<ProgressRailProps> = ({
  activeSectionId,
  scrollPercent,
  isLightSurface,
  onNavigate,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      aria-label="Section progress navigation"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 md:flex flex-col items-end gap-1.5 py-2"
    >
      <div
        className={`mb-2 font-mono text-[10px] tabular-nums transition-colors duration-200 ${
          isLightSurface ? 'text-[#101014]/60' : 'text-white/50'
        }`}
      >
        {Math.round(scrollPercent * 100)}%
      </div>

      <nav className="flex flex-col items-end gap-1">
        {SECTIONS.map((sec) => {
          const isActive = sec.id === activeSectionId;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onNavigate(sec.id)}
              onFocus={() => setExpanded(true)}
              onBlur={() => setExpanded(false)}
              aria-label={`Jump to ${sec.label}`}
              aria-current={isActive ? 'true' : undefined}
              className="group flex items-center gap-3 py-1.5 pl-3 focus-visible:outline-none"
            >
              <span
                className={`text-[11px] font-medium whitespace-nowrap transition-all duration-200 ${
                  expanded
                    ? 'translate-x-0 opacity-100'
                    : 'pointer-events-none translate-x-2 opacity-0'
                } ${
                  isActive
                    ? isLightSurface
                      ? 'text-[#101014]'
                      : 'text-[#f4f3ef]'
                    : isLightSurface
                    ? 'text-[#101014]/55 group-hover:text-[#101014]'
                    : 'text-white/45 group-hover:text-white/85'
                }`}
              >
                {sec.label}
              </span>

              <span
                aria-hidden="true"
                className={`block h-[2px] rounded-full transition-all duration-200 ${
                  isActive
                    ? 'w-6 bg-[#6d5dfc]'
                    : isLightSurface
                    ? 'w-2.5 bg-[#101014]/25 group-hover:w-4 group-hover:bg-[#101014]/60'
                    : 'w-2.5 bg-white/25 group-hover:w-4 group-hover:bg-white/60'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
