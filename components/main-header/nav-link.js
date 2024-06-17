"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./nav-link.module.css";

export default function NavLink({ urlPath, text }) {
  const path = usePathname();

  return (
    <Link
      href={urlPath}
      className={
        path.startsWith(urlPath)
          ? `${styles.link}  ${styles.active}`
          : styles.link
      }
    >
      {text}
    </Link>
  );
}
