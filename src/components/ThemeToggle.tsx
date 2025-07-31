'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  return (
    <button
      className="theme-toggle-button"
      onClick={() => setDark(!dark)}
      aria-label="Toggle dark mode"
    >
      {dark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
