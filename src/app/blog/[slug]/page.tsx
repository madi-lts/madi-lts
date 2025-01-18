import { Post, getPost } from '@/lib/posts';

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const id: string = (await params).slug
  const postData: Post = await getPost(id)
  // const content: string = postData.unprocessedContent
  return (
    <article className="prose prose-zinc post sm:{prose prose-zinc post}">
      <h1 className="text-zinc-100">{postData.title}</h1>
      <h2 className="text-zinc-100">{new Date(postData.date).toLocaleDateString(
        'en-US', {month: 'long', day: 'numeric', year: 'numeric' })}</h2>
      <p className="sm:post" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}