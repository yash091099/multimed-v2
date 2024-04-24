import React, { useState,useEffect } from "react";

import Cross from "../../assets/crossIcon.svg";
import CouponCard from "./CouponCard";
import Warning from "../../assets/cart/warning.svg";
import Login from "../Login";
import { gql,useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
const GET_COUPONS = gql`
query{getActiveCoupons{
  status
  message
  coupons{
    id
    code
    type
    percentage
    fixedAmount
    description
    expiryDate
    createdAt
    updatedAt
    associatedCategories{
      id
      categoryName
      segmentId
      categoryDescription
      segment{
        id
        segmentName
        
      }
    }
  }
}}
`;

const CouponModal = ({ isSelected, handleClose, isLogin }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [loading,setLoading]=useState(true)
  const { data } = useQuery(GET_COUPONS);
  useEffect(() => {
    if(data){
      setLoading(false)
      console.log(data?.getActiveCoupons?.coupons,'+==========+++++===++++====+++===+++===++===++++===++==')
    }
  },[data])
const navigate=useNavigate()
  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
      <div className="flex flex-col gap-3 border border-[#CBD5E1] w-[45.25rem] py-4 bg-white rounded-xl shadow-login">
        <div className="flex justify-between py-2 px-4">
          <div className="flex flex-col gap-1">
            <h1 className=" font-HelveticaNeueMedium text-[1.5rem] text-[#031B89]">Coupons and Offers</h1>
          
          </div>
          <button onClick={handleClose}>
            <img src={Cross} className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-4 gap-3">
          <div className="flex flex-col gap-2">
            {/* <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter coupon code here"
                className={`focus:outline-none w-full rounded placeholder:text-[0.625rem] py-1 placeholder:text-[#94A3B8] px-1.5 ${
                  isInvalid
                    ? "bg-[#FEF2F2] border-[#F87171]"
                    : "bg-[#F8FAFC] border-[#E2E8F0]"
                }  border `}
              />

              <button
                
                disabled={!isSelected || isInvalid}
                className={`${
                  isSelected ? "bg-[#031B89]" : "bg-[#A5B4FC]"
                } flex justify-center items-center h-[2.125rem] w-[9.375rem] text-[0.875rem] font-HelveticaNeueMedium rounded text-[white] p-4 leading-[1.25rem]`}
              >
                Apply
              </button>
            </div> */}

            {isInvalid ? (
              <div className="w-full flex gap-2 items-center text-[#DC2626] font-HelveticaNeueMedium  text-[0.75rem] p-1 rounded">
                <img src={Warning} />
                <h1>This coupon is not valid!</h1>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap2">
            {data?.getActiveCoupons?.coupons?.map((item)=>{
              return(
                <CouponCard couponData={item} handleClose={handleClose}/>
              )
            })}
            {/* <CouponCard handleClose={handleClose} />
            <CouponCard handleClose={handleClose} />
            <CouponCard handleClose={handleClose} isDisabled /> */}
          </div>
        </div>
      </div>
{loading&&<Loader/>}
      {/* {isLoginModal ? <Login /> : null} */}
    </div>
  );
};

export default CouponModal;
