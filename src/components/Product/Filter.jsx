import React, { useState } from "react";

import FilterSearchBar from "./FilterSearchBar";
import BrandsModal from "./BrandsModal";

import Dropdown from "../../assets/dropdownArrow.svg";
import DropdownUp from "../../assets/dropdownUpArrow.svg";
import CheckBox from "./CheckBox";

const Filter = ({ isSearchBar, isViewAll, title }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isBrandsModal, setIsBrandsModal] = useState(false);

  return (
    <div className="relative border-b border-[#E2E8F0] flex flex-col px-3 py-4 gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">{title}</h1>
          <button
            onClick={() => {
              setIsDropdown(!isDropdown);
            }}
          >
            <img
              src={isDropdown ? DropdownUp : Dropdown}
              alt="dropdown up icon"
              className="w-6 h-6"
            />
          </button>
        </div>

        {isSearchBar && isDropdown ? (
          <FilterSearchBar isFilter placeholderText="Search for brands" />
        ) : null}
      </div>

      {isDropdown ? (
        <div className="flex flex-col gap-1">
          <CheckBox />
          <CheckBox />
          <CheckBox />
          <CheckBox />
          <CheckBox />
          <CheckBox />
        </div>
      ) : null}

      {isViewAll && isDropdown ? (
        <button
          onClick={() => {
            setIsBrandsModal(true);
          }}
          className="text-[#7487FF] font-HelveticaNeueMedium text-[0.75rem] text-center"
        >
          View all Brands
        </button>
      ) : null}

      {isViewAll && isBrandsModal ? (
        <BrandsModal setIsBrandsModal={setIsBrandsModal} />
      ) : null}
    </div>
  );
};

export default Filter;
