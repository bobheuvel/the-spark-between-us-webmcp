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
  title: 'SPARK — Human Agency for the Agentic Web',
  description: 'SPARK protects human judgment in the agentic web. Evidence Before Action is its first working protocol.',
  openGraph: {
    title: 'SPARK — Human Agency for the Agentic Web',
    description: 'Your certainty should never exceed your evidence.',
    images: [{ url: '/og.png', width: 1536, height: 1024, alt: 'SPARK evidence graph converging into an action gate' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPARK — Human Agency for the Agentic Web',
    description: 'A shared evidence layer for humans and agents.',
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
