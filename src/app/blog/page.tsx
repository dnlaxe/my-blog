import { Suspense } from 'react';
import BlogPageWrapper from '../../components/BlogPageWrapper';

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading blog...</div>}>
      <BlogPageWrapper />
    </Suspense>
  );
}
