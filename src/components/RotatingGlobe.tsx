import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface RotatingGlobeProps {
  locationLabel: string;
  coordinatesLabel: string;
}

export const RotatingGlobe: React.FC<RotatingGlobeProps> = ({
  locationLabel,
  coordinatesLabel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [istTime, setIstTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setIstTime(formatted);
      } catch {
        setIstTime('IST');
      }
    };
    updateClock();
    const id = window.setInterval(updateClock, 30000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 64;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Precompute Fibonacci sphere points
    const points: Array<{ x: number; y: number; z: number }> = [];
    const total = 180;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      points.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
      });
    }

    let angle = 0.6;
    let rafId = 0;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 26;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // Subtle outer ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 1.5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const tilt = 0.3;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const rx = p.x * cosA - p.z * sinA;
        const rz = p.x * sinA + p.z * cosA;
        const ry = p.y * cosT - rz * sinT;
        const finalZ = p.y * sinT + rz * cosT;

        if (finalZ > -0.15) {
          const sx = cx + rx * radius;
          const sy = cy + ry * radius;
          const depth = (finalZ + 1) / 2;
          ctx.fillStyle = `rgba(244, 243, 239, ${(0.18 + depth * 0.68).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, depth > 0.72 ? 1.15 : 0.85, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // India coordinate highlight dot
      const markerLon = angle + 1.35;
      const mx = Math.cos(markerLon) * 0.94;
      const mz = Math.sin(markerLon) * 0.94;
      const my = -0.19; // ~11 deg North
      const mry = my * cosT - mz * sinT;
      const mfz = my * sinT + mz * cosT;
      if (mfz > 0) {
        const sx = cx + mx * radius;
        const sy = cy + mry * radius;
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        angle += 0.009;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  return (
    <div className="flex items-center gap-3.5">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="shrink-0 rounded-full bg-[#0d0d11]"
      />
      <div className="text-xs leading-relaxed">
        <div className="flex items-center gap-2 font-medium text-[#f4f3ef]">
          <span>{locationLabel}</span>
          {istTime && (
            <>
              <span aria-hidden="true" className="text-white/35">·</span>
              <span className="font-mono tabular-nums text-white/75">{istTime} IST</span>
            </>
          )}
        </div>
        <div className="font-mono text-[11px] tabular-nums text-white/50">
          {coordinatesLabel}
        </div>
      </div>
    </div>
  );
};
