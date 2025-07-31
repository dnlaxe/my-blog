import '../../../styles/globals.css';
import posts from '../../../data/posts.json';
import BlogPostContent from '../../../components/BlogPostContent';

type ParagraphBlock = {
  type: 'paragraph';
  text: string;
};

type HeaderBlock = {
  type: 'header';
  text: string;
};

type CodeBlock = {
  type: 'code';
  language: string;
  filename?: string;
  code: string;
};

type ListBlock = {
  type: 'list';
  items?: string[];
};

type PostBlock = ParagraphBlock | HeaderBlock | CodeBlock | ListBlock;

type Post = {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  content: PostBlock[];
};

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = posts.find((p) => p.id === slug) as Post | undefined;

  if (!post) {
    return <div>Post not found.</div>;
  }

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
