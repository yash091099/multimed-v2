import React, { useState } from "react";

import DownArrow from "../assets/dropdownArrow.svg";
import InactiveDownArrow from "../assets/inactiveDownArrow.svg";

const ProfileInput = ({ title, big, isError, onInputChange,values }) => {
  console.log(values,'values')
  const [isActive, setIsActive] = useState(false);
  console.log(values,'value')

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (onInputChange) {
      onInputChange(inputValue);
    }
  };

  const borderClass = isError ? "border-[#EF4444]" 
                              : (isActive ? "border-[#031B89]" : "border-[#E2E8F0]");

  return (
    <div className="flex flex-col gap-1 w-[21.125rem]">
      <label
        className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B] capitalize"
        htmlFor={title}
      >
        {title}
      </label>
      <div
        className={`${borderClass} ${
          big ? "h-[2.625rem]" : "h-[2.125rem]"
        } flex justify-between bg-[#FAFAFA] rounded p-3 gap-2 items-center`}
      >
        <input
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onChange={handleInputChange}
          type="text"
          id={title}
          value={values}
          placeholder={`Enter ${title}`}
          className="w-full outline-none text-[0.875rem] font-HelveticaNeueLight bg-[#FAFAFA] placeholder:text-[#64748B] capitalize"
        />
        {/* <img
          src={values === "" ? InactiveDownArrow : DownArrow}
          alt="drop down arrow"
          className="w-6 h-6"
        /> */}
      </div>
      {isError && <p className="text-[#EF4444] text-xs">Error: Invalid {title}</p>}
    </div>
  );
};

export default ProfileInput;
