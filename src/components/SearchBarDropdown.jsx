import React, { useContext, useState } from "react";
import ProductCard from "./Product/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/AppContext";
const SearchBarDropdown = ({ isHero,data , setFilteredProducts ,clickSearch}) => {
  console.log(data);
  const navigate = useNavigate();
  const toCapitaize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div
      className={`${
        isHero ? "top-12 -left-2" : "top-12 right-3"
      } absolute border gap-6 rounded p-2 w-[40.688rem] bg-white max-h-[20rem] overflow-auto scrollbar-hide z-50`}
    >
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          {
            data?.map((item,i)=>(
              
            <div onClick={() => {clickSearch(item)}} style={{cursor:'pointer'}} className="py-2 px-1 rounded bg-[#F8FAFC]" key={item.id} >
              <h1 className=" text-[0.875rem] font-HelveticaNeueLight">
              {toCapitaize(item?.productName)}
              </h1>
            </div>
            ))
          }
          {!data?.length && <div className="py-2 px-1 rounded bg-[#F8FAFC]">
            <h1 className=" text-[0.875rem] font-HelveticaNeueLight">
              No products found
            </h1>
          </div>}

          <ProductCard isDropdown={true} isSelected={false} />
          <ProductCard isDropdown={true} isSelected={false} />
        </div>

        {/* <div className="py-2 flex justify-center items-center">
          <Link className=" text-[0.75rem] text-[#031B89]">
            All search results
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SearchBarDropdown;
