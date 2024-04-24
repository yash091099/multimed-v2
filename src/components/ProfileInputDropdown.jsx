import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../assets/searchIcon.svg";

const DateDropdown = ({ setIsDropdown, inputButtonRef, setValue, dropdownList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (
        !dropdownRef.current.contains(e.target) &&
        !inputButtonRef.current.contains(e.target)
      ) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // Filter dropdown list based on search term
  const filteredList = dropdownList?.filter(item =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  const formatTextToCamelCase = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-16 border border-[#E2E8F0] flex flex-col gap-2 w-[21.125rem] p-2 rounded bg-white z-10`}
    >
      {/* searchbar */}
      <div className="w-[19.625rem] rounded border border-[#CBD5E1] bg-white px-2">
        <div className="py-1 px-2 flex gap-2 items-center">
          <img src={SearchIcon} alt="search icon" className="w-6 h-6" />

          <input
            type="text"
            placeholder="Search here"
            className="placeholder:text-[#94A3B8] text-sm focus:outline-none"
            value={searchTerm}

            onChange={(e) =>{ setSearchTerm(e.target.value)}}
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-1">
        {filteredList?.map((item) => (
          <h1
            key={item.id} // assuming each item has a unique id
            onClick={() => {
              setIsDropdown(false);
              setValue(item.name);
            }}
            className="text-sm text-[#0F172A] rounded py-1 px-1.5 bg-white hover:bg-[#E0E7FF] d-flex text-left"
          >
            {formatTextToCamelCase(item?.name)}
          </h1>
        ))}
        {!filteredList?.length && <h1 className="text-sm text-[#0F172A] rounded py-1 px-1.5 d-flex items-center">No results found</h1>}
      </div>
    </div>
  );
};

export default DateDropdown;
