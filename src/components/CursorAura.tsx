import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CursorAuraProps {
  isLightSurface: boolean;
}

export const CursorAura: React.FC<CursorAuraProps> = ({ isLightSurface }) => {
  const auraRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactiveHover, setInteractiveHover] = useState(false);
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
    if (!finePointer) return;

    let targetX = -400;
    let targetY = -400;
    let ringX = -400;
    let ringY = -400;
    let auraX = -400;
    let auraY = -400;
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);

      const el = e.target as HTMLElement | null;
      if (el) {
        const labeled = el.closest('[data-cursor-label]') as HTMLElement | null;
        if (labeled) {
          setCursorLabel(labeled.dataset.cursorLabel || null);
          setInteractiveHover(true);
        } else {
          setCursorLabel(null);
          const clickable = el.closest('a, button, [role="button"], [role="tab"], input, textarea');
          setInteractiveHover(Boolean(clickable));
        }
      }
    };

    const onLeave = () => {
      setVisible(false);
      setInteractiveHover(false);
      setCursorLabel(null);
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;
      auraX += (targetX - auraX) * 0.12;
      auraY += (targetY - auraY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (!enabled || !visible) return null;

  return (
    <>
      {/* Ambient Radial Aura across all sections */}
      <div
        ref={auraRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 h-[380px] w-[380px] rounded-full will-change-transform"
        style={{
          background: isLightSurface
            ? 'radial-gradient(circle, rgba(109,93,252,0.11) 0%, rgba(59,130,246,0.05) 42%, rgba(243,241,237,0) 70%)'
            : 'radial-gradient(circle, rgba(109,93,252,0.18) 0%, rgba(59,130,246,0.07) 42%, rgba(8,8,10,0) 70%)',
        }}
      />

      {/* Trailing Outer Cursor Ring / Contextual Project Badge */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 will-change-transform ${
          cursorLabel
            ? 'h-20 w-20 border border-[#6d5dfc] bg-[#6d5dfc] text-white shadow-xl shadow-[#6d5dfc]/30'
            : interactiveHover
            ? isLightSurface
              ? 'h-11 w-11 border border-[#6d5dfc] bg-[#6d5dfc]/10'
              : 'h-11 w-11 border border-[#6d5dfc] bg-[#6d5dfc]/15'
            : isLightSurface
            ? 'h-7 w-7 border border-[#101014]/35 bg-transparent'
            : 'h-7 w-7 border border-white/35 bg-transparent'
        }`}
      >
        {cursorLabel && (
          <span className="font-display text-[11px] font-semibold tracking-tight whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>

      {/* Precision Center Pointer Dot */}
      {!cursorLabel && (
        <div
          ref={dotRef}
          aria-hidden="true"
          className={`pointer-events-none fixed top-0 left-0 z-50 rounded-full transition-[width,height,background-color] duration-150 will-change-transform ${
            interactiveHover
              ? 'h-1.5 w-1.5 bg-[#6d5dfc]'
              : isLightSurface
              ? 'h-2 w-2 bg-[#101014]'
              : 'h-2 w-2 bg-[#f4f3ef]'
          }`}
        />
      )}
    </>
  );
};
