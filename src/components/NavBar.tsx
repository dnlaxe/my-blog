'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="navbar-list">
        {links.map(link => {
          const isActive = pathname.startsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`navbar-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
