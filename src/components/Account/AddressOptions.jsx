import React, { useEffect, useRef } from "react";
import { gql, useMutation } from "@apollo/client";
import {  toast } from "react-toastify";

const AddressOptions = ({ isDefault,address,setLoading,setIsOptionsModal,refetch,editAddress }) => {

  const SET_AS_DEFAULT = gql`
  mutation setAddressAsActive($ID:ID!) {
    setAddressAsActive(input:$ID ) {
      status
      message
    }
  }
`;
  const DELETE_ADDRESS = gql`
    mutation DeletePrescription($input: ID!) {
      deleteAddress(input: $input) {
        status
        message
      }
    }
  `;
const [deleteAddress] = useMutation(DELETE_ADDRESS);
const handleDelete = async (id) => {
  setLoading(true);
  try {
    await deleteAddress({ variables: { input: id } });
    refetch();
    setLoading(false);

    toast.success("Address deleted successfully.");
  } catch (error) {
    setLoading(false);
    console.error("Error deleting Address", error);
    toast.error("Error deleting Address");
  }
};
const [setAddressAsActive, { loading: otpLoading }] = useMutation(SET_AS_DEFAULT, {
    
  variables: {
    ID: address?.id
   
  },
  onCompleted: (data) => {
    console.log(address.id,'+==========+++++===++++====+++===+++===++===++++===++==')

    if (data.setAddressAsActive.status === "SUCCESS") {
   setLoading(false)
      toast.success("Set as default successfully.");
      refetch();
      

      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Error : Set Default Address ");
    }
  },
  onError: (err) => {

   setLoading(false)

    toast.error("Error : " + err?.message);

  },
});
  let optionsModalRef = useRef();
console.log(address,'is default')
  useEffect(() => {
    let handler = (e) => {
      if (!optionsModalRef.current.contains(e.target)) {
        setIsOptionsModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div
      ref={optionsModalRef}
      className="absolute right-0 top-6 bg-white flex flex-col w-[8.25rem] border border-[#E2E8F0] rounded p-2 gap-2"
    >
      {!isDefault ? (
        <button onClick={()=>{setLoading(true);setAddressAsActive(); setIsOptionsModal(false)}} className="text-left h-6 rounded text-[0.725rem] text-[#0F172A] hover:bg-[#F8FAFC]">
          Set as Default
        </button>
      ) : null}

      <button onClick={()=>{editAddress(address); setIsOptionsModal(false)}} className="text-left h-6 rounded text-[0.725rem] text-[#0F172A] hover:bg-[#F8FAFC]">
        Edit
      </button>

      <button onClick={() => {handleDelete(address?.id); setIsOptionsModal(false)}} className="text-left h-6 rounded text-[0.725rem] text-[#0F172A] hover:bg-[#F8FAFC]">
        Delete
      </button>
    </div>
  );
};

export default AddressOptions;
