import React from "react";

import SecondaryButton from "./SecondaryButton";
import { Link } from "react-router-dom";

const CompareProductsCard = ({
  name,
  discount,
  image,
  composition,
  pricing,
  manufacturer,
  ETATime,
  ETADay,
  isCostlier,
  gotoProduct,
}) => {
  return (
    <div className="flex flex-col justify-between w-[20.25rem] rounded pb-6 gap-4 bg-[#FAFAFA] border-[#E2E8F0]">
      {isCostlier ? (
        <div className="flex py-2 px-4 text-[0.75rem] font-HelveticaNeueMedium bg-[#FEF2F2] text-[#DC2626]">
          <h1>{discount} Rs Costlier</h1>
        </div>
      ) : (
        <div className="flex py-2 px-4 text-[0.75rem] font-HelveticaNeueMedium bg-[#F7FEE7] text-[#65A30D]">
          <h1>{discount} Rs Cheaper</h1>
        </div>
      )}

      <div className="text-[0.875rem] flex py-2 px-4 font-HelveticaNeueMedium border-b border-[#E2E8F0]">
        <h1>{name}</h1>
      </div>

      <div className="flex py-2 px-4 border-b border-[#E2E8F0] h-[8.75rem] ">
        <img src={image} className="object-cover rounded" />
      </div>

      <div className="text-[0.875rem] flex py-2 px-4 font-HelveticaNeueItalic border-b border-[#E2E8F0]">
        <h1>{composition}</h1>
      </div>

      <div className="text-[0.875rem] flex py-2 px-4 font-HelveticaNeueMedium border-b border-[#E2E8F0]">
        <h1>{pricing}</h1>
      </div>

      <div className="text-[0.875rem] flex py-2 px-4 font-HelveticaNeueMedium border-b border-[#E2E8F0] text-[#0F172A] ">
        <div className="border-b border-[#0F172A]">
          <h1>{manufacturer}</h1>
        </div>
      </div>

      <div className="text-[0.875rem] flex py-2 px-4 font-HelveticaNeueMedium border-b border-[#E2E8F0] text-[#0F172A]">
        <h1>
          Approx ETA : <span className="text-[#65A30D]">{ETATime}</span>{" "}
          {ETADay}
        </h1>
      </div>

      <div className="text-[0.875rem] flex justify-center gap-2 py-2 px-4 font-HelveticaNeueMedium border-b border-[#E2E8F0] text-[#0F172A]">
        <button className="w-[9.875rem] border-[1px] rounded text-[#031B89] border-[#031B89] py-2">
          ADD TO CART
        </button>
        <div className="py-2 px-[0.688rem] text-[#7487FF] rounded">
          <div  className="cursor-pointer">Go to product</div>
          {/* <div onClick={gotoProduct} className="cursor-pointer">Go to product</div> */}
        </div>
      </div>
    </div>
  );
};

export default CompareProductsCard;
