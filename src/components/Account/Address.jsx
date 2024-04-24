import React, { useState } from "react";
import Dots from "../../assets/account/dots.svg";
import AddressOptions from "./AddressOptions";

const Address = ({ address ,setLoading,refetch,editAddress}) => {
  const [isOptionsModal, setIsOptionsModal] = useState(false);

  return (
    <div className="flex items-start border-b border-[#E2E8F0] justify-between py-4 px-3">
      <div className="flex flex-col gap-1">
        <div className="text-[0.875rem] font-HelveticaNeueMedium">
          <div className="flex gap-1 items-center">
            <h1 className="text-[#0F172A] uppercase">{address.label}</h1>
            <h1>|</h1>
            <h1>{address.houseNumber}</h1>
          </div>
          <h2>{address.pincode}</h2>
        </div>

        <p className="text-[0.75rem] w-[14.625rem]">
          {address.aptOrBuildingName}, {address.streetOrAreaName}, {address.city}, {address.state}, {address.pincode}
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setIsOptionsModal(true);
          }}
        >
          <img src={Dots} alt="dots icon" className="w-6 h-6" />
        </button>

        {isOptionsModal ? (
          <AddressOptions
            address={address}
            setIsOptionsModal={setIsOptionsModal}
            setLoading={setLoading}
            refetch={refetch}
            editAddress={editAddress}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Address;
