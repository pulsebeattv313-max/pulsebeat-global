import type { Metadata } from "next";

export const SITE_NAME = "Pulsebeat Global";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pulsebeatglobal.com";

export const defaultMetadata: Metadata = {
  title: {
    default: `${SITE_NAME} — The Pulse of a New Generation`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Original arts, entertainment, and culture programming featuring celebrities. Sensation meets information and entertainment.",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — The Pulse of a New Generation`,
    images: [
      { 
        url: `${SITE_URL}/og-image.jpg`, 
        width: 1200, 
        height: 630, 
        alt: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture" 
      },
      { 
        url: `${SITE_URL}/og-image-dark.jpg`, 
        width: 1200, 
        height: 630, 
        alt: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture" 
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@pulsebeat",
    site: "@pulsebeat",
  },
  metadataBase: new URL(SITE_URL),
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pulsebeat Global",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  sameAs: [
    process.env.NEXT_PUBLIC_TWITTER || "",
    process.env.NEXT_PUBLIC_INSTAGRAM || "",
    process.env.NEXT_PUBLIC_YOUTUBE || "",
  ].filter(Boolean),
};