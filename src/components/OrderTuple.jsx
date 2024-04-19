import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import menuButton from '../assets/menuButton.svg';
import CancelOrderModal from './CancelOrderModal';
import PrescriptionApprovalModal from './PrescriptionApprovalModal';
import { gql } from '@apollo/client';
import {toast} from 'react-toastify';
const CANCEL_ORDER = gql`
  mutation CancelOrder($input: ID!) {
    cancelOrder(input: $input) {
      status
      message
    }
  }
`;

const APPROVE_PRESCRIPTION = gql`
  mutation ApprovePrescription($input: ID!) {
    approvePrescription(input: $input) {
      status
      message
    }
  }
`;

const REORDER = gql`
  mutation Reorder($input: ID!) {
    reorder(input: $input) {
      status
      message
    }
  }
`;

export default function OrderTuple({ item, orderType, refetch }) {
  const navigate = useNavigate();
  const [cancelOrderModal, setCancelOrderModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [menuPopup, setMenuPopup] = useState(false);
  const [reorderModal, setReorderModal] = useState(false);

  const [cancelOrder] = useMutation(CANCEL_ORDER, {
    variables: { input: item.userId },
    onCompleted: () => {
        refetch();
        setCancelOrderModal(false);
        // toast.success('Order successfully cancelled!');
    },
    onError: (error) => {
        // Log the error to the console or handle it as needed
        console.error('Error cancelling order:', error);
        // Display a toast message
        toast.error('Failed to cancel order: ' + error.message);
    }
});
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

  const [approvePrescription] = useMutation(APPROVE_PRESCRIPTION, {
    variables: { input: item.userId },
    onCompleted: () => {
      refetch();
      setApproveModal(false);
    }
  });

  const [reorder] = useMutation(REORDER, {
    variables: { input: item.userId },
    onCompleted: () => {
      refetch();
      setReorderModal(false);
    }
  });

  return (
    <div className="cursor-pointer flex justify-between text-[#334155] text-[14px] font-[500] leading-[17.5px] px-[48px] py-[24px] border-t border-[#E2E8F0]">
      <div className="flex flex-col gap-[4px] flex-1 text-left">
        <p>{item?.userId}</p>
        <p>₹{item?.total.toLocaleString()}</p> {/* Adding rupee symbol and formatting number */}
      </div>
      <div className="flex flex-col gap-[4px] flex-1 text-left">
        <p>{formatDate(item?.dateOfOrder)}</p>
      </div>
      <p className="flex-1 text-left">{item?.address?.pincode||'xxxxxx'}</p>
      <div className="flex flex-col gap-[4px] flex-1 text-left">
        <p>{item?.user?.fullName||'--'}</p> {/* Placeholder for customer details */}
        <p>{item?.user?.contactNumber || '--'} | {item?.user?.email || '--'}</p>
      </div>
      {orderType === 0 && (
        <div className="flex justify-center items-center flex-1 text-left">
          <button className="text-white bg-[#031B89] py-[12px] px-[4px] w-[109px] rounded-[4px]" onClick={() => setApproveModal(true)}>
            Approve
          </button>
        </div>
      )}
      {orderType === 1 && (
        <div className="flex justify-between items-center flex-1 text-left">
          <p>--</p>
          <div className="relative">
            <img src={menuButton} alt="Menu Button" onClick={() => setMenuPopup(true)} />
            {menuPopup && <div className="flex flex-col gap-[4px] absolute top-5 right-4 bg-white p-[8px] border border-[#E2E8F0] rounded-[4px] w-[131px] shadow-sm">
              {/* <button className="text-[10px] leading-[12.5px] font-HelveticaNeueNormal h-[24px] px-[6px] text-left" onClick={() => navigate('/home/orders/order-details')}>View Order</button> */}
              <button className="text-[10px] leading-[12.5px] font-HelveticaNeueNormal h-[24px] px-[6px] text-left bg-[#F8FAFC]" onClick={() => setCancelOrderModal(true)}>Cancel Order</button>
            </div>}
          </div>
        </div>
      )}
      {orderType === 2 && (
        <div className="flex justify-center items-center flex-1 text-left">
          <button className="text-white bg-[#031B89] py-[12px] px-[4px] w-[109px] rounded-[4px]" onClick={() => setReorderModal(true)}>
            Reorder
          </button>
        </div>
      )}
      {cancelOrderModal && <CancelOrderModal setCancelOrderModal={setCancelOrderModal} cancelOrder={cancelOrder} />}
      {approveModal && <PrescriptionApprovalModal setApproveModal={setApproveModal} approvePrescription={approvePrescription} />}
      {reorderModal && (
        <div className='fixed top-0 left-0 right-0 bottom-0'>
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={() => setReorderModal(false)}></div>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
            <h1 className="text-[16px] font-[500] leading-[20px]">Reorder?</h1>
            <p className="text-[12px] font-[400] leading-[15px]">This will mark the order as pending order</p>
            <div className="flex">
              <button className="flex-1 text-white bg-[#031B89] px-[16px] py-[8px] rounded-[4px]" onClick={() => reorder()}>Reorder</button>
              <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setReorderModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
