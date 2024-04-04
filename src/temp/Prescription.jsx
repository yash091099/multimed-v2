import React, { useContext, useRef, useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import downloaddIcon from '../assets/download-arrow.svg';
import deleteIcon from '../assets/Trash, Delete, Bin.svg';
import Context from '../context/AppContext';

const GET_CUSTOMER_PRESCRIPTIONS = gql`
  query getCustomerPrescriptions($input: ID!) {
    getCustomerPrescriptions(input: $input) {
      status
      message
      prescriptions {
        id
        url
        isApproved
        createdAt
        updatedAt
      }
    }
  }
`;

const DELETE_PRESCRIPTION = gql`
  mutation DeletePrescription($input: ID!) {
    deletePrescription(input: $input) {
      status
      message
    }
  }
`;

export default function Prescription() {
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const { showDeletePopUp, setShowDeletePopUp } = useContext(Context);
  const [prescriptionList, setPrescriptionList] = useState([]);
  const inputRef = useRef(null);

  const { loading, error, data, refetch } = useQuery(GET_CUSTOMER_PRESCRIPTIONS, {
    variables: { input: userDetails?.id },
  });

  const [deletePrescription] = useMutation(DELETE_PRESCRIPTION, {
    onCompleted: (data) => {
      toast.success(data.deletePrescription.message);
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  useEffect(() => {
    if (data) {
      setPrescriptionList(data.getCustomerPrescriptions.prescriptions);
    }
  }, [data]);

  const handleDelete = (id) => {
    deletePrescription({ variables: { input: id } });
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  function addNewFile() {
    inputRef.current.click();
  }

  if (loading) return <p>Loading prescriptions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className='flex justify-between items-center mb-[16px]'>
        <div className='text-[18px] font-[700] leading-[22.5px] tracking-[0.414px]'>Saved Prescription</div>
        <button className='text-white text-[16px] font-[500] leading-[20px] bg-[#7487FF] px-[16px] py-[8px] rounded-[4px]' onClick={addNewFile}>+ Add New</button>
        <input className='hidden' ref={inputRef} type="file" />
      </div>
      {prescriptionList.map(item => (
        <div className='flex justify-between items-center w-full py-[16px]' key={item.id}>
          <div className='flex justify-between bg-[#F8FAFC] w-[50%] p-[12px]'>
            <p>{item.filename || 'Prescription.pdf'}</p>
            <button className='text-[#7487FF] text-[12px] font-[500] leading-[15px]' onClick={() => handleDownload(item.url)}>View</button>
          </div>
          <p className='text-[#94A3B8] text-[12px] font-[400] leading-[15px] italic'>Uploaded on {new Date(parseInt(item.createdAt)).toLocaleDateString()}</p>
          <div className='flex gap-[16px]'>
            <img src={downloaddIcon} alt='download' style={{ cursor: 'pointer' }} onClick={() => handleDownload(item.url)} />
            <img src={deleteIcon} alt='delete' style={{ cursor: 'pointer' }} onClick={() => handleDelete(item.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}
