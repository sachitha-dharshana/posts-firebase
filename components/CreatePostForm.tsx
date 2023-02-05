import React from "react";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useFormik } from "formik";

type TFormData = {
  title: string;
  description: string;
};

const CreatePostFrom = () => {
  const [user] = useAuthState(auth);

  const postsRef = collection(db, "posts");

  // yup schema for validation
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const onCreatePost = async (values: TFormData, actions: any) => {
    await addDoc(postsRef, {
      ...values,
      username: user?.displayName,
      userId: user?.uid,
    });
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: onCreatePost,
  });

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="title">Post Title</label>
      <input
        className={
          errors.title && touched.title
            ? "input-error border-2 p-2 rounded-md"
            : "border-2 border-gray-500 p-2 rounded-md focus:border-teal-500"
        }
        placeholder="Enter your post title..."
        value={values.title}
        type="text"
        id="title"
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.title && touched.title && (
        <p className="text-[#f35757] font-medium">{errors.title}</p>
      )}
      <label className="mt-4" htmlFor="description">
        Post Description
      </label>
      <textarea
        className={
          errors.description && touched.description
            ? "input-error border-2 p-2 rounded-md"
            : "border-2 border-gray-500 p-2 rounded-md focus:border-teal-500"
        }
        placeholder="Enter your post description..."
        id="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.description && touched.description && (
        <p className="text-[#f35757] font-medium">{errors.description}</p>
      )}
      <button
        disabled={isSubmitting}
        className="p-2 mt-4 border-2 bg-teal-500 rounded-md text-black  cursor-pointer font-semibold"
        type="submit"
      >
        {isSubmitting ? "Submitting 📤" : "Submit"}
      </button>
    </form>
  );
};

export default CreatePostFrom;
