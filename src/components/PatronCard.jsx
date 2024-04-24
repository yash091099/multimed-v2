import React from "react";

import QuotationIcon from "../assets/about/quotationIcon.svg";

const PatronCard = ({ image, name, occupation, content }) => {
  return (
    <div className="flex flex-col w- gap-2">
      {/* profile */}
      <div className="flex gap-2">
        <div className="max-w-[3.125rem] max-h-[3.125rem]">
          <img src={image} className="w-full h-full rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-HelveticaNeueMedium">{name}</h1>
          <h2 className="text-[0.875rem] font-HelveticaNeueItalic">
            {occupation}
          </h2>
        </div>
      </div>

      {/* content */}
      <div className="flex gap-4">
        <img src={QuotationIcon} className="mb-auto mr-auto" />
        <p className="max-w-[21.563rem] text-[0.875] text-[#0F172A] leading-[1.1rem] tracking-tight">
          {content}
        </p>
      </div>
    </div>
  );
};

export default PatronCard;
