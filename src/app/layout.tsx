import '../styles/globals.css';
import Navbar from '../components/NavBar';
import Link from 'next/link';
import { ReactNode } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { Inter, Expletus_Sans, IBM_Plex_Mono } from 'next/font/google';

// Load fonts with CSS variables
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
});

const expletusSans = Expletus_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-expletus',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-ibm',
});

export const metadata = {
  title: 'My Blog',
  description: 'A simple blog with category filtering',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${expletusSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="main-body font-sans">
        <header className="site-header">
          <Link href="/" className="site-title-link">
            <h4 className="site-title font-expletus">@dnlaxe</h4>
          </Link>
          <Navbar />
          <ThemeToggle />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
