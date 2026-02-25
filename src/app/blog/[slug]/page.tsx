import { title } from 'process';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { notFound } from 'next/navigation';
import Head from 'next/head';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return { title: 'Post Not Found' };
    }
    return {
        title: `${post.title} | Math Notes`,
        description: post.excerpt,
    };
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="prose">
            <h1 style={{ marginTop: 0 }}>{post.title}</h1>
            <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '3rem' }}>
                {post.date}
            </div>

            <MDXRemote
                source={post.content}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkMath],
                        rehypePlugins: [rehypeKatex],
                    }
                }}
            />
        </article>
    );
}
