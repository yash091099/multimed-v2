import React, { useContext, useRef, useState } from "react";
import ProfileInput from "../components/ProfileInput";
import I1 from '../assets/i1.png';
import I2 from '../assets/i2.png';


import WhiteDropdownArrow from "../assets/whiteDropdownArrow.svg";
import DeleteIcon from "../assets/delete.svg";
import Checkbox from "../components/Checkbox";
import ToggleButton from "../components/ToggleButton";
import SearchIcon from "../assets/searchIcon.svg";
import MenuAddPlus from "../assets/menu-add-plus.svg";
import MenuAddPlusWhite from "../assets/menu-add-plus-white.svg";
import Warning from "../components/Warning";
import ImageIcon from "../assets/image-icon.svg";
import Star from "../assets/star.svg";
import ContentManagement from "../components/ContentManagement";
import ProductCard from "../components/ProductCard";
import Context from "../context/AppContext";
import StockDetailsPopUp from "../components/StockDetailsPopUp";
import AddNewStock from "../components/AddNewStock";
import DeleteProductModal from "../components/DeleteProductModal";
import RestoreProduct from "../components/RestoreProduct";
import PublishProductDropDown from "../components/PublishProductDropDown";

const ProductPage = () => {
  const fileRef = useRef(null);
  const [option, setOption] = useState(undefined);
    const [newStockModal, setNewStockModal] = useState(undefined);
    const [stockDetails, setStockDetails] = useState(undefined);
    const [deleteModal, setDeleteModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
  const [sortBy, setSortBy] = useState("All");
  const { productAddType} = useContext(Context);

  return (
    <div className="w-full p-12 flex flex-col gap-12 bg-white">
      {/* header */}
      <div className="flex flex-col gap-4">
        {/* your inventory */}
        <div className="flex justify-between">
          {/* heading */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-HelveticaNeueBold text-[#0F172A]">
              Dolonex DT
            </h1>

            <h2 className="text-[#64748B] text-xs font-HelveticaNeueItalic">
              Created by Sanjay R (You) on 09th December 2023
            </h2>
          </div>

          {/* buttons */}
          <div className="flex gap-1 items-center h-12">
          {productAddType !== 2 && 
          // <button className="flex justify-between py-3 px-4 w-[15.5rem] bg-[#031B89] rounded items-center h-full">
          //     <h1 className=" font-HelveticaNeueMedium text-white">
          //       Publish this product
          //     </h1>
          //     <img
          //       src={WhiteDropdownArrow}
          //       alt="dropdown arrow"
          //       className="w-6 h-6"
          //     />
          //   </button>
             <PublishProductDropDown setOption={setOption}/>
            }

            {productAddType == 2 ? <button className="text-sm font-HelveticaNeueMedium text-[#031B89] flex justify-center py-3 px-4 w-[172px] bg-white border border-[#031B89] rounded items-center h-full" onClick={()=>{setSaveModal(true)}}>
              Restore
            </button> : <button className="text-sm font-HelveticaNeueMedium text-[#031B89] flex justify-between py-3 px-4 w-fit bg-white border border-[#031B89] rounded items-center h-full">
              Archive this product
            </button>}

            <button className="p-2" onClick={()=>{setDeleteModal(true)}}>
              <img src={DeleteIcon} alt="delete icon" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* general info */}
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
          General Information
        </h1>

        {/* inputs */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-6 items-center">
            <ProfileInput
              title="Product name"
              // value="Dolonex DT"
              important
              big
              wide
              // disabled
            />

            {/* checkbox */}
            <div className="flex gap-2 items-center">
              <Checkbox />
              <h1>Needs Prescription</h1>
            </div>
          </div>

          <div className="flex gap-6">
            <ProfileInput
              title="Assign Product Category"
              value="Painkillers"
              important
              big
              wide
              dropdownField
              disabled
            />

            <ProfileInput
              title="Product Composition"
              // value="Piroxicam (20mg)"
              important
              big
              wide
              // disabled
            />
          </div>

          <div className="flex gap-6">
            <ProfileInput
              title="Storage Instructions?"
              // value="PainkillersStore below 30C"
              big
              wide
              // dropdownField
              // disabled
            />

            <ProfileInput
              title="Country of Origin"
              // value="India"
              big
              wide
              // disabled
            />
          </div>
        </div>
      </div>

        {/* stock management */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
            Stock management
          </h1>

          <div className="flex gap-4 ">
            {/* searchbar */}
            <div className="w-[19.625rem] rounded border border-[#CBD5E1] bg-white py-0.5 px-2">
              <div className="p-2 flex gap-2 items-center">
                <img src={SearchIcon} alt="search icon" className="w-6 h-6" />

                <input
                  type="text"
                  placeholder="Search for manufacturers"
                  className="placeholder:text-[#94A3B8] text-sm focus:outline-none"
                />
              </div>
            </div>

            <button className="flex gap-2 items-center py-2 px-3 rounded border border-[#031B89] bg-white" onClick={()=>setNewStockModal(true)}>
              <img src={MenuAddPlus} alt="plus" className="w-6 h-6" />

              <h1 className="text-sm font-HelveticaNeueMedium text-[#031B89]" >
                Add Product Stock
              </h1>
            </button>
          </div>
        </div>

        {/* no products */}
        {/* <Warning warning="No Products available" /> */}

        {/* products grid */}
        <div className="grid md:grid-cols-2 gap-[24px]">
            <ProductCard setStockDetails={setStockDetails} />
            <ProductCard setStockDetails={setStockDetails} />
            <ProductCard setStockDetails={setStockDetails} />
            <ProductCard setStockDetails={setStockDetails} />
        </div>
      </div>

      {/* discount management */}
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
          Discount Management
        </h1>

        <div className="flex justify-between">
          <h1 className="font-HelveticaNeueBold text-[#000000]">
            Enable Discount for Product
          </h1>
          <ToggleButton permission={true} />
        </div>
          <div className="grid md:grid-cols-2 gap-[24px] mb-[24px]">
            <div>
                <p className='flex gap-[4px] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Select Discount coupon</p><span className="text-red-500">*</span></p>
                <select className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full'><option>ABCDEFJGI30%039%</option></select>
            </div>
            <div>
                <p className='flex gap-[4px] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Discount Expiry</p><span className="text-red-500">*</span></p>
                <input className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full' type='email' placeholder='12/11/2023, 11:59 PM' disabled/>
            </div>
        </div>
      </div>

      {/* product images */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-HelveticaNeueBold text-[#0F172A]">
              Product Images
            </h1>

            <h2 className="text-sm text-[#0F172A]">
            Star the primary Image for the product. Select upto 10 images
              (jpg,png,jpeg)
            </h2>
          </div>

          <button className="h-12 text-sm font-HelveticaNeueMedium text-[#031B89] flex gap-2 items-center py-2 px-3 rounded border border-[#031B89] bg-white" onClick={()=>{fileRef.current.click();}}>
            Upload Product Images
          </button>
          <input type="file" accept="image/*"   className="hidden" ref={fileRef} />
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative w-[14.125rem] h-[13.938rem] flex items-center justify-center bg-[#F1F5F9] rounded p-2">
            <img src={I1} alt="image icon" />

            {/* <div className="absolute top-2 right-2 p-1 bg-white rounded">
              <img src={ImageIcon} alt="image icon" className="w-6 h-6" />
            </div> */}
          </div>
          <div className="relative w-[14.125rem] h-[13.938rem] flex items-center justify-center bg-[#F1F5F9] rounded p-2">
            <img src={I2} alt="image icon"/>

            {/* <div className="absolute top-2 right-2 p-1 bg-white rounded">
              <img src={ImageIcon} alt="image icon" className="w-6 h-6" />
            </div> */}
          </div>
          <div className="relative w-[14.125rem] h-[13.938rem] flex items-center justify-center bg-[#F1F5F9] rounded p-2">
            <img src={I2} alt="image icon"/>

            {/* <div className="absolute top-2 right-2 p-1 bg-white rounded">
              <img src={ImageIcon} alt="image icon" className="w-6 h-6" />
            </div> */}
          </div>
          <button className="rounded-full bg-[#7487FF] p-3 w-12 h-12" onClick={()=>{fileRef.current.click();}}>
            <img src={MenuAddPlusWhite} alt="plus" />
          </button>
        </div>
      </div>

      {/* content management */}
      <ContentManagement />
      {stockDetails && <StockDetailsPopUp setStockDetails={setStockDetails}/> }
      {newStockModal && <AddNewStock setNewStockModal={setNewStockModal}/> }
      {deleteModal && <DeleteProductModal setDeleteModal={setDeleteModal} />}
      {saveModal && <RestoreProduct setSaveModal={setSaveModal} />}
    </div>
  );
};

export default ProductPage;
