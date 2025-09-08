import type { Metadata } from "next";

export const SITE_NAME = "Pulsebeat Global";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pulsebeatglobal.com";

export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Award-Winning Celebrity Interviews & Original Programming`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Emmy-nominated and NABJ award-winning celebrity interviews, original programming, and cultural content. Exclusive access to entertainment, arts, and Detroit culture with Greg Dunmore.",
  keywords: [
    "celebrity interviews",
    "original programming", 
    "Detroit entertainment",
    "Greg Dunmore",
    "Pulsebeat TV",
    "award-winning shows",
    "cultural programming",
    "entertainment news",
    "Detroit culture",
    "NABJ award",
    "Emmy nominated",
    "ABC WMYD",
    "TV33 WHPR"
  ],
  authors: [{ name: "Greg Dunmore", url: SITE_URL }],
  creator: "Pulsebeat Global",
  publisher: "Pulsebeat Global",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Award-Winning Celebrity Interviews & Original Programming`,
    description: "Emmy-nominated and NABJ award-winning celebrity interviews, original programming, and cultural content. Exclusive access to entertainment, arts, and Detroit culture.",
    images: [
      { 
        url: `${SITE_URL}/og-image.jpg`, 
        width: 1200, 
        height: 630, 
        alt: "Pulsebeat Global - Emmy-Nominated Celebrity Interviews & Award-Winning Original Programming" 
      },
      { 
        url: `${SITE_URL}/og-image-dark.jpg`, 
        width: 1200, 
        height: 630, 
        alt: "Pulsebeat Global - Emmy-Nominated Celebrity Interviews & Award-Winning Original Programming" 
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@pulsebeatglobal",
    site: "@pulsebeatglobal",
    title: `${SITE_NAME} — Award-Winning Celebrity Interviews & Original Programming`,
    description: "Emmy-nominated and NABJ award-winning celebrity interviews, original programming, and cultural content.",
  },
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pulsebeat Global",
  alternateName: "Pulsebeat TV",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: "Emmy-nominated and NABJ award-winning celebrity interviews, original programming, and cultural content featuring Detroit entertainment and arts.",
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: "Greg Dunmore"
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Detroit",
    addressRegion: "MI",
    addressCountry: "US"
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${SITE_URL}/contact`
  },
  sameAs: [
    process.env.NEXT_PUBLIC_TWITTER || "https://twitter.com/pulsebeatglobal",
    process.env.NEXT_PUBLIC_INSTAGRAM || "https://instagram.com/pulsebeatglobal", 
    process.env.NEXT_PUBLIC_YOUTUBE || "https://youtube.com/@pulsebeatglobal",
  ].filter(Boolean),
  award: [
    "NABJ Salute to Excellence Award",
    "Emmy Nomination"
  ],
  knowsAbout: [
    "Celebrity Interviews",
    "Original Programming", 
    "Detroit Culture",
    "Entertainment News",
    "Cultural Programming"
  ]
};

export const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Pulsebeat Global",
  url: SITE_URL,
  description: "Emmy-nominated and NABJ award-winning celebrity interviews, original programming, and cultural content.",
  publisher: {
    "@type": "Organization",
    name: "Pulsebeat Global"
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

export const jsonLdTVSeries = {
  "@context": "https://schema.org",
  "@type": "TVSeries",
  name: "PULSEBEAT WITH GREG DUNMORE",
  description: "Award-winning television program featuring celebrity interviews, cultural programming, and original content.",
  creator: {
    "@type": "Person",
    name: "Greg Dunmore"
  },
  publisher: {
    "@type": "Organization", 
    name: "Pulsebeat Global"
  },
  genre: ["Entertainment", "Talk Show", "Cultural Programming"],
  inLanguage: "en-US",
  countryOfOrigin: "US",
  award: [
    "NABJ Salute to Excellence Award",
    "Emmy Nomination"
  ],
  broadcastChannel: [
    {
      "@type": "BroadcastChannel",
      name: "ABC Metro-Detroit Affiliate TV20 WMYD",
      broadcastChannelId: "WMYD"
    },
    {
      "@type": "BroadcastChannel", 
      name: "TV 33 WHPR Detroit Live",
      broadcastChannelId: "WHPR"
    }
  ]
};