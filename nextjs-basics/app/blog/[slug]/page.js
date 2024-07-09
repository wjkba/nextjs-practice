export default function BlogPostPage({ params }) {
  // params.slug zwraca wartosc podana w url 
  // np. dla blog/post-1 zwraca post-1

  return (
    <main>
      <h1>Blog Post</h1>
      <p>{params.slug}</p>
    </main>
  );
}
