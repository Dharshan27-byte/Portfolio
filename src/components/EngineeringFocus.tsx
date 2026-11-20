import React, { useState } from 'react';
import { CAPABILITIES, PROCESS_STEPS } from '../data/portfolio';
import { useInView } from '../hooks/useInView';

export const EngineeringFocus: React.FC = () => {
  const [capIdx, setCapIdx] = useState(0);
  const [procIdx, setProcIdx] = useState(0);
  const { ref: capRef, inView: capInView } = useInView<HTMLElement>(0.12);
  const { ref: procRef, inView: procInView } = useInView<HTMLElement>(0.12);

  const currentCap = CAPABILITIES[capIdx];
  const currentProc = PROCESS_STEPS[procIdx];

  return (
    <>
      {/* 02 · What I Build (Warm Off-White Scene, matching 00:36–00:43) */}
      <section
        id="focus"
        ref={capRef}
        className="border-t border-black/10 bg-[#f3f1ed] py-20 text-[#101014] sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5 text-xs font-medium text-[#101014]/65">
            <div className="flex items-center gap-4">
              <span className="font-mono tabular-nums text-[#6d5dfc]">02</span>
              <span>What I Build</span>
            </div>
            <span>From interface design to database logic</span>
          </div>

          <div
            className={`mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 transition-all duration-700 ${
              capInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="lg:col-span-6">
              <div className="text-xs font-medium text-[#101014]/55">
                {currentCap.index} / 04
              </div>
              <h2
                className="mt-2 font-display text-4xl font-bold tracking-tight text-[#101014] sm:text-5xl lg:text-6xl"
                style={{ textWrap: 'balance' }}
              >
                {currentCap.headline}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#101014]/75">
                {currentCap.description}
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="group flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-black/10 bg-[#eae7e0] p-6 transition-colors duration-200 hover:border-[#6d5dfc]/50 sm:p-10">
                {currentCap.diagramType === 'wireframe' && (
                  <svg key="cap-wire" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    <rect x="20" y="18" width="380" height="204" rx="12" fill="none" stroke="#101014" strokeWidth="1.75" className="animate-stroke-draw" />
                    <line x1="20" y1="52" x2="400" y2="52" stroke="#101014" strokeOpacity="0.25" strokeWidth="1.2" />
                    <rect x="38" y="68" width="160" height="12" rx="4" fill="#6d5dfc" fillOpacity="0.24" stroke="#6d5dfc" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="38" y="92" width="210" height="9" rx="3" fill="#3b82f6" fillOpacity="0.22" />
                    <rect x="38" y="124" width="76" height="78" rx="8" fill="none" stroke="#101014" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="126" y="124" width="76" height="78" rx="8" fill="none" stroke="#101014" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="214" y="124" width="76" height="78" rx="8" fill="none" stroke="#101014" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="302" y="124" width="76" height="78" rx="8" fill="none" stroke="#6d5dfc" strokeWidth="1.75" className="animate-stroke-draw" />
                  </svg>
                )}

                {currentCap.diagramType === 'grid' && (
                  <svg key="cap-grid" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    {[40, 130, 220, 310].map((x) => (
                      <rect key={`top-${x}`} x={x} y="30" width="70" height="24" rx="12" fill="none" stroke="#101014" strokeWidth="1.5" className="animate-stroke-draw" />
                    ))}
                    <rect x="40" y="76" width="102" height="130" rx="10" fill="none" stroke="#101014" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="159" y="76" width="102" height="130" rx="10" fill="#6d5dfc" fillOpacity="0.16" stroke="#6d5dfc" strokeWidth="2" className="animate-stroke-draw" />
                    <rect x="278" y="76" width="102" height="130" rx="10" fill="none" stroke="#101014" strokeWidth="1.5" className="animate-stroke-draw" />
                  </svg>
                )}

                {currentCap.diagramType === 'network' && (
                  <svg key="cap-net" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    <g stroke="#101014" strokeOpacity="0.28" strokeWidth="1.4" className="animate-stroke-draw">
                      <line x1="74" y1="60" x2="198" y2="56" />
                      <line x1="74" y1="60" x2="198" y2="120" />
                      <line x1="74" y1="120" x2="198" y2="56" />
                      <line x1="74" y1="120" x2="198" y2="120" />
                      <line x1="74" y1="120" x2="198" y2="184" />
                      <line x1="74" y1="180" x2="198" y2="184" />
                      <line x1="198" y1="56" x2="344" y2="90" stroke="#3b82f6" strokeOpacity="0.8" />
                      <line x1="198" y1="120" x2="344" y2="90" stroke="#3b82f6" strokeOpacity="0.8" />
                      <line x1="198" y1="120" x2="344" y2="152" stroke="#6d5dfc" strokeOpacity="0.8" />
                      <line x1="198" y1="184" x2="344" y2="152" stroke="#6d5dfc" strokeOpacity="0.8" />
                    </g>
                    {[60, 120, 180].map((y) => (
                      <circle key={`n1-${y}`} cx="74" cy={y} r="13" fill="#f3f1ed" stroke="#101014" strokeWidth="1.75" />
                    ))}
                    {[56, 120, 184].map((y) => (
                      <circle key={`n2-${y}`} cx="198" cy={y} r="14" fill="#f3f1ed" stroke="#3b82f6" strokeWidth="2" />
                    ))}
                    <circle cx="344" cy="90" r="16" fill="#6d5dfc" fillOpacity="0.2" stroke="#6d5dfc" strokeWidth="2" />
                    <circle cx="344" cy="152" r="16" fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="2" />
                  </svg>
                )}

                {currentCap.diagramType === 'architecture' && (
                  <svg key="cap-arch" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    <polygon points="210,24 334,70 210,116 86,70" fill="none" stroke="#101014" strokeWidth="1.75" className="animate-stroke-draw" />
                    <polygon points="210,74 334,120 210,166 86,120" fill="#34d399" fillOpacity="0.16" stroke="#34d399" strokeWidth="2" className="animate-stroke-draw" />
                    <polygon points="210,124 334,170 210,216 86,170" fill="none" stroke="#101014" strokeWidth="1.75" className="animate-stroke-draw" />
                    <line x1="86" y1="70" x2="86" y2="170" stroke="#101014" strokeOpacity="0.3" strokeWidth="1.25" />
                    <line x1="334" y1="70" x2="334" y2="170" stroke="#101014" strokeOpacity="0.3" strokeWidth="1.25" />
                    <line x1="210" y1="116" x2="210" y2="216" stroke="#101014" strokeOpacity="0.3" strokeWidth="1.25" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Capabilities"
            className="mt-12 grid grid-cols-2 gap-3 border-t border-black/10 pt-6 lg:grid-cols-4"
          >
            {CAPABILITIES.map((cap, idx) => {
              const active = idx === capIdx;
              return (
                <button
                  key={cap.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCapIdx(idx)}
                  onMouseEnter={() => setCapIdx(idx)}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-150 ${
                    active
                      ? 'border-[#101014] bg-[#101014] text-[#f4f3ef]'
                      : 'border-black/10 bg-transparent text-[#101014]/75 hover:border-black/35 hover:bg-black/[0.03] hover:text-[#101014]'
                  }`}
                >
                  <span className={`font-mono text-xs tabular-nums ${active ? 'text-[#6d5dfc]' : 'text-[#101014]/45'}`}>
                    {cap.index}
                  </span>
                  <span className="mt-1.5 font-display text-sm font-semibold sm:text-base">
                    {cap.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 · How It Ships (Dark Scene, matching 00:44–00:50) */}
      <section
        id="process"
        ref={procRef}
        className="bg-[#08080a] py-20 text-[#f4f3ef] sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div
            className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-12 transition-all duration-700 ${
              procInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            {/* Left: Animated Schematic */}
            <div className="order-2 lg:order-1 lg:col-span-6">
              <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-white/12 bg-[#111115] p-6 transition-colors duration-200 hover:border-[#6d5dfc]/60 sm:p-10">
                {currentProc.diagramType === 'wireframe' && (
                  <svg key="proc-wire" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    <rect x="24" y="20" width="372" height="200" rx="10" fill="none" stroke="#f4f3ef" strokeOpacity="0.65" strokeDasharray="6 6" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="44" y="44" width="210" height="44" rx="6" fill="none" stroke="#6d5dfc" strokeWidth="1.75" className="animate-stroke-draw" />
                    <rect x="274" y="44" width="102" height="152" rx="6" fill="none" stroke="#f4f3ef" strokeOpacity="0.4" strokeWidth="1.5" className="animate-stroke-draw" />
                    <rect x="44" y="106" width="210" height="90" rx="6" fill="none" stroke="#3b82f6" strokeOpacity="0.7" strokeWidth="1.5" className="animate-stroke-draw" />
                  </svg>
                )}

                {currentProc.diagramType === 'hub' && (
                  <svg key="proc-hub" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    <g stroke="#6d5dfc" strokeOpacity="0.7" strokeWidth="1.75" className="animate-stroke-draw">
                      <line x1="210" y1="120" x2="88" y2="54" />
                      <line x1="210" y1="120" x2="88" y2="120" />
                      <line x1="210" y1="120" x2="88" y2="186" />
                      <line x1="210" y1="120" x2="332" y2="54" />
                      <line x1="210" y1="120" x2="332" y2="120" />
                      <line x1="210" y1="120" x2="332" y2="186" />
                    </g>
                    <circle cx="210" cy="120" r="24" fill="#6d5dfc" />
                    {[
                      { x: 88, y: 54, label: 'UI' },
                      { x: 88, y: 120, label: 'Auth' },
                      { x: 88, y: 186, label: 'GPS' },
                      { x: 332, y: 54, label: 'DB' },
                      { x: 332, y: 120, label: 'API' },
                      { x: 332, y: 186, label: 'Logs' },
                    ].map((node) => (
                      <g key={node.label}>
                        <circle cx={node.x} cy={node.y} r="22" fill="#08080a" stroke="#f4f3ef" strokeOpacity="0.7" strokeWidth="1.5" />
                        <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#f4f3ef" fontSize="11" fontFamily="Plus Jakarta Sans, sans-serif">
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                )}

                {currentProc.diagramType === 'code' && (
                  <div className="w-full max-w-sm space-y-2 font-mono text-xs sm:text-sm">
                    <div className="text-[#6d5dfc]">for message in unread_threads:</div>
                    <div className="pl-5 text-[#f4f3ef]">parsed = parse_email(message)</div>
                    <div className="pl-5 text-[#3b82f6]">if not state.seen(parsed.id):</div>
                    <div className="pl-10 text-[#34d399]">sheets.append(parsed.row)</div>
                    <div className="pl-10 text-white/60">state.commit(parsed.id)</div>
                  </div>
                )}

                {currentProc.diagramType === 'pulse' && (
                  <svg key="proc-pulse" viewBox="0 0 420 240" className="h-full w-full" aria-hidden="true">
                    <path
                      d="M 28 122 L 104 122 L 136 52 L 172 192 L 204 94 L 236 146 L 266 122 L 382 122"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-stroke-draw"
                    />
                    <circle cx="382" cy="122" r="8" fill="#34d399" />
                  </svg>
                )}
              </div>
            </div>

            {/* Right: Headline */}
            <div className="order-1 lg:order-2 lg:col-span-6 lg:pl-6">
              <div className="font-mono text-xs tabular-nums text-[#6d5dfc]">
                03 · Process — {currentProc.index} / 04
              </div>
              <h2
                className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-[#f4f3ef] sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                {currentProc.headline}
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
                {currentProc.description}
              </p>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Engineering process"
            className="mt-12 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 lg:grid-cols-4"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const active = idx === procIdx;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setProcIdx(idx)}
                  onMouseEnter={() => setProcIdx(idx)}
                  className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-150 ${
                    active
                      ? 'border-[#6d5dfc] bg-[#6d5dfc]/15 text-[#f4f3ef]'
                      : 'border-white/10 bg-transparent text-white/60 hover:border-white/30 hover:bg-white/[0.03] hover:text-[#f4f3ef]'
                  }`}
                >
                  <span className="font-mono text-xs tabular-nums text-[#6d5dfc]">
                    {step.index}
                  </span>
                  <span className="mt-1.5 font-display text-sm font-semibold sm:text-base">
                    {step.title}
                  </span>
                  <span className="mt-1 line-clamp-2 text-xs text-white/55">
                    {step.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
