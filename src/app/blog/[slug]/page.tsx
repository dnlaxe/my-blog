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
            return <h1 key={index} className="post-header">{block.text}</h1>;
          case 'paragraph':
            return <p key={index} className="post-paragraph">{block.text}</p>;
          case 'code':
            return (
              <div key={index} className="post-code-block">
                {block.filename && (
                  <div className="code-filename">{block.filename}</div>
                )}
                <pre className="post-code">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
          case 'list':
            return (
              <ul key={index} className="post-list">
                {(block.items ?? []).map((item, i) => (
                  <li key={i} className="post-list-item">{item}</li>
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
