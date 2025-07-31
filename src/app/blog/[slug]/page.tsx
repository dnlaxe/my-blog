import { notFound } from 'next/navigation';
import '../../../styles/globals.css';
import posts from '../../../data/posts.json';
import BlogPostContent from '../../../components/BlogPostContent';

type ParagraphBlock = { type: 'paragraph'; text: string };
type HeaderBlock = { type: 'header'; text: string };
type CodeBlock = { type: 'code'; language: string; filename?: string; code: string };
type ListBlock = { type: 'list'; items?: string[] };
type PostBlock = ParagraphBlock | HeaderBlock | CodeBlock | ListBlock;

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: PostBlock[];
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.id }));
}

interface RouteParams {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: RouteParams) {
  const post = posts.find((p) => p.id === params.slug) as Post | undefined;

  if (!post) notFound();

  return (
    <BlogPostContent
      title={post.title}
      date={post.date}
      content={post.content.map((block, index) => {
        switch (block.type) {
          case 'header':
            return <h1 key={index}>{block.text}</h1>;
          case 'paragraph':
            return <p key={index}>{block.text}</p>;
          case 'code':
            return (
              <div key={index}>
                {block.filename && <div>{block.filename}</div>}
                <pre><code>{block.code}</code></pre>
              </div>
            );
          case 'list':
            return (
              <ul key={index}>
                {(block.items ?? []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    />
  );
}
