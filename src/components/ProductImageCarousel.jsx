import React, { useState } from "react";

import LeftArrowActive from "../assets/leftArrowActive.svg";
import RightArrowActive from "../assets/rightArrowActive.svg";
import RightArrowInactive from "../assets/rightArrowInactive.svg";
import LeftArrowInactive from "../assets/leftArrowInactive.svg";

const ProductImageCarousel = ({ image }) => {
  // Assume image is an array of arrays and we need to flatten it
  const flatImages = image.flat();
  const [slide, setSlide] = useState(0);

  // This function will determine if the navigation arrow should be active or inactive
  const isArrowActive = (direction) => {
    if (flatImages.length <= 1) {
      return false;
    }
    return direction === "left" ? slide > 0 : slide < flatImages.length - 1;
  };

  return (
    <div className="flex flex-col items-center bg-[#F8FAFC] w-[35.813rem]">
      {/* Carousel */}
      <div className="flex mt-[1.125rem] gap-1">
        <button
          onClick={() => setSlide(slide === 0 ? flatImages.length - 1 : slide - 1)}
          className="cursor-pointer"
        >
          <img src={isArrowActive("left") ? LeftArrowActive : LeftArrowInactive} alt="Previous" />
        </button>

        <div className="flex gap-4">
          {flatImages.map((item, index) => (
            <img
              key={index}
              src={item}
              className={`${index === slide ? "opacity-100" : "opacity-40"} w-[4.5rem] h-[4.438rem] object-cover rounded`}
              alt={`Product Slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setSlide(slide === flatImages.length - 1 ? 0 : slide + 1)}
          className="cursor-pointer"
        >
          <img src={isArrowActive("right") ? RightArrowActive : RightArrowInactive} alt="Next" />
        </button>
      </div>

      {/* Main image display */}
      <div className="max-w-[28.813rem] mt-[5.875rem] mb-[9.5rem]">
        {flatImages.length > 0 && (
          <img
            src={flatImages[slide]}
            alt="Product Image"
            className="object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
