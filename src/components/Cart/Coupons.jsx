import React, { useState } from "react";

import CouponIcon from "../../assets/cart/couponIcon.svg";
import CrossIcon from "../../assets/crossIcon.svg";
import RightArrow from "../../assets/rightArrowActive.svg";

import CouponModal from "./CouponModal";

const Coupons = () => {
 
  const [isApplied, setIsApplied] = useState(true);
  const [isCouponModal, setIsCouponModal] = useState(false);

  const handleClose = () => {
    setIsCouponModal(false);
  };

  return (
    <div className="flex flex-col border-b border-dashed border-[#CBD5E1] px-3 py-6 gap-4 bg-white text-[#0F172A]">
      <div className="flex gap-1 items-center">
        <img src={CouponIcon} className="h-6 w-6" />
        <h1 className=" font-HelveticaNeueMedium">Coupons</h1>
      </div>

      {isApplied ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Applied : WELCOME30
            </h1>
            <button
              onClick={() => {
                setIsApplied(false);
              }}
            >
              <img src={CrossIcon} alt="cross icon" className="w-6 h-6" />
            </button>
          </div>

          <h2 className="text-[0.75rem]">
            You save{" "}
            <span className="text-[#4D7C0F]  font-HelveticaNeueMedium">
              Rs. 35.99
            </span>
          </h2>
        </div>
      ) : (
        <div className="text-[0.875rem] font-HelveticaNeueMedium flex items-center justify-between border-y border-[#E2E8F0] py-3 px-4 gap-2">
          <h1>Apply Promo Code</h1>
          <button
            onClick={() => {
              setIsCouponModal(true);
            }}
          >
            <img src={RightArrow} />
          </button>
        </div>
      )}

      {isCouponModal ? (
        <CouponModal handleClose={handleClose} isLogin={false} />
      ) : null}
    </div>
  );
};

export default Coupons;
