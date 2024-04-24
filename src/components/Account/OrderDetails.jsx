import React, { useState } from "react";
import moment from "moment";
import OrderItemCard from "./OrderItemCard";
import Coupons from "../Cart/Coupons";
import PrescriptionUpload from "../Cart/PrescriptionUpload";
import Bill from "../Cart/Bill";
import DeliveringTo from "../Cart/DeliveringTo";
import { useLocation, useNavigate } from 'react-router-dom';
import CancelledIcon from "../../assets/account/cancelled.svg";

const OrderDetails = ({
  orderStatus,
  setProducts,
  setNeedingProducts,
  products,
  needingProducts,
}) => {
  const navigate=useNavigate()
  const location = useLocation();
  const stateFromSource = location.state;

  console.log('cart page');
  console.log(stateFromSource);
  const [isUploaded, setIsUploaded] = useState(false);

  const renderProducts = () => {
    const divElements = [];
    for (let i = 0; i < products; i++) {
      divElements.push(
        <OrderItemCard setProducts={setProducts} products={products} />
      );
    }
    return divElements;
  };

  const renderNeedingProducts = () => {
    const divElements = [];
    for (let i = 0; i < needingProducts; i++) {
      divElements.push(
        <OrderItemCard
        prescriptionRequired
          products={needingProducts}
          setProducts={setNeedingProducts}
        />
      );
    }
    return divElements;
  };

  return (
    <div className="w-full flex flex-col items-center py-12 px-[6.25rem] gap-[1.25rem]">
      <div className="w-full flex flex-col">
        {/* order status */}
        <div
          className={`${
            orderStatus === "cancelled" ? "bg-[#FEF2F2]" : null
          } flex gap-2 bg-[#F1F5F9] py-3 px-6`}
        >
          {/* cancelled icon */}
          {orderStatus === "cancelled" ? (
            <img src={CancelledIcon} alt="cancelled icon" />
          ) : null}

          <h1 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
            {orderStatus === "Arriving"
              ? "Order on the way : Expected to arrive by 3pm, 11 Sep"
              : null}
            {orderStatus === "Delivered"
              ? "Order Delivered on : 13th September"
              : null}
            {orderStatus === "Arriving" ? "This order was cancelled" : null}
          </h1>
        </div>

        {/* order id and details */}
        <div className="flex items-center w-full border-b border-[#CBD5E1] bg-white justify-between py-4 px-6 text-[#0F172A]">
          {/* order id */}
          <h1 className="font-HelveticaNeueMedium">12399102XDJJ</h1>

          {/* data and items */}
          <div className="flex gap-6">
            <div>
              <h1 className="text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">
                Date of order
              </h1>
              <h2 className="text-[0.75rem] font-medium">
                {moment().format("Do MMM YYYY")}
              </h2>
            </div>

            <div>
              <h1 className="text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">
                Total No items
              </h1>
              <h2 className="text-[0.75rem] font-medium">{stateFromSource?.cartItems?.length}</h2>
            </div>
          </div>

          {/* invoice button */}
          <button className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
            Download Invoice
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between">
        {/* Items */}
        <div className=" flex flex-col w-[53.5rem] gap-4">
          {/* items needing prescription */}
          <div className="w-full flex flex-col pb-8 gap-4 border-b border-[#E2E8F0]">
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium capitalize text-[#475569]">
              PRESCRIPTION ITEMS
            </h1>

            <div className="w-full flex flex-col gap-2">
              {/* <OrderItemCard isPrescription isOrdered />
              <OrderItemCard isPrescription isOrdered /> */}
              {
                stateFromSource?.cartItems.length>0 &&
                (
                  stateFromSource?.cartItems.map((item,i)=>(
                    item.prescriptionRequired ?
                    (
                      <OrderItemCard isOrdered  dataObj={item} key={i} prescriptionRequired/>
                    ):(
                      (
                        <h1 className="text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">No Prescription Items</h1>
                    )
                    )
                    
                  ))
                )
                
              }
            </div>
          </div>

          {/* products */}
          <div className="flex flex-col pb-8 gap-4 border-b border-[#E2E8F0]">
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium capitalize text-[#475569]">
              PRODUCTS
            </h1>

            <div className="flex flex-col gap-2">
              {
                stateFromSource?.cartItems.length>0 &&
                (
                  stateFromSource.cartItems.map((item,i)=>(
                    !item.prescriptionRequired ?
                    (
                      <OrderItemCard isOrdered  dataObj={item} key={i}/>
                    ):(
                      (
                        <h1 className="text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">No Products</h1>
                    )
                    )
                    
                  ))
                )
                
              }
              {/* <OrderItemCard isOrdered />
              <OrderItemCard isOrdered />
              <OrderItemCard isOrdered />
              <OrderItemCard isOrdered /> */}
            </div>
          </div>
        </div>

        {/* Prescription */}
        <div className="w-[26.875rem] pt-8 rounded">
          {/* <Coupons /> */}

          <PrescriptionUpload
            isUploaded={isUploaded}
            setIsUploaded={setIsUploaded}
            isOrdered={true}
          />

          <Bill totalMrp={stateFromSource?.MrpCost} totalSp={stateFromSource?.totalSP}/>

          <DeliveringTo
            isAddressSelected
            isAddressInvalid={true}
            isOrdered={true}
          />

          <div className="py-4 flex flex-col gap-2">
            <button onClick={()=>{navigate("/track-order")}} className="w-full rounded p-4 text-white bg-[#031B89] font-HelveticaNeueMedium">
              Track your order
            </button>

            <button className="w-full rounded p-4 text-[#031B89] bg-white border border-[#031B89] font-HelveticaNeueMedium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
