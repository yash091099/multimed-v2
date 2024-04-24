import React, { useEffect, useRef } from "react";

const DateDropdown = ({ setDate, setIsDropdown }) => {
  const PincodesData = [
    { id: 1, date: "1/01/23" },
    { id: 2, date: "2/01/23" },
    { id: 3, date: "3/01/23" },
    { id: 4, date: "4/01/23" },
    { id: 5, date: "5/01/23" },
    { id: 6, date: "6/01/23" },
  ];

  let dropdownRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
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
      ref={dropdownRef}
      className={`absolute bottom-12 left-0 border border-[#E2E8F0] flex flex-col  w-[18.375rem] p-2 gap-2 rounded bg-white`}
    >
      <div className="flex flex-col gap-1">
        {PincodesData.map((item, idx) => {
          return (
            <div
              onClick={() => {
                setDate(item.date);
                setIsDropdown(false);
              }}
              className="hover:bg-[#E2E8F0] flex items-center border-b border-[#E2E8F0] py-1 px-1.5 h-6"
            >
              <h1 className="text-[0.625rem] text-[#0F172A]">{item.date}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateDropdown;
