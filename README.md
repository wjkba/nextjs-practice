# Next.js 14 & React


- Next.js to fullstack react framework
- File-based routing, nie trzeba ogarniać routera, wystarczą foldery i pliki
- Server side rendering

## Nawigacja

Żeby dodać nową stronę wystarczys stworzyć folder w `app/` directory np `app/about/` z plikiem `app/about/page.js`

![Untitled](notes-images/Untitled.png)

page jest server componentem, np. console.log() nie dziala w przegladarce bo wszystko dzieje sie po stornie serwera

nie używamy anchorów kiedy dajemy linka do miejsca, ktore znajduje sie na naszej stronie, to powoduje ze strona jest przeładowywana i pobierana z serwera

dlatego importujemy i uzywamy `Link` 

```jsx
import Link from "next/link"

<Link href="/about">About Us</Link>
```

## Layout

```jsx
import './globals.css'

export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

```

![Untitled](notes-images/Untitled%201.png)

## Dynamic Route

![Untitled](notes-images/Untitled%202.png)

`[slug]` to placeholder folder ktory wskazuje na to ze chcemy miec jakis path po `blog/` ale nie znamy dokladnej wartosci

w `page.js` pod blog mozemy:

```jsx
export default function BlogPage(){
  return(
	  <main>
	    <h1>The Blog</h1>
	    <p><Link href="/blog/post-1">Post 1</Link></p>
	    <p><Link href="/blog/post-2">Post 2</Link></p>
	  </main>
  )
```

wtedy po klikneciu w link otwiera sie path `/blog/post-X` który korzysta z `page.js`  w `[slug]`

## Image

Nextjs używa osobne dedykowanego komponentu dla img

```jsx
<Image src={logoImg} alt="Plate with food logo" priority />
```

### Server-side komponenty

Domyślnie wszystkie komponenty, które tworzymy w projekcie nextjs są renderowane tylko na serwerze

![Untitled](notes-images/Untitled%203.png)

## Database

warto stworzyć oddzielny folder `lib`  dla operacji związanych z bazą danych

```jsx
import sql from "better-sqlite3"

const db = sql("meals.db")

export function getMeals(){
  // . all() dla fetching data
  // .run() dla zmieniania date
  return db.prepare("SELECT * FROM meals").all()
}
```

## Loading

Niech `MealsPage`  będzie stroną wyświetlającą przepisy

```jsx
export default function MealsPage() {
  return (
    <>
      <main className={classes.main}>
				// PRZEPISY
      </main>
    </>
  );
}
```

Żeby wyświetlić przepisy możemy wyżej  zdefiniować asynchroniczną funkcje `Meals` , która fetchuje przepisy i zwraca komponent odpowiedzialny za wyświetlanie przepisów razem z podanymi propsami

```jsx
async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}
```

Teraz wystarczy użyć `Suspense` i zwrapować nim asynchroniczny komponent. Suspense będzie wyświetlało zdefinowany `fallback`  aż do momentu rozwiązania asynchronicznego promisu

```jsx

export default function MealsPage() {
  return (
    <>
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

```

## Form submission

dla forma tworzymy server side funkcję, która będzie przyjmowała `formData` i zostanie wykonana przy wysyłaniu formsa

Dodajemy do form `action={nazwaFunkcji}` ktory odpali wcześniej zdefiniowaną funkcję działająca na serwerze

```jsx
  // tworzymy server action ktora bedzie wykonana tylko na serwerze
  async function shareMeal(formData)
    // server action musi byc async
    "use server";
    const meal = {
    };
    
    <form action={shareMeal}>
    </form>
  
```

Taka funkcja raczej będzie znajdowała się w oddzielnym pliku np w folderze `lib/actions.js` 

```jsx
"use server";
  // tworzymy server action ktora bedzie wykonana tylko na serwerze
  export async function shareMeal(formData) {
    // server action musi byc async
    const meal = {
      title: formData.get("title"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: formData.get("image"),
      creator: formData.get("name"),
      email: formData.get("email")
    };

    console.log(meal)
  }
```

## useFormState()

Ten hook jest odpowiedzialny za zarządzanie statem komponentu, który używa form, która jest submitowana za pomocą server actions.

Pierwszy argument to funkcja server action, która zostanie ztriggerowana kiedy form będzie submitted. Drugi argument to initial state tego komponentu np. `null` albo `{message:  null}` .

Kiedy server action funkcja będzie returnowała jakąś wiadomość to zostanie przechwycona przez `useFormState()`

```jsx
const [state, formAction] = useFormState(shareMeal, {message: null});
```

Teraz `action={}` w form będzie `formAction` dostarczane przez hook

```jsx
  <form action={formAction}>
  </form>
```

Teraz server action `shareMeal` będzie przyjmować dwa argumenty: `prevState` i `formData` 

```jsx
export async function shareMeal(prevState, formData) {}
```

## Cache revalidation

revalidePath mówi nextjs żeby rewalidować cache, który należy do ścieżki `/meals` . Czyli usuwamy cache, który jest skojarzony z tymi stronami

```jsx
revalidePath("/meals")
```

Jeśli dodamy jako drugi argument `"layout"` , to wszystkie nested pages na tej ścieżce zostaną zrewalidowane

```jsx
revalidatePath("/meals", "layout")
```

## Metadata

nextjs szuka we wszystkich plikach zmiennych eksportowanych o nazwie `metadata`

```jsx
export const metadata = {
  title: "Title",
  description: "Description ipsum dolor sit amet.",
};
```

Jeśli chcemy użyć metadata dynamicznie to nextjs szuka w plikach asynchronicznej funkcji `generateMetadata()` , która dostaje takie same dane jak kompnent strony w propach.

Czyli możemy użyć właściwości `params` z propa

```jsx
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }
  return {
    title: meal.title,
    description: meal.summary,
  };
}
```