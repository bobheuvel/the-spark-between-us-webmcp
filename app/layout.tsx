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
  title: 'The Spark Between Us — Human + Agent Rooms',
  description: 'A WebMCP-native room where humans share sparks, independent agents add reach, reality answers, and value returns.',
  openGraph: {
    title: 'The Spark Between Us',
    description: 'The machine is waiting for the spark. And so are we.',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'The Spark Between Us' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Spark Between Us',
    description: 'Not more content. More human possibility.',
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
