import Detailedblog from "@/components/blog-page/detailed-blog/detailed-blogs";
import { getBlogById } from "@/lib/functions/getBlogById";
import { notFound } from "next/navigation";
import React from "react";

type ParamsProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: ParamsProps) => {

  //Extract id from params, if no id, mark as notfound.
  const { id } = await params;

  if (!id) {
    notFound();
  }

  //if id, get blog by id.
  const blog = await getBlogById(id)

  if (!blog) {
    notFound();
  }
  
  return (
    <div>
      <Detailedblog {...blog} />
    </div>
  );
};

export default page;
