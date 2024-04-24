import React from "react";

import SubstituteCard from "./SubstituteCard";
import { Link } from "react-router-dom";

const ProductSubstitutes = () => {
  return (
    <div className="flex flex-col py-6 px-4 gap-4 rounded bg-[#C2F5E9]">
      <div className="flex gap-2 font-HelveticaNeueMedium justify-between">
        <h1 className="text-[0.875rem]">Generic Product substitutes</h1>
        <Link className="text-[0.75rem] text-[#031B89]">View All</Link>
      </div>

      {/* Substitutes */}
      <div className="flex flex-col gap-2">
        <SubstituteCard
          name="Sahyog Wellness Single Tube BP Monitor Machine"
          price={1234}
          discount={12}
        />
        <SubstituteCard
          name="Sahyog Wellness Single Tube BP Monitor Machine"
          price={1234}
          discount={12}
        />
        <SubstituteCard
          name="Sahyog Wellness Single Tube BP Monitor Machine"
          price={1234}
          discount={12}
          isCostlier
        />
      </div>

      {/* Button */}
      <button className="w-full text-[0.875rem] font-HelveticaNeueMedium border-[1px] px-4 py-2 rounded text-[#031B89] border-[#031B89]">
        Compare Products
      </button>
    </div>
  );
};

export default ProductSubstitutes;
