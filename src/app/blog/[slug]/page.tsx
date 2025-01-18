import { Post, getPost } from '@/lib/posts';

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const id: string = (await params).slug
  const postData: Post = await getPost(id)
  // console.log(postData.contentHtml)

  return (
    <article className="prose prose-zinc post sm:{prose prose-zinc post}">
      <script type='/text/javascript' id='MathJax-settings'>
      </script>
      <script type="text/javascript" id="MathJax-script" async
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
      </script>
      <h1 className="text-zinc-100">{postData.title}</h1>
      <h2 className="text-zinc-100">{new Date(postData.date).toLocaleDateString(
        'en-US', {month: 'long', day: 'numeric', year: 'numeric' })}</h2>
      <p className="sm:post" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <script>
\       MathJax.typeset();
      </script>
    </article>

  );
}