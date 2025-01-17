import { Post, getPost } from '@/lib/posts';

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const id: string = (await params).slug
  const postData: Post = await getPost(id)
  // const content: string = postData.unprocessedContent
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="custom-class">{postData.title}</h1>
      <p className="custom-class">{new Date(postData.date).toLocaleDateString()}</p>
      <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}