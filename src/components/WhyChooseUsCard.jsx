import React from "react";


const WhyChooseUsCard = ({ image, title, content, isContent }) => {
  return (
    <div className="w-full flex flex-col gap-1 justify-center items-center h-auto w-full">
      <div className="flex flex-col gap-2">
        <img
          src={image}
          alt={`${title} image`}
          className="h-[9.375rem] min-w-[9.375rem]"
        />
        <h1 className="text-center font-HelveticaNeueMedium">{title}</h1>
      </div>

      {isContent && (
        <p className="w-full text-[0.875] text-[#0F172A] leading-[1.1rem] tracking-tight">
          {content}
        </p>
      )}
    </div>
  );
};

export default WhyChooseUsCard;
