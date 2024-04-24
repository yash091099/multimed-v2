import React from "react";

import Character from "../../assets/cart/character.svg";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex justify-center py-12 px-[6.25rem]">
      <div className="w-[49.375rem] py-12 bg-white">
        <div className="flex flex-col gap-4 pb-8 items-center">
          <img src={Character} alt="character" className="w-[11rem] h-auto" />

          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Your Cart is empty!
            </h1>
            <h2 className="text-center text-[0.875rem] text-[#475569]">
              Add products to start shopping
            </h2>
          </div>

          <Link to="/products">
            <p className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
              Browse products
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
