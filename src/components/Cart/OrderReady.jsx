import React from "react";

import GoToButton from "./GoToButton";

const OrderReady = () => {
  return (
    <div className="w-fit flex flex-col py-4 px-6 rounded gap-4 border border-[#E2E8F0] bg-[#EEF2FF]">
      <div className="flex flex-col gap-1">
        <h1 className=" font-HelveticaNeueMedium"> Your order is ready! </h1>
        <h2 className="text-[0.875rem] w-[15.188rem]">
          Your prescription has been reviewed. Please proceed with your order
        </h2>
      </div>

      <GoToButton title="Go to order" />
    </div>
  );
};

export default OrderReady;
