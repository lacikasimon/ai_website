import { ChevronDown, ChevronUp, Images, PlayCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import projectCableDetailPhoto from '../../assets/funding-project/project-cable-detail.jpg';
import projectCableTrayPhoto from '../../assets/funding-project/project-cable-tray.jpg';
import projectCctvCamerasPhoto from '../../assets/funding-project/project-cctv-cameras.jpg';
import projectCeilingMarkingPhoto from '../../assets/funding-project/project-ceiling-marking.jpg';
import projectDrillingLaserPhoto from '../../assets/funding-project/project-drilling-laser.jpg';
import projectInstallationDetailPhoto from '../../assets/funding-project/project-installation-detail.jpg';
import projectMainWorkPhoto from '../../assets/funding-project/project-main-work.jpg';
import projectSiteTeamPhoto from '../../assets/funding-project/project-site-team.jpg';
import { SectionBreak, SectionEyebrow } from './SectionBreak';

const galleryPhotos = [
  {
    src: projectMainWorkPhoto,
    alt: 'Specialist GENE SYS SECURITY lucrează la trasee tehnice montate pe plafon',
    caption: 'Montaj trasee tehnice',
    className: 'md:col-span-2 md:row-span-2',
    imageClassName: 'aspect-[4/5] md:aspect-auto md:h-full',
  },
  {
    src: projectCableTrayPhoto,
    alt: 'Specialist GENE SYS SECURITY montează cabluri pe traseu metalic',
    caption: 'Cablare pe traseu metalic',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
  {
    src: projectCctvCamerasPhoto,
    alt: 'Camere de supraveghere video instalate pe structură metalică',
    caption: 'Sisteme CCTV',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
  {
    src: projectDrillingLaserPhoto,
    alt: 'Specialist GENE SYS SECURITY folosește trasare laser pentru găurire',
    caption: 'Trasare și găurire',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
  {
    src: projectCableDetailPhoto,
    alt: 'Lucrări de cablare pentru infrastructură tehnică',
    caption: 'Pregătire cabluri',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
  {
    src: projectSiteTeamPhoto,
    alt: 'Specialist pe șantier cu echipament GENE SYS SECURITY',
    caption: 'Echipă pe șantier',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
  {
    src: projectCeilingMarkingPhoto,
    alt: 'Trasare laser pe plafon pentru montaj tehnic',
    caption: 'Verificări de montaj',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
  {
    src: projectInstallationDetailPhoto,
    alt: 'Specialist GENE SYS SECURITY montează cabluri într-un spațiu tehnic',
    caption: 'Instalare tehnică',
    className: '',
    imageClassName: 'aspect-[3/4]',
  },
];

const fullGalleryPhotoCount = 41;
const fullGalleryVideoCount = 13;

type GalleryMediaItem = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption: string;
  poster?: string;
};

const getFullGalleryPhotoPath = (index: number) =>
  `/gallery/photos/syshub-photo-${String(index + 1).padStart(2, '0')}.jpeg`;

const fullGalleryMedia: GalleryMediaItem[] = [
  ...Array.from({ length: fullGalleryPhotoCount }, (_, index) => ({
    type: 'image' as const,
    src: getFullGalleryPhotoPath(index),
    alt: `Lucrare GENE SYS SECURITY - fotografie ${index + 1}`,
    caption: `Fotografie lucrare ${index + 1}`,
  })),
  ...Array.from({ length: fullGalleryVideoCount }, (_, index) => ({
    type: 'video' as const,
    src: `/gallery/videos/syshub-video-${String(index + 1).padStart(2, '0')}.mp4`,
    poster: getFullGalleryPhotoPath(index % fullGalleryPhotoCount),
    alt: `Lucrare GENE SYS SECURITY - video ${index + 1}`,
    caption: `Video lucrare ${index + 1}`,
  })),
];

export function HomeProjectGallery() {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
  const mediaRefs = useRef<Array<HTMLElement | null>>([]);

  const isGalleryOpen = activeMediaIndex !== null;

  const closeGallery = () => setActiveMediaIndex(null);

  const scrollToMedia = (index: number) => {
    const nextIndex = (index + fullGalleryMedia.length) % fullGalleryMedia.length;
    setActiveMediaIndex(nextIndex);

    window.requestAnimationFrame(() => {
      mediaRefs.current[nextIndex]?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
  };

  useEffect(() => {
    if (activeMediaIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const frame = window.requestAnimationFrame(() => {
      mediaRefs.current[activeMediaIndex]?.scrollIntoView({ block: 'start' });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeGallery();
      }

      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        event.preventDefault();
        scrollToMedia(activeMediaIndex + 1);
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollToMedia(activeMediaIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeMediaIndex]);

  return (
    <section id="galerie-lucrari" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-6 w-full sm:mb-8">
          <SectionBreak />
        </div>
        <div className="mb-12 max-w-3xl">
          <SectionEyebrow>Galerie lucrări</SectionEyebrow>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Imagini reale din lucrările GENE SYS SECURITY
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Exemple din activitatea de instalare, cablare și monitorizare video pentru infrastructuri tehnice.
          </p>
        </div>

        <div className="grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryPhotos.map((photo, index) => (
            <button
              type="button"
              key={photo.caption}
              onClick={() => setActiveMediaIndex(index)}
              className={`group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 text-left shadow-sm outline-none transition focus-visible:ring-4 focus-visible:ring-blue-500/35 ${photo.className}`}
              aria-label={`Deschide galeria media: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${photo.imageClassName}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 via-slate-950/45 to-transparent px-4 pb-4 pt-12 text-sm font-semibold text-white">
                {photo.caption}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setActiveMediaIndex(0)}
            className="group relative flex min-h-[16rem] flex-col justify-start gap-8 overflow-hidden rounded-lg border border-blue-900 bg-blue-950 p-5 text-left text-white shadow-sm outline-none transition hover:bg-blue-900 focus-visible:ring-4 focus-visible:ring-blue-500/35"
            aria-label="Deschide galeria completă cu toate fotografiile și videourile"
          >
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_36%)]" aria-hidden />
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white">
              <Images className="h-6 w-6" aria-hidden />
            </span>
            <span className="relative">
              <span className="block text-3xl font-semibold tracking-tight">Mai multe</span>
              <span className="mt-2 flex items-center gap-2 text-sm font-semibold text-white/72">
                <PlayCircle className="h-4 w-4" aria-hidden />
                {fullGalleryPhotoCount} fotografii · {fullGalleryVideoCount} videouri
              </span>
            </span>
          </button>
        </div>
      </div>

      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-[90] bg-slate-950 text-white"
          role="dialog"
          aria-modal="true"
          aria-label="Galerie media lucrări GENE SYS SECURITY"
        >
          <div className="flex h-dvh flex-col">
            <div className="flex min-h-16 items-center justify-between gap-4 border-b border-white/12 bg-slate-950/96 px-4 py-3 shadow-lg shadow-black/25 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Galerie media</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {fullGalleryPhotoCount} fotografii · {fullGalleryVideoCount} videouri
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToMedia(activeMediaIndex - 1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/16 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                  aria-label="Media precedentă"
                >
                  <ChevronUp className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToMedia(activeMediaIndex + 1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-white/16 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                  aria-label="Media următoare"
                >
                  <ChevronDown className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={closeGallery}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white text-slate-950 transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                  aria-label="Închide galeria"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth bg-slate-950 snap-y snap-mandatory">
              {fullGalleryMedia.map((media, index) => (
                <figure
                  key={`${media.type}-${media.src}`}
                  ref={(element) => {
                    mediaRefs.current[index] = element;
                  }}
                  className="flex min-h-[calc(100dvh-4rem)] snap-start flex-col justify-center px-4 py-6 sm:px-6 lg:px-10"
                >
                  <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center">
                    {media.type === 'image' ? (
                      <img
                        src={media.src}
                        alt={media.alt}
                        className="max-h-[calc(100dvh-11rem)] w-full rounded-lg object-contain shadow-2xl shadow-black/35"
                        loading={index === activeMediaIndex ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    ) : (
                      <video
                        className="max-h-[calc(100dvh-11rem)] w-full rounded-lg bg-black object-contain shadow-2xl shadow-black/35"
                        controls
                        playsInline
                        preload="metadata"
                        poster={media.poster}
                        aria-label={media.alt}
                      >
                        <source src={media.src} type="video/mp4" />
                        Browserul dumneavoastră nu poate reda clipul video.
                      </video>
                    )}
                  </div>
                  <figcaption className="mx-auto mt-4 flex w-full max-w-6xl flex-col gap-1 text-sm text-white/72 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-semibold text-white">{media.caption}</span>
                    <span>
                      {index + 1} / {fullGalleryMedia.length}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
