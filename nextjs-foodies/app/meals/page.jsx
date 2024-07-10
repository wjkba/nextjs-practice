import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/melas-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <div className={classes.header}>
        <h1>
          Delicious meals, created by{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio mollitia
          molestias laudantium
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share Your Favorite Recipe</Link>
        </p>
      </div>

      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching meals..</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
