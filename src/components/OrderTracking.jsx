import React from "react";
import BackArrow from "../assets/backArrow.svg";
import WhiteCheck from '../assets/whiteCheck.svg';
export default function OrderTracking() {
  return (
    <div className="flex flex-col gap-[48px]">
      <div className="flex gap-[24px] items-center bg-white">
        <div>
          <img src={BackArrow} alt="back" />
        </div>
        <div className="w-full border-b border-[#64748B]">
          <div className="px-[24px] py-[12px] bg-[#F1F5F9]">
            Order on the way: Expected to arrive by 3pm, 11 sep
          </div>
          <div className="flex justify-between px-[24px] py-[12px]">
            {/* <div className='flex items-center gap-[4px]'> */}
            <h1 className="text-[16px] font-HelveticaNeueMedium leading-[20px]">
              12993382JXD
            </h1>
            {/* </div> */}
            <div className="flex gap-[24px]">
              <div>
                <p className="text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic">
                  Date of Order
                </p>
                <h1 className="text-[12px] font-[500] leading-[15px]">
                  11th September 2023
                </h1>
              </div>
              <div>
                <p className="text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic">
                  Total No items
                </p>
                <h1 className="text-[12px] font-[500] leading-[15px]">10</h1>
              </div>
              <div>
                <p className="text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic">
                  Order Total:
                </p>
                <h1 className="text-[12px] font-[500] leading-[15px]">
                  Rs 129 (Paid)
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px] px-[24px] py-[16px] bg-white border border-[#CBD5E1] rounded-[8px] shadow-sm">
        <h1>Track your order</h1>
        <div>
            <div className="flex gap-[4px] items-center">
                <img className="bg-[#84CC16] p-[8px] rounded-[50%]" src={WhiteCheck} alt="check" />
                <div>
                    <h1>Order Placed</h1>
                    <p>at 3:40 pm on 13th September 2023</p>
                </div>
            </div>
            <div className="border-l-2 border-dashed border-[#94A3B8] h-[71px]">

            </div>
            <div className="flex gap-[4px] items-center">
                <img className="bg-[#CBD5E1] p-[8px] rounded-[50%]" src={WhiteCheck} alt="check" />
                <div>
                    <h1>Tracking Status title 1</h1>
                    <p>Tracking status details</p>
                </div>
            </div>
            <div className="border-l-2 border-dashed border-[#94A3B8] h-[71px]">

            </div>
            <div className="flex gap-[4px] items-center">
                <img className="bg-[#CBD5E1] p-[8px] rounded-[50%]" src={WhiteCheck} alt="check" />
                <div>
                    <h1>Order Placed</h1>
                    <p>at 3:40 pm on 13th September 2023</p>
                </div>
            </div>
            <div className="border-l-2 border-dashed border-[#94A3B8] h-[71px]">

            </div>
            <div className="flex gap-[4px] items-center">
                <img className="bg-[#CBD5E1] p-[8px] rounded-[50%]" src={WhiteCheck} alt="check" />
                <div>
                    <h1>Order Placed</h1>
                    <p>at 3:40 pm on 13th September 2023</p>
                </div>
            </div>
            <div className="border-l-2 border-dashed border-[#94A3B8] h-[71px]">

            </div>
            <div className="flex gap-[4px] items-center">
                <img className="bg-[#84CC16] p-[8px] rounded-[50%]" src={WhiteCheck} alt="check" />
                <div>
                    <h1>Order Delivered!</h1>
                    <p>at 3:40 pm on 13th September 2023</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
