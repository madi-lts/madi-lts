import {Post, getPosts } from "../lib/posts";

export default async function Home() {
  const posts = await getPosts();

  return (
  <div>
    <h1>madi-lts</h1>
    <div>
      {(posts).map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{new Date(post.date).toLocaleDateString()}</p>
          <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      ))}
    </div>
  </div>
  );
}
