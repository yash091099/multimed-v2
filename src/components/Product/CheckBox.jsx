import React, { useState } from "react";

import Tick from "../../assets/checkIcon.svg";

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setIsChecked(!isChecked);
        }}
        className={`${
          isChecked ? "bg-[#7487FF]" : "bg-[#F8FAFC]"
        } h-6 w-6 rounded-[2px] border border-[#E2E8F0]`}
      >
        {isChecked ? <img src={Tick} /> : null}
      </button>
      <h1 className="text-[0.875rem]">Brand Name</h1>
    </div>
  );
};

export default CheckBox;
