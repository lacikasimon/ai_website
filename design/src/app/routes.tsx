import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

const routeTree = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: 'contact',
        Component: ContactPage,
      },
      {
        path: 'proiecte',
        Component: ProjectsPage,
      },
      {
        path: 'servicii/:serviceSlug',
        Component: ServiceDetailPage,
      },
      {
        path: 'politica-cookie-uri',
        Component: CookiePolicyPage,
      },
    ],
  },
];

/** Gyökérhez ne adjunk basename-et: a korábbi `'' || '/'` → `'/'` hibás volt. Csak alkönyvtárnál (BASE_PATH). */
function getRouterOptions() {
  const stripped = import.meta.env.BASE_URL.replace(/\/$/, '');
  return stripped ? { basename: stripped } : {};
}

export const router = createBrowserRouter(routeTree, getRouterOptions());
