import React, { useEffect, useRef, useState } from 'react';
import { TIMELINE } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const TimelineSection: React.FC = () => {
  const [activeYear, setActiveYear] = useState(TIMELINE[0].year);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Track which milestone is closest to middle of viewport to drive the sticky year readout
  useEffect(() => {
    const onScroll = () => {
      const targetY = window.innerHeight * 0.42;
      let bestIdx = 0;
      let bestDist = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = idx;
        }
      });

      if (TIMELINE[bestIdx]) {
        setActiveYear(TIMELINE[bestIdx].year);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Subtle orbital particle wave graphic above the sticky year (like 00:59 in video)
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 220;
    const h = 110;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let t = 0;
    let rafId = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = 28;
      const rows = 12;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1);
          const v = r / (rows - 1);
          const px = 22 + u * (w - 44) + (v - 0.5) * 24;
          const wave = Math.sin(u * 4.5 + t) * Math.cos(v * 3.2 - t * 0.7) * 11;
          const py = 26 + v * (h - 52) + wave;
          const alpha = 0.2 + (1 - v) * 0.52;
          ctx.fillStyle = c % 7 === 0 ? `rgba(109, 93, 252, ${Math.min(0.9, alpha + 0.15)})` : `rgba(16, 16, 20, ${alpha})`;
          ctx.fillRect(px, py, 1.7, 1.7);
        }
      }

      if (!reducedMotion) {
        t += 0.024;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  return (
    <section
      id="timeline"
      className="border-t border-black/10 bg-[#f3f1ed] py-20 text-[#101014] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5 text-xs font-medium text-[#101014]/65">
          <div className="flex items-center gap-4">
            <span className="font-mono tabular-nums text-[#6d5dfc]">05</span>
            <span>Experience & Education</span>
          </div>
          <span>2024 — 2028 Academic & Engineering Path</span>
        </div>

        {/* Intro */}
        <div className="mt-12 grid grid-cols-1 items-end gap-8 border-b border-black/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2
              className="font-display text-3xl font-bold leading-tight tracking-tight text-[#101014] sm:text-4xl lg:text-5xl"
              style={{ textWrap: 'balance' }}
            >
              Building strong CS fundamentals while shipping practical software.
            </h2>
          </div>
          <div className="flex justify-start lg:col-span-4 lg:justify-end">
            <canvas ref={waveCanvasRef} aria-hidden="true" className="opacity-90" />
          </div>
        </div>

        {/* Sticky Year + Scroll Milestones */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="text-xs font-medium text-[#101014]/55">Active Period</div>
              <div className="mt-2 font-display text-7xl font-extrabold tabular-nums tracking-tighter text-[#101014] sm:text-8xl lg:text-[7.5rem]">
                {activeYear}
              </div>
              <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#101014]/65">
                B.Tech Artificial Intelligence & Data Science at SKCET, combined with hackathons, verified coursework, and full-stack builds.
              </p>
            </div>
          </div>

          <div className="divide-y divide-black/10 border-t border-black/10 lg:col-span-7 lg:border-t-0">
            {TIMELINE.map((entry, idx) => (
              <div
                key={`${entry.period}-${entry.title}`}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="group py-8 transition-colors first:pt-0 sm:py-10"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#101014]/60">
                  <span className="font-mono font-medium tabular-nums text-[#047857]">{entry.period}</span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.type}</span>
                  <span aria-hidden="true">·</span>
                  <span>{entry.location}</span>
                </div>

                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-[#101014] transition-transform duration-200 group-hover:translate-x-1 sm:text-2xl">
                  {entry.title}
                </h3>

                <div className="mt-1 text-sm font-medium text-[#6d5dfc]">
                  {entry.organization}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#101014]/75">
                  {entry.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
