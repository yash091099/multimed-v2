import React, { useState } from "react";

const OrdersSwitch = ({ permission, setPermission }) => {
  const [on, setOn] = useState(permission);
  return (
    <button
      onClick={() =>{setOn(prev => !prev); setPermission(prev => !prev) ;}}
      className={`${
        on === true ? "justify-end" : ""
      } bg-[#031B89] w-[3.125rem] h-6 p-[1px] rounded-full flex items-center`}
    >
      <div
        className={`${
          on === true
            ? "justify-end"
            : ""
        } bg-[#A9B5FF] border-white w-[1.375rem] h-[1.375rem] border-2  rounded-full`}
      />
    </button>
  );
};

export default OrdersSwitch;
