import React from "react";

const InputField = ({ label, placeholder, error, success, setValue }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="email" className="text-xs text-[#64748B]">
        {label}
      </label>

      <input
        onChange={(e) => setValue(e.target.value)}
        name="email"
        placeholder={placeholder}
        className={`${error && "border-[#EF4444] text-[#EF4444]"} ${
          success && "border-[#84CC16] text-[#84CC16]"
        } ${
          !success && !error ? "border-[#CBD5E1]" : null
        } h-10 rounded border focus:border-[#334155] focus:outline-none text-[0.875rem] py-[0.813rem] px-4 placeholder:text-[#E2E8F0] font-HelveticaNeueMedium placeholder:text-[0.875rem] placeholder:font-medium hover:bg-[#F1F5F9]`}
      />
      {error && (
        <h1 className="text-xs text-[#DC2626]">This is an incorrect entry!</h1>
      )}
      {success && <h1 className="text-xs text-[#84CC16]">Submitted</h1>}
    </div>
  );
};

export default InputField;
