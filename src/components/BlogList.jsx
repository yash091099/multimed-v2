import React from "react";
import BlogCard from "./BlogCard";

const BlogRow = ({ blogs }) => {
  return (
    <div className="flex justify-start items-start gap-2">
      {blogs.map((blog, index) => (
        <BlogCard key={index} {...blog} />
      ))}
    </div>
  );
};

export default BlogRow;
