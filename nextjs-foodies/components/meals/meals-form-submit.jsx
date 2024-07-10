"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit() {
  // useFormStatus zwraca status object, ktory ma pending property
  // pending jest true kiedy form jest wysylany
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? "Submitting..." : "Share Meal"}
    </button>
  );
}
