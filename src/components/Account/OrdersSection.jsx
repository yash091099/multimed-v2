import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductImage from "../../assets/cart/deviceImage.png";
import CheckIcon from "../../assets/product/tickIcon.svg";
import { useQuery,gql } from "@apollo/client";
import Loader from "../loader";

const GET_PROCESSING_ORDER = gql`
query{getProcessingOrders{
  status
  message
 
  orders{
    id
    status
    eta
    dateOfOrder
    noOfItems
    total
    userId
    couponId
  
    user{
      id
      fullName
      prescriptions{
        id
        url
        isApproved
        
      }
      email
      contactNumber
      
    }
    address{
      id
      pincode
    }
    coupon{
      id
      code
      percentage
    }
  }
}}`;

const GET_CANCELLED_ORDER = gql`
query{getCancelledOrders{
  status
  message
  
  orders{
    id
    status
    eta
    dateOfOrder
    noOfItems
    total
    userId
    couponId
   
    user{
      id
      fullName
      prescriptions{
        id
        url
        isApproved
        
      }
      email
      contactNumber
      
    }
    address{
      id
      pincode
    }
    coupon{
      id
      code
      percentage
    }
  }
}}`;

const GET_ORDER_HISTORY = gql`
query{getOrderHistory{
  status
  message

  orders{
    id
    status
    eta
    dateOfOrder
    noOfItems
    total
    userId
    couponId
   
    user{
      id
      fullName
      prescriptions{
        id
        url
        isApproved
        
      }
      email
      contactNumber
      
    }
    address{
      id
      pincode
    }
    coupon{
      id
      code
      percentage
    }
  }
}}`;

const OrdersSection = ({ isActive }) => {
  const [loading, setLoading] = useState(true);
  const [listingData, setListingData] = useState([]);



  const { data: processingOrderData, refetch:refetchProcessing } = useQuery(GET_PROCESSING_ORDER, {
  
    onCompleted: (data) => {
      setLoading(false)
    },
    onError: (err) => {
      setLoading(false)
    }
  });
  const { data: cancelledOrderData, refetch:refetchCancelled } = useQuery(GET_CANCELLED_ORDER, {
  
    onCompleted: (data) => {
      setLoading(false)
    },
    onError: (err) => {
      setLoading(false)
    }
  });
  const { data: orderHistory, refetch:refetchHistory } = useQuery(GET_ORDER_HISTORY, {
  
    onCompleted: (data) => {
      setLoading(false)
    },
    onError: (err) => {
      setLoading(false)
    }
  });
  useEffect(() => {
    if(isActive){
      refetchProcessing();
      refetchCancelled();
      refetchHistory();
    }
    
  },[isActive])

  useEffect(() => {
    if(isActive === "processing"){
      setListingData(processingOrderData?.getAllProcessingOrders?.orders)
    }else if(isActive === "cancelled"){
      setListingData(cancelledOrderData?.getAllCancelledOrders?.orders)
    }
    else if(isActive === "history"){
      setListingData(orderHistory?.getAllOrderHistory?.orders)
      console.log(orderHistory?.getAllOrderHistory?.orders, "orderHistory")
    }else{
      setListingData([])
    }
    
  },[processingOrderData, cancelledOrderData, orderHistory,isActive])
  console.log(isActive, "isActive");
function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const year = date.getFullYear();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const month = monthNames[date.getMonth()];

  // Determine the ordinal indicator
  const ordinal = ['th', 'st', 'nd', 'rd'][
    (day % 100) >= 10 && (day % 100) <= 20
      ? 0
      : (day % 10) < 4
      ? (day % 10)
      : 0
  ];

  return `${day}${ordinal} ${month} ${year}`;
}

  return (
    <>
    {listingData?.map((item)=>{
      return(
      <div className="flex flex-col gap-4 rounded-lg bg-white border border-[#E2E8F0] pb-4 shadow-order-section text-[#0F172A]">
      {loading && <Loader />}
      {/* header */}
      <div className="flex border-b border-[#CBD5E1] justify-between py-4 px-6">
        {/* id and details button */}
        <div className="w-full items-center flex gap-4">
          <h1 className="font-medium">{item?.userId}</h1>

      
        </div>

        {/* date and items */}
        <div className="min-w-[13rem] flex gap-6">
          <div className="min-w-[5rem] flex flex-col">
            <h1 className="text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">
              Date of order
            </h1>
            <h2 className="text-[0.75rem] font-HelveticaNeueMedium">
             {formatDate(item?.dateOfOrder)}
            </h2>
          </div>

          <div className="flex flex-col">
            <h1 className=" text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">
              Total No items
            </h1>
            <h2 className="text-[0.75rem] font-HelveticaNeueMedium">{item?.noOfItems}</h2>
          </div>
        </div>
      </div>

      {/* items */}
      <div className="flex items-center">
        {/* <div className="grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-2 px-6">
          {ordersData.map((item, idx) => {
            return (
              <div className="w-[12rem] flex gap-2 items-center">
                <img
                  src={item.image}
                  alt="product image"
                  className="w-1.813rem] h-[1.813rem]"
                />

                <h1 className="text-[0.875rem] text-[#475569]">{item.name}</h1>
              </div>
            );
          })}
        </div> */}
        {/* <h1 className="text-[0.875rem] text-[#64748B]">+ 2 more items</h1> */}
      </div>

      <div className="px-6 flex justify-between">
        <div className="flex gap-6 items-center">
          <h1 className="text-[0.875rem]  font-HelveticaNeueMedium text-[#1E293B]">
            Order total : Rs {item?.total||'--'}
          </h1>

          <h1 className="text-[0.875rem] font-HelveticaNeueMedium text-[#1E293B]">
            Delivering to : <span className="text-[#7487FF]">{item?.address?.label||'xxxxxx'}</span>
          </h1>
        </div>

    
      </div>
    </div>
      )
    })}
    {!listingData?.length && <div className="text-center py-10">No {isActive} orders found</div>}
    </>
  );
};

export default OrdersSection;
