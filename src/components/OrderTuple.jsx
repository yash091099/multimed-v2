import React, { useState } from "react";
import menuButton from '../assets/menuButton.svg';
import { useNavigate } from "react-router-dom";
import CancelOrderModal from "./CancelOrderModal";
import PrescriptionApprovalModal from "./PrescriptionApprovalModal";

export default function OrderTuple(props) {
    const [cancelOrderModal, setCancelOrderModal] = useState(false);
    const [approveModal, setApproveModal] = useState(false);
    const [menuPopup, setMenuPopup] = useState(false);
    const [reorderModal, setReorderModal] = useState(false);
    const navigate = useNavigate();
    const item = props.item;
  return (
    <div>
      <div
        className="cursor-pointer flex justify-between text-[#334155] text-[14px] font-[500] leading-[17.5px] px-[48px] py-[24px] border-t border-[#E2E8F0]"
        key={item.orderId}
        onClick={() => {}}
      >
        <div className="flex flex-col gap-[4px] flex-1 text-left">
          <p>{item.orderId}</p>
          <p>{item.cost}</p>
        </div>
        <div className="flex flex-col gap-[4px] flex-1 text-left">
          <p>{item.date}</p>
          <p>{item.time}</p>
        </div>
        <p className="flex-1 text-left">{item.pincode}</p>
        <div className="flex flex-col gap-[4px] flex-1 text-left">
          <p>{item.name}</p>
          <p>
            {item.phoneNumber} | {item.emailId}
          </p>
        </div>
        {props.orderType === 0 && (
          <div className="flex justify-center items-center flex-1 text-left">
            <button className="text-white bg-[#031B89] py-[12px] px-[4px] w-[109px] rounded-[4px]" onClick={()=>setApproveModal(true)}>
              Approve
            </button>
          </div>
        )}
        {props.orderType === 1 && (
          <div className="flex justify-between items-center flex-1 text-left">
            {" "}
            <p>--</p>
            <div className="relative">
                <img src={menuButton} alt="Menu Button" onClick={() =>{ props.setMenuId(item.orderId); setMenuPopup(prev => !prev)}} />
                {menuPopup && props.menuId === item.orderId && <div className="flex flex-col gap-[4px] absolute top-5 right-4 bg-white p-[8px] border border-[#E2E8F0] rounded-[4px] w-[131px] shadow-sm">
                    <button className="text-[10px] leading-[12.5px] font-HelveticaNeueNormal h-[24px] px-[6px] text-left" onClick={()=> navigate('/home/orders/order-details')}>View Order</button>
                    <button className="text-[10px] leading-[12.5px] font-HelveticaNeueNormal h-[24px] px-[6px] text-left bg-[#F8FAFC]" onClick={()=>{setCancelOrderModal(true); setMenuPopup(false)}}>Cancel Order</button>
                </div>}
            </div>
          </div>
        )}
        {props.orderType === 2 && (
          <div className="flex justify-center items-center flex-1 text-left">
            <button className="text-white bg-[#031B89] py-[12px] px-[4px] w-[109px] rounded-[4px]" onClick={()=>setReorderModal(true)}>
              Reorder
            </button>
          </div>
        )}
      </div>
      {cancelOrderModal && <CancelOrderModal setCancelOrderModal={setCancelOrderModal} /> }
      {approveModal && <PrescriptionApprovalModal setApproveModal={setApproveModal} />}
      {reorderModal && <div className='fixed top-0 left-0 right-0 bottom-0'>
                    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>setReorderModal(false)}></div>
                    <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
                        <h1 className="text-[16px] font-[500] leading-[20px]">Reorder?</h1>
                        <p className="text-[12px] font-[400] leading-[15px]">This will mark the order as pending order</p>
                        <div className="flex">
                            <button className="flex-1 text-white bg-[#031B89] px-[16px] py-[8px] rounded-[4px]" onClick={() =>setReorderModal(false)}>Reorder</button>
                            <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setReorderModal(false)}>Cancel</button>
                        </div>
                    </div>
            </div>}
    </div>
  );
}
