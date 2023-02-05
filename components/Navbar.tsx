import Link from "next/link";
import React from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Image from "next/image";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const signOutUser = async () => {
    await signOut(auth);
  };

  return (
    <div className="bg-purple-500 p-8 flex justify-end items-center gap-x-16">
      <div>
        <Link className="text-white mr-4" href="/">
          Home
        </Link>
        {!user && (
          <Link className="text-white" href="/login">
            Login
          </Link>
        )}
        {user && (
          <Link className="text-white" href="/createPost">
            Create Post
          </Link>
        )}
      </div>
      {user && (
        <div className="ml-4 flex items-center">
          <p className="text-white">{user?.displayName}</p>
          {user?.photoURL && (
            <Image
              className="ml-4 rounded-full"
              src={user.photoURL}
              alt="user"
              height={50}
              width={50}
            />
          )}
          <button className="ml-4" onClick={signOutUser}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
