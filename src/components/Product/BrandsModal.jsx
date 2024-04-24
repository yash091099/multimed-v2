import React, { useEffect, useRef } from "react";
import CheckBox from "./CheckBox";
import FilterSearchBar from "./FilterSearchBar";

import Cross from "../../assets/crossIcon.svg";

const BrandsModal = ({ setIsBrandsModal }) => {
  let brandsModalRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!brandsModalRef.current.contains(e.target)) {
        setIsBrandsModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={brandsModalRef}
      className="z-50 absolute bg-white border border-[#E2E8F0] flex flex-col px-3 py-4 gap-2 w-[34.125rem] rounded overflow-hidden"
    >
      {/* Heading */}
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-[0.875rem] font-HelveticaNeueMedium capitalize">
          BRAND
        </h1>
        <button
          onClick={() => {
            setIsBrandsModal(false);
          }}
        >
          <img src={Cross} alt="cross icon" className="w-6 h-6" />
        </button>
      </div>

      <FilterSearchBar placeholderText="Search for brands" />

      <div className="flex overflow-auto gap-6">
        <div className="min-w-[8rem] flex flex-col gap-6 p-2">
          <h1 className="text-[0.875rem]  font-HelveticaNeueMedium">
            Category Name
          </h1>

          <div className="flex flex-col gap-1">
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
          </div>
        </div>

        <div className="min-w-[8rem] flex flex-col gap-6 p-2">
          <h1 className="text-[0.875rem]  font-HelveticaNeueMedium">
            Category Name
          </h1>

          <div className="flex flex-col gap-1">
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
          </div>
        </div>

        <div className="min-w-[8rem] flex flex-col gap-6 p-2">
          <h1 className="text-[0.875rem]  font-HelveticaNeueMedium">
            Category Name
          </h1>

          <div className="flex flex-col gap-1">
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
          </div>
        </div>

        <div className="min-w-[8rem] flex flex-col gap-6 p-2">
          <h1 className="text-[0.875rem]  font-HelveticaNeueMedium">
            Category Name
          </h1>

          <div className="flex flex-col gap-1">
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
            <CheckBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsModal;
