import { Link, useParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { CmsRichText, getBodyImageIds } from '../components/CmsRichText';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';
import {
  CmsImage,
  fetchCmsImage,
  fetchPublishedCmsPage,
  getCmsImage,
  getPublishedCmsPage,
} from '../utils/contentManagement';

export function CustomPage() {
  const { pageSlug = '' } = useParams();
  const [page, setPage] = useState(() => getPublishedCmsPage(pageSlug));
  const [loading, setLoading] = useState(true);
  const [imagesById, setImagesById] = useState<Record<string, CmsImage | null>>({});
  const imageIds = useMemo(() => (page ? getBodyImageIds(page.body) : []), [page]);
  const imageIdsKey = imageIds.join('|');

  useEffect(() => {
    let active = true;

    setPage(getPublishedCmsPage(pageSlug));
    setLoading(true);
    void fetchPublishedCmsPage(pageSlug)
      .then((nextPage) => {
        if (active) {
          setPage(nextPage);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [pageSlug]);

  useEffect(() => {
    let active = true;

    if (imageIds.length === 0) {
      setImagesById({});
      return () => {
        active = false;
      };
    }

    setImagesById(Object.fromEntries(imageIds.map((imageId) => [imageId, getCmsImage(imageId)])));
    void Promise.all(imageIds.map(async (imageId) => [imageId, await fetchCmsImage(imageId)] as const)).then((entries) => {
      if (active) {
        setImagesById(Object.fromEntries(entries));
      }
    });

    return () => {
      active = false;
    };
  }, [imageIdsKey]);

  useSeo({
    title: page ? `${page.title} | ${siteContent.meta.ogTitle}` : `Pagină indisponibilă | ${siteContent.meta.ogTitle}`,
    description: page?.summary || siteContent.meta.description,
    path: `/pagini/${pageSlug}`,
    noindex: !page,
  });

  if (!page) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24">
        <section className="border-b border-blue-100 bg-white py-12">
          <div className="container mx-auto px-4">
            <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                Acasă
              </Link>
              <span className="mx-2" aria-hidden>/</span>
              <span className="text-slate-700" aria-current="page">Pagină</span>
            </nav>
            <h1 className="text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
              {loading ? 'Se încarcă pagina' : 'Pagina nu este publicată'}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              {loading
                ? 'Verificăm conținutul publicat în CMS.'
                : 'Această pagină nu există sau este salvată ca draft în admin.'}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <section className="border-b border-blue-100 bg-white py-10">
        <div className="container mx-auto px-4">
          <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
              Acasă
            </Link>
            <span className="mx-2" aria-hidden>/</span>
            <span className="text-slate-700" aria-current="page">{page.title}</span>
          </nav>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
            {page.title}
          </h1>
          {page.summary && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.summary}</p>}
        </div>
      </section>

      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <CmsRichText body={page.body} imagesById={imagesById} />
        </div>
      </article>
    </div>
  );
}
