import { createFileRoute } from "@tanstack/react-router";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

type Article = {
  id: number;
  title: string;
  content: BlocksContent;
  category: string;
};

export const Route = createFileRoute("/articles")({
  // @ts-expect-error
  loader: async () => {
    const res = await fetch("http://localhost:1337/api/articles");
    const data = await res.json();
    return { articles: data.data as Article[] };
  },
  component: ArticlesPage,
});

function ArticlesPage() {
  const { articles } = Route.useLoaderData() as { articles: Article[] };

  return (
    <main className="mx-auto p-6">
      <h1>Articles</h1>
      <ul className="prose space-y-12 list-none p-0 m-0">
        {articles.map((a) => (
          <li key={a.id}>
            <article>
              <h2>{a.title}</h2>
              <BlocksRenderer content={a.content || []} />
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
