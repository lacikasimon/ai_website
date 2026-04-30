import { ArrowRight, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router';
import { searchEntries, searchSite } from '../content/searchIndex';

type SiteSearchProps = {
  variant?: 'icon' | 'menu';
  className?: string;
};

export function SiteSearch({ variant = 'icon', className }: SiteSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return searchEntries.slice(0, 6);
    return searchSite(query, 8);
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const defaultButtonClass =
    variant === 'menu'
      ? 'flex w-full items-center gap-2 rounded-md border border-blue-100 bg-white px-3 py-2.5 text-left text-sm font-semibold text-blue-950 shadow-sm transition-colors hover:bg-blue-50'
      : 'inline-flex h-10 w-10 items-center justify-center rounded-md border border-blue-100 bg-white text-blue-950 shadow-sm shadow-blue-950/5 transition-colors hover:bg-blue-50';

  return (
    <>
      <button
        type="button"
        aria-label="Caută în site"
        title="Caută în site"
        className={className ?? defaultButtonClass}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" aria-hidden />
        {variant === 'menu' && <span>Caută în site</span>}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Căutare internă"
          className="fixed inset-0 z-[80] bg-blue-950/45 px-4 py-6 backdrop-blur-sm sm:py-16"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <div className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-blue-100 bg-white shadow-2xl shadow-blue-950/25">
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
              <Search className="h-5 w-5 shrink-0 text-blue-800" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-slate-900 outline-none placeholder:text-slate-400"
                placeholder="Caută servicii, proiecte, contact..."
              />
              <button
                type="button"
                aria-label="Închide căutarea"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-3">
              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map((result) => (
                    <Link
                      key={`${result.href}-${result.title}`}
                      to={result.href}
                      className="group flex items-start justify-between gap-4 rounded-md border border-transparent px-3 py-3 transition-colors hover:border-blue-100 hover:bg-blue-50/70"
                      onClick={() => setOpen(false)}
                    >
                      <span className="min-w-0">
                        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-blue-700">
                          {result.category}
                        </span>
                        <span className="block text-sm font-semibold text-slate-950">{result.title}</span>
                        <span className="mt-1 block line-clamp-2 text-sm leading-relaxed text-slate-600">
                          {result.description}
                        </span>
                      </span>
                      <ArrowRight className="mt-6 h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-blue-800" aria-hidden />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-10 text-center">
                  <p className="text-sm font-semibold text-slate-900">Nu am găsit rezultate.</p>
                  <p className="mt-2 text-sm text-slate-500">Încercați un termen precum fotovoltaice, CCTV, mentenanță sau contact.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
