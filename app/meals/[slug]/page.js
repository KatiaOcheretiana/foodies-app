import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import NotFound from "../not-found";

export async function generateMetadata({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    return NotFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealsDetailsPage({ params }) {
  const meal = getMeal(params.slug);

  if (!meal) {
    return NotFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image
            src={`https://katya-nextjs-demo-users-image.s3.amazonaws.com/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}> {meal.creator} </a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
