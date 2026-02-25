import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    content: string;
    excerpt?: string;
}

export function getAllPosts(): BlogPost[] {
    // Check if directory exists
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);
    const allPosts = fileNames
        .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                date: data.date || '',
                excerpt: data.excerpt || '',
                content,
            };
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return allPosts;
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPathMDX = path.join(contentDirectory, `${slug}.mdx`);
        const fullPathMD = path.join(contentDirectory, `${slug}.md`);

        let fullPath = fullPathMDX;
        if (!fs.existsSync(fullPathMDX) && fs.existsSync(fullPathMD)) {
            fullPath = fullPathMD;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            date: data.date || '',
            excerpt: data.excerpt || '',
            content,
        };
    } catch (error) {
        return null;
    }
}
