import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddCategoryModal from "./AddCategoryModal";

const AddNewDropdown = ({ setIsAddSegment ,segments,refetchSegments,refetchCategories}) => {

  const[categoryModal,setCategoryModalOpen]=useState(false);
  return (
    <>
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="align-middle text-center w-[15.5rem] h-full rounded py-3 px-4 bg-[#031B89] text-white">
        + Add new
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-[15.5rem] bg-white border border-[#E2E8F0] p-2 flex flex-col gap-2 rounded">
        <Menu.Item className="menuItem border-b-[0.5px] border-[#E2E8F0] mt-2">
          {({ active }) => (
            <button className="font-HelveticaNeueMedium text-center " onClick={()=>{setIsAddSegment(true)}}>
              Segment
            </button>
          )}
        </Menu.Item>

        <Menu.Item className="menuItem ">
          {({ active }) => (
            <>
              <button
                onClick={()=>setCategoryModalOpen(true)}
                className="font-HelveticaNeueMedium text-center"
              >
                Category
              </button>
            </>
          )}
        </Menu.Item>

        <Menu.Item className="menuItem border-t-[0.5px] border-[#E2E8F0] mb-1">
          {({ active }) => (
            <Link
              to="/home/add-product"
              className="font-HelveticaNeueMedium text-center"
            >
              Product
            </Link>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
    {categoryModal?<AddCategoryModal refetchCategories={refetchCategories} refetchSegments={refetchSegments} categoryModalOpen={categoryModal} setCategoryModalOpen={setCategoryModalOpen} segments={segments}/>:null}

    </>
  );
};

export default AddNewDropdown;
