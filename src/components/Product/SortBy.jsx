import React, { useState } from "react";

import Dropdown from "../../assets/dropdownArrow.svg";
import DropdownUp from "../../assets/dropdownUpArrow.svg";

import SortByModal from "../Product/SortByModal";

const SortBy = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [sort, setSort] = useState("Relevance");

  return (
    <button
      onClick={() => {
        setIsDropdown(true);
      }}
      className="relative w-[21.875rem] flex justify-between p-2 rounded border border-[#CBD5E1] items-center"
    >
      <h1 className="text-[#94A3B8] text-[0.875rem]">{sort}</h1>
      <img
        src={isDropdown ? DropdownUp : Dropdown}
        alt="dropdown icon"
        className="w-6 h-6"
      />
      {isDropdown ? (
        <SortByModal setIsDropdown={setIsDropdown} setSort={setSort} />
      ) : null}
    </button>
  );
};

export default SortBy;
