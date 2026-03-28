/** Vite `base` (Apache gyökér vagy alkönyvtár) — hash linkek a főoldal szekcióihoz */
export function homeSectionHref(sectionId: string): string {
  const root = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${root}/#${sectionId}`
}
