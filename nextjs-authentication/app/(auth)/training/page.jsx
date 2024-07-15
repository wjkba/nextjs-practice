import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { redirect } from "next/navigation";

export default async function TrainingPage() {
  // kiedy chcemy sprawdzic czy uzytkownik powinien dostac dostep do strony
  // to pierwsze co robimy to weryfikacja, zanim fetchujemy jakiekolwiek dane
  // musimy zweryfikowac cookies

  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/");
  }

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
