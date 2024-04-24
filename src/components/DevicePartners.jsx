import React from "react";

import TopBrandsCard from "./TopBrandsCard";

import abbott from "../assets/devicePartners/abott.png";
import BDLogo from "../assets/devicePartners/bd-logo.svg";
import BeatO from "../assets/devicePartners/Beat.webp";
import DrMorepen from "../assets/devicePartners/DrMorepen.png";
import DrTrust from "../assets/devicePartners/DrTrust.png";
import medtronic from "../assets/devicePartners/medtronic.avif";
import oneTouch from "../assets/devicePartners/OneTouch.jpg";


const DevicePartners = ({ title }) => {
 
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
        <TopBrandsCard title="Abbott" image={abbott} />
        <TopBrandsCard title="Becton Dickinson" image={BDLogo} />
        <TopBrandsCard title="BeatO" image={BeatO} />
        <TopBrandsCard title="Dr Morepen" image={DrMorepen} />
        <TopBrandsCard title="Dr Trust" image={DrTrust} />
        <TopBrandsCard title="Medtronic" image={medtronic} />
        <TopBrandsCard title="OneTouch" image={oneTouch} />
      </div>
    </div>
  );
};

export default DevicePartners;
