import React, { useState } from "react";

import AdminNavLink from "./AdminNavLink";

import Logo from "../assets/footerLogo.svg";
import LogoSmall from "../assets/logo-small.svg";
import Menu from "../assets/menu-white.svg";
import OpenMenu from "../assets/open-menu.svg";
import DashboardIcon from "../assets/dashboard.svg";
import InventoryIcon from "../assets/inventory.svg";
import CustomersIcon from "../assets/customers.svg";
import OrdersIcon from "../assets/orders.svg";
import MarketingIcon from "../assets/marketing.svg";
import CouponsIcon from "../assets/coupons.svg";
import UsersIcon from "../assets/users.svg";
import NotificationsIcon from "../assets/notifications.svg";
import ExitIcon from "../assets/exit.svg";
import Profile from "../assets/user-profile.svg";
import { Link } from "react-router-dom";

const NavLinkData1 = [
  { title: "dashboard", icon: DashboardIcon },
  { title: "inventory", icon: InventoryIcon },
  { title: "customers", icon: CustomersIcon },
  { title: "orders", icon: OrdersIcon },
];

const NavLinkData2 = [
  { title: "marketing", icon: MarketingIcon },
  { title: "coupons", icon: CouponsIcon },
];

const NavLinkData3 = [
  { title: "users", icon: UsersIcon },
  { title: "notifications", icon: NotificationsIcon },
];

const AdminNav = () => {
  const [isExpanded, setisExpanded] = useState(false);
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="w-fit h-[60rem] bg-[#031B89] flex flex-col justify-between">
      <div className="py-12 px-4 flex flex-col gap-12">
        {/* Header */}
        <div
          className={`flex ${
            isExpanded ? "flex-row gap-12 items-center" : "flex-col gap-2"
          } `}
        >
          {!isExpanded && (
            <button onClick={() => setisExpanded(!isExpanded)}>
              <img
                src={isExpanded ? Menu : OpenMenu}
                alt="menu"
                className="w-6 h-6"
              />
            </button>
          )}

          {/* logo */}
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-xs font-HelveticaNeueMedium uppercase">
              {/* ADMIN */}
            </h1>

            <img
              src={isExpanded ? Logo : LogoSmall}
              alt="logo"
              className="h-[1.813rem] w-fit"
            />
          </div>

          {/* menu icon */}
          {isExpanded && (
            <button onClick={() => setisExpanded(!isExpanded)}>
              <img
                src={isExpanded ? Menu : OpenMenu}
                alt="menu"
                className="w-6 h-6"
              />
            </button>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col gap-8">
          {/* Links 1 */}
          <div className="flex flex-col border-b-[0.5px] border-[#CBD5E1] py-4 gap-4">
            {NavLinkData1.map((item, idx) => (
              <Link onClick={() => setIsActive(item.title)} to={item.title==='dashboard'?"":item.title}>
                <AdminNavLink
                  icon={item.icon}
                  title={item.title}
                  isActive={isActive}
                  isExpanded={isExpanded}
                />
              </Link>
            ))}
          </div>

          {/* Links 2 */}
          <div className="flex flex-col border-b-[0.5px] border-[#CBD5E1] py-4 gap-4">
            {NavLinkData2.map((item, idx) => (
              <Link onClick={() => setIsActive(item.title)} to={item.title}>
                <AdminNavLink
                  icon={item.icon}
                  title={item.title}
                  isActive={isActive}
                  isExpanded={isExpanded}
                />
              </Link>
            ))}
          </div>

          {/* Links 2 */}
          <div className="flex flex-col border-b-[0.5px] border-[#CBD5E1] py-4 gap-4">
            {NavLinkData3.map((item, idx) => (
              <Link onClick={() => setIsActive(item.title)} to={item.title}>
                <AdminNavLink
                  icon={item.icon}
                  title={item.title}
                  isActive={isActive}
                  isExpanded={isExpanded}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* User */}
      <div
        className={`flex ${
          isExpanded ? "flex-row w-[14.438rem]" : "flex-col items-center gap-2"
        } justify-between border-t border-white py-4 px-3`}
      >
        <div className={`flex gap-2`}>
          <img src={Profile} alt="profile" className="w-10 h-10 rounded-full" />
          <div className={!isExpanded && "hidden"}>
            <h1 className="text-sm font-HelveticaNeueMedium text-white">
              Sanjay R
            </h1>

            <h2 className="text-xs font-HelveticaNeueLight text-white">
              Operations Manager
            </h2>
          </div>
        </div>
        <button className="w-fit">
          <img src={ExitIcon} onClick={() =>{localStorage.clear();window.location.reload()}} alt="exit icon" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
