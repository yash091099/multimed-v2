import React, { useState, useEffect ,useRef} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import CrossIcon from '../../assets/crossIcon.svg';
import TickIcon from '../../assets/cart/tickIcon.svg';
import Warning from '../../assets/cart/warning.svg';
import { Link } from 'react-router-dom';
import { gql } from "@apollo/client";
import Loader from '../loader';
import  "react-toastify/dist/ReactToastify.css";
import {  toast } from "react-toastify";
import useS3 from '../useS3Upload';
const GET_MY_PRESCRIPTIONS = gql`
  query getMyPrescriptions {
    getMyPrescriptions {
      status
      message
      prescriptions {
        id
        url
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

const ADD_PRESCRIPTION = gql`
mutation addPrescription($input: String!) {
  addPrescription(input:  $input ) {
    status
    message
  }
}
`;

const PrescriptionUpload = ({selectedPrescription, setSelectedPrescription}) => {
    const { uploadImageOnS3 } = useS3();

  const [loading, setLoading] = useState(false);

  // Apollo Client hooks
  const { data, loading: loadPrescription, error, refetch } = useQuery(GET_MY_PRESCRIPTIONS);
  const [deletePrescriptionMutation] = useMutation(DELETE_PRESCRIPTION);
  const [addPrescriptionMutation] = useMutation(ADD_PRESCRIPTION);
  const fileInputRef = useRef();

  useEffect(() => {
      if (data?.getMyPrescriptions?.prescriptions?.length > 0) {
          setSelectedPrescription(data.getMyPrescriptions.prescriptions[0]);
      }
  }, [data]);

  const handleDelete = async (prescriptionId) => {
      setLoading(true);
      try {
          await deletePrescriptionMutation({ variables: { input: prescriptionId } });
          toast.success('Prescription deleted successfully');
          setSelectedPrescription(null);
          refetch();
      } catch (error) {
          toast.error('Failed to delete prescription');
          console.error('Error deleting prescription:', error);
      }
      setLoading(false);
  };

  const triggerFileInput = () => {
      fileInputRef.current.click();
  };

  

  const handleFileSelected = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const uploadedUrl = await uploadImageOnS3({
        file,
        title: 'profilePicture',
        type: 'profilePicture',
      });

      console.log('Uploaded URL:', uploadedUrl);
      setSelectedPrescription({ url: uploadedUrl }); // Assume the object structure for a prescription
          await addPrescriptionMutation({ variables: { input: uploadedUrl } });
      // Here, you can call a mutation or another function to utilize the uploaded URL
      // For example, saving the URL in your database
    } catch (error) {
      toast.error("Error uploading file: " + error.message);
    }
  };


  if (loadPrescription || loading) return <Loader />;
  if (error) {
      toast.error('Error fetching prescriptions');
      return <p>Error: {error.message}</p>;
  }

        
    

    return (
      <div className='flex flex-col border-b border-dashed border-[#CBD5E1] px-3 py-6 gap-4 bg-white text-[#0F172A]'>

      <div className='flex gap-1 items-center justify-between'>
          <div className='flex items-center gap-1'>
              <img src={TickIcon} alt='tick icon' />
              <h1 className='font-HelveticaNeueMedium'>Prescription</h1>
          </div>
          {/* <Link to='/prescription-info'>
              <p className='font-HelveticaNeueMedium text-[0.75rem] text-[#7487FF]'>
                  Why do we need a prescription?
              </p>
          </Link> */}
      </div>

      {selectedPrescription ? (
          <div className='flex items-center justify-between bg-[#F8FAFC] px-1 py-3'>
              <div className='flex items-center gap-1'>
                  <img src={TickIcon} className='w-4 h-4' alt='tick icon' />
                  <h1 className='text-[0.875rem]'>Prescription uploaded: {selectedPrescription.url}</h1>
              </div>
              <button onClick={() => handleDelete(selectedPrescription.id)}>
                  <img src={CrossIcon} alt='cross icon' className='w-6 h-6' />
              </button>
          </div>
      ) : (
          <p className='text-center text-[0.875rem]'>No prescription found</p>
      )}

<input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelected}
                style={{ display: 'none' }} // Hide the file input
                accept=".pdf"
            />
            <button
                className='w-full border border-[#031B89] rounded px-3 py-4 text-[#031B89] font-HelveticaNeueMedium'
                onClick={triggerFileInput} // Trigger the hidden file input when button is clicked
            >
                {selectedPrescription ? 'UPLOAD ANOTHER PRESCRIPTION' : 'UPLOAD PRESCRIPTION'}
            </button>
           {selectedPrescription && !selectedPrescription?.approved && <div className="w-full flex gap-1 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium  text-[0.875rem] p-1 rounded">
            <img src={Warning} />
              <h1>Selected Prescription is not approved.</h1>
            </div>}
            
  </div>
    );
};

export default PrescriptionUpload;
