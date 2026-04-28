import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/navigation';

export const metadata: Metadata = {
  title: 'Sante-Price Index | Vendor Intelligence',
  description: 'Smart pricing tool for weekly market vendors to calculate fair retail prices.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen pb-20 md:pb-0 md:pt-20">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}