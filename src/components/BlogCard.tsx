import '../styles/globals.css';

import Link from 'next/link';

type BlogCardProps = {
  id: string;
  title: string;
  date: string;
};

export default function BlogCard({ id, title, date }: BlogCardProps) {
  return (
    <div className="blog-card">
      <Link href={`/blog/${id}`}>
        <h1 className="blog-title">{title}</h1>
      </Link>
      <p className="blog-date">{date}</p>
    </div>
  );
}
