import { Post, getPost } from '@/lib/posts';

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const id: string = (await params).slug
  const postData: Post = await getPost(id)
  // const content: string = postData.unprocessedContent
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="post">{postData.title}</h1>
      <h2 className="post">{new Date(postData.date).toLocaleDateString(
        'en-US', {month: 'long', day: 'numeric', year: 'numeric' })}</h2>
      <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}