import React, { useState } from "react";

const ToggleButton = ({ permission, setPermission ,toggleData}) => {
  const [on, setOn] = useState(toggleData||permission);
  return (
    <button
      onClick={() =>{setOn(!permission); setPermission(!permission) ;}}
      className={`${
        on === true ? "bg-[#031B89] justify-end" : "bg-[#E0E7FF]"
      } w-[3.125rem] h-6 p-[1px] rounded-full flex items-center`}
    >
      <div
        className={`${
          on === true
            ? "bg-[#A9B5FF] border-white justify-end"
            : "bg-[#7487FF] border-[#A9B5FF]"
        } w-[1.375rem] h-[1.375rem] border-2  rounded-full`}
      />
    </button>
  );
};

export default ToggleButton;
