import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  metadataBase: new URL('https://pulsebeat-global.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture",
    description: "Discover exclusive celebrity interviews, award-winning original programming, and cultural content from Pulsebeat Global.",
    url: 'https://pulsebeat-global.com',
    siteName: 'Pulsebeat Global',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pulsebeat Global',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pulsebeat Global - Celebrity Interviews, Original Programming & Culture",
    description: "Discover exclusive celebrity interviews, award-winning original programming, and cultural content from Pulsebeat Global.",
    images: ['/og-image.jpg'],
  },
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
    <html lang="en">
      <body className={`${inter.className} bg-pb-white text-pb-gray-900`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}