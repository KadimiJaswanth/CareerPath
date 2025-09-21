import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Careerpath',
  description: 'Your personalized guide to career growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const t = localStorage.getItem('theme'); const m = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches; const d = t ? t === 'dark' : m; const r = document.documentElement; d ? r.classList.add('dark') : r.classList.remove('dark'); } catch (_) {} })();`,
          }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased transition-colors duration-300', inter.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
