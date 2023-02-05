import React from "react";
import { useRouter } from "next/navigation";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

const login = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    router.push("/");
  };

  return (
    <div>
      <h1 className="mb-6">Login page</h1>
      <p className="mb-2">Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default login;
