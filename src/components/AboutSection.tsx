import React, { useEffect, useRef, useState } from 'react';
import { PROFILE } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface DustDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
}

export const AboutSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef({ x: -999, y: -999, active: false });
  const [lensPos, setLensPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const container = stageRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: DustDot[] = [];
    let rafId = 0;

    const init = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = Array.from({ length: 120 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.9 + Math.random() * 1.4,
        alpha: 0.08 + Math.random() * 0.14,
      }));
    };

    init();
    const ro = new ResizeObserver(init);
    ro.observe(container);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const ptr = pointerRef.current;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        if (ptr.active) {
          const dx = d.x - ptr.x;
          const dy = d.y - ptr.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 0.1) {
            const push = ((140 - dist) / 140) * 2.2;
            d.x += (dx / dist) * push;
            d.y += (dy / dist) * push;
          }
        }

        ctx.fillStyle = `rgba(16, 16, 20, ${d.alpha})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle particle-rimmed lens ring when pointer is over the editorial statement
      if (ptr.active) {
        const rimCount = 56;
        const lensRadius = 128;
        for (let i = 0; i < rimCount; i++) {
          const a = (i / rimCount) * Math.PI * 2 + performance.now() * 0.0005;
          const jitter = Math.sin(i * 3.1 + performance.now() * 0.003) * 5;
          const rx = ptr.x + Math.cos(a) * (lensRadius + jitter);
          const ry = ptr.y + Math.sin(a) * (lensRadius + jitter);
          ctx.fillStyle = i % 6 === 0 ? 'rgba(109, 93, 252, 0.55)' : 'rgba(16, 16, 20, 0.35)';
          ctx.fillRect(rx, ry, 1.8, 1.8);
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointerRef.current = { x, y, active: true };
    setLensPos({ x, y, active: true });
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    setLensPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-[#f3f1ed] py-20 text-[#101014] sm:py-28 lg:py-36"
    >
      <div
        ref={stageRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12"
      >
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        )}

        {/* Section Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5 text-xs font-medium text-[#101014]/65">
          <div className="flex items-center gap-4">
            <span className="font-mono tabular-nums text-[#6d5dfc]">01</span>
            <span>About Me</span>
          </div>
          <span>{PROFILE.location}</span>
        </div>

        {/* Interactive Dual-Layer Statement with Circular Particle Lens (00:28–00:35 in video) */}
        <div
          className={`relative z-10 mt-12 transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div className="relative select-none">
            {/* Base Editorial Statement */}
            <h2
              className="max-w-5xl font-display text-2xl font-semibold leading-[1.2] tracking-tight text-[#101014]/45 sm:text-4xl lg:text-[2.9rem]"
              style={{ textWrap: 'balance' }}
            >
              {PROFILE.aboutLead}{' '}
              <span className="text-[#101014]">{PROFILE.aboutReveal}</span>
            </h2>

            {/* Circular Hover Reveal Overlay on Desktop */}
            {!reducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden rounded-2xl bg-[#101014] p-0 text-[#f4f3ef] transition-opacity duration-200 lg:block"
                style={{
                  clipPath: lensPos.active
                    ? `circle(124px at ${lensPos.x}px ${lensPos.y}px)`
                    : 'circle(0px at 50% 50%)',
                  opacity: lensPos.active ? 1 : 0,
                }}
              >
                <div className="max-w-5xl font-display text-2xl font-semibold leading-[1.2] tracking-tight sm:text-4xl lg:text-[2.9rem]">
                  {PROFILE.aboutLead}{' '}
                  <span className="text-[#6d5dfc]">{PROFILE.aboutReveal}</span>
                </div>
              </div>
            )}
          </div>

          {/* Resume Career Objective + Academic Summary */}
          <div className="mt-14 grid grid-cols-1 gap-8 border-t border-black/10 pt-8 md:grid-cols-12">
            <div className="md:col-span-6">
              <div className="text-xs font-semibold tracking-wide text-[#101014]/55">
                Career Objective
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#101014]/80 sm:text-base">
                {PROFILE.careerObjective}
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-semibold tracking-wide text-[#101014]/55">
                Education
              </div>
              <div className="mt-3 font-display text-base font-semibold text-[#101014]">
                {PROFILE.studyArea}
              </div>
              <div className="mt-1 text-sm text-[#101014]/70">{PROFILE.college}</div>
              <div className="mt-1 font-mono text-xs tabular-nums text-[#6d5dfc]">
                {PROFILE.duration}
              </div>
            </div>

            <div className="md:col-span-2 flex items-start md:justify-end">
              <div className="group relative h-24 w-24 overflow-hidden rounded-full border border-black/15 bg-[#e6e2da]">
                <img
                  src={PROFILE.portrait}
                  alt={PROFILE.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
