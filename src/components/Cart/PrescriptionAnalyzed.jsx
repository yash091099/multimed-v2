import React from "react";

import Analyze from "../../assets/cart/analyze.svg";
import ActiveDot from "../../assets/cart/activeDot.svg";
import InactiveDot from "../../assets/cart/inactiveDot.png";
import { Link } from "react-router-dom";

const PrescriptionAnalyzed = () => {
  return (
    <div className="flex justify-center py-12 px-[6.25rem]">
      <div className="flex flex-col justify-center items-center w-full rounded-2 gap-4 py-12 bg-white">
        <div className="flex flex-col gap-4 pb-8 items-center">
          <img src={Analyze} alt="character" className="w-[15rem] h-auto" />

          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Your prescription is being analysed
            </h1>
            <h2 className="text-center text-[0.875rem] text-[#475569] w-[14.438rem]">
              Give us a second. We will Notify you when your order is ready
            </h2>
          </div>

          <div className="flex gap-1">
            <img src={ActiveDot} alt="active dot" />
            <img src={InactiveDot} alt="inactive dot" />
            <img src={InactiveDot} alt="inactive dot" />
            <img src={InactiveDot} alt="inactive dot" />
          </div>
        </div>

        <Link to="/">
          <p className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
            Browse products
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PrescriptionAnalyzed;
