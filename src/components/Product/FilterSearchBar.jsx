import React, { useState } from "react";
import { Link } from "react-router-dom";

import Search from "../../assets/searchIcon.svg";

const SearchBar = ({ placeholderText }) => {
  const [input, setInput] = useState("");
  const [isSelected, setIsSelected] = useState(-1);

  const AddressData = [
    { id: 1, code: 560095 },
    { id: 2, code: 560096 },
  ];

  const res = AddressData.filter((items, idx) => items.id === isSelected);

  return (
    <div
      className={`w-full lg:flex hidden items-center py-0.5 px-2 md:max-w-[40.688rem] lg:mx-0 grow h-[2.75rem] border border-slate-300 rounded`}
    >
      {/* Search Input */}
      <div className="group relative flex p-2 gap-1 grow">
        <Link to="/results">
          <img
            src={Search}
            alt="search icon"
            className="min-h-[1.5rem] min-w-[1.5rem]"
          />
        </Link>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholderText}
          className={`max-w-[9.5rem] text-[0.875rem] placeholder:text-[#94A3B8] focus:outline-none grow overflow-hidden sm:overflow-visible`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
