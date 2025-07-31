'use client';

import Link from 'next/link';
import posts from '../data/posts.json';

export default function CategoryNav() {
  const categories = Array.from(
    new Set(posts.map(post => post.category))
  ).sort();

  const allCategories = ['All', ...categories];

  return (
    <nav className="category-nav">
      {allCategories.map(category => (
        <Link
          key={category}
          href={category === 'All' ? '/blog' : `/blog?category=${category}`}
          className="category-link"
        >
          {category}
        </Link>
      ))}
    </nav>
  );
}
