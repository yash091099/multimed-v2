import React from "react";

import Coupon from "../assets/product/couponIcon.svg";
import { CardGiftcard } from "@material-ui/icons";

const OfferCoupon = (selectedProduct) => {
  console.log(selectedProduct?.selectedProduct)
  return (
    <div className="flex items-center w-full gap-2 bg-[#F7FEE7] text-[#65A30D] font-HelveticaNeueMedium  text-[0.875rem] p-2 rounded">
      <CardGiftcard  className="w-[1.5rem] h-[1.5rem]" />
      <h1>Get {selectedProduct?.selectedProduct?.coupon?.percentage||0}% OFF Using Code {selectedProduct?.selectedProduct?.coupon?.code}</h1>
    </div>
  );
};

export default OfferCoupon;
