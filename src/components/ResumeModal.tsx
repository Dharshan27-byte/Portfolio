import React, { useEffect } from 'react';
import { X, Download, Mail, Phone, MapPin } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111115] text-[#f4f3ef] shadow-2xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div>
            <h2 id="resume-modal-title" className="font-display text-lg font-bold sm:text-xl">
              {PROFILE.name} — Resume
            </h2>
            <p className="text-xs text-white/60">
              {PROFILE.role} · {PROFILE.studyArea}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PROFILE.resumePdf}
              download="Yoga_Dharshan_P_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-[#6d5dfc] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5c4ce8]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 overflow-y-auto p-5 sm:p-7 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#08080a]">
              <img
                src={PROFILE.resumePreview}
                alt={`Resume document of ${PROFILE.name}`}
                referrerPolicy="no-referrer"
                className="w-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-white/50">
                Education
              </h3>
              <p className="mt-2 font-display text-sm font-semibold text-[#f4f3ef]">
                {PROFILE.studyArea}
              </p>
              <p className="mt-0.5 text-xs text-white/70">{PROFILE.college}</p>
              <p className="mt-1 font-mono text-xs tabular-nums text-[#34d399]">
                {PROFILE.duration}
              </p>
            </div>

            <div className="border-t border-white/10 pt-5">
              <h3 className="text-xs font-semibold tracking-wide text-white/50">
                Summary
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                {PROFILE.aboutLead} {PROFILE.careerObjective}
              </p>
            </div>

            <div className="space-y-2.5 border-t border-white/10 pt-5 text-xs text-white/75">
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-[#6d5dfc]" aria-hidden="true" />
                <a href={`mailto:${PROFILE.email}`} className="hover:text-white">
                  {PROFILE.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-[#3b82f6]" aria-hidden="true" />
                <a
                  href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                  className="font-mono tabular-nums hover:text-white"
                >
                  {PROFILE.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-[#34d399]" aria-hidden="true" />
                <span>{PROFILE.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
