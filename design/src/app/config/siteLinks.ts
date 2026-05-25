export const publicSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://syshub.ro').replace(/\/$/, '');
export const publicHomeUrl = `${publicSiteUrl}/`;
export const facebookProfileUrl = 'https://www.facebook.com/profile.php?id=61590108433393';

export const socialShareLinks = [
  {
    label: 'Facebook',
    href: facebookProfileUrl,
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
