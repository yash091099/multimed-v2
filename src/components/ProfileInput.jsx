import React, { useRef, useState } from "react";
import DownArrow from "../assets/dropdownArrow.svg";
import DownArrowUp from "../assets/dropdownUpArrow.svg";
import ProfileInputDropdown from "./ProfileInputDropdown";

const ProfileInput = ({
  title,
  big,
  isError,
  value,
  setValue,
  dropdownField,
  disabled,
  important,
  errorMsg,
  dropdownList,

isNumber,
  
  wide,
}) => {
  const inputButtonRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const inputClassName = `${disabled ? "bg-[#F1F5F9] " : "bg-[#FAFAFA] "} ${
    value === "" ? "bg-[#FAFAFA] " : "bg-white "
  }w-full outline-none md:text-[0.875rem] text-xs font-HelveticaNeueLight placeholder:text-[#64748B] capitalize`;

  const containerClassName = `${disabled && " opacity-100"} ${
    wide ? "w-full" : "md:w-[21.125rem]"
  } relative flex flex-col gap-1`;

  const borderClassName = `${
    isError && value !== "" ? "border-[#EF4444]" : null
  } ${isActive ? "border-[#031B89]" : "border-[#E2E8F0]"}`;

  return (
    <div ref={inputButtonRef} className={containerClassName}>
      <label
        className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B] capitalize text-left"
        htmlFor={title}
      >
        {title} {important && <span className="text-[#EF4444] font-HelveticaNeueBold">*</span>}
      </label>

      <div onClick={() => {dropdownField?setIsDropdown(!isDropdown): null}} className={`${borderClassName} ${big ? "h-[2.625rem]" : "h-[2.125rem]"} ${disabled && "bg-[#F1F5F9]"} flex justify-between border rounded p-3 gap-2 items-center`}>
        <input
          readOnly={dropdownField}
          onFocus={() => {
            setIsActive(true);
          }}
          onBlur={() => {
            setIsActive(false);
          }}
          type={isNumber?"number":"text"}
          id={title}
          value={value}
          placeholder={`Enter ${title}`}
          className={inputClassName}
          onChange={(e) => setValue(e.target.value)}
        />


        {dropdownField && (
          <button onClick={() => setIsDropdown(!isDropdown)}>
            <img src={isDropdown ? DownArrowUp : DownArrow} alt="drop down arrow" className="w-6 h-6" />
          </button>
        )}
      </div>
        {isError &&<p className="text-[#EF4444] text-xs text-left d-flex">{errorMsg}</p>}

      {isDropdown && (
        <ProfileInputDropdown
          inputButtonRef={inputButtonRef}
          setIsDropdown={setIsDropdown}
          setValue={setValue}
          isError={isError}
          dropdownList={dropdownList}
        />
      )}
    </div>
  );
};

export default ProfileInput;
