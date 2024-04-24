import React, { useEffect, useRef, useState } from "react";
import AddressCard from "./AddressCard";
import PincodesModal from "./PincodesModal";
import { gql, useQuery } from "@apollo/client";
import Cross from "../assets/crossIcon.svg";
import { useNavigate } from "react-router-dom";
const GET_MY_ADDRESSES = gql`
  query getMyAddresses {
    getMyAddresses {
      status
      message
      addresses {
        id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        pincode
        state 
        label 
      }
    }
  }
`;
const PincodeModal = ({
  addresses,
  onAddressSelect,
  setisdropdown,
  setIsPincodeModal,
  isDropdown,
}) => {
  const [pincodesModal, setPincodesModal] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  let pincodeModalRef = useRef();
  const navigate =useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_MY_ADDRESSES);
  useEffect(()=>{
    refetch()
    console.log(data?.getMyAddresses?.addresses,'-----------------------------------------------------------------------------')
  },[])
  useEffect(() => {
    let handler = (e) => {
      if (!pincodeModalRef.current.contains(e.target)) {
        setIsPincodeModal(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const filteredAddresses = data?.getMyAddresses?.addresses?.filter(address =>
    address.pincode.includes(searchTerm)
  );

  return (
    <div
        ref={pincodeModalRef}
        className={`${!isDropdown ? "w-[31.25rem] p-4" : "w-[16.625rem] p-2"
            } absolute z-50 flex flex-col gap-3 border border-[#E2E8F0]  top-[60px]  bg-white rounded`}
    >
        {!isDropdown ? (
            <div className="flex justify-between items-center py-2">
                <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
                    Select Pincode or Address
                </h1>
                <button
                    onClick={() => {
                        setIsPincodeModal(false);
                    }}
                >
                    <img src={Cross} alt="cross Icon" className="w-6 h-6" />
                </button>
            </div>
        ) : null}

        <input
            // onFocus={() => {
            //     setPincodesModal(true);
            // }}
            // onBlur={() => {
            //     setPincodesModal(false);
            // }}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter your pincode here"
            className="bg-[#F8FAFC] border border-[#E2E8F0] py-1 px-1.5 placeholder:text-[0.75rem] rounded placeholder:text-[#94A3B8] focus:outline-none"
        />

      
            <div className="relative flex flex-col gap-2">
                {isDropdown ? (
                    <div className="flex justify-between text-[0.75rem]">
                        <h1>Select an Address :</h1>
                        <button className="text-[#031B89]" onClick={() => {setisdropdown(false);navigate('/account');}}>+ Add New</button>
                    </div>
                ) : null}

               {filteredAddresses?.length ? <div className="flex flex-col gap-1">
                    {filteredAddresses.map((item, idx) => (
                        <AddressCard
                            key={idx}
                            item={item}
                            isSelected={isSelected}
                            setIsSelected={setIsSelected}
                            onAddressSelect={()=>onAddressSelect(item)}
                        />
                    ))}
                </div>:<p className="text-[0.75rem] font-HelveticaNeueMedium">No Address Found</p>}

                {!isDropdown ? (
                    <button onClick={() => navigate('/account')} className="text-[0.75rem] font-HelveticaNeueMedium text-[#7487FF]">
                        Edit or Add new
                    </button>
                ) : null}

                {pincodesModal ? (
                    <PincodesModal
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        isDropdown={isDropdown}
                    />
                ) : null}
            </div>
       
    </div>
);

};

export default PincodeModal;
