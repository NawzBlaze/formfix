// Centralized SEO configuration for FormFix
// Provides reusable JSON-LD schema generators and breadcrumb helpers.

export const SITE_URL = 'https://formfix.pages.dev';
export const SITE_NAME = 'FormFix';
export const SITE_TAGLINE = '100% Private Image & PDF Tools - Browser-Based, Zero Uploads';
export const SITE_AUTHOR = 'FormFix Team';
export const SITE_CONTACT_EMAIL = 'formfix.support@gmail.com';
export const SITE_FOUNDED = '2024';
export const SITE_LOCALE = 'en';
export const SITE_LOCALE_REGION = 'IN';
export const DEFAULT_OG_IMAGE = '/og-banner.png';
export const DEFAULT_FAVICON = '/favicon.png?v=5';

export const SOCIAL_PROFILES = [
  'https://github.com/NawzBlaze/formfix',
];

export function buildCanonical(path?: string | null): string {
  let p = path || '/';
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return SITE_URL + p;
}

export function cleanPath(input?: string | null): string {
  if (!input) return '/';
  let p = input;
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

export function titleToBreadcrumb(title: string): string {
  if (!title) return SITE_NAME;
  const cleaned = title.replace(/\s*\|\s*FormFix.*$/i, '').trim();
  return cleaned || SITE_NAME;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': SITE_URL + '#organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: SITE_URL + DEFAULT_FAVICON,
      width: 512,
      height: 512,
    },
    description: SITE_TAGLINE,
    foundingDate: SITE_FOUNDED,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: SITE_CONTACT_EMAIL,
        contactType: 'customer support',
        availableLanguage: ['English'],
        url: SITE_URL + '/contact',
      },
    ],
    sameAs: SOCIAL_PROFILES,
    knowsAbout: [
      'Image Compression',
      'PDF Manipulation',
      'Photo Editing',
      'Digital Signatures',
      'Privacy-First Computing',
      'Browser-Based Tools',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_URL + '#website',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: SITE_LOCALE + '-' + SITE_LOCALE_REGION,
    publisher: { '@id': SITE_URL + '#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: SITE_URL + '/tools?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: buildCanonical(it.path),
    })),
  };
}

export function faqSchema(qa: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qa.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  };
}

export function softwareAppSchema(opts: {
  name: string;
  description: string;
  path: string;
  category?: string;
}) {
  const {
    name,
    description,
    path,
    category = 'UtilitiesApplication',
  } = opts;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: buildCanonical(path),
    applicationCategory: category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    publisher: { '@id': SITE_URL + '#organization' },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: buildCanonical(opts.path),
    image: opts.image ? buildCanonical(opts.image) : buildCanonical(DEFAULT_OG_IMAGE),
    datePublished: opts.datePublished || '2024-01-01',
    dateModified: opts.datePublished || '2024-01-01',
    author: {
      '@type': 'Organization',
      name: SITE_NAME + ' Editorial',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: SITE_URL + DEFAULT_FAVICON,
      },
    },
    mainEntityOfPage: buildCanonical(opts.path),
  };
}