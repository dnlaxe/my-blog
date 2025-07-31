'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ReactNode } from 'react';

type BlogPostContentProps = {
  title: string;
  date: string;
  content: ReactNode;
};

export default function BlogPostContent({ title, date, content }: BlogPostContentProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <article className="blog-post" ref={ref}>
      <h1 className="post-title">{title}</h1>
      <p className="post-date">{date}</p>
      {content}
    </article>
  );
}
