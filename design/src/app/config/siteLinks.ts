export const publicSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://syshub.ro').replace(/\/$/, '');
export const publicHomeUrl = `${publicSiteUrl}/`;

export const socialShareLinks = [
  {
    label: 'Facebook',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(publicHomeUrl)}`,
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(publicHomeUrl)}`,
  },
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${encodeURIComponent(`GENE SYS SECURITY SRL - ${publicHomeUrl}`)}`,
  },
] as const;
