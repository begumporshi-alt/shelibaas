import type { Metadata } from 'next';

const SITE_NAME = 'Shelibaas';
const SITE_TAGLINE = 'Couture & Pret Clothing';
const SITE_DESCRIPTION =
  "Shelibaas — Bangladesh's premium curated fashion destination. Discover handpicked designer wear, luxury pret, sarees, and everyday elegance, all in one trusted gallery.";

export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '',
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME} — ${SITE_TAGLINE}`;
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
    },
  };
}
