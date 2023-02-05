import CreatePostFrom from "@/components/CreatePostForm";
import React from "react";

const createPost = () => {
  return (
    <div className="w-[50%] m-auto p-20 bg-slate-200 mt-20 rounded-md shadow-md">
      <CreatePostFrom />
    </div>
  );
};

export default createPost;
