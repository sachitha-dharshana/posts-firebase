import { auth, db } from "@/config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

type TPost = {
  id: string;
  title: string;
  username: string;
  description: string;
};

type TLike = {
  likeId: string;
  userId: string;
};

const PostCard = (post: TPost) => {
  // state
  const [likes, setLikes] = useState<TLike[] | null>(null);

  const { title, description, username, id } = post;

  const [user] = useAuthState(auth);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: id });
      if (user) {
        setLikes((_prev) =>
          _prev
            ? [..._prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      alert(`Something went wrong: ${err}`);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const likeToDeleteData = await getDocs(likeToDeleteQuery);

      const likeToDelete = doc(db, "likes", likeToDeleteData.docs[0].id);

      await deleteDoc(likeToDelete);

      if (user) {
        setLikes(
          (_prev) =>
            _prev &&
            _prev.filter((like) => like.likeId !== likeToDeleteData.docs[0].id)
        );
      }
    } catch (err) {
      alert(`Something went wrong: ${err}`);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] p-5 mb-10 rounded-md">
      <h2 className="text-gray-900 text-xl leading-tight font-medium mb-2">
        {title}
      </h2>
      <p className="text-gray-700 text-base mb-8">{description}</p>
      <h3>Author: {username}</h3>
      <button
        onClick={hasUserLiked ? removeLike : addLike}
        className="mt-2 flex items-center justify-center"
      >
        <>
          <span className="mr-2 mb-1"> {hasUserLiked ? "👎" : "👍"} </span>{" "}
          {likes && `${likes?.length} likes`}
        </>
      </button>
    </div>
  );
};

export default PostCard;
