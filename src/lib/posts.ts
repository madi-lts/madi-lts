// import { remark } from 'remark';
// import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkMath from 'remark-math';
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAddClasses from 'rehype-add-classes';
import rehypeMathjax from 'rehype-mathjax/browser'; 



export interface Post {
    id: string;
    date: string;
    title: string;
    abstract: string;
    unprocessedContent: string;
    contentHtml: string;
}

// const MathJax = {
//     tex: {
//         packages: ['base'],        // extensions to use
//         inlineMath: [              // start/end delimiter pairs for in-line math
//         ['$$', '$$']
//         ],
//         displayMath: [             // start/end delimiter pairs for display math
//         ['\\[', '\\]']
//         ],
//         processEscapes: true,      // use \$ to produce a literal dollar sign
//         processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
//         processRefs: true,         // process \ref{...} outside of math mode
//         digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
//                                     // pattern for recognizing numbers
//         tags: 'none',              // or 'ams' or 'all'
//         tagSide: 'right',          // side for \tag macros
//         tagIndent: '0.8em',        // amount to indent tags
//         useLabelIds: true,         // use label name rather than tag for ids
//         maxMacros: 10000,          // maximum number of macro substitutions per expression
//         maxBuffer: 5 * 1024,       // maximum size for the internal TeX string (5K)
//         // baseURL:                   // URL for use with links to tags (when there is a <base> tag in effect)
//         //     (document.getElementsByTagName('base').length === 0) ?
//         // //     '' : String(document.location).replace(/#.*$/, '')),
//         // formatError:               // function called when TeX syntax errors occur
//         //     (jax, err) => jax.formatError(err)
//     }
// };

export async function getPost(id: string): Promise<Post> {

    const fullPath = path.join(process.cwd(), 'posts', `${id}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const date: string = matterResult.data.date;
    const title: string = matterResult.data.title;
    const abstract: string = matterResult.data.abstract;


    const unprocessedContent: string = matterResult.content;
    // Use remark to convert markdown into HTML string
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeMathjax)
        .use(rehypePrettyCode, { theme: 'dracula', keepBackground: true })
        .use(rehypeAddClasses, { 
            '*': ['prose', 'prose-zinc', 'post', 'sm:prose', 'sm:prose-zinc', 'sm:post'],
            'mjx-container': 'math-inline',
            'mjx-container[display="true"]': 'math-display',
        })
        .use(rehypeStringify)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    // console.log(contentHtml);

    // Combine the data with the id
    return {
        id,
        date,
        title,
        abstract,
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