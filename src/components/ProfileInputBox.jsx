import React, { useRef, useState } from "react";

import DownArrow from "../assets/dropdownArrow.svg";
import DownArrowUp from "../assets/dropdownUpArrow.svg";
import ProfileInputDropdown from "./ProfileInputDropdown";

const ProfileInputBox = ({
  title,
  big,
  isError,
  value,
  setValue,
  errorMsg,
  dropdownField,
  disabled,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const inputButtonRef = useRef();

  return (
    <div
      ref={inputButtonRef}
      className={`${
        disabled && " opacity-100"
      } relative  max-w-[64.688rem] flex flex-col gap-1`}
    >
      <label
        className="text-[0.625rem] text-left font-HelveticaNeueItalic text-[#64748B] capitalize"
        for="html"
      >
        {title}
      </label>

      <div
        className={`${isError && value !== "" ? "border-[#EF4444]" : null}  ${
          isActive ? "border-[#031B89]" : "border-[#E2E8F0]"
        } ${big ? "h-[2.625rem]" : "h-[2.125rem]"} ${
          value === "" ? "bg-[#FAFAFA]" : "bg-white"
        } ${
          disabled && "bg-[#F1F5F9]"
        } flex justify-between h-[5.25rem]  border  rounded p-3 gap-2 items-center`}
      >
        <textarea
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
          className={`${value === "" ? "bg-[#FAFAFA]" : "bg-white"} ${
            disabled && "bg-[#F1F5F9] text-[#94A3B8]"
          } w-full h-full outline-none md:text-[0.875rem] text-xs font-HelveticaNeueLight placeholder:text-[#64748B] capitalize`}
        />

        {dropdownField && (
          <button onClick={() => setIsDropdown(!isDropdown)}>
            <img
              src={isDropdown ? DownArrowUp : DownArrow}
              alt="drop down arrow"
              className="w-6 h-6"
              />
          </button>
        )}
      </div>
        {isError  && (
          <p className="text-[#EF4444] text-xs text-left d-flex">{errorMsg}</p>
        )}

      {isDropdown && (
        <ProfileInputDropdown
          inputButtonRef={inputButtonRef}
          setIsDropdown={setIsDropdown}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default ProfileInputBox;
