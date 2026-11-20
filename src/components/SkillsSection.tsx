import React, { useEffect, useRef } from 'react';
import { MARQUEE_ITEMS, SKILL_GROUPS } from '../data/portfolio';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const SkillsSection: React.FC = () => {
  const { ref, inView } = useInView<HTMLElement>(0.15);
  const mottoRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: -999, y: -999, active: false });
  const reducedMotion = useReducedMotion();

  // Interactive starfield particle backdrop for the Motto statement (01:03 in video)
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    const container = mottoRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let rafId = 0;
    let stars: Array<{ x: number; y: number; ox: number; oy: number; r: number; a: number }> = [];

    const setup = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = Array.from({ length: 160 }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return { x, y, ox: x, oy: y, r: 0.8 + Math.random() * 1.3, a: 0.2 + Math.random() * 0.55 };
      });
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(container);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const ptr = pointerRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (ptr.active) {
          const dx = s.x - ptr.x;
          const dy = s.y - ptr.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110 && dist > 0.1) {
            const push = ((110 - dist) / 110) * 3.5;
            s.x += (dx / dist) * push;
            s.y += (dy / dist) * push;
          }
        }
        s.x += (s.ox - s.x) * 0.04;
        s.y += (s.oy - s.y) * 0.04;

        ctx.fillStyle = `rgba(244, 243, 239, ${s.a})`;
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section
      id="skills"
      ref={ref}
      className="border-t border-white/10 bg-[#08080a] pt-16 text-[#f4f3ef] sm:pt-24"
    >
      {/* Continuous Skill & Focus Marquee */}
      <div className="overflow-hidden border-y border-white/10 py-4">
        <div className="animate-marquee flex items-center gap-8 px-4 text-sm font-medium text-white/75">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <React.Fragment key={`${item}-${idx}`}>
              <span className="whitespace-nowrap transition-colors hover:text-white">{item}</span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  idx % 3 === 0
                    ? 'bg-[#6d5dfc]'
                    : idx % 3 === 1
                    ? 'bg-[#3b82f6]'
                    : 'bg-[#34d399]'
                }`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 text-xs font-medium text-white/60">
          <div className="flex items-center gap-4">
            <span className="font-mono tabular-nums text-[#6d5dfc]">06</span>
            <span>Skills & Stack</span>
          </div>
          <span>Languages, web frameworks, databases & AI</span>
        </div>

        {/* Structured Skill Columns */}
        <div
          className={`mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {SKILL_GROUPS.map((group, idx) => (
            <div
              key={group.title}
              className="group rounded-2xl border border-white/10 bg-[#0e0e12] p-6 transition-colors duration-200 hover:border-[#6d5dfc]/55"
            >
              <div className="font-mono text-xs tabular-nums text-white/40 group-hover:text-[#6d5dfc]">
                0{idx + 1}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-[#f4f3ef]">
                {group.title}
              </h3>
              <p className="mt-1 text-xs text-white/50">{group.subtitle}</p>

              <ul className="mt-6 space-y-2.5">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="border-b border-white/[0.06] pb-2 text-sm text-white/80 transition-colors hover:text-white last:border-b-0"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Editorial Motto with Interactive Particle Field (01:03 in video) */}
      <div
        ref={mottoRef}
        onPointerMove={(e) => {
          const rect = mottoRef.current?.getBoundingClientRect();
          if (!rect) return;
          pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
        }}
        onPointerLeave={() => {
          pointerRef.current.active = false;
        }}
        className="relative mt-20 overflow-hidden border-t border-white/10 py-24 text-center sm:py-32"
      >
        {!reducedMotion && (
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          />
        )}
        <div className="relative z-10 mx-auto max-w-4xl px-5">
          <p className="text-xs font-medium tracking-wide text-white/45">
            Engineering Principle
          </p>
          <h3
            className="mt-4 font-display text-4xl font-bold tracking-tight text-[#f4f3ef] sm:text-6xl"
            style={{ textWrap: 'balance' }}
          >
            Good code is <span className="text-[#6d5dfc]">invisible.</span>
          </h3>
        </div>
      </div>
    </section>
  );
};
