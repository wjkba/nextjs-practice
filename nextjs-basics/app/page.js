import Link from "next/link";
import Header from "@/components/header"; // @ oznacza root project

export default function Home() {
  return (
    <main>
      <Header />
      <h1>Home</h1>
      <p>Lorem ipsum dolor sit amet</p>
      <p>
        {/* 
            anchor sprawie ze po kliknieciu cala strona jest
            przeładowywana, jest pobierana z serwera 
        */}
        {/* <a href="/about">About Us</a> */}
        <Link href="/about">About Us</Link>
      </p>
    </main>
  );
}
