import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import projectInstallationDetailPhoto from '../../assets/funding-project/project-installation-detail.jpg';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const projectVideoUrl = '/videos/funding/client-project-work.mp4';

type ParallaxStyle = CSSProperties & {
  '--video-shift': string;
};

export function HomeVideoParallax() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!section || prefersReducedMotion) {
      return;
    }

    let frame = 0;

    const updateVideoShift = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.min(1, Math.max(0, progress));
      const shift = (clampedProgress - 0.5) * 96;

      section.style.setProperty('--video-shift', `${shift}px`);
      frame = 0;
    };

    const requestUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(updateVideoShift);
      }
    };

    updateVideoShift();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[78vh] overflow-hidden bg-slate-950 text-white"
      style={{ '--video-shift': '0px' } as ParallaxStyle}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-x-0 top-1/2 h-[125%] will-change-transform"
          style={{ transform: 'translate3d(0, calc(-50% + var(--video-shift)), 0)' }}
        >
          <video
            className="h-full w-full object-cover"
            poster={projectInstallationDetailPhoto}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Video cu lucrări reale de cablare și instalare tehnică GENE SYS SECURITY"
          >
            <source src={projectVideoUrl} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-slate-950/62" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="container mx-auto flex min-h-[78vh] items-start px-4 pb-32 pt-10 sm:pt-20 lg:pt-24">
        <div className="max-w-3xl">
          <div className="mb-7 max-w-xl">
            <SectionBreak variant="onDark" />
          </div>
          <SectionEyebrow variant="onDark" className="text-left">
            Video lucrări
          </SectionEyebrow>
          <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Execuție tehnică din teren, surprinsă în lucru
          </h2>
          <p className="mt-5 hidden max-w-2xl text-lg leading-relaxed text-white/80 sm:block">
            Cadre reale din activitatea de cablare, montaj și verificare pentru infrastructuri electrice și sisteme de securitate.
          </p>
        </div>
      </div>
    </section>
  );
}
