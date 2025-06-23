import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artistly - Performing Artist Booking Platform',
  description: 'Connect with talented performing artists for your events. Find singers, dancers, DJs, speakers and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}