'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlogCard from './BlogCard'; // adjust path if needed
import posts from '../data/posts.json';

export default function BlogPageClient() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory).reverse()
    : [...posts].reverse();

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }
  }, [filteredPosts]);

  return (
    <div ref={listRef}>
      {filteredPosts.map(post => (
        <BlogCard key={post.id} id={post.id} title={post.title} date={post.date} />
      ))}
    </div>
  );
}
