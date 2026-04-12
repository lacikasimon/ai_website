import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { Services } from '../components/Services';
import { SectorsSection } from '../components/SectorsSection';
import { WhyUs } from '../components/WhyUs';
import { About } from '../components/About';
import { ProcessSection } from '../components/ProcessSection';
import { Certifications } from '../components/Certifications';
import { FaqSection } from '../components/FaqSection';
import { HomeClosingCta } from '../components/HomeClosingCta';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';

export function HomePage() {
  const { meta } = siteContent;
  useSeo({
    title: meta.title,
    description: meta.description,
    path: '/',
    keywords: meta.keywords,
  });

  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <SectorsSection />
      <WhyUs />
      <About />
      <ProcessSection />
      <Certifications />
      <FaqSection />
      <HomeClosingCta />
    </>
  );
}
