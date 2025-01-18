// import { remark } from 'remark';
// import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAddClasses from 'rehype-add-classes';

export interface Post {
    id: string;
    date: string;
    title: string;
    unprocessedContent: string;
    contentHtml: string;
}

export async function getPost(id: string): Promise<Post> {

    const fullPath = path.join(process.cwd(), 'posts', `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const date: string = matterResult.data.date;
    const title: string = matterResult.data.title;


    const unprocessedContent: string = matterResult.content;
    // Use remark to convert markdown into HTML string
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .use(rehypePrettyCode)
        .use(rehypeAddClasses, { '*': 'custom-class' })
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // console.log(contentHtml);

    // Combine the data with the id
    return {
        id,
        date,
        title,
        unprocessedContent,
        contentHtml
    };
}

export async function getIds(): Promise<string[]> {
    const fileNames = await fs.readdirSync(path.join(process.cwd(), 'posts'));
    return fileNames.map((fileName: string) => fileName.replace(/\.mdx$/, ''));
}


export async function getPosts(): Promise<Post[]> {
    // Get file names under /posts
    const ids = await getIds();
    const allPostsData = await Promise.all((await ids).map(async (id: string) => {
        return await getPost(id);
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