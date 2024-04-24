import React from "react";

import { Link, NavLink } from "react-router-dom";

import Referral from "../assets/referralsIcon.svg";
import Phone from "../assets/phoneIcon.svg";

const MobileMenu = ({ isMenu }) => {
  return (
    <div
      className={
        isMenu ? "lg:hidden h-screen bg-opacity-40 bg-black" : "hidden"
      }
    >
      <div className="absolute flex py-4 px-8 flex-col gap-8 right-0 w-[15rem] bg-white h-screen">
        <ul className="flex flex-col gap-4 py-1 items-start text-[#0F172A] font-HelveticaNeueMedium">
          <Link>
            <li className="p-1 cursor-pointer">Login</li>
          </Link>
          <Link href="product">
            <li className="p-1 cursor-pointer">Cart</li>
          </Link>
        </ul>

        <ul className="flex flex-col gap-4 py-1 items-start text-[#475569] font-normal">
          <Link href="product">
            <li className="p-1 cursor-pointer">Medicines</li>
          </Link>
          <Link>
            <li className="p-1 cursor-pointer">Devices</li>
          </Link>
          <Link>
            <li className="p-1 cursor-pointer">Sort by Condition</li>
          </Link>
          <Link>
            <li className="p-1 cursor-pointer">Essentials</li>
          </Link>
          <Link>
            <li className="p-1 cursor-pointer">Over The Counter</li>
          </Link>
          <Link>
            <li className="p-1 cursor-pointer">Other</li>
          </Link>
        </ul>

        <div className="flex flex-col items-start gap-6 py-1 font-HelveticaNeueMedium text-[#0F172A]">
          <Link className="flex gap-1 items-center">
            <img
              src={Referral}
              alt="referral icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
            <h1>Your Refferals</h1>
          </Link>
          <Link className="flex gap-1 items-center">
            <img
              src={Phone}
              alt="phone icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
            <h1>99XXXXXXXX</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
