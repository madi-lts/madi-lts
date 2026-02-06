import Link from "next/link";

interface SidebarPost {
  id: string;
  title: string;
}

export default function Sidebar({ posts }: { posts: SidebarPost[] }) {
  return (
    <aside className="sidebar w-56 shrink-0 sticky top-8 self-start pr-8 border-r border-slate-700">
      <Link href="/" className="block text-xl font-semibold mb-6 text-white no-underline">
        madi-lts
      </Link>
      <nav>
        <ul className="list-none p-0 m-0 space-y-2">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/blog/${post.id}`}
                className="text-sm text-slate-400 hover:text-white no-underline"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
