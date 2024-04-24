import React from "react";

import Dots from "../assets/dots.svg";
import { Link } from "react-router-dom";

const DepartmentCard = ({ title, users, info,department }) => {
  return (
    <div className=" rounded-lg p-4 border border-[#DBEAFE] bg-white flex flex-col justify-between h-[78px]">
      <div className="w-full flex justify-between">
        <div className="flex gap-1 items-center">
          <h1 className="text-[18px] leading-[22.5px] capitalize font-HelveticaNeueMedium text-[#0F172A]">
            {title}
          </h1>

          <div className="h-1.5 w-1.5 rounded-full bg-[#E2E8F0]" />

          <h2 className="text-[16px] text-[#475569] leading-[20px]">{users} users</h2>
        </div>

        <Link className="pointer-cursor" to="/home/users/edit-department" title="Edit Department" state={department}>
            <img src={Dots} alt="dots" className="w-6 h-6" />
        </Link>
      </div>

      <p className="text-[14px] text-[#475569] leading-[17.5px] font-HelveticaNeueItalic">
        {info}
      </p>
    </div>
  );
};

export default DepartmentCard;
