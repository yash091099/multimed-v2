import React from "react";

import LightArrow from "../assets/product/rightArrowLightIcon.svg";
import DarkArrow from "../assets/product/rightArrowDarkIcon.svg";

const ProductInformation = ({ item, isActive, setIsActive }) => {
  console.log(item)
  const onClick = () => {
    setIsActive(item.id);
  };

  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer justify-between items-center gap-1 py-0.5 px-3 text-[0.875rem] border-b border-[#E2E8F0] rounded ${
        isActive === item.id ? "text-white bg-[#7487FF]" : null
      }`}
    >
      <h1>{item?.Heading}</h1>
      <img
        src={isActive === item.id ? LightArrow : DarkArrow}
        className="h-[1.5rem] w-[1.5rem]"
      />
    </div>
  );
};

export default ProductInformation;
