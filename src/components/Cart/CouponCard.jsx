import { CardGiftcard } from "@material-ui/icons";
import React, { useState } from "react";
import { FaTicketAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CouponCard = ({ isDisabled, handleClose, couponData }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate("/cart", { state: { couponData: couponData } });
    handleClose();
  };
const formatDate = (date) => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month}/${day}/${year}`;
}
  const expiryDate = new Date(couponData.expiryDate);
  const isValidExpiryDate = !isNaN(expiryDate.getTime());

  return (
    <div
      className={`${
        isDisabled && "opacity-50 bg-gray-200"
      } flex flex-col gap-2 bg-white border-b border-gray-300 py-6 px-3 text-gray-800 rounded-lg shadow-md`}
    >
      {/* Logo */}
      <CardGiftcard className="w-8 h-8 text-blue-500" />

      {/* Coupon Code and Description */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-sm font-medium">{couponData.code}</h1>
          <h2 className="text-xs text-gray-500">{couponData.description}</h2>
        </div>
        <button
          disabled={isDisabled}
          onClick={handleApplyClick}
          className="text-sm font-medium text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>

      {/* Coupon Details */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {isValidExpiryDate && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Expires: {expiryDate.toLocaleDateString()}
              </span>
            )}
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {couponData.percentage}% OFF
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
             Valid Till : {formatDate(new Date(Number(couponData.expiryDate)))}
            </span>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      {/* <div className="flex items-center border-b border-gray-300 w-fit">
        <h1 className="text-xs text-gray-500">Terms and Conditions</h1>
        <button
          onClick={() => {
            setIsDropdown(!isDropdown);
          }}
        >
          {isDropdown ? (
            <FaChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <FaChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div> */}

      {isDropdown && (
        <ul className="flex flex-col list-disc text-gray-500 text-sm">
          <li>The coupon code {couponData.code} provides a {couponData.percentage}% discount.</li>
          {isValidExpiryDate && (
            <li>The coupon expires on {expiryDate.toLocaleDateString()}.</li>
          )}
          <li>The offer cannot be redeemed for cash or combined with any other offer or promotion.</li>
          <li>For any further queries regarding the coupon or offers, please email our customer care at care@example.com.</li>
          <li>The company reserves the right to add, alter, withdraw, modify or change any or all the terms and conditions of the offer at its sole discretion, and the same shall be binding on the customer at all times.</li>
        </ul>
      )}
    </div>
  );
};

export default CouponCard;