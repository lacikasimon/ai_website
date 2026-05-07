import { CmsImage } from '../utils/contentManagement';
import { formatInlineBold } from '../utils/formatInline';

export function getBodyImageIds(body: string) {
  return Array.from(body.matchAll(/\[\[image:([^\]]+)\]\]/g), (match) => match[1]);
}

type CmsRichTextProps = {
  body: string;
  imagesById: Record<string, CmsImage | null>;
};

export function CmsRichText({ body, imagesById }: CmsRichTextProps) {
  return (
    <>
      {body
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
                <div
                  key={index}
                  className="my-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900"
                >
                  Se încarcă imaginea...
                </div>
              );
            }

            if (!image) {
              return (
                <div
                  key={index}
                  className="my-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                >
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

          if (block.startsWith('### ')) {
            return (
              <h3 key={index} className="mb-3 mt-8 text-2xl font-semibold tracking-tight text-blue-950">
                {formatInlineBold(block.replace(/^### /, ''))}
              </h3>
            );
          }

          if (block.startsWith('## ')) {
            return (
              <h2 key={index} className="mb-4 mt-10 text-3xl font-semibold tracking-tight text-blue-950">
                {formatInlineBold(block.replace(/^## /, ''))}
              </h2>
            );
          }

          const lines = block
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean);
          const isList = lines.every((line) => line.startsWith('- '));

          if (isList) {
            return (
              <ul key={index} className="my-6 list-disc space-y-2 pl-6 text-slate-700">
                {lines.map((line) => (
                  <li key={line}>{formatInlineBold(line.replace(/^- /, ''))}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={index} className="my-5 text-lg leading-8 text-slate-700">
              {formatInlineBold(block)}
            </p>
          );
        })}
    </>
  );
}
