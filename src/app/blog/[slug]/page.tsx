import { Post, getPost } from '@/lib/posts';
import Script from 'next/script';



export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const id: string = (await params).slug
  const postData: Post = await getPost(id)
  // console.log(postData.contentHtml)

  const CDN: string = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
  const MathJaxLocal: string = "@lib/mathjax/es5/tex-mml-chtml.js";

  return (
    <>
      <Script type="text/javascript" id="MathJax-config" src='@lib/mathjax-config.js'/>
      <Script type="text/javascript" id="MathJax-code" src={CDN}/>
      <article className="post font-[family-name:var(--font-lora)] italic">
        <h1>{postData.title}</h1>
        <h2>{new Date(postData.date).toLocaleDateString(
          'en-US', {month: 'long', day: 'numeric', year: 'numeric' })}</h2>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}