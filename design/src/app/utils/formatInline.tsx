import type { ReactNode } from 'react';

/**
 * Parsează **text** din string-uri provenite din content (fără markdown complet).
 */
export function formatInlineBold(text: string): ReactNode[] {
  const segments = text.split(/(\*\*[^*]+\*\*)/g);
  return segments.map((seg, i) => {
    const m = seg.match(/^\*\*(.+)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="text-blue-950">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{seg}</span>;
  });
}
