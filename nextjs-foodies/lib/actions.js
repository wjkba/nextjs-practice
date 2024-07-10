"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

// tworzymy server action ktora bedzie wykonana tylko na serwerze
export async function shareMeal(formData) {
  // server action musi byc async
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  await saveMeal(meal);
  redirect("/meals");
}
