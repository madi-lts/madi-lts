import { Post, getPost } from '@/lib/posts';

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
  const id: string = (await params).slug
  const postData: Post = await getPost(id)
  
  return (
    <article className="prose lg:prose-xl">
      <h1 className="text-center">{postData.title}</h1>
      <p >{new Date(postData.date).toLocaleDateString()}</p>
      <p dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}