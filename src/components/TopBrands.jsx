import React from "react";

import TopBrandsCard from "./TopBrandsCard";

import OmronImage from "../assets/topBrands/omron.png";
import bdLogo from "../assets/topBrands/bd-logo.svg";
import JohnsonAndJohnson from "../assets/topBrands/JohnsonAndJohnson.svg";
import Cetaphil from "../assets/topBrands/Cetphil.png";
import Dabur from "../assets/topBrands/Dabur.webp";
import Meditech from "../assets/topBrands/Meditech.png";
import Nivea from "../assets/topBrands/Nivea.png";

const TopBrands = ({ title }) => {
  return (
    <div className="flex flex-col justify-center bg-white px-[6.25rem] py-14 mb-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-HelveticaNeueBold mb-8 #0F172A">
          {title}
        </h1>
        {/* <a href="" className="font-HelveticaNeueMedium text-[#7487FF]">
          View All
        </a> */}
      </div>
      <div className="grid xl:grid-cols-7 md:grid-cols-4 grid-cols-2 gap-6">
        <TopBrandsCard title="Dabur" image={Dabur} />
        <TopBrandsCard title="Johnson & Johnson" image={JohnsonAndJohnson} />
        <TopBrandsCard title="Omron" image={OmronImage} />
        <TopBrandsCard title="Becton Dickinson" image={bdLogo} />
        <TopBrandsCard title="Nivea" image={Nivea} />
        <TopBrandsCard title="Cetaphil" image={Cetaphil} />
        <TopBrandsCard title="Meditech" image={Meditech} />
      </div>
    </div>
  );
};

export default TopBrands;
