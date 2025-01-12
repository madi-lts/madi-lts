import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
    id: string;
    date: string;
    title: string;
    contentHtml: string;
}

export async function getPosts(): Promise<Post[]> {
    // Get file names under /posts
    const fileNames = fs.readdirSync(path.join(process.cwd(), 'posts'));
    const allPostsData = await Promise.all(fileNames.map(async (fileName: string) => {
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