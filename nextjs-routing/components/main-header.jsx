import Link from "next/link";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header id={classes["main-header"]}>
      <div id={classes.logo}>
        <Link href={"/"}>News</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href={"/news"}>News</NavLink>
          </li>
          <li>
            <NavLink href={"/archive"}>Archive</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
