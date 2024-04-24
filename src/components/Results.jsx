import React from "react";

import Filters from "./Product/Filters";
import ProductCard from "./Product/ProductCard";
import SortBy from "./Product/SortBy";

const Results = () => {
  return (
    <div className="flex flex-col justify-between items-center py-12 px-[6.25rem] gap-[1.25rem] bg-white mb-4">
      {/* Heading */}
      <div className="flex w-[63.25rem] gap-2">
        <h1 className="w-full text-[1.25rem] font-HelveticaNeueMedium text-[#031B89]">
          Showing Search results for “BP Monitor”
        </h1>

        <SortBy />
      </div>

      {/* Results and Filters */}
      <div className="w-[63.25rem] flex gap-6">
        <Filters />

        <div className="flex flex-col gap-[1.25rem] w-[47.563rem]">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Results;
