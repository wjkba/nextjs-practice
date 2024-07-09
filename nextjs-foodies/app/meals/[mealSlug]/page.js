import Link from "next/link";

export default function MealPage({ params }) {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>{params.mealSlug}</h1>
    </main>
  );
}
