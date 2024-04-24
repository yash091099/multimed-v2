import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import NavigationMenu from "./NavigationMenu";

import Referral from "../assets/referralsIcon.svg";
import Phone from "../assets/phoneIcon.svg";

const Navlinks = () => {
  const [isMedicineModal, setIsMedicineModal] = useState(false);
  let userDetails =localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):"";
  console.log(userDetails)

  const onLogoutClick=(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    window.location.reload();
  }
  return (
    <div className="xl:flex hidden h-12 justify-between px-8 py-2 bg-white border-b border-slate-300">
      <ul className="flex gap-8 py-1 items-center text-[#475569] font-normal">
        <li
          onMouseEnter={() => {
            setIsMedicineModal(true);
          }}
          onMouseLeave={() => {
            setIsMedicineModal(false);
          }}
          className="relative"
        >
          <Link to="#" className="p-1 cursor-pointer">
            Medicines
          </Link>

          {isMedicineModal ? <NavigationMenu /> : null}
        </li>

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

      <div className="flex items-center gap-12 py-1 px-4 font-HelveticaNeueMedium">
        <Link to="/refferal" className="flex gap-1 items-center">
          <img
            src={Referral}
            alt="referral icon"
            className="w-[1.5rem] h-[1.5rem]"
          />
          <h1>Your Refferals</h1>
        </Link>
        <div className="dropdown">
        <Link className="flex gap-1 items-center">
          <img src={Phone} alt="phone icon" className="w-[1.5rem] h-[1.5rem]" />
          {
            userDetails && userDetails.contactNumber ?
            (
              <h1>{userDetails.contactNumber}</h1>
            )
            :(
              <h1>99XXXXXXXX</h1>
            )
          }
        </Link>
       
    {/* <button className="dropbtn">Dropdown 
      <i className="fa fa-caret-down"></i>
    </button> */}
    {
      userDetails &&
      (
<div className="dropdown-content">
      <a onClick={onLogoutClick}>Logout</a>
    </div>
      )
    }
    
  </div> 
      </div>
    </div>
  );
};

export default Navlinks;
