import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <h1>Next.js Routing & Page Rendering</h1>
      <h2>HomePage</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum,
        illo qui minima dignissimos ut excepturi. Ea vel a dolor atque illo
        architecto ratione quisquam voluptatum fugiat? Molestias omnis fugit
        modi.
      </p>
      <p>
        <Link href={"/news"}>Browse news</Link>
      </p>
    </div>
  );
}
