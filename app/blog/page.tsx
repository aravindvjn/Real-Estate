import BlogGrid from "@/components/blog-page/blog-grid";
import BlogHeader from "@/components/blog-page/blog-header";
import React from "react";

const page = () => {
  return (
    <div>
      <BlogHeader />
      <BlogGrid />
    </div>
  );
};

export default page;
