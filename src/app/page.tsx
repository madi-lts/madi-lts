import {Post, getPosts} from "@/lib/posts";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
  <div>
    <h1 className="text-center text-4xl">madi-lts</h1>
    {posts.map((post) => (
      <div key={post.id} className="mt-2 bg-zinc-900">
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>
              <a href={`/blog/${post.id}`} className="underline">{post.title}</a>
            </CardTitle>
            <CardDescription>
              {new Date(post.date).toLocaleDateString(
                'en-US', {month: 'long', day: 'numeric', year: 'numeric' })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.abstract}</p>
          </CardContent>
        </Card>
      </div>
    ))
    }
  </div>
  );
}
