import React, { useState } from "react";

import DownArrow from "../../assets/dropdownArrow.svg";
import InactiveDownArrow from "../../assets/inactiveDownArrow.svg";

const ProfileInput = ({ title, big, isError, value, setValue,disabled }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex flex-col gap-1 w-[21.125rem]">
      <label
        className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B] capitalize"
        for="html"
      >
        {title}
      </label>
      <div
        className={`${isError && value !== "" ? "border-[#EF4444]" : null}  ${
          isActive ? "border-[#031B89]" : "border-[#E2E8F0]"
        } ${
          big ? "h-[2.625rem]" : "h-[2.125rem]"
        }  flex justify-between  bg-[#FAFAFA] border  rounded p-3 gap-2 items-center`}
      >
        <input
          onFocus={() => {
            setIsActive(true);
          }}
          onBlur={() => {
            setIsActive(false);
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="text"
          id={title}
          value={value}
          placeholder={`Enter ${title}`}
          disabled={disabled}
          className="w-full outline-none text-[0.875rem] font-HelveticaNeueLight bg-[#FAFAFA] placeholder:text-[#64748B] capitalize"
        />
        {/* <img
          src={value === "" ? InactiveDownArrow : DownArrow}
          alt="drop down arrow"
          className="w-6 h-6"
        /> */}
      </div>
    </div>
  );
};

export default ProfileInput;
