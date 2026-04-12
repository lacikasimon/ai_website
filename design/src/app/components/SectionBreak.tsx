import type { ReactNode } from 'react';

/**
 * Separator vizual: doar linie pe toată lățimea (sfârșit de bloc anterior).
 * `onDark` — fundal albastru închis / hero.
 */
export function SectionBreak({
  className = '',
  variant = 'default',
}: {
  className?: string;
  variant?: 'default' | 'onDark';
}) {
  const line =
    variant === 'onDark'
      ? 'h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-white/45 to-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.12)]'
      : 'h-0.5 w-full rounded-full bg-gradient-to-r from-transparent via-blue-600/55 to-transparent shadow-[0_1px_0_0_rgba(37,99,235,0.15)]';

  return (
    <div className={`w-full ${className}`}>
      <div className={line} aria-hidden />
    </div>
  );
}

/** Etichetă de secțiune deasupra titlului principal — vizibilă, fără să concureze cu H1/H2. */
export function SectionEyebrow({
  children,
  variant = 'default',
  className = '',
}: {
  children: ReactNode;
  variant?: 'default' | 'onDark';
  className?: string;
}) {
  const text =
    variant === 'onDark'
      ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]'
      : 'text-blue-950';
  return (
    <p
      className={`mb-4 text-center text-sm font-extrabold uppercase leading-snug tracking-[0.2em] text-balance sm:mb-5 sm:text-base sm:tracking-[0.18em] ${text} ${className}`}
    >
      {children}
    </p>
  );
}
