import React, { useContext, useRef, useState } from "react";

import CompareProductsCard from "./CompareProductsCard";
import SampleProductImage from "../assets/sampleProduct.png";
import LeftArrowActive from "../assets/leftArrowActive.svg";
import RightArrowActive from "../assets/rightArrowActive.svg";
import RightArrowInactive from "../assets/rightArrowInactive.svg";
import LeftArrowInactive from "../assets/leftArrowInactive.svg";

import ProductImage from "../assets/product/productImage.png";

import data from "../data";
import { useNavigate } from "react-router-dom";
import Context from "../context/AppContext";

const CompareProducts = ({ title, subtitle, description, isViewProducts }) => {
  const { setSelectedProduct } = useContext(Context);
  const navigate = useNavigate();
  const ref = useRef(null);

  const [isStart, setIsStart] = useState(true);

  const ScrollToRight = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
    setIsStart(false);
  };

  const ScrollToLeft = (scrollOffset) => {
    ref.current.scrollLeft -= scrollOffset;
    setIsStart(true);
  };

  return (
    <div className="flex flex-col py-12 pl-[6.25rem] gap-4 bg-white mb-4">
      {/* Index */}
      <div className="flex gap-4">
        <div className="w-[6.438rem] h-[34rem] text-[0.875rem] text-[#64748B] leading-[1.094rem]">
          <h1 className="h-[1.125rem] ml-2 mt-[3.3rem]">Name</h1>
          <h1 className="h-[1.125rem] ml-2 mt-[2rem]">Image</h1>
          <h1 className="h-[1.125rem] ml-2 mt-[8.45rem]">
            Chemical Composition
          </h1>
          <h1 className="h-[1.125rem] ml-2 mt-[3.1rem]">Pricing</h1>
          <h1 className="h-[1.125rem] ml-2 mt-[2rem]">Manufacturer</h1>
          <h1 className="h-[1.125rem] ml-2 mt-[2rem] mb-[6.75rem]">Arrival</h1>
        </div>

        {/* Carousel */}
        <div
          ref={ref}
          className="grid grid-flow-col gap-4 overflow-hidden scrollbar-hide"
        >
          {data.map(item=>(
            <CompareProductsCard
              name={item.Name}
              discount="20"
              image={item["Product Image"][0]}
              composition={item.Composition}
              pricing="34 Rs per sheet"
              manufacturer={item.Brand}
              ETATime="1 pm"
              ETADay="Today"
              gotoProduct={()=>{setSelectedProduct(item)}}
            />
          ))}
          {/* <CompareProductsCard
            name="Name of the Product"
            discount="20"
            image={ProductImage}
            composition="Piroxicam (20mg), Piroxicam (20mg), Piroxicam (20mg)"
            pricing="34 Rs per sheet"
            manufacturer="Pfizer Ltd"
            ETATime="1 pm"
            ETADay="Today"
            isCostlier
          />
          <CompareProductsCard
            name="Name of the Product"
            discount="20"
            image={ProductImage}
            composition="Piroxicam (20mg), Piroxicam (20mg), Piroxicam (20mg)"
            pricing="34 Rs per sheet"
            manufacturer="Pfizer Ltd"
            ETATime="1 pm"
            ETADay="Today"
          />
          <CompareProductsCard
            name="Name of the Product"
            discount="20"
            image={ProductImage}
            composition="Piroxicam (20mg), Piroxicam (20mg), Piroxicam (20mg)"
            pricing="34 Rs per sheet"
            manufacturer="Pfizer Ltd"
            ETATime="1 pm"
            ETADay="Today"
            isCostlier
          /> */}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex gap-1">
        <button onClick={() => ScrollToLeft(3000)} className="cursor-pointer">
          <img src={isStart ? LeftArrowInactive : LeftArrowActive} />
        </button>
        <button onClick={() => ScrollToRight(2000)} className="cursor-pointer">
          <img src={isStart ? RightArrowActive : RightArrowInactive} />
        </button>
      </div>
    </div>
  );
};

export default CompareProducts;
