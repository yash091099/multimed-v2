import React, { useEffect, useRef } from "react";

const SortByModal = ({ isIndex, setIsDropdown, setSort }) => {
  let sortByDropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!sortByDropdownRef.current.contains(e.target)) {
        setIsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={sortByDropdownRef}
      className="w-[16.3rem] absolute top-12 left-0 p-2 bg-white rounded border border-[#E2E8F0] text-[#0F172A]"
    >
      <div className="flex flex-col gap-1">
        {/* Search */}
        {!isIndex ? (
          <>
            <div
              onClick={() => {
                setSort("Relevance");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">Relevance</h1>
            </div>

            <div
              onClick={() => {
                setSort("Price - Highest to Lowest");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">Price - Highest to Lowest</h1>
            </div>

            <div
              onClick={() => {
                setSort("Price - Lowest to Highest");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">Price - Lowest to Highest</h1>
            </div>

            <div
              onClick={() => {
                setSort("A-Z");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">A-Z</h1>
            </div>

            <div
              onClick={() => {
                setSort("Z-A");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">Z-A</h1>
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                setSort("Prescription required");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">Prescription required</h1>
            </div>
            <div
              onClick={() => {
                setSort("Prescription not required");
              }}
              className="flex items-center border-b-[0.5px] px-1.5 h-6"
            >
              <h1 className="text-[0.625rem]">Prescription not required</h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SortByModal;
