import { Link, useParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { siteContent } from '../content/siteContent';
import { useSeo } from '../seo/useSeo';
import {
  CmsImage,
  fetchCmsImage,
  fetchPublishedCmsPage,
  getCmsImage,
  getPublishedCmsPage,
} from '../utils/contentManagement';

function getBodyImageIds(body: string) {
  return Array.from(body.matchAll(/\[\[image:([^\]]+)\]\]/g), (match) => match[1]);
}

function renderBody(body: string, imagesById: Record<string, CmsImage | null>) {
  return body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const imageMatch = block.match(/^\[\[image:([^\]]+)\]\]$/);
      if (imageMatch) {
        const imageId = imageMatch[1];
        const image = imagesById[imageId];

        if (image === undefined) {
          return (
            <div key={index} className="my-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              Se încarcă imaginea...
            </div>
          );
        }

        if (!image) {
          return (
            <div key={index} className="my-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Imaginea nu mai există în biblioteca media.
            </div>
          );
        }

        return (
          <figure key={index} className="my-8 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <img src={image.dataUrl} alt={image.alt} className="max-h-[520px] w-full object-cover" loading="lazy" />
            {image.title && <figcaption className="px-4 py-3 text-sm text-slate-500">{image.title}</figcaption>}
          </figure>
        );
      }

      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const isList = lines.every((line) => line.startsWith('- '));

      if (isList) {
        return (
          <ul key={index} className="my-6 list-disc space-y-2 pl-6 text-slate-700">
            {lines.map((line) => (
              <li key={line}>{line.replace(/^- /, '')}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="my-5 text-lg leading-8 text-slate-700">
          {block}
        </p>
      );
    });
}

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
            <nav className="mb-4 text-sm text-slate-500">
              <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                Acasă
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Pagină</span>
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
          <nav className="mb-4 text-sm text-slate-500">
            <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
              Acasă
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-700">{page.title}</span>
          </nav>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
            {page.title}
          </h1>
          {page.summary && <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{page.summary}</p>}
        </div>
      </section>

      <article className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {renderBody(page.body, imagesById)}
        </div>
      </article>
    </div>
  );
}
