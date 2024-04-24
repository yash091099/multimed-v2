import React, { useState } from "react";
import { Link } from "react-router-dom";

import ProfilePicture from "../assets/accountProfile.png";
import Refer from "../assets/refer.svg";
import Logout from "../assets/logout.svg";

const AccountDropdown = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col border border-[#E2E8F0] w-[15.875rem] rounded p-6 bg-white gap-4 text-[#0F172A]">
      {/* account */}
      <div className="flex flex-col gap-1">
        {/* pfp */}
        <div className="flex items-center justify-between">
          <img src={ProfilePicture} alt="profile picture" className="w-8 h-8" />

          <Link className="uppercase font-HelveticaNeueMedium text-[#031B89] text-[0.75rem]">
            Edit
          </Link>
        </div>

        {/* name number email */}
        <div>
          <div className="flex gap-1 font-HelveticaNeueMedium tracking-tight">
            <h1>Lajo Lakshman</h1>
            <h1>|</h1>
            <h1>9606041618</h1>
          </div>

          <h2 className="text-[0.875rem] font-light text-[#475569]">
            mymultimeds@gmail.com
          </h2>
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-2">
        <Link
          onClick={() => {
            setIsSelected(!isSelected);
          }}
          className={`${
            isSelected ? "bg-[#EFF6FF]" : null
          } rounded p-1 hover:bg-[#F8FAFC]`}
        >
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
            My Orders
          </h1>
        </Link>

        <Link
          onClick={() => {
            setIsSelected(!isSelected);
          }}
          className={`${
            isSelected ? "bg-[#EFF6FF]" : null
          } rounded p-1 hover:bg-[#F8FAFC]`}
        >
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
            My 
          </h1>
        </Link>

        <Link
          onClick={() => {
            setIsSelected(!isSelected);
          }}
          className={`${
            isSelected ? "bg-[#EFF6FF]" : null
          } rounded p-1 hover:bg-[#F8FAFC]`}
        >
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
            My Addresses
          </h1>
        </Link>

        <Link
          onClick={() => {
            setIsSelected(!isSelected);
          }}
          className={`${
            isSelected ? "bg-[#EFF6FF]" : null
          } rounded p-1 hover:bg-[#F8FAFC]`}
        >
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
            My Prescription
          </h1>
        </Link>

        <Link
          onClick={() => {
            setIsSelected(!isSelected);
          }}
          className={`${
            isSelected ? "bg-[#EFF6FF]" : null
          } rounded p-1 hover:bg-[#F8FAFC]`}
        >
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">Support</h1>
        </Link>
      </div>

      {/* footer */}
      <div className="flex flex-col gap-2">
        {/* line */}
        <div className="w-[3.25rem] border-b border-[#A9B5FF]" />

        <div className="flex justify-between">
          {/* refer a friend */}
          <button className="flex gap-1 items-center">
            <img src={Refer} alt="refer icon" className="w-4 h-4" />
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium">
              Refer a friend
            </h1>
          </button>

          {/* logout */}
          <button className="flex gap-1 items-center">
            <img src={Logout} alt="logout icon" className="w-4 h-4" />
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium">Logout</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
