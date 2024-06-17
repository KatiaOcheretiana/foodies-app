import React from "react";
import logoImg from "@/assets/logo.png";
import Link from "next/link";
import styles from "./main-header.module.css";
import Image from "next/image";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink text="Browse Meals" urlPath="/meals" />
          </li>
          <li>
            <NavLink text=" Foodies Community" urlPath="/community" />
          </li>
        </ul>
      </nav>
    </header>
  );
}
