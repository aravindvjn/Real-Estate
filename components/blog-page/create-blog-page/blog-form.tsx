"use client";
import PreviewImage from "@/components/helpers/preview-image";
import Input from "@/components/ui/input";
import { addBlog } from "@/lib/actions/add-blog";
import React, { useActionState, useState } from "react";
import { TfiWrite } from "react-icons/tfi";

const BlogForms = () => {
  const [selectedImage, setSelectedImage] = useState<string[]>([]);

  //Create a new blog
  const [state, action, isPending] = useActionState(
    addBlog.bind(null, selectedImage),
    {
      message: "",
      success: false,
    }
  );

  return (
    <div className="p-5 sm:px-10 lg:px-14">
      <p className="flex gap-2 items-center font-light ">
        <TfiWrite /> Write a New Blog
      </p>
      <form
        action={action}
        className="flex mt-3 text-[12px] md:text-[14px] flex-col gap-2 max-w-[400px]"
      >
        <Input name="title" />

        <label htmlFor="content">Thumbnail</label>
        <PreviewImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          placeholder="Enter  your blog content"
          className="border min-h-[120px] p-3 text-[12px] placeholder:text-[12px] md:text-[14px] rounded-md"
        />
        {state.message && (
          <p className={state.success ? "text-green-500" : "text-red-500"}>
            {state.message}
          </p>
        )}
        <button
          type="submit"
          className="py-2 px-4 rounded-md bg-blue-500 text-white font-semibold"
        >
          {isPending ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default BlogForms;
