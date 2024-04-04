import React, { useEffect, useRef } from "react";

export default function RemoveItemModal(props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"
        onClick={() => props.setRemoveItem(false)}
      ></div>
      <div className="fixed flex flex-col gap-[16px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px] w-[724px]">
            <h1 className="text-[16px] font-HelveticaNeueBold leading-[20px]">Remove Items</h1>
            {/* <p className="text-[12px] font-[400] leading-[15px]">This is a permanent action and cannot be undone.</p> */}
            <div className="flex flex-col gap-[8px]">
                <p className="text-[#64748B] text-[12px] font-[500] leading-[15px]">UPDATED ORDER DETAILS</p>
                <div className="flex gap-[8px] items-center">
                    <div className="flex-1">
                        <h1 className="text-[16px] font-HelveticaNeueMedium leading-[20px] mb-[4px]">12399102XDJJ</h1>
                        <p className="text-[14px] font-HelveticaNeueMedium leading-[17.5px]">Rs 2345 Rs 2100</p>
                    </div>
                    <h1 className="flex-1 text-[16px] font-HelveticaNeueMedium leading-[20px]">Refund amount: Rs 345</h1>
                </div>
                <div>
                    <p className='flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Select Mode of Refund</p><span className="text-red-500">*</span></p>
                    <input type="text" className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full' placeholder="Sanjay R" />
                </div>
                <div>
                    <p className='flex gap-[4px] text-[10px] font-HelveticaNeueThin leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Any additional comments?</p><span className="text-red-500"></span></p>
                    <textarea rows="5" type="text" className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm w-full' placeholder="Sanjay R" />
                </div>
            </div>
              <div className="flex">
                  <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => props.setRemoveItem(false)}>Cancel</button>
                  <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={() => props.setRemoveItem(false)}>Initiate Refund</button>
              </div>
          </div>
    </div>
  );
}
