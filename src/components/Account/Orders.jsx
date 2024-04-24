import React, { useState } from "react";

import Dropdown from "../../assets/dropdownArrow.svg";
import DropdownUp from "../../assets/dropdownUpArrow.svg";
import DateDropdown from "./DateDropdown";
import OrdersSection from "./OrdersSection";
import Subscription from "./Subscriptions/subscription";

const Orders = () => {
  const [isActive, setIsActive] = useState("processing");
  const [isDropdown, setIsDropdown] = useState(false);
  const [date, setDate] = useState("9/01/23");

  return (
    <div className="w-full flex flex-col gap-12 text-[#0F172A]">
      {/* header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-[1.125rem] font-HelveticaNeueMedium">Orders</h1>

        {/* tabs and choose date */}
        <div className="flex justify-between">
          {/* tabs */}
          <div className="flex gap-0.5">
            <button
              onClick={() => setIsActive("processing")}
              className={`${
                isActive === "processing"
                  ? " bg-white border-b-[0.188rem] border-[#031B89]"
                  : " bg-[#F8FAFC]"
              }  w-[10.938rem] py-2 px-1`}
            >
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Processing Orders
              </h1>
            </button>

            <button
              onClick={() => setIsActive("history")}
              className={`${
                isActive === "history"
                  ? " bg-white border-b-[0.188rem] border-[rgb(3,27,137)]"
                  : " bg-[#F8FAFC] text-[#64748B]"
              }  w-[10.938rem] py-2 px-1`}
            >
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Orders history
              </h1>
            </button>

            <button
              onClick={() => setIsActive("cancelled")}
              className={`${
                isActive === "cancelled"
                  ? " bg-white border-b-[0.188rem] border-[rgb(3,27,137)]"
                  : " bg-[#F8FAFC] text-[#64748B]"
              }  w-[10.938rem] py-2 px-1`}
            >
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Cancelled Orders
              </h1>
            </button>

            <button
              onClick={() => setIsActive("Subscriptions")}
              className={`${
                isActive === "Subscriptions"
                  ? " bg-white border-b-[0.188rem] border-[rgb(3,27,137)]"
                  : " bg-[#F8FAFC] text-[#64748B]"
              }  w-[10.938rem] py-2 px-1`}
            >
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Subscriptions
              </h1>
            </button>
          </div>

          {/* choose date */}
          {/* <button
            onClick={() => {
              setIsDropdown(true);
            }}
            className="relative w-[18.375rem] flex justify-between p-2 rounded border border-[#CBD5E1] items-center"
          >
            <h1 className="text-[#94A3B8] text-[0.875rem]">{date}</h1>
            <img
              src={isDropdown ? DropdownUp : Dropdown}
              alt="dropdown icon"
              className="w-6 h-6"
            />
            {isDropdown ? (
              <DateDropdown setIsDropdown={setIsDropdown} setDate={setDate} />
            ) : null}
          </button> */}
        </div>
      </div>

      {/* orders */}
      {isActive==='Subscriptions'?<Subscription></Subscription>:<OrdersSection isActive={isActive} />}

      
    </div>
  );
};

export default Orders;
