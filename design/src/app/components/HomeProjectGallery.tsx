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

export function HomeProjectGallery() {
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
            <figure
              key={photo.caption}
              className={`group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-sm ${photo.className}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${photo.imageClassName}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/82 via-slate-950/45 to-transparent px-4 pb-4 pt-12 text-sm font-semibold text-white">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
