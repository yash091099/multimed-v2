import React, { useState,useEffect ,useRef} from "react";
import Address from "./Address";
import AddAddressModal from "../AddAddressModal";
import {  toast } from 'react-toastify';
import Loader from "../loader";
import 'react-toastify/dist/ReactToastify.css';
import { gql, useQuery } from "@apollo/client";

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

const MyAddresses = () => {
  const modalRef = useRef(null);

  const [isAddAddress, setIsAddAddress] = useState(false);
  const [loadingg, setLoading] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_MY_ADDRESSES);
  useEffect(()=>{
    refetch()
  },[])
  const [editAddress, setEditAddress] = useState();
  useEffect(()=>{
console.log(editAddress,'{{{{{{{{[[[[[{{{{[[[[{{{[[[[{{{[[[[[{[[[[[{{[[[[') 
if(editAddress){

  setIsAddAddress(true);
}
 },[editAddress])
  if (loading || loadingg) return <Loader />;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="flex flex-col gap-4">

      {/* header */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[1.125rem] font-HelveticaNeueMedium text-[#0F172A]">
          My Addresses
        </h1>

        {/* add button */}
        <button
          onClick={() => {
            setEditAddress(null);
            setIsAddAddress(true);
          }}
          className="bg-[#7487FF] py-2 px-4 rounded text-white font-HelveticaNeueMedium"
        >
          + Add New
        </button>

        {isAddAddress ? (
          <AddAddressModal  ref={modalRef} setIsAddAddress={setIsAddAddress} address={editAddress} referctAdderss={refetch} />
        ) : null}
      </div>

      {/* addresses */}
      <div className="flex flex-col gap-2">
        {data.getMyAddresses.addresses.map((address, index) => (
          <Address setLoading={setLoading} key={index} address={address} refetch={refetch} editAddress={setEditAddress} />
        ))}
      </div>
      {data && data.getMyAddresses.addresses.length === 0 && (
        <p className="text-center">No addresses found.</p>
      )}
    </div>
  );
};

export default MyAddresses;
