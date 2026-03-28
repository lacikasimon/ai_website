import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Stats } from '../components/Stats';
import { Certifications } from '../components/Certifications';

export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Certifications />
    </>
  );
}
