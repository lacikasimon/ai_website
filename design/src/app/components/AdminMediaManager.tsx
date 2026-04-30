import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ImagePlus, Images, Save, Trash2 } from 'lucide-react';
import {
  CmsImage,
  deleteCmsImageManaged,
  loadCmsAdminContent,
  saveCmsImageManaged,
  updateCmsImageMetaManaged,
} from '../utils/contentManagement';

const maxImageBytes = 1_200_000;

type PendingImage = {
  fileName: string;
  mimeType: string;
  size: number;
  dataUrl: string;
};

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 102.4) / 10} KB`;
  }

  return `${Math.round(bytes / 1024 / 102.4) / 10} MB`;
}

function getImageToken(imageId: string) {
  return `[[image:${imageId}]]`;
}

function confirmAction(message: string) {
  return window.confirm(message);
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Imaginea nu a putut fi citită.'));
    reader.readAsDataURL(file);
  });
}

export function AdminMediaManager() {
  const [images, setImages] = useState<CmsImage[]>([]);
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
  const [title, setTitle] = useState('');
  const [alt, setAlt] = useState('');
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [usingServer, setUsingServer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      setLoading(true);
      try {
        const content = await loadCmsAdminContent();
        if (!cancelled) {
          setImages(content.images);
          setUsingServer(content.usingServer);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : 'Imaginile nu au putut fi încărcate.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadImages();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setMessage('');
    setError('');

    if (!file) {
      setPendingImage(null);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Alegeți un fișier imagine.');
      setPendingImage(null);
      return;
    }

    if (file.size > maxImageBytes) {
      setError(`Imaginea este prea mare. Limita locală este ${formatBytes(maxImageBytes)}.`);
      setPendingImage(null);
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPendingImage({
        fileName: file.name,
        mimeType: file.type,
        size: file.size,
        dataUrl,
      });
      setTitle(file.name.replace(/\.[^.]+$/, ''));
      setAlt(file.name.replace(/\.[^.]+$/, ''));
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : 'Imaginea nu a putut fi citită.');
      setPendingImage(null);
    }
  };

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage('');
    setError('');

    if (!pendingImage) {
      setError('Alegeți o imagine înainte de salvare.');
      return;
    }

    setSaving(true);
    try {
      setImages(
        await saveCmsImageManaged(
          {
            title,
            alt,
            ...pendingImage,
          },
          usingServer,
        ),
      );
      setPendingImage(null);
      setTitle('');
      setAlt('');
      setMessage('Imaginea a fost salvată.');
      form.reset();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Imaginea nu a putut fi salvată.');
    } finally {
      setSaving(false);
    }
  };

  const handleMetaSave = async (image: CmsImage) => {
    setError('');
    setMessage('');
    setSaving(true);
    try {
      setImages(await updateCmsImageMetaManaged(image.id, { title: image.title, alt: image.alt }, usingServer));
      setEditingImageId(null);
      setMessage('Datele imaginii au fost actualizate.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Imaginea nu a putut fi actualizată.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirmAction('Sigur ștergeți această imagine? Operațiunea nu poate fi anulată.')) {
      return;
    }

    setError('');
    setMessage('');
    setSaving(true);
    try {
      setImages(await deleteCmsImageManaged(imageId, usingServer));
      setMessage('Imaginea a fost ștearsă.');
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Imaginea nu a putut fi ștearsă.');
    } finally {
      setSaving(false);
    }
  };

  const updateImageDraft = (imageId: string, changes: Partial<Pick<CmsImage, 'title' | 'alt'>>) => {
    setImages((currentImages) =>
      currentImages.map((image) => (image.id === imageId ? { ...image, ...changes } : image)),
    );
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-blue-950">Imagini / media</h2>
            <p className="mt-1 text-sm text-slate-500">
              {usingServer
                ? 'Bibliotecă media MySQL pentru imaginile încărcate. Codul poate fi inserat în conținutul unei pagini CMS.'
                : 'Bibliotecă media locală de test. Pe Apache/cPanel imaginile se salvează în MySQL după configurare.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
              {usingServer ? 'MySQL' : 'local'}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800">
              {images.length} imagini
            </span>
          </div>
        </div>
      </div>

      {loading && <div className="border-b border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-800">Se încarcă imaginile...</div>}

      {(message || error) && (
        <div
          className={`border-b px-5 py-3 text-sm ${
            error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 p-5 xl:grid-cols-[22rem_minmax(0,1fr)]">
        <form onSubmit={handleUpload} className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-blue-950">
            <ImagePlus className="h-5 w-5" />
            Încărcare imagine
          </h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="media-file" className="mb-1.5 block text-sm font-medium text-slate-700">
                Fișier
              </label>
              <input
                id="media-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              />
              <p className="mt-1 text-xs text-slate-500">Maximum recomandat: {formatBytes(maxImageBytes)}.</p>
            </div>
            <div>
              <label htmlFor="media-title" className="mb-1.5 block text-sm font-medium text-slate-700">
                Titlu
              </label>
              <input
                id="media-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            </div>
            <div>
              <label htmlFor="media-alt" className="mb-1.5 block text-sm font-medium text-slate-700">
                Text alt
              </label>
              <input
                id="media-alt"
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
              />
            </div>
            {pendingImage && (
              <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <img src={pendingImage.dataUrl} alt={alt || title} className="h-44 w-full object-cover" />
                <div className="px-3 py-2 text-xs text-slate-500">
                  {pendingImage.fileName} · {formatBytes(pendingImage.size)}
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-blue-800 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              Salvează în bibliotecă
            </button>
          </div>
        </form>

        <div className="rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
            <Images className="h-4 w-4" />
            Bibliotecă media
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 2xl:grid-cols-3">
            {images.length > 0 ? (
              images.map((image) => {
                const isEditing = editingImageId === image.id;

                return (
                  <article key={image.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <img src={image.dataUrl} alt={image.alt} className="h-44 w-full object-cover" loading="lazy" />
                    <div className="space-y-3 p-4">
                      {isEditing ? (
                        <>
                          <input
                            value={image.title}
                            onChange={(event) => updateImageDraft(image.id, { title: event.target.value })}
                            className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                          />
                          <input
                            value={image.alt}
                            onChange={(event) => updateImageDraft(image.id, { alt: event.target.value })}
                            className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-blue-400"
                          />
                        </>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-slate-950">{image.title}</h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {image.fileName} · {formatBytes(image.size)}
                          </p>
                        </div>
                      )}

                      <div>
                        <label htmlFor={`image-token-${image.id}`} className="mb-1 block text-xs font-medium text-slate-500">
                          Cod pentru pagină
                        </label>
                        <input
                          id={`image-token-${image.id}`}
                          value={getImageToken(image.id)}
                          readOnly
                          className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 px-3 font-mono text-xs text-slate-700"
                          onFocus={(event) => event.currentTarget.select()}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {isEditing ? (
                          <button
                            type="button"
                            onClick={() => handleMetaSave(image)}
                            disabled={saving}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-blue-100 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Salvează
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditingImageId(image.id)}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-blue-100 bg-white px-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
                          >
                            Editează
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(image.id)}
                          disabled={saving}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                          Șterge
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full px-4 py-10 text-center text-sm text-slate-500">
                Nu există imagini încărcate.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
