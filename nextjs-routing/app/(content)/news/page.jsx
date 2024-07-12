import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();

  // nie trzeba definiowac newsContent bo mamy do czynienia z asynchronicznym komponentem
  // jeśli response jest ok to ten backend zawsze zwróci array, nie trzeba martwić się że jsx NewsList będzie pusty
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
