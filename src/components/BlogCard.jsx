import React from "react";
import FeaturedIcon from "../assets/Group.svg";

const BlogCard = ({ imageSrc, title, description, featured, imageSize }) => {
  const imageClass = `w-[${imageSize.width}px] h-[${imageSize.height}px] relative rounded-lg`;

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
      <div className={imageClass}>
        <img
          src={imageSrc}
          alt="Blog"
          className={imageClass}
        />
        {featured && (
          <div className="px-2 py-1 left-[667px] top-[26px] absolute bg-teal-100 rounded justify-center items-center gap-1 inline-flex">
            <img
              src={FeaturedIcon}
              alt="Featured"
              className="w-6 h-6"
            />
            <div className="text-slate-900 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">
              Featured
            </div>
          </div>
        )}
      </div>
      <div className="self-stretch h-[59px] flex-col justify-start items-start gap-1 flex">
        <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
          {title}
        </div>
        <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
          {description}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
