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
    {posts.map((post) => (
      <div key={post.id} className="mt-2">
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>
              <a href={`/blog/${post.id}`} className="underline text-white">{post.title}</a>
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
