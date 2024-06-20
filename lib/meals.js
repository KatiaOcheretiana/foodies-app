// import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import { S3 } from "@aws-sdk/client-s3";
import {
  equalTo,
  get,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { database } from "@/firebase";

import { uuid } from "uuidv4";

const s3 = new S3({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//  ---------------------------
// IF USE better-sqlite3

// const db = sql("meals.db");

// export async function getMeals() {
//   await new Promise((resolve) => setTimeout(resolve, 2000));

//   return db.prepare("SELECT * FROM meals").all();
// }

// export function getMeal(slug) {
//   return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
// }

// export async function saveMeal(meal) {
//   meal.slug = slugify(meal.title, { lower: true });
//   meal.instructions = xss(meal.instructions);

//   const extension = meal.image.name.split(".").pop();
//   const fileName = `${meal.slug}.${extension}`;

//   const bufferedImage = await meal.image.arrayBuffer();

//   s3.putObject({
//     Bucket: "katya-nextjs-demo-users-image",
//     Key: fileName,
//     Body: Buffer.from(bufferedImage),
//     ContentType: meal.image.type,
//   });

//   meal.image = fileName;

//   db.prepare(
//     `INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
//     VALUES (
//     @title,
//     @summary,
//     @instructions,
//     @creator,
//     @creator_email,
//     @image,
//     @slug
//     )`
//   ).run(meal);
// }

const dbRef = ref(database, "meals");

export async function getMeals() {
  return new Promise((resolve, reject) => {
    onValue(
      dbRef,
      (snapshot) => {
        const meals = [];
        snapshot.forEach((childSnapshot) => {
          meals.push(childSnapshot.val());
        });
        resolve(meals);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

export function getMeal(slug) {
  const db = getDatabase();
  const mealsRef = ref(db, "meals");

  // Create a query to find the meal by slug
  const slugQuery = query(mealsRef, orderByChild("slug"), equalTo(slug));

  return new Promise((resolve, reject) => {
    get(slugQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Firebase returns the data as an object with keys, convert it to an array
          const meal = Object.values(data)[0];
          resolve(meal);
        } else {
          reject(new Error("No data available"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: "katya-nextjs-demo-users-image",
    Key: fileName,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  set(ref(database, "meals/" + uuid()), {
    title: meal.title,
    slug: meal.slug,
    image: meal.image,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
  });
}
