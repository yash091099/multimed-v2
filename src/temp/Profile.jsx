import React, { useContext, useRef, useState, useEffect } from 'react';
import Picture from '../assets/ProfilePicture.png';
import RemovedPP from "../assets/removedPP.png";
import Context from '../context/AppContext';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import {  toast } from "react-toastify";
const GET_CUSTOMER_ADDRESSES = gql`
  query getCustomerAddresses($userId: ID!) {
    getCustomerAddresses(input: $userId) {
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

const CREATE_ADDRESS_ADMIN = gql`
  mutation createAddressAdmin($input: CreateAddressAdminInput!) {
    createAddressAdmin(input: $input) {
      status
      message
    }
  }
`;

const UPDATE_ADDRESS = gql`
mutation updateAddress(
 $input: UpdateAddressInput!
) {
  updateAddress(
    input: $input
  ) {
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

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [fullName, setFullName] = useState(userDetails?.fullName || "");
  const [email, setEmail] = useState(userDetails?.email || "");
  const [phone, setPhone] = useState(userDetails?.contactNumber || "");
  const [editAddressId, setEditAddressId] = useState(null);
  const { data, loading, error, refetch } = useQuery(GET_CUSTOMER_ADDRESSES, {
    variables: { userId: userDetails?.id }
  });
  const menuRef = useRef(null);
  const handleEditClick = (id) => {
    setEditAddressId(prevId => prevId === id ? null : id);
  };
  useEffect(() => {
      refetch()
  },[]) 
  const fileRef = useRef(null);
  const [editAddress, setEditAddress]=useState(false);
  const [profileImage, setProfileImage] = useState(Picture);
  const [showAddressPopUp, setShowAddressPopUp] = useState(false);
  const [addressForm, setAddressForm] = useState({
    houseNumber: '',
    aptOrBuildingName: '',
    streetOrAreaName: '',
    city: '',
    pincode: '',
    state: '',
    label: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [createAddress] = useMutation(CREATE_ADDRESS_ADMIN);
  const [updateAddress] = useMutation(UPDATE_ADDRESS);
  const [deleteAddress] = useMutation(DELETE_ADDRESS);
  const validateForm = () => {
    let errors = {};
    if (!addressForm.houseNumber.trim()) errors.houseNumber = 'House number is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prevForm => ({ ...prevForm, [name]: value }));
  };
  const handleSubmitAddress = async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      if(!editAddressId){
  await createAddress({
        variables: {
          input: {
            ...addressForm,
            userId: userDetails?.id,
          }
        }
      });      }else{
       
          await updateAddress({


        variables: {
          input: {
            houseNumber: addressForm?.houseNumber,
            aptOrBuildingName: addressForm?.aptOrBuildingName,
            streetOrAreaName: addressForm?.streetOrAreaName,
            city: addressForm.city,
            pincode: addressForm.pincode,
            state: addressForm.state,
            label: addressForm.label,
            addressId: editAddressId,
          }
        }
      });
      }
   
      setShowAddressPopUp(false);
      resetForm();
      if(editAddressId){
        toast.success("Address updated successfully");

      }else{
        toast.success("Address added successfully");
      }
      refetch(); 
    } catch (error) {
      toast.error(`Failed to ${editAddressId?'update':'add' }address`);
      console.error("Failed to submit address:", error);
    }
    setSubmitting(false);
  };
  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress({
        variables: { input: addressId },
      });
      toast.success("Address deleted successfully");
      refetch(); 
    } catch (error) {
      toast.error("Failed to delete address");
      console.error("Failed to delete address:", error);
    }
  };
  const resetForm = () => {
    setAddressForm({
      houseNumber: '',
      aptOrBuildingName: '',
      streetOrAreaName: '',
      city: '',
      pincode: '',
      state: '',
      label: '',
    });
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setEditAddressId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className='flex flex-col gap-[48px]'>
        <div className='flex flex-col gap-[16px]'>
            <div className='text-[18px] font-[500] leading-[22.5px] tracking-[0.414px]'>Profile</div>
            <div>
              <p className='text-[#94A3B8] text-[10px] font-[500] leading-[12.5px] mb-[8px]'>PROFILE PICTURE</p>
              <div className='flex gap-[24px]'>
                <img className='border-[3px] border-[#031B89] w-[72px] h-[72px] rounded-[50%]' src={userDetails?.profilePicture||profileImage} alt=''/>
              </div>
            </div>
            <div>
              <p className='text-[#94A3B8] text-[10px] font-[500] leading-[12.5px] mb-[8px]'>DETAILS</p>
              <div className='flex flex-wrap gap-[24px]'>
                <div>
                  <p className='text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]'>Name</p>
                  <input disabled  className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm min-w-[314px]' type='text' placeholder='Enter name' value={fullName} onChange={(e)=>{setFullName(e.target.value)}}/>
                </div>
                <div>
                  <p className='text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]'>Email</p>
                  <input  disabled className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm min-w-[314px]' type='email' placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                  <p className='text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic mb-[4px]'>Phone</p>
                  <input disabled  className='outline-none text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] p-[12px] rounded-sm min-w-[314px]' type='text' placeholder='Enter Contact Number' value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
                </div>
              </div>
            </div>
        </div>
        <div>
            <div className='flex justify-between'>
                <div>Saved Address</div>
                <button className='text-white text-[16px] font-[500] leading-[20px] bg-[#7487FF] px-[16px] py-[8px] rounded-[4px]' onClick={()=>{resetForm();setShowAddressPopUp(true)}}>+ Add New </button>
            </div>
            {data?.getCustomerAddresses?.addresses?.map((address) => (
          <div key={address.id} className='flex justify-between my-[8px]'>
            <div className='px-[12px] py-[16px]'>
              <div className='flex gap-[4px] items-center'>
                <p className='text-[14px] font-[400] leading-[17.5px]'>{address.label} | {address.houseNumber} {address.aptOrBuildingName}</p>
                {address.label === "HOME" && (
                  <div className='text-[12px] font-[500] leading-[15px] text-[#65A30D] bg-[#F7FEE7]'>Default</div>
                )}
              </div>
              <h1 className='text-[14px] font-[400] leading-[17.5px] mb-[4px]'>{userDetails?.contactNumber}</h1>
              <p className='text-[12px] font-[400] leading-[15px]'>{address.streetOrAreaName}, {address.city}, {address.state}, {address.pincode}</p>
            </div>
            <div className='relative'>
              <div className='cursor-pointer' onClick={() => handleEditClick(address.id)}>...</div>
              {editAddressId === address.id && (
                <div className='absolute top-[20px] right-[0px] p-[8px] border-2 border-[#F8FAFC] bg-white rounded-[8px] shadow-md'>
                  <button onClick={() => { setEditAddressId(address?.id); setShowAddressPopUp(true); setAddressForm({...address, addressId: address.id}); }}>Edit</button>
                  <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
        {!data?.getCustomerAddresses?.addresses?.length && (
          <p className='text-[14px] text-[#94A3B8] text-center font-[400] leading-[17.5px]'>No saved address</p>
        )}
        </div>
        {showAddressPopUp && (
          <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
            <div className="relative bg-white p-4 rounded-lg max-w-lg w-full">
              <div className="flex justify-between items-center pb-4">
                <h2 className="text-xl font-semibold">{editAddressId ? 'Edit Address' : 'Add New Address'}</h2>
                <button onClick={() => setShowAddressPopUp(false)}>&times;</button>
              </div>
              <div className="flex flex-col gap-4">
                <input className="border p-2 rounded" name="houseNumber" value={addressForm.houseNumber} onChange={handleFormChange} placeholder="House Number" />
                <input className="border p-2 rounded" name="aptOrBuildingName" value={addressForm.aptOrBuildingName} onChange={handleFormChange} placeholder="Apartment/Building Name" />
                <input className="border p-2 rounded" name="streetOrAreaName" value={addressForm.streetOrAreaName} onChange={handleFormChange} placeholder="Street/Area Name" />
                <input className="border p-2 rounded" name="city" value={addressForm.city} onChange={handleFormChange} placeholder="City" />
                <input className="border p-2 rounded" name="state" value={addressForm.state} onChange={handleFormChange} placeholder="State" />
                <input className="border p-2 rounded" name="pincode" value={addressForm.pincode} onChange={handleFormChange} placeholder="Pincode" />
                <input className="border p-2 rounded" name="label" value={addressForm.label} onChange={handleFormChange} placeholder="Label (e.g., Home, Work)" />
                <button className={`bg-blue-500 text-white p-2 rounded ${submitting && 'opacity-50'}`} disabled={submitting} onClick={handleSubmitAddress}>
                  {editAddressId ? 'Update Address' : 'Add Address'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
