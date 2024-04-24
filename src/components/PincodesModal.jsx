import React, { useState } from "react";

const PincodesModal = ({ isSelected, setIsSelected, isDropdown }) => {
  const PincodesData = [
    { id: 1, code: 560023 },
    { id: 2, code: 560025 },
    { id: 3, code: 560027 },
    { id: 4, code: 560028 },
    { id: 5, code: 560029 },
    { id: 6, code: 560031 },
  ];

  const res = PincodesData.filter((item, idx) => item.id === isSelected);

  return (
    <div
      className={`${
        !isDropdown ? "left-[30.4rem] -top-10" : "left-[16.2rem] -top-12"
      } border border-[#E2E8F0] absolute flex flex-col  w-[16.625rem] p-2 gap-2 rounded bg-white`}
    >
      <div className="flex items-center bg-[#F8FAFC] rounded border border-[#E2E8F0] py-1 px-1.5 h-6">
        <h1 className="text-[0.625rem] text-[#0F172A]">
          {res.map((item, idx) => item.code)}
        </h1>
      </div>

      <div className="flex flex-col gap-1">
        {PincodesData.map((item, idx) => {
          return (
            <div
              onClick={() => {
                setIsSelected(item.id);
              }}
              className="hover:bg-[#E2E8F0] flex items-center border-b border-[#E2E8F0] py-1 px-1.5 h-6"
            >
              <h1 className="text-[0.625rem] text-[#0F172A]">{item.code}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PincodesModal;
