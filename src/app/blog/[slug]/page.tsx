import '../../../styles/globals.css';
import posts from '../../../data/posts.json';
import BlogPostContent from '../../../components/BlogPostContent';

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: (
    | { type: 'paragraph'; text: string }
    | { type: 'header'; text: string }
    | { type: 'code'; language: string; filename?: string; code: string }
    | { type: 'list'; items?: string[] }
  )[];
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.id === slug) as Post | undefined;

  if (!post) return <div>Post not found.</div>;

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
              <pre key={index}>
                {block.filename && <div>{block.filename}</div>}
                <code>{block.code}</code>
              </pre>
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

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.id,
  }));
}
