import PostsList from "@/components/PostsList";
import Head from "next/head";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Posts App</title>
        <meta
          name="description"
          content="Posts app created with Firebase, Next JS and MUI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="mt-8">Posts with Firebase 🚀</h1>

      {user ? (
        <PostsList />
      ) : (
        <p className="mt-8">Please login to view posts!</p>
      )}
    </>
  );
}
