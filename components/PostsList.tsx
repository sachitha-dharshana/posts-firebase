import React from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";

type TPost = {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
};

const PostsList = () => {
  // state
  const [postsList, setPostsList] = useState<TPost[] | null>(null);

  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as TPost[]
    );
  };

  // fetch initial dat
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="mt-8">
      {postsList?.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          description={post.description}
          username={post.username}
        />
      ))}
    </div>
  );
};

export default PostsList;
