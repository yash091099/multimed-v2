import React, { useEffect, useRef, useState } from "react";

const QuantityDropdown = ({
  isSelected,
  setIsSelected,
  setIsQuantityDropdown,
}) => {
  const PincodesData = [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
    { id: 3, quantity: 3 },
    { id: 4, quantity: 4 },
    { id: 5, quantity: 5 },
    { id: 6, quantity: 6 },
  ];

  let dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsQuantityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={dropdownRef}
      className={`left-[0] top-[2.8rem] border border-[#E2E8F0] absolute flex flex-col  w-full p-2 gap-2 rounded bg-white`}
    >
      <div className="flex flex-col gap-1">
        {PincodesData.map((item, idx) => {
          return (
            <div
              onClick={() => {
                setIsSelected(item.id);
                setIsQuantityDropdown(false);
              }}
              className="hover:bg-[#E2E8F0] flex items-center border-b border-[#E2E8F0] py-1 px-1.5 h-6"
            >
              <h1 className="text-[0.625rem] text-[#0F172A]">
                {item.quantity}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuantityDropdown;
