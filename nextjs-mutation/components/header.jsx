import logoImg from "@/assets/logo.png";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header id="main-header">
      <Link href="/">
        <Image
          src={logoImg}
          priority
          alt="Mobile phone with posts feed on it"
        />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/feed">Feed</Link>
          </li>
          <li>
            <Link className="cta-link" href="/new-post">
              New Post
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
