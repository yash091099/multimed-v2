// CouponCardNew.jsx

import React, { useState } from "react";
import CouponCardLogo from "../assets/cart/couponCardIcon.svg";
import DropDownIcon from "../assets/cart/dropDownIcon.svg";
import DropUpIcon from "../assets/cart/dropUpIcon.svg";
import { useNavigate } from "react-router-dom";

const CouponCardNew = ({ coupon, applyCoupon }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex w-[400px] flex-col gap-2 bg-white border-b border-[#CBD5E1] py-6 px-3 text-[#0F172A]">
      <img src={CouponCardLogo} alt="coupon card icon" className="w-8 h-8" />

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">{coupon.code}</h1>
          <h2 className="text-[0.74rem] text-[#475569]">{coupon.description}</h2>
        </div>

        <div>
          <button
            onClick={() => {
              applyCoupon(coupon);
              navigate('/cart');
            }}
            className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]"
          >
            Apply
          </button>
        </div>
      </div>

      {/* <div className="flex items-center border-b border-[#94A3B8] w-fit">
        <h1 className="text-[0.75rem] text-[#94A3B8]">Terms and Conditions</h1>
        <button onClick={() => setIsDropdown(!isDropdown)}>
          {isDropdown ? (
            <img src={DropUpIcon} alt="cross" className="w-4 h-4" />
          ) : (
            <img src={DropDownIcon} alt="cross" className="w-4 h-4" />
          )}
        </button>
      </div> */}

      {/* {isDropdown && (
        <ul className="flex flex-col list-disc text-[#475569] leading-[0.781rem] text-[0.625rem] font-HelveticaNeueLight">
          {coupon.terms.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default CouponCardNew;
