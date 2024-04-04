import React from "react";

import Dots from "../assets/dots.svg";
import { Link } from "react-router-dom";

const MedicinesCard = ({ title, products, manufacturers ,description,category}) => {
  return (
    <div className="h-[9.938rem] rounded-lg p-4 border border-[#DBEAFE] bg-white flex flex-col gap-9">
      <div className="w-full flex justify-between">
        <div className="flex gap-1 items-center">
          <h1 className="md:text-lg text-sm capitalize font-HelveticaNeueMedium text-[#0F172A]">
            {title}
          <div className="md:text-sm text-xs text-[#475569]">{description}</div>
          </h1>
          
        </div>

    
        <Link to="/home/category" state={{category:category}}>
          <button className="w-6 h-6" title="View/Edit Category">
            <img src={Dots} alt="dots" className="w-6 h-6" />
          </button>
        </Link>
      </div>

      <p className="normal-case md:text-sm text-xs text-[#475569] font-HelveticaNeueItalic">
        {products} products
      </p>
    </div>
  );
};

export default MedicinesCard;
