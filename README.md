# Foodies App

Foodies App is a recipe-sharing website built with Next.js. Users can browse recipes and contribute their own favorite recipes through a user-friendly form.
The application uses Firebase for storage and AWS SDK for image handling.

## Tech Stack

- Frontend: Next.js, React
- Backend: Firebase
- Image Storage: AWS S3
- Libraries:
  > @aws-sdk/client-s3 for AWS S3 interaction
  > firebase for Firebase integration
  > slugify for generating URL-friendly slugs
  > uuidv4 for generating unique identifiers
  > xss for sanitizing user input

## Installation

1. Clone the repository:

```bash
git clone https://github.com/KatiaOcheretiana/foodies-app
cd foodies-app
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

Create a .env.local file in the root directory and add your Firebase and AWS S3 credentials:

```bash
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
FIREBASE_KEY = your_firebase_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open http://localhost:3000 with your browser to see the result.
