import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'


export interface Post {
    id: string;
    date: string;
    title: string;
    contentHtml: string;
}


export async function getPost(id: string): Promise<Post> {
    const fullPath = path.join(process.cwd(), 'posts', `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const date: string = matterResult.data.date;
    const title: string = matterResult.data.title;

    // Use remark to convert markdown into HTML string
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        date,
        title,
        contentHtml,
    };
}

export async function getIds(): Promise<string[]> {
    const fileNames = await fs.readdirSync(path.join(process.cwd(), 'posts'));
    return fileNames.map((fileName: string) => fileName.replace(/\.mdx$/, ''));
}

export async function getPosts(): Promise<Post[]> {
    // Get file names under /posts
    const fileNames = await getIds();
    const allPostsData = await Promise.all((await fileNames).map(async (fileName: string) => {
        // Remove ".mdx" from file name to get id
        const id: string = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(process.cwd(),'/posts/', `${id}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        const date: string = matterResult.data.date;
        const title: string = matterResult.data.title;

        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        // Combine the data with the id
        return {
            id,
            date,
            title,
            contentHtml,
        };
    }));
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}