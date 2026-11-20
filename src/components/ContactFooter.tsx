import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Mail, Phone, MapPin, Send, ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/portfolio';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ContactFooterProps {
  onOpenResume: () => void;
  onBackToTop: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  onOpenResume,
  onBackToTop,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'ready'>('idle');
  const [errorText, setErrorText] = useState('');

  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // Fallback if clipboard unavailable
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setFormStatus('error');
      setErrorText('Please enter your name, email address, and message.');
      return;
    }
    setFormStatus('ready');
    setErrorText('');
    const subject = encodeURIComponent(`Portfolio Inquiry from ${senderName.trim()}`);
    const body = encodeURIComponent(
      `From: ${senderName.trim()} (${senderEmail.trim()})\n\n${message.trim()}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };

  // Subtle particle-dot footer wordmark signature (inspired by 01:22 in reference video)
  useEffect(() => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let pts: Array<{ x: number; y: number; phase: number; accent: boolean }> = [];
    let width = 0;
    let height = 110;

    const sampleWordmark = () => {
      const parent = canvas.parentElement;
      width = parent ? Math.max(300, Math.floor(parent.clientWidth)) : 960;
      height = width < 640 ? 74 : 112;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const octx = off.getContext('2d', { willReadFrequently: true });
      if (!octx) return;

      const fontSize = Math.min(92, Math.max(34, Math.floor(width / 10.5)));
      octx.fillStyle = '#ffffff';
      octx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(PROFILE.name, width / 2, height / 2);

      const data = octx.getImageData(0, 0, width, height).data;
      const step = width < 640 ? 3 : 4;
      const collected: typeof pts = [];

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = data[(y * width + x) * 4 + 3];
          if (alpha > 110) {
            collected.push({
              x,
              y,
              phase: Math.random() * Math.PI * 2,
              accent: Math.random() > 0.91,
            });
          }
        }
      }
      pts = collected;
    };

    sampleWordmark();
    const ro = new ResizeObserver(sampleWordmark);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const shimmer = reducedMotion ? 0.8 : 0.45 + 0.5 * Math.sin(t * 1.4 + p.phase);
        const dx = reducedMotion ? 0 : Math.cos(t + p.phase) * 0.75;
        const dy = reducedMotion ? 0 : Math.sin(t + p.phase) * 0.75;
        ctx.fillStyle = p.accent
          ? `rgba(109, 93, 252, ${shimmer.toFixed(2)})`
          : `rgba(244, 243, 239, ${(shimmer * 0.85).toFixed(2)})`;
        ctx.fillRect(p.x + dx, p.y + dy, 1.9, 1.9);
      }
      if (!reducedMotion) {
        t += 0.025;
        animId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <>
      {/* Contact Section (Warm Light Canvas) */}
      <section
        id="contact"
        className="border-t border-black/10 bg-[#f3f1ed] py-20 text-[#101014] sm:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-5 text-xs font-medium text-[#101014]/65">
            <div className="flex items-center gap-4">
              <span className="font-mono tabular-nums text-[#6d5dfc]">07</span>
              <span>Contact</span>
            </div>
            <span>Direct details from resume</span>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left: Direct Resume Links */}
            <div className="lg:col-span-6">
              <h2
                className="font-display text-3xl font-bold tracking-tight text-[#101014] sm:text-5xl"
                style={{ textWrap: 'balance' }}
              >
                Get in touch directly.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#101014]/75 sm:text-base">
                Open to internships, full-stack web development projects, and AI & Data Science collaborations. Reach out via email or phone anytime.
              </p>

              <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[#6d5dfc]" aria-hidden="true" />
                    <div>
                      <div className="text-xs text-[#101014]/55">Email</div>
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="font-display text-sm font-semibold text-[#101014] hover:text-[#6d5dfc] sm:text-base"
                      >
                        {PROFILE.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-black/15 bg-white/70 px-3 py-1.5 text-xs font-medium text-[#101014] transition-colors hover:border-[#6d5dfc] hover:text-[#6d5dfc]"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#10b981]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#3b82f6]" aria-hidden="true" />
                    <div>
                      <div className="text-xs text-[#101014]/55">Phone</div>
                      <a
                        href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                        className="font-mono text-sm font-medium tabular-nums text-[#101014] hover:text-[#6d5dfc] sm:text-base"
                      >
                        {PROFILE.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-4">
                  <MapPin className="h-4 w-4 text-[#10b981]" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-[#101014]/55">Location</div>
                    <div className="text-sm font-medium text-[#101014]">
                      {PROFILE.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Direct Email Draft Composer */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleComposeSubmit}
                noValidate
                className="rounded-2xl border border-black/10 bg-[#faf9f6] p-6 sm:p-8"
              >
                <h3 className="font-display text-lg font-semibold text-[#101014]">
                  Send a direct note
                </h3>
                <p className="mt-1 text-xs text-[#101014]/60">
                  Opens your default email client addressed to {PROFILE.email}.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#101014]/75"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Recruiter or collaborator name"
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#101014] placeholder:text-[#101014]/40 focus:border-[#6d5dfc] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-[#101014]/75"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="you@organization.com"
                      className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#101014] placeholder:text-[#101014]/40 focus:border-[#6d5dfc] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#101014]/75"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share details about an internship, project, or collaboration..."
                      className="mt-1.5 w-full resize-none rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm text-[#101014] placeholder:text-[#101014]/40 focus:border-[#6d5dfc] focus:outline-none"
                    />
                  </div>
                </div>

                {formStatus === 'error' && (
                  <p role="alert" className="mt-3 text-xs font-medium text-red-700">
                    {errorText}
                  </p>
                )}
                {formStatus === 'ready' && (
                  <p role="status" className="mt-3 text-xs font-medium text-emerald-700">
                    Email draft prepared in your mail application.
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#101014] px-6 py-2.5 text-xs font-semibold text-[#f4f3ef] transition-colors hover:bg-[#6d5dfc]"
                  >
                    <Send className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Compose Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#101014]/75 hover:text-[#6d5dfc]"
                  >
                    <span>Review Resume PDF</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Dark Footer */}
      <footer className="bg-[#08080a] pt-16 pb-10 text-[#f4f3ef]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <img
                  src={PROFILE.portrait}
                  alt={PROFILE.name}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full border border-white/15 object-cover object-top grayscale"
                />
                <span className="text-xs font-medium text-white/65">
                  Open to internships & collaborations
                </span>
              </div>
              <h2
                className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
                style={{ textWrap: 'balance' }}
              >
                Ready to contribute, learn, and build real-world systems.
              </h2>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full bg-[#6d5dfc] text-center text-xs font-semibold text-white transition-transform duration-200 hover:scale-105 hover:bg-[#5c4ce8] sm:h-32 sm:w-32"
              >
                <span>Email Me</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Footer Columns */}
          <div className="grid grid-cols-2 gap-8 border-b border-white/10 py-10 text-xs sm:grid-cols-4">
            <div>
              <div className="text-white/45">Portfolio</div>
              <div className="mt-2 font-medium text-white/85">2026 Edition</div>
            </div>
            <div>
              <div className="text-white/45">Education</div>
              <div className="mt-2 font-medium text-white/85">B.Tech AI & DS · SKCET</div>
            </div>
            <div>
              <div className="text-white/45">Direct Contact</div>
              <div className="mt-2 space-y-1">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="block font-medium text-white/85 hover:text-[#6d5dfc]"
                >
                  {PROFILE.email}
                </a>
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                  className="block font-mono tabular-nums text-white/70 hover:text-white"
                >
                  {PROFILE.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start justify-start sm:justify-end">
              <button
                type="button"
                onClick={onBackToTop}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Back to top</span>
              </button>
            </div>
          </div>

          {/* Restrained Particle Signature */}
          <div className="mt-8 flex flex-col items-center justify-center">
            <canvas
              ref={sigCanvasRef}
              aria-hidden="true"
              className="block max-w-full"
            />
            <span className="sr-only">{PROFILE.name}</span>
            <p className="mt-3 text-center text-[11px] text-white/40">
              {PROFILE.name} · {PROFILE.location}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
