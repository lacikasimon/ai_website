import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';
import { CmsRichText, getBodyImageIds } from '../components/CmsRichText';
import { siteContent } from '../content/siteContent';
import { getBlogCoverImage } from '../content/siteImages';
import { absoluteUrl } from '../seo/siteOrigin';
import { useSeo } from '../seo/useSeo';
import {
  CmsImage,
  fetchCmsImage,
  fetchPublishedCmsBlogPost,
  getCmsImage,
  getPublishedCmsBlogPost,
} from '../utils/contentManagement';

const dateFormatter = new Intl.DateTimeFormat('ro-RO', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Data indisponibilă' : dateFormatter.format(date);
}

function readingTime(body: string) {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 180));
}

export function BlogPostPage() {
  const { blogSlug = '' } = useParams();
  const [post, setPost] = useState(() => getPublishedCmsBlogPost(blogSlug));
  const [loading, setLoading] = useState(true);
  const [imagesById, setImagesById] = useState<Record<string, CmsImage | null>>({});
  const bodyImageIds = useMemo(() => (post ? getBodyImageIds(post.body) : []), [post]);
  const imageIds = useMemo(
    () => Array.from(new Set([post?.coverImageId || '', ...bodyImageIds].filter(Boolean))),
    [post?.coverImageId, bodyImageIds],
  );
  const imageIdsKey = imageIds.join('|');
  const coverImage = post?.coverImageId ? imagesById[post.coverImageId] : null;
  const fallbackCoverImage = post ? getBlogCoverImage(post.slug) : null;

  useSeo({
    title: post ? `${post.title} | Blog | ${siteContent.meta.ogTitle}` : `Articol indisponibil | ${siteContent.meta.ogTitle}`,
    description: post?.excerpt || siteContent.meta.description,
    path: `/blog/${blogSlug}`,
    keywords: post ? `${post.tags.join(', ')}, ${post.category}, ${siteContent.meta.keywords}` : undefined,
    noindex: !post,
  });

  useEffect(() => {
    let active = true;

    setPost(getPublishedCmsBlogPost(blogSlug));
    setLoading(true);
    void fetchPublishedCmsBlogPost(blogSlug)
      .then((nextPost) => {
        if (active) {
          setPost(nextPost);
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
  }, [blogSlug]);

  useEffect(() => {
    let active = true;

    if (imageIds.length === 0) {
      setImagesById({});
      return () => {
        active = false;
      };
    }

    setImagesById(Object.fromEntries(imageIds.map((imageId) => [imageId, getCmsImage(imageId)])));
    void Promise.all(imageIds.map(async (imageId) => [imageId, await fetchCmsImage(imageId)] as const)).then(
      (entries) => {
        if (active) {
          setImagesById(Object.fromEntries(entries));
        }
      },
    );

    return () => {
      active = false;
    };
  }, [imageIdsKey]);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 pt-44 md:pt-40">
        <section className="border-b border-blue-100 bg-white py-12">
          <div className="container mx-auto px-4">
            <nav className="mb-4 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                Acasă
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <Link to="/blog" className="text-blue-700 transition-colors hover:text-blue-900">
                Blog
              </Link>
            </nav>
            <h1 className="text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
              {loading ? 'Se încarcă articolul' : 'Articolul nu este publicat'}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              {loading
                ? 'Verificăm articolul publicat în CMS.'
                : 'Acest articol nu există sau este salvat ca draft în admin.'}
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Înapoi la blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteContent.company.name,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-44 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="border-b border-slate-200 bg-white py-10">
          <div className="container mx-auto max-w-5xl px-4">
            <nav className="mb-5 text-sm text-slate-500" aria-label="Breadcrumb">
              <Link to="/" className="text-blue-700 transition-colors hover:text-blue-900">
                Acasă
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <Link to="/blog" className="text-blue-700 transition-colors hover:text-blue-900">
                Blog
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-slate-700" aria-current="page">
                {post.title}
              </span>
            </nav>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-800">{post.category}</span>
              {post.tags.slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-blue-950 md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{post.excerpt}</p>}

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" aria-hidden />
                {formatDate(post.publishedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4" aria-hidden />
                {readingTime(post.body)} min citire
              </span>
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4" aria-hidden />
                {post.author}
              </span>
            </div>
          </div>
        </header>

        {(coverImage || fallbackCoverImage) && (
          <div className="container mx-auto max-w-5xl px-4 pt-8">
            <figure className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <img
                src={coverImage?.dataUrl || fallbackCoverImage?.src}
                alt={coverImage?.alt || fallbackCoverImage?.alt || post.title}
                className="max-h-[34rem] w-full object-cover"
              />
              {coverImage?.title && <figcaption className="px-4 py-3 text-sm text-slate-500">{coverImage.title}</figcaption>}
            </figure>
          </div>
        )}

        <div className="container mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <CmsRichText body={post.body} imagesById={imagesById} />
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-950">Aveți un proiect tehnic în lucru?</h2>
              <p className="mt-1 text-sm text-slate-600">
                Trimiteți detaliile și revenim cu pașii practici pentru ofertare sau consultanță.
              </p>
            </div>
            <Link
              to="/contact#formular-contact"
              className="inline-flex h-11 items-center justify-center rounded-md bg-blue-800 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              Cere ofertă
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
