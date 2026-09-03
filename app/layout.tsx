import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spark-evidence-before-action.bobiaan.chatgpt.site'),
  title: 'The Spark Between Us — A Human Sharing System',
  description: 'Share what only you can see. Humans and agents turn sparks into shared learning, capability and value.',
  openGraph: {
    title: 'The Spark Between Us',
    description: 'A human sharing system for bringing out the best in us.',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'The Spark Between Us' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Spark Between Us',
    description: 'Share the spark. Bring out the best in us.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
