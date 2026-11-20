import React from 'react';
import { FileText } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface NavbarProps {
  onOpenResume: () => void;
  onNavigate: (id: string) => void;
}

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, onNavigate }) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-40 border-b border-white/10 bg-[#08080a]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-3.5 sm:px-8 lg:px-12">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="font-display text-base font-semibold tracking-tight text-[#f4f3ef] whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
        >
          {PROFILE.shortName}
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(link.id);
              }}
              className="group relative py-1 text-sm font-medium text-white/70 whitespace-nowrap shrink-0 transition-colors hover:text-[#f4f3ef]"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-[#6d5dfc] transition-all duration-200 group-hover:w-full"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-[#f4f3ef] whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-[#6d5dfc] hover:bg-[#6d5dfc] hover:text-white"
          >
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
