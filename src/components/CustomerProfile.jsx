import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { toast } from "react-toastify";
import Context from "../context/AppContext";

const DELETE_CUSTOMER = gql`
  mutation deleteUser($input: ID!) {
    deleteUser(input: $input) {
      status
      message
    }
  }
`;

export default function CustomerProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : {};
  const { showCouponPopUp, setShowCouponPopUp, showDeletePopUp, setShowDeletePopUp, saveModal, setSaveModal ,setRefetchCustomers,refetchCustomers} = useContext(Context);
  const pathname = window.location.pathname.split("/");
  const [currentPathname, setCurrentPathname] = useState(pathname[pathname.length - 1]);

  const [deleteCustomer, { data, loading, error }] = useMutation(DELETE_CUSTOMER, {
    onCompleted: data => {
      if (data.deleteUser.status === "SUCCESS") {
        navigate("/home/customers");
        setRefetchCustomers(!refetchCustomers)
        toast.success('Customer deleted successfully');
      }
    }
  });

  const handleDelete = (customerId) => {
    deleteCustomer({ variables: { input: customerId } });
  };

  return (
    <div className="bg-white w-full">
      <div className="flex flex-col gap-[48px] m-[48px]">
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-between">
            <h1 className="text-[24px] font-[700] leading-[30px]">
              Customer Details
            </h1>
            <div className="flex gap-[8px]">
              <button className="text-[#EF4444] text-[16px] font-[500] leading-[20px] border-[2px] border-[#EF4444] px-[16px] py-[12px] rounded-[4px]" onClick={() => handleDelete(userDetails.id)}>
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
                setCurrentPathname("customer_profile");
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
                setCurrentPathname("orders");
              }}
            >
              Orders
            </p>
            <p
              className={`cursor-pointer text-center py-[8px] min-w-[125px] ${
                currentPathname === "prescription"
                  ? "border-b-[3px] border-[#031B89]"
                  : "text-[#64748B] bg-[#F8FAFC]"
              }`}
              onClick={() => {
                navigate("/home/customer_profile/prescription");
                setCurrentPathname("prescription");
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
                setCurrentPathname("wallet_and_coupons");
              }}
            >
              Wallet & Coupons
            </p>
          </div>
        </div>
        <Outlet />
      </div>
      {showCouponPopUp && (
        <div className="fixed inset-0 bg-black/30" onClick={() => setShowCouponPopUp(false)}>
          <div className="fixed flex flex-col gap-[16px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[724px] bg-white rounded-[8px] p-[16px]">
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] font-[700]">Customer Coupons</h1>
              <button className="text-xl" onClick={() => setShowCouponPopUp(false)}>&times;</button>
            </div>
            <div className="flex flex-col gap-[16px] px-[16px]">
              <div className="border border-[#64748B] p-[12px] rounded-[4px]">
                <select className="w-full outline-none">
                  <option>Cash</option>
                  <option>%age coupon</option>
                </select>
              </div>
              <input className="w-full p-[12px] border border-[#64748B] rounded-[4px]" placeholder="Coupon name" disabled />
              <div className="flex gap-[16px]">
                <input className="w-full p-[12px] border border-[#64748B] rounded-[4px]" placeholder="Discount price" />
                <input className="w-full p-[12px] border border-[#64748B] rounded-[4px]" type="date" />
              </div>
              <button className="w-full bg-[#031B89] text-white px-[4px] py-[12px] rounded-[4px]" onClick={() => setShowCouponPopUp(false)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeletePopUp && (
        <div className="fixed inset-0 bg-black/30" onClick={() => setShowDeletePopUp(undefined)}>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] p-[24px]">
            <h1 className="text-[16px] font-[500]">Delete this {showDeletePopUp}?</h1>
            <p className="text-[12px]">This is a permanent action and cannot be undone.</p>
            <div className="flex">
              <button className="flex-1 bg-[#DC2626] text-white px-[16px] py-[8px] rounded-[4px]" onClick={() => setShowDeletePopUp(undefined)}>Delete</button>
              <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setShowDeletePopUp(undefined)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {saveModal && (
        <div className="fixed inset-0 bg-black/30" onClick={() => setSaveModal(false)}>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] p-[24px] w-[256px]">
            <h1 className="text-[16px] font-[500]">Save changes?</h1>
            <p className="text-[12px]">Save customer details</p>
            <div className="flex">
              <button className="flex-1 bg-[#031B89] text-white px-[16px] py-[8px] rounded-[4px]" onClick={() => { setSaveModal(false); navigate('/home/customers'); }}>Save</button>
              <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setShowDeletePopUp(undefined)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
