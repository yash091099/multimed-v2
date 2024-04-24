import React from "react";

import ProductInformation from "./ProductInformation";
import AuthorCard from "./AuthorCard";

import AuthorImage from "../assets/product/authorImage.png";

const Overview = ({ productInfoData, isActive, setIsActive }) => {
  const selectedPointAuthor= productInfoData.filter((item, index) => {
    return item?.id === isActive;
  });
  console.log(selectedPointAuthor,'selectedPointAuthor')
  
  console.log(productInfoData)
  return (
    <div className="flex flex-col justify-between py-6 w-[14.188rem] h-[36.188rem] rounded bg-white">
      {/* Heading */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between px-3">
          <h1>Overview</h1>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-3 w-[14.188rem]">
          {productInfoData.map((item, idx) => {
            return (
              <ProductInformation
                key={idx}
                item={item}
                isActive={isActive}
                setIsActive={setIsActive}
              />
            );
          })}
        </div>
      </div>

      {/* Author */}
     { <AuthorCard
        name={selectedPointAuthor[0]?.author}
        // occupation="MD. Pharmacology"
        image={AuthorImage}
      />}
    </div>
  );
};

export default Overview;
