import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture",
  description: "Discover exclusive celebrity interviews, award-winning original programming, and cultural content from Pulsebeat Global. Your premier destination for entertainment, arts, and culture.",
  keywords: "celebrity interviews, original programming, culture, entertainment, arts, Pulsebeat Global, Greg Dunmore",
  authors: [{ name: "Pulsebeat Global" }],
  creator: "Pulsebeat Global",
  publisher: "Pulsebeat Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.pulsebeatglobal.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture",
    description: "Discover exclusive celebrity interviews, award-winning original programming, and cultural content from Pulsebeat Global.",
    url: 'https://www.pulsebeatglobal.com',
    siteName: 'Pulsebeat Global',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pulsebeat Global - Celebrity Interviews, Original Programming & Culture',
      },
      {
        url: '/og-image-dark.jpg',
        width: 1200,
        height: 630,
        alt: 'Pulsebeat Global - Celebrity Interviews, Original Programming & Culture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture",
    description: "Discover exclusive celebrity interviews, award-winning original programming, and cultural content from Pulsebeat Global.",
    images: ['/og-image.jpg', '/og-image-dark.jpg'],
    creator: '@pulsebeatglobal',
    site: '@pulsebeatglobal',
  },
  other: {
    'theme-color': '#d4af37',
    'msapplication-TileColor': '#d4af37',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Pulsebeat Global',
    'application-name': 'Pulsebeat Global',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-pb-white dark:bg-black text-pb-gray-900 dark:text-pb-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}