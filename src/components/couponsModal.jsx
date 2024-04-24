import React, { useState } from "react";
import { gql,useQuery } from "@apollo/client";
import { useEffect } from "react";
import CouponCardNew from "./couponCardsNew";
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
const CouponsModal = ({  applyCoupon, closeModal }) => {
  const { data } = useQuery(GET_COUPONS);
  useEffect(() => {
    if(data){
      console.log(data?.getActiveCoupons?.coupons,'+==========+++++===++++====+++===+++===++===++++===++==')
    }
  },[data])
  return (
    <div className="fixed  inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h1 className="text-xl font-bold mb-4">Select a Coupon</h1>
        {data?.getActiveCoupons?.coupons.map((coupon, index) => (
          <CouponCardNew key={index} coupon={coupon} applyCoupon={applyCoupon} />
        ))}
        {!data?.getActiveCoupons?.coupons.length && <p className="text-center">No coupons available</p>}
        <button onClick={closeModal} className="mt-4 p-2 bg-gray-300 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CouponsModal;
