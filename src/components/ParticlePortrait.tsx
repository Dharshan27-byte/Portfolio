import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  color: string;
  phase: number;
  speed: number;
  scatterAngle: number;
  scatterDist: number;
}

interface ParticlePortraitProps {
  src: string;
  alt: string;
  scrollProgress: number;
}

export const ParticlePortrait: React.FC<ParticlePortraitProps> = ({
  src,
  alt,
  scrollProgress,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [canvasFailed, setCanvasFailed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touchRevealed, setTouchRevealed] = useState(false);

  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  const hoverTargetRef = useRef(false);
  hoverTargetRef.current = isHovering || touchRevealed;

  const pointerRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    radius: 120,
  });

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasFailed(true);
      return;
    }

    let animId = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cancelled = false;
    let hoverMix = 0;

    // Offscreen feathered original color portrait canvas matching exact particle geometry
    const photoLayer = document.createElement('canvas');
    let drawRect = { x: 0, y: 0, w: 0, h: 0 };

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    const buildParticles = () => {
      if (!img.complete || img.naturalWidth === 0) return;

      const rect = container.getBoundingClientRect();
      width = Math.max(280, Math.floor(rect.width));
      height = Math.max(340, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Sample onto an offscreen grid
      const sampleW = 195;
      const sampleH = Math.round((img.naturalHeight / img.naturalWidth) * sampleW);
      const off = document.createElement('canvas');
      off.width = sampleW;
      off.height = sampleH;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) {
        setCanvasFailed(true);
        return;
      }

      octx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = octx.getImageData(0, 0, sampleW, sampleH).data;

      // Perimeter flood-fill to isolate the exterior studio backdrop cleanly
      // while preserving interior highlights (such as the white shirt inside the jacket)
      const totalPx = sampleW * sampleH;
      const isBg = new Uint8Array(totalPx);
      const queue = new Int32Array(totalPx);
      let qHead = 0;
      let qTail = 0;

      const isBackdropPixel = (pIdx: number) => {
        const i4 = pIdx * 4;
        const r = imgData[i4];
        const g = imgData[i4 + 1];
        const b = imgData[i4 + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        const chroma = Math.max(r, g, b) - Math.min(r, g, b);
        return lum > 175 && chroma < 24;
      };

      for (let x = 0; x < sampleW; x++) {
        const topIdx = x;
        const botIdx = (sampleH - 1) * sampleW + x;
        if (!isBg[topIdx] && isBackdropPixel(topIdx)) {
          isBg[topIdx] = 1;
          queue[qTail++] = topIdx;
        }
        if (!isBg[botIdx] && isBackdropPixel(botIdx)) {
          isBg[botIdx] = 1;
          queue[qTail++] = botIdx;
        }
      }
      for (let y = 0; y < sampleH; y++) {
        const leftIdx = y * sampleW;
        const rightIdx = y * sampleW + (sampleW - 1);
        if (!isBg[leftIdx] && isBackdropPixel(leftIdx)) {
          isBg[leftIdx] = 1;
          queue[qTail++] = leftIdx;
        }
        if (!isBg[rightIdx] && isBackdropPixel(rightIdx)) {
          isBg[rightIdx] = 1;
          queue[qTail++] = rightIdx;
        }
      }

      while (qHead < qTail) {
        const cur = queue[qHead++];
        const cx = cur % sampleW;
        const cy = (cur - cx) / sampleW;
        if (cx > 0) {
          const n = cur - 1;
          if (!isBg[n] && isBackdropPixel(n)) { isBg[n] = 1; queue[qTail++] = n; }
        }
        if (cx < sampleW - 1) {
          const n = cur + 1;
          if (!isBg[n] && isBackdropPixel(n)) { isBg[n] = 1; queue[qTail++] = n; }
        }
        if (cy > 0) {
          const n = cur - sampleW;
          if (!isBg[n] && isBackdropPixel(n)) { isBg[n] = 1; queue[qTail++] = n; }
        }
        if (cy < sampleH - 1) {
          const n = cur + sampleW;
          if (!isBg[n] && isBackdropPixel(n)) { isBg[n] = 1; queue[qTail++] = n; }
        }
      }

      const scale = Math.min((width * 0.92) / sampleW, (height * 0.96) / sampleH);
      const drawW = sampleW * scale;
      const drawH = sampleH * scale;
      const offsetX = (width - drawW) / 2;
      const offsetY = Math.max(4, (height - drawH) * 0.55);
      drawRect = { x: offsetX, y: offsetY, w: drawW, h: drawH };

      // Build clean masked original photo layer for hover reveal
      const maskCanvas = document.createElement('canvas');
      maskCanvas.width = sampleW;
      maskCanvas.height = sampleH;
      const mctx = maskCanvas.getContext('2d');
      if (mctx) {
        const mImg = mctx.createImageData(sampleW, sampleH);
        for (let y = 0; y < sampleH; y++) {
          const bottomFade = y > sampleH * 0.9 ? Math.max(0, 1 - (y - sampleH * 0.9) / (sampleH * 0.1)) : 1;
          for (let x = 0; x < sampleW; x++) {
            const pIdx = y * sampleW + x;
            const i4 = pIdx * 4;
            mImg.data[i4] = 255;
            mImg.data[i4 + 1] = 255;
            mImg.data[i4 + 2] = 255;
            mImg.data[i4 + 3] = isBg[pIdx] ? 0 : Math.round(255 * bottomFade);
          }
        }
        mctx.putImageData(mImg, 0, 0);
      }

      photoLayer.width = Math.max(1, Math.floor(width));
      photoLayer.height = Math.max(1, Math.floor(height));
      const pctx = photoLayer.getContext('2d');
      if (pctx) {
        pctx.clearRect(0, 0, width, height);
        pctx.save();
        pctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        pctx.globalCompositeOperation = 'destination-in';
        pctx.filter = 'blur(1.5px)';
        pctx.drawImage(maskCanvas, offsetX, offsetY, drawW, drawH);
        pctx.filter = 'none';
        pctx.restore();
      }

      const newParticles: Particle[] = [];
      const step = 2;

      for (let py = 1; py < sampleH - 1; py += step) {
        for (let px = 1; px < sampleW - 1; px += step) {
          const pIdx = py * sampleW + px;
          if (isBg[pIdx]) continue;

          const idx = pIdx * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];

          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const chroma = Math.max(r, g, b) - Math.min(r, g, b);

          const idxR = (py * sampleW + (px + 1)) * 4;
          const idxD = ((py + 1) * sampleW + px) * 4;
          const lumR = 0.299 * imgData[idxR] + 0.587 * imgData[idxR + 1] + 0.114 * imgData[idxR + 2];
          const lumD = 0.299 * imgData[idxD] + 0.587 * imgData[idxD + 1] + 0.114 * imgData[idxD + 2];
          const edge = Math.abs(lum - lumR) + Math.abs(lum - lumD);

          const ny = py / sampleH;

          // Map tones for dark suit + crisp white inner shirt + hair & face
          let tone = 0;
          if (lum < 85) {
            // Dark hair & dark suit jacket: crisp silver outline + textured weave
            tone = 0.36 + (85 - lum) / 170 + edge * 0.012;
          } else if (chroma > 14 || (lum >= 85 && lum < 205)) {
            // Face, skin tones, and midtones
            tone = 0.62 + (205 - Math.abs(145 - lum)) / 360 + edge * 0.01;
          } else {
            // Crisp white shirt inside suit jacket
            tone = 0.68 + edge * 0.012;
          }

          if (ny > 0.9) {
            tone *= Math.max(0, (1 - ny) / 0.1);
          }

          if (tone < 0.2) continue;

          const tx = offsetX + px * scale + (Math.random() - 0.5) * 1.1;
          const ty = offsetY + py * scale + (Math.random() - 0.5) * 1.1;

          const initAngle = Math.random() * Math.PI * 2;
          const initRadius = 110 + Math.random() * 240;
          const startX = width / 2 + Math.cos(initAngle) * initRadius;
          const startY = height / 2 + Math.sin(initAngle) * initRadius;

          let color = '244, 243, 239';
          const accentRoll = Math.random();
          if (edge > 20 && accentRoll > 0.88) {
            color = accentRoll > 0.95 ? '109, 93, 252' : accentRoll > 0.91 ? '59, 130, 246' : '52, 211, 153';
          }

          newParticles.push({
            x: startX,
            y: startY,
            vx: 0,
            vy: 0,
            tx,
            ty,
            size: Math.min(2.1, 0.95 + tone * 0.85),
            alpha: Math.min(0.95, 0.26 + tone * 0.65),
            color,
            phase: Math.random() * Math.PI * 2,
            speed: 0.6 + Math.random() * 0.9,
            scatterAngle: Math.atan2(ty - height * 0.45, tx - width * 0.5) + (Math.random() - 0.5) * 0.8,
            scatterDist: 90 + Math.random() * 240,
          });
        }
      }

      if (newParticles.length > 5000) {
        const stride = newParticles.length / 5000;
        const sampled: Particle[] = [];
        for (let i = 0; i < newParticles.length; i += stride) {
          sampled.push(newParticles[Math.floor(i)]);
        }
        particles = sampled;
      } else {
        particles = newParticles;
      }
      setImageLoaded(true);
    };

    img.onload = () => {
      if (!cancelled) buildParticles();
    };
    img.onerror = () => {
      if (!cancelled) setCanvasFailed(true);
    };

    if (img.complete && img.naturalWidth > 0) {
      buildParticles();
    }

    const resizeObserver = new ResizeObserver(() => {
      if (img.complete && img.naturalWidth > 0) {
        buildParticles();
      }
    });
    resizeObserver.observe(container);

    let tick = 0;
    const render = () => {
      if (cancelled) return;
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      const sp = Math.min(1, Math.max(0, scrollRef.current));
      const ptr = pointerRef.current;

      // Smoothly ease hoverMix between 0 (particles) and 1 (original photo reveal)
      const targetHover = hoverTargetRef.current ? 1 : 0;
      hoverMix += (targetHover - hoverMix) * 0.09;

      // 1. Draw original photographic portrait underneath when hovering the dots
      if (hoverMix > 0.01 && drawRect.w > 0) {
        ctx.save();
        ctx.globalAlpha = hoverMix * Math.max(0, 1 - sp * 1.2);
        ctx.drawImage(photoLayer, 0, 0, width, height);
        ctx.restore();
      }

      // 2. Soft glowing cursor aura inside canvas
      if (ptr.active) {
        const grad = ctx.createRadialGradient(ptr.x, ptr.y, 4, ptr.x, ptr.y, ptr.radius * 1.45);
        grad.addColorStop(0, 'rgba(109, 93, 252, 0.14)');
        grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
        grad.addColorStop(1, 'rgba(8, 8, 10, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // 3. Draw particles (part around pointer and dissolve smoothly as original image appears)
      const particleVisibility = Math.max(0.14, 1 - hoverMix * 0.78);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const driftX = Math.cos(tick * p.speed + p.phase) * 1.2;
        const driftY = Math.sin(tick * p.speed + p.phase) * 1.2;
        const disperse = sp * 1.15;

        const goalX = p.tx + driftX + Math.cos(p.scatterAngle) * p.scatterDist * disperse;
        const goalY = p.ty + driftY + Math.sin(p.scatterAngle) * p.scatterDist * disperse;

        if (ptr.active) {
          const dx = p.x - ptr.x;
          const dy = p.y - ptr.y;
          const distSq = dx * dx + dy * dy;
          const rad = ptr.radius;
          if (distSq < rad * rad && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = ((rad - dist) / rad) * 4.2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (goalX - p.x) * 0.09;
        p.vy += (goalY - p.y) * 0.09;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;

        const fadeOut = Math.max(0.06, (1 - sp * 0.85) * particleVisibility);
        ctx.fillStyle = `rgba(${p.color}, ${(p.alpha * fadeOut).toFixed(3)})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, [src, reducedMotion]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current.x = e.clientX - rect.left;
    pointerRef.current.y = e.clientY - rect.top;
    pointerRef.current.active = true;
    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
    setIsHovering(false);
  };

  if (reducedMotion || canvasFailed) {
    return (
      <div className="group relative flex h-full w-full items-end justify-center overflow-hidden">
        <div className="relative h-[380px] w-[300px] sm:h-[470px] sm:w-[370px] overflow-hidden rounded-2xl border border-white/10 bg-[#111115]">
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-top grayscale transition-all duration-300 group-hover:grayscale-0"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={handlePointerLeave}
      onClick={() => setTouchRevealed((v) => !v)}
      role="img"
      aria-label={alt}
      title="Hover over particles to reveal the original portrait"
      className="relative h-full min-h-[340px] w-full cursor-pointer select-none"
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full bg-radial from-[#6d5dfc]/20 via-transparent to-transparent blur-xl" />
        </div>
      )}
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};
