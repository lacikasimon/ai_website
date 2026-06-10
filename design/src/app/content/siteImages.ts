import alarmInstallation from '../../assets/photos/alarm-installation.jpg';
import constructionProject from '../../assets/photos/construction-project.jpg';
import electricalEngineer from '../../assets/photos/electrical-engineer.jpg';
import electricalInstallation from '../../assets/photos/electrical-installation.jpg';
import photovoltaicPanels from '../../assets/photos/photovoltaic-panels.jpg';
import securityCctv from '../../assets/photos/security-cctv.jpg';
import projectHeroClientSelected from '../../assets/funding-project/project-hero-client-selected.jpg';
import projectInstallationDetail from '../../assets/funding-project/project-installation-detail.jpg';

export const siteImages = {
  hero: {
    electricalInstallation: projectHeroClientSelected,
    electricalInstallationMobile: projectHeroClientSelected,
  },
  about: {
    electricalEngineer,
  },
  services: {
    electricalInstallation,
    photovoltaicPanels,
    securityCctv,
    alarmInstallation,
    technicalMaintenance: projectInstallationDetail,
    electricalEngineer,
  },
  projects: {
    constructionProject,
    photovoltaicPanels,
    securityCctv,
    electricalInstallation,
    alarmInstallation,
    technicalMaintenance: projectInstallationDetail,
  },
};

export type SiteBlogCover = {
  src: string;
  alt: string;
};

const blogCoversBySlug: Record<string, SiteBlogCover> = {
  'sisteme-fotovoltaice-on-grid-off-grid': {
    src: photovoltaicPanels,
    alt: 'Panouri fotovoltaice montate pe acoperiș pentru producție de energie regenerabilă',
  },
  'instalatii-electrice-constructii-civile-industriale': {
    src: electricalInstallation,
    alt: 'Instalație electrică profesională pentru clădiri civile și industriale',
  },
  'mentenanta-tehnica-preventiva-cladiri-echipamente': {
    src: projectInstallationDetail,
    alt: 'Specialist GENE SYS SECURITY montează cabluri într-un spațiu tehnic',
  },
  'sisteme-detectie-efractie-alarma': {
    src: alarmInstallation,
    alt: 'Echipamente pentru sistem de alarmare și detecție la efracție',
  },
  'sisteme-supraveghere-video-cctv': {
    src: securityCctv,
    alt: 'Cameră de supraveghere video CCTV pentru protecția proprietăților',
  },
};

export function getBlogCoverImage(slug: string) {
  return blogCoversBySlug[slug] || null;
}
