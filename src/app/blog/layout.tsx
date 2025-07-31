import { ReactNode } from 'react';
import CategoryNav from '../../components/CategoryNav';

export const metadata = {
  title: 'Blog | My Blog',
  description: 'Browse posts by category',
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <CategoryNav />
      <div>{children}</div>
    </section>
  );
}
