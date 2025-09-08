import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme";
import { defaultMetadata, jsonLdOrganization, jsonLdWebSite, jsonLdTVSeries } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...defaultMetadata,
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdOrganization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdTVSeries),
          }}
        />
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