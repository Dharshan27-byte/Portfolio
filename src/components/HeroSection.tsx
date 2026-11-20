import React from 'react';
import { ArrowDownRight, ArrowRight, ChevronDown, FileText } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { ParticlePortrait } from './ParticlePortrait';
import { RotatingGlobe } from './RotatingGlobe';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface HeroSectionProps {
  scrollY: number;
  onExploreWork: () => void;
  onContact: () => void;
  onOpenResume: () => void;
  onScrollNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  scrollY,
  onExploreWork,
  onContact,
  onOpenResume,
  onScrollNext,
}) => {
  const reducedMotion = useReducedMotion();
  const scrollProgress = Math.min(1, Math.max(0, scrollY / 700));
  const textShift = reducedMotion ? 0 : Math.min(34, scrollY * 0.08);
  const indicatorOpacity = reducedMotion ? 1 : Math.max(0, 1 - scrollY / 180);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#08080a] pt-20 pb-8 text-[#f4f3ef]"
    >
      {/* Main Hero Canvas Grid */}
      <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Left/Center: Interactive Particle Portrait (hovering dots reveals original photo) */}
        <div className="relative order-2 flex h-[340px] items-center justify-center sm:h-[460px] lg:order-1 lg:col-span-6 lg:h-[600px]">
          <ParticlePortrait
            src="/assets/aistudio/photo_665abb60.png"
            alt={`Interactive particle portrait of ${PROFILE.name}`}
            scrollProgress={scrollProgress}
          />
        </div>

        {/* Right: Oversized Staggered Editorial Typography */}
        <div
          className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-6 lg:pl-4"
          style={{
            transform: `translate3d(0, ${textShift}px, 0)`,
          }}
        >
          <div className="mb-5 flex items-center gap-3 text-xs font-medium tracking-wide text-white/65">
            <ArrowDownRight className="h-4 w-4 text-[#6d5dfc]" aria-hidden="true" />
            <span>{PROFILE.name}</span>
            <span aria-hidden="true" className="text-white/30">·</span>
            <span>{PROFILE.role}</span>
          </div>

          <h1
            className="font-display font-bold leading-[1.03] tracking-tight text-[#f4f3ef]"
            style={{
              fontSize: 'clamp(2.25rem, 4.6vw, 4rem)',
              textWrap: 'balance',
            }}
          >
            <span className="block">Software you</span>
            <span className="block text-white/95">never have to</span>
            <span className="block text-[#6d5dfc]">overthink.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-[17px]">
            {PROFILE.subheadline}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/50">
            <span>{PROFILE.studyArea}</span>
            <span aria-hidden="true">·</span>
            <span>{PROFILE.collegeShort}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{PROFILE.duration}</span>
          </div>

          {/* Primary Pill CTA & Clean Links (matching 00:01 in video) */}
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 rounded-full bg-[#6d5dfc] px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#5c4ce8] active:scale-[0.98]"
            >
              <span>Let&apos;s talk</span>
            </button>

            <button
              type="button"
              onClick={onExploreWork}
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#f4f3ef] transition-colors hover:text-[#6d5dfc]"
            >
              <span>See the work</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/65 transition-colors hover:text-[#34d399]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Strip & Subtle Scroll Indicator */}
      <div className="mx-auto mt-6 grid w-full max-w-[1440px] grid-cols-1 items-center gap-4 border-t border-white/10 px-5 pt-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12">
        <div className="justify-self-start">
          <RotatingGlobe
            locationLabel="Tamil Nadu, India"
            coordinatesLabel="11.0168° N, 76.9558° E"
          />
        </div>

        {/* Center: Subtle Editorial Hairline + Double-Chevron Scroll Cue */}
        <div
          className="order-3 flex justify-center transition-opacity duration-300 sm:col-span-2 lg:order-2 lg:col-span-1"
          style={{
            opacity: indicatorOpacity,
            pointerEvents: indicatorOpacity < 0.1 ? 'none' : 'auto',
          }}
        >
          <button
            type="button"
            onClick={onScrollNext}
            tabIndex={indicatorOpacity < 0.1 ? -1 : 0}
            aria-hidden={indicatorOpacity < 0.1}
            aria-label="Scroll down to About section"
            className="group inline-flex items-center gap-3.5 rounded-full px-3 py-1.5 text-left transition-colors hover:text-white"
          >
            {/* Vertical animated hairline stream */}
            <span
              aria-hidden="true"
              className="relative flex h-7 w-4 items-center justify-center overflow-hidden"
            >
              <span className="h-full w-px bg-white/15" />
              <span className="animate-scroll-line absolute top-0 h-3 w-px bg-gradient-to-b from-transparent via-[#6d5dfc] to-[#34d399]" />
            </span>

            <span className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-white/65 transition-colors group-hover:text-[#f4f3ef]">
                Scroll to explore
              </span>
              <span className="mt-0.5 font-mono text-[10px] tabular-nums text-white/40 transition-colors group-hover:text-[#6d5dfc]">
                01 · About &amp; Selected Work
              </span>
            </span>

            {/* Staggered dual chevrons */}
            <span
              aria-hidden="true"
              className="flex flex-col items-center -space-y-2 text-[#6d5dfc]"
            >
              <ChevronDown className="animate-scroll-chevron h-3.5 w-3.5" />
              <ChevronDown className="animate-scroll-chevron-delayed h-3.5 w-3.5 text-[#34d399]" />
            </span>
          </button>
        </div>

        <div className="order-2 flex flex-wrap items-center gap-4 text-xs text-white/55 sm:justify-self-end lg:order-3">
          <span>Hover dots to reveal original portrait</span>
          <span aria-hidden="true" className="hidden text-white/25 sm:inline">/</span>
          <span className="hidden sm:inline">4 Featured Projects</span>
        </div>
      </div>
    </section>
  );
};
