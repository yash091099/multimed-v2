import React, { useState } from "react";

import PrimaryHighlight from "../PrimaryHighlight";

import DeviceImage from "../../assets/cart/deviceImage.png";
import Delete from "../../assets/cart/deleteIcon.svg";

const OrderItemCard = ({
  prescriptionRequired,
  setProducts,
  products,
  needingProducts,
  setNeedingProducts,
  dataObj,
}) => {
  console.log('datObj is');
  console.log(dataObj);
  const [productCount, setProductCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div
      className={
        isHidden
          ? "hidden"
          : "w-full flex flex-col rounded-2 gap-4 border border-[#E2E8F0] bg-white py-4 px-6 shadow-cartItem"
      }
    >
      {prescriptionRequired ? <PrimaryHighlight /> : null}

      {/* Product */}
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <img
            src={DeviceImage}
            className="rounded h-[3.625rem] w-[3.625rem] object-cover"
          />

          <div className="flex flex-col gap-1">
            <h1 className="w-[14rem] text-[0.875rem] font-HelveticaNeueMedium">
             {dataObj? dataObj.productName:""  } X {dataObj? dataObj.count:0}
            </h1>
            <h2 className="text-[0.875rem] text-[#475569]">
              1 strip : 15 capsules
            </h2>
          </div>
        </div>

        {/* Manufacturer and composition */}
        <div className="flex gap-4">
          {/* Manufacturer */}
          <div className="w-[7.188rem]">
            <h1 className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B]">
              Manufacturer
            </h1>
            <div>
              <div className="w-fit border-b border-[#0F172A]">
                <h2 className="text-[0.625rem] font-HelveticaNeueItalic text-[#0F172A]">
                  {/* Pfizer Ltd */}
                  {dataObj? dataObj.Manufacturer:""}
                </h2>
              </div>
            </div>
          </div>
          {/* Composition*/}
          <div className="w-[7.188rem]">
            <h1 className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B]">
              Composition
            </h1>
            <div>
              <div className="w-fit border-b border-[#0F172A]">
                <h2 className="text-[0.625rem] font-HelveticaNeueItalic text-[#0F172A]">
                  {/* Piroxicam (20mg) */}
                  {dataObj? dataObj.Composition:""}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <p className="text-[0.75rem] text-[#94A3B8]">
                Rs <span className="line-through">{dataObj? dataObj.maxRetailPrice:""}</span>
              </p>
              <h2 className="font-HelveticaNeueMedium text-[#031B89] text-[0.875rem]">
                Rs {dataObj? dataObj.sp:""}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
