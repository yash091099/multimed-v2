import React from "react";

const AuthorCard = ({ image, name, occupation }) => {
  return (
    <div className="flex flex-col w-[14.188rem] py-4 px-3 justify-center gap-2 bg-[#F8FAFC]">
      <h1>AUTHOR</h1>
      <div className="flex gap-2 items-center">
        <img src={image} className="w-[2.5rem] h-[2.5rem] rounded-full" />
        <div className="text-[#0F172A]">
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">{name}</h1>
          <h2 className="text-[0.75rem] font-HelveticaNeueLight">
            {occupation}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
