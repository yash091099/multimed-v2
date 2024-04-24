import React from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import AddCategoryModal from "./AddCategoryModal";
import ArrowDown from "../assets/arrowDown.svg";

const DateRangeSelector = ({ setRange }) => {
  return (
    <Menu as="div" className="w-full relative inline-block">
      <Menu.Button className="flex justify-between align-middle text-center text-[#64748B] w-full h-full bg-white border border-[#E2E8F0] rounded py-2 px-3">
        <p>Choose Date Range</p><img src={ArrowDown} alt="down arrow" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-full bg-white border border-[#E2E8F0] p-2 flex flex-col gap-2 rounded">
        <Menu.Item className="bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeue text-left" onClick={()=>{setRange('This Week')}}>
              This Week
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeue text-left" onClick={()=>{setRange('This Month')}}>
              This Month
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeue text-left" onClick={()=>{setRange('Last 3 Month')}}>
              Last 3 Month
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeue text-left" onClick={()=>{setRange('Last 6 Month')}}>
              Last 6 Month
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeue text-left" onClick={()=>{setRange('This Year')}}>
              This Year
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeue text-left" onClick={()=>{setRange('Custom')}}>
              Custom
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default DateRangeSelector;
