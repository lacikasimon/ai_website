import { siteContent } from '../content/siteContent';

export const publicSiteUrl = (import.meta.env.VITE_SITE_URL || 'https://syshub.ro').replace(/\/$/, '');
export const publicHomeUrl = `${publicSiteUrl}/`;
export const facebookProfileUrl = 'https://www.facebook.com/profile.php?id=61590108433393';
export const whatsappMessage = 'Bună ziua, doresc informații despre un proiect.';
export const whatsappContactUrl = `https://wa.me/${siteContent.contact.phones[0].tel.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

export const socialShareLinks = [
  {
    label: 'Facebook',
    href: facebookProfileUrl,
  },
  {
    label: 'WhatsApp',
    href: whatsappContactUrl,
  },
] as const;
