import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import mapimage from "../assets/mapimage.png";
import { useQuery, useMutation, gql } from "@apollo/client";

import LocationIcon from "../assets/Location.svg";
import HomeImage from "../assets/Home.svg";
import WorkImage from "../assets/Work.svg";
import Context from "../context/AppContext";



export default function CustomerProfile() {
  const location=useLocation();
  const userDetails=localStorage.getItem("userDetails")?JSON.parse(localStorage.getItem("userDetails")):{};
  const [others, setOthers] = useState(false);


  const {
    showCouponPopUp,
    setShowCouponPopUp,
    showAddressPopUp,
    setShowAddressPopUp,
    showDeletePopUp,
    setShowDeletePopUp,
    saveModal, setSaveModal
  } = useContext(Context);
  const pathname = window.location.pathname.split("/");
  const [currentPathname, setCurrentPathname] = useState(
    pathname[pathname.length - 1]
  );
  const navigate = useNavigate();
  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-[48px] m-[48px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-[700] leading-[30px]">
              Customer Details
            </h1>
            <div className="flex gap-[8px]">
             {/* {currentPathname === "customer_profile" && <button className="text-white text-[16px] font-[500] leading-[20px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]" onClick={()=>setSaveModal(true)}>
                Save Changes
              </button>} */}
              <button className="text-[#EF4444] text-[16px] font-[500] leading-[20px] border-[2px] border-[#EF4444] px-[16px] py-[12px] rounded-[4px]" onClick={() => setShowDeletePopUp('customer')}>
                Delete Customer
              </button>
            </div>
          </div>
          <div className="flex text-[12px] font-normal font-[500] leading-[15px]">
            <p
              className={`cursor-pointer text-center py-[8px] min-w-[125px] ${
                currentPathname === "customer_profile"
                  ? "border-b-[3px] border-[#031B89]"
                  : "text-[#64748B] bg-[#F8FAFC]"
              }`}
              onClick={() => {
                navigate("/home/customer_profile");
                const pathname = window.location.pathname.split("/");
                setCurrentPathname(pathname[pathname.length - 1]);
              }}
            >
              Profile
            </p>
            <p
              className={`cursor-pointer text-center py-[8px] min-w-[125px] ${
                currentPathname === "orders"
                  ? "border-b-[3px] border-[#031B89]"
                  : "text-[#64748B] bg-[#F8FAFC]"
              }`}
              onClick={() => {
                navigate("/home/customer_profile/orders");
                const pathname = window.location.pathname.split("/");
                setCurrentPathname(pathname[pathname.length - 1]);
              }}
            >
              Order
            </p>
            <p
              className={`cursor-pointer text-center py-[8px] min-w-[125px] ${
                currentPathname === "prescription"
                  ? "border-b-[3px] border-[#031B89]"
                  : "text-[#64748B] bg-[#F8FAFC]"
              }`}
              onClick={() => {
                navigate("/home/customer_profile/prescription");
                const pathname = window.location.pathname.split("/");
                setCurrentPathname(pathname[pathname.length - 1]);
              }}
            >
              Prescription
            </p>
            <p
              className={`cursor-pointer text-center py-[8px] min-w-[125px] ${
                currentPathname === "wallet_and_coupons"
                  ? "border-b-[3px] border-[#031B89]"
                  : "text-[#64748B] bg-[#F8FAFC]"
              }`}
              onClick={() => {
                navigate("/home/customer_profile/wallet_and_coupons");
                const pathname = window.location.pathname.split("/");
                setCurrentPathname(pathname[pathname.length - 1]);
              }}
            >
              Wallet & coupons
            </p>
          </div>
        </div>
        <Outlet />
      </div>
      {showCouponPopUp && (
        <>
          <div
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/30"
            onClick={() => setShowCouponPopUp(false)}
          ></div>
          <div className="fixed flex-col top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] w-[724px] bg-white rounded-[8px]">
            <div className="flex justify-between items-center p-[16px]">
              <div>
                <h1 className="text-[16px] font-[700] leading-[20px]">
                  Customer Coupons
                </h1>
                <p className="text-[#64748B] text-[14px] font-[400] leading-[17.5px]">
                  All coupons created for customer are one time only.
                </p>
              </div>
              <div
                className="cursor-pointer text-xl"
                onClick={() => setShowCouponPopUp(false)}
              >
                &times;
              </div>
            </div>
            <div className="flex flex-col gap-[16px] px-[16px]">
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Select coupon type
                </p>
                <div className="border border-[#64748B] p-[12px] rounded-[4px]">
                  <select className="outline-none w-full">
                    <option>Cash</option>
                    <option>%age coupon</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                  Coupon Name (auto generated)
                </p>
                <input
                  className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                  type="text"
                  placeholder="Coupon name"
                  disabled
                />
              </div>
              <div className="flex gap-[16px]">
                <div className="flex-1">
                  <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                    Set discount:
                  </p>
                  <input
                    className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                    type="text"
                    placeholder="Descount price"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]">
                    Select Expiry date:{" "}
                  </p>
                  <input
                    className="outline-none w-full p-[12px] border border-[#64748B] rounded-[4px]"
                    type="date"
                  />
                </div>
              </div>
              <button
                className="bg-[#031B89] text-white text-[16px] font-[500] leading-[20px] px-[4px] py-[12px] w-full mb-[16px] rounded-[4px]"
                onClick={() => setShowCouponPopUp(false)}
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
   
      {showDeletePopUp && (
        <>
          <div
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/30"
            onClick={() => setShowDeletePopUp(undefined)}
          ></div>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
            <h1 className="text-[16px] font-[500] leading-[20px]">Delete this {showDeletePopUp}?</h1>
            <p className="text-[12px] font-[400] leading-[15px]">This is a permanent action and cannot be undone.</p>
              <div className="flex">
                  <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={() => setShowDeletePopUp(undefined)}>Delete</button>
                  <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setShowDeletePopUp(undefined)}>Cancel</button>
              </div>
          </div>
        </>
      )}
      {saveModal && (
        <>
          <div
            className="fixed top-0 left-0 bottom-0 right-0 bg-black/30"
            onClick={() => saveModal(false)}
          ></div>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px] w-[256px]">
            <h1 className="text-[16px] font-[500] leading-[20px]">Save changes?</h1>
            <p className="text-[12px] font-[400] leading-[15px]">Save customer details</p>
              <div className="flex">
                  <button className="flex-1 text-white bg-[#031B89] px-[16px] py-[8px] rounded-[4px]" onClick={()=>{setSaveModal(false); navigate('/home/customers')}}>Save</button>
                  <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setShowDeletePopUp(undefined)}>Cancel</button>
              </div>
          </div>
        </>
      )}
    </div>
  );
}
