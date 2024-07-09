import Link from "next/link";

export default function MealsPage() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>Meals</h1>
      <p>
        <Link href="/meals/share">meals/share</Link>
      </p>
      <p>
        <Link href="/meals/meal-1">meal-1</Link>
      </p>
    </main>
  );
}
