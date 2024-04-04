import React, { useState } from 'react';
import shareIcon from '../assets/ShareIcon.svg';
export default function CancelOrderModal(props) {
    const [deleteModal, setDeleteModal] = useState(false);
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>props.setCancelOrderModal(false)}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[12px] bg-white w-[724px] py-[16px]'>
            <div className='flex justify-between px-[16px] py-[8px]'>
                <h1 className='text-[16px] font-HelveticaNeueBold leading-[20px]'>Cancel Order</h1>
                <button className='text-[24px]' onClick={()=>props.setCancelOrderModal(false)}>&times;</button>
            </div>
            <div className='flex flex-col gap-[8px] px-[16px] py-[12px]'>
                <p>Order Details</p>
                <div className='flex'>
                    <div className='flex-1'>
                        <p className='flex gap-[4px]'><p className='text-[16px] font-HelveticaNeueMedium leading-[20px]'>12399102XDJJ</p><span className='flex gap-[4px] items-center'><p className='text-[#7487FF] text-[12px] font-HelveticaNeueMedium font-[15px]'>View details</p><img src={shareIcon}  alt="share icon" /></span></p>
                        <p className='text-[#334155] text-[14px] leading-[17.5px] font-HelveticaNeueMedium'>Rs 2345</p>
                    </div>
                    <div className='flex-1'>
                        <p className='text-[16px] font-HelveticaNeueMedium leading-[20px]'>Sanjay R</p>
                        <p className='text-[#334155] text-[14px] leading-[17.5px] font-HelveticaNeueMedium'>9083880283 | sanjayr@gmail.com</p>
                    </div>
                    <div className='flex-1'>
                        <p className='text-[16px] font-HelveticaNeueMedium leading-[20px]'>Prescription</p>
                        <p className='text-[#7487FF] text-[14px] leading-[17.5px] font-HelveticaNeueBold'>View</p>
                    </div>
                </div>
                <div>
                    <p className='flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Select Reason for Cancelation</p><span className="text-red-500">*</span></p>
                    <select type="text" className='outline-none text-[14px] font-[400] leading-[17.5px] bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-full' >
                        <option>Reason A</option>
                        <option>Reason B</option>
                        <option>Reason C</option>
                    </select>
                </div>
                <div>
                    <p className='flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Select Mode of Refund</p><span className="text-red-500">*</span></p>
                    <select type="text" className='outline-none text-[14px] font-[400] leading-[17.5px] bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-full' >
                        <option>Method A</option>
                        <option>Method B</option>
                        <option>Method C</option>
                    </select>
                </div>
                <div>
                    <p className='flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Any additional comments?</p><span className="text-red-500"></span></p>
                    <textarea rows={3} className='outline-none text-[14px] font-[400] leading-[17.5px] bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-full' placeholder="sdjsdjsocop" />
                </div>
                <div className='flex justify-between'>
                    <button className='flex-1 text-[#031B89] text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] px-[16px] py-[12px] rounded-[4px]' onClick={()=>props.setCancelOrderModal(false)}>Cancel</button>
                    <button className='flex-1 text-white text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] bg-[#EF4444] px-[16px] py-[12px] rounded-[4px]' onClick={()=>{setDeleteModal(true)}}>Delete Order</button>
                </div>
            </div>
            {deleteModal && <div className='fixed top-0 left-0 right-0 bottom-0'>
                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>setDeleteModal(false)}></div>
                    <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
                        <h1 className="text-[16px] font-[500] leading-[20px]">Are you sure you want to cancel the order?</h1>
                        <p className="text-[12px] font-[400] leading-[15px]">This is a permanent action and cannot be undone. The order will be marked as “cancelled”.</p>
                        <div className="flex">
                            <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={() =>{ setDeleteModal(false); props.setCancelOrderModal(false)}}>Delete</button>
                            <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setDeleteModal(false)}>Cancel</button>
                        </div>
                    </div>
            </div>}
        </div>
    </div>
  )
}
