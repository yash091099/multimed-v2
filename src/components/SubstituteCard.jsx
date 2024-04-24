import React, { useState } from "react";

import ProductImage from "../assets/product/productImage.png";
import AddIcon from "../assets/product/addIcon.svg";
import { Link } from "react-router-dom";

const SubstituteCard = ({ isCostlier, name, price, discount }) => {
  const [productCount, setProductCount] = useState(0);

  return (
    <div className="flex flex-col justify-between p-2 gap-2 rounded bg-white text-[#0F172A]">
      {/* Substitute description */}
      <Link className="flex gap-1">
        <div className="flex justify-between items-center gap-2">
          <img
            src={ProductImage}
            className="rounded h-[3.625rem] w-[3.625rem] object-cover"
          />
          <div className="flex flex-col gap-1">
            <h1 className="w-[14rem] text-[0.875rem] font-HelveticaNeueMedium leading-[1.094rem]">
              {name}
            </h1>
            <h2 className="text-[0.75rem]">15 tabs</h2>
          </div>
        </div>
      </Link>

      {/* Price */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center gap-1 font-HelveticaNeueMedium">
          <h1 className="text-[0.875rem]">Rs {price}</h1>
          {isCostlier ? (
            <h2 className="text-[0.625rem] text-[#DC2626]">
              {discount}% COSTLIER
            </h2>
          ) : (
            <h2 className="text-[0.625rem] text-[#65A30D]">
              {discount}% CHEAPER
            </h2>
          )}
        </div>

        {/* buttons */}
        {productCount === 0 ? (
          <button
            onClick={() => {
              setProductCount(productCount + 1);
            }}
            className="flex flex-col w-fit bg-[#7487FF] p-1 gap-1 rounded"
          >
            <img src={AddIcon} className="w-[1.5rem] h-[1.5rem]" />
          </button>
        ) : (
          <div className=" min-h-[2.1rem] flex items-center gap-1">
            <button
              onClick={() => {
                setProductCount(productCount === 0 ? 0 : productCount - 1);
              }}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>-</h1>
            </button>

            <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[1.75rem]">
              <h1>{productCount}</h1>
            </div>

            <button
              onClick={() => {
                setProductCount(productCount + 1);
              }}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>+</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubstituteCard;
