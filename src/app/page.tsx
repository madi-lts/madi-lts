import {Post, getPosts} from "@/lib/posts";


export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
  <div>
    <h1 className="text-center text-4xl">madi-lts</h1>
    {posts.map((post) => (
      <div key={post.id}>
        <a href={`/blog/${post.id}`} className="underline">{post.title}</a>
      </div>
    ))
    }
  </div>
  );
}
