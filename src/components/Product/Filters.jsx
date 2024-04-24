import React from "react";
import Filter from "./Filter";

const Filters = () => {
  return (
    <div className="w-[14.188rem] h-fit  rounded border border-[#CBD5E1] bg-white">
      <div className="border-b border-[#E2E8F0] py-2 px-3">
        <h1 className="font-HelveticaNeueMedium">Filters</h1>
      </div>

      <Filter isViewAll isSearchBar title="BRAND" />
      <Filter title="PRESCRIPTION" />
      <Filter title="PRESCRIPTION" />
    </div>
  );
};

export default Filters;
