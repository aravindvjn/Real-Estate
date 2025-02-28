"use client";
import React, { useEffect, useRef, useState } from "react";
import GridCell from "../member-page/join-page/grid-cell";
import Link from "next/link";
import { TfiWrite } from "react-icons/tfi";
import type { BlogTypes } from "./guide-page/type";
import { useInView } from "framer-motion";
import { getBlogs } from "@/lib/functions/getBlogs";

const BlogGrid = () => {
  const [pageLoaded, setPageLoaded] = useState<number>(0);
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  //initialize useInView hook to track the buttom of the list
  const ref = useRef(null);
  const isVisible = useInView(ref);

  const fetchBlogs = async () => {

    setIsLoading(true);
    //Fetch all blog
    const res = await getBlogs(pageLoaded);

    if (res.length > 0) {

      setBlogs((prev) => {
        const merged = [...prev, ...res];
        const uniqueBlogs = Array.from(new Map(merged.map(item => [item.id, item])).values());
        return uniqueBlogs;
      });
      
      setPageLoaded(pageLoaded + 1);

    } else {

      setIsFinished(true);

    }
    setIsLoading(false);
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

  //LoadMore Blogs if available
  useEffect(() => {
    if (isVisible && !isFinished && !isLoading) {
      fetchBlogs();
    }
  }, [isVisible]);

  return (
    <div>
      <Link
        className="text-[12px] bg-blue-600 px-3 py-1 rounded text-white sm:text-[14px] flex w-fit items-center gap-2 ml-5  md:ml-10 lg:ml-14"
        href={"/blog/create-blogs"}
      >
        <TfiWrite /> Write a new blog
      </Link>
      <div className="grid md:grid-cols-2 p-5 gap-5 md:px-10 lg:px-14">
        {blogs.map((article) => (
          <GridCell
            button_text="Read More"
            image_className="object-cover h-[200px] sm:h-[300px] md:h-[400px]"
            key={article.id}
            description={article.content}
            image={article.thumbnail}
            link={`/blog/${article.id}`}
            title={article.title}
          />
        ))}
        {isLoading && (
          <div className="flex rounded-md bg-gray-300 animate-pulse shadow-md h-[320px] sm:h-[400px]"></div>
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default BlogGrid;
