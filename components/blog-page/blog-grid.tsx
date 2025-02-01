import React from "react";
import { realEstateArticles } from "./artiles";
import GridCell from "../member-page/join-page/grid-cell";

const BlogGrid = () => {
  return (
    <div className="grid md:grid-cols-2 p-5 gap-5 md:px-10 lg:px-14">
      {realEstateArticles.map((article, index) => (
        <GridCell
          button_text="Read More"
          image_className="object-cover h-[200px] sm:h-[300px] md:h-[400px]"
          key={index}
          {...article}
        />
      ))}
    </div>
  );
};

export default BlogGrid;
