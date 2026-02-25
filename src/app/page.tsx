import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="site-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        Recent Notes
      </h1>

      <div className="post-list">
        {posts.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>No posts found. Add some .mdx files to the content/ directory.</p>
        ) : (
          posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="post-card">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-date">{post.date}</p>
              {post.excerpt && <p style={{ marginTop: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{post.excerpt}</p>}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
