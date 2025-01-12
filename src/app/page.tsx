import {getIds } from "@/lib/posts";

export default async function Home() {
  const Ids: string[] = await getIds();

  return (
  <div>
    <h1 className="text-center">madi-lts</h1>
    {Ids.map((id) => (
      <div key={id}>
        <a href={`/blog/${id}`}>{id}</a>
      </div>
    ))
    };
  </div>
  );
}
