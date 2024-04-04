import { Menu } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import AddCategoryModal from "./AddCategoryModal";
import dropdownarrow from "../assets/ddWhite.svg";
export default function  PublishProductDropDown({ setOption,option }) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="flex justify-between w-[15.5rem] h-full rounded py-3 px-4 bg-[#031B89] text-white">
        {option?"Publish this product":"Draft this product"} <img src={dropdownarrow} alt="drop down arrow" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-[15.5rem] bg-white border border-[#E2E8F0] p-2 flex flex-col gap-2 rounded">
        <Menu.Item className="border-b-[0.5px] border-[#E2E8F0] bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeueMedium text-left" onClick={()=>{setOption(1)}}>
              Publish this product
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="border-b-[0.5px] border-[#E2E8F0] bg-white py-2 px-1.5">
          {({ active }) => (
            <button className="font-HelveticaNeueMedium text-left" onClick={()=>{setOption(0)}}>
              Draft this product
            </button>
          )}
        </Menu.Item>

      </Menu.Items>
    </Menu>
  );
};