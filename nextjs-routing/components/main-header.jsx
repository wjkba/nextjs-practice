import Link from "next/link";
import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header id={classes["main-header"]}>
      <div id={classes.logo}>
        <Link href={"/"}>News</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href={"/news"}>News</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
