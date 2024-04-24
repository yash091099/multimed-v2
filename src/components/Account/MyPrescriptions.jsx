import React, { useEffect, useState } from "react";
import Prescription from "./Prescription";
import { gql, useMutation, useQuery } from "@apollo/client";
import {  toast } from "react-toastify";
import Loader from "../loader";
import "react-toastify/dist/ReactToastify.css";
import Modal from "../modal";
import useS3 from "../useS3Upload";
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

const MyPrescriptions = () => {
  const [fileInput, setFileInput] = React.useState(null);
  const [loadingg, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const { uploadImageOnS3 } = useS3();

  useEffect(()=>{
    if(url){
      setLoading(true)
      console.log(url,'+==========+++++===++++====+++===+++===++===++++===++==')
      addPrescription()
    }

  },[url])

  const ADD_PRESCRIPTION = gql`
    mutation addPrescription($input: String!) {
      addPrescription(input:  $input ) {
        status
        message
      }
    }
  `;

  const [addPrescription, { loading: otpLoading }] = useMutation(ADD_PRESCRIPTION, {
    
    variables: {
      input: url
     
    },
    onCompleted: (data) => {
      console.log(url,'+==========+++++===++++====+++===+++===++===++++===++==')

      if (data.addPrescription.status === "SUCCESS") {
     setLoading(false)
        toast.success("Prescription added successfully.");
        refetch();
        setOpen(false);
        setUrl('')
        setLoading(false);
      } else {
        setLoading(false);
        setOpen(false);

        toast.error("Error : Add Prescription ");
      }
    },
    onError: (err) => {
      console.log(url,'+==========+++++===++++====+++===+++===++===++++===++==')

     setLoading(false)

      toast.error("Error : " + err?.message);

    },
  });
  const [open, setOpen] = React.useState(false);
  const [deletePrescription] = useMutation(DELETE_PRESCRIPTION);
  const { loading, error, data, refetch } = useQuery(GET_MY_PRESCRIPTIONS);
  const handleClose = () => {
    setOpen(false);
  };
useEffect(()=>{
  refetch()
},[])
  const handleOpen = () => {
    setOpen(true);
  };



  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
      const uploadedUrl = await uploadImageOnS3({
        file,
        title: 'prescription',
        type: 'prescriptions',
      });

      console.log('Uploaded URL:', uploadedUrl);
      setUrl(uploadedUrl);
      // Here, you can call a mutation or another function to utilize the uploaded URL
      // For example, saving the URL in your database
    } catch (error) {
      toast.error("Error uploading file: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deletePrescription({ variables: { input: id } });
      refetch();
      setLoading(false);

      toast.success("Prescription deleted successfully.");
    } catch (error) {
      setLoading(false);
      console.error("Error deleting prescription", error);
      toast.error("Error deleting prescription");
    }
  };

  const handleAddPrescription = async () => {
    setLoading(true);
   if(url) {addPrescription()}
  };

  if (error) {
    // Handle the error state properly, maybe display a message to the user
    console.error("Error fetching prescriptions:", error);
    return <p>There was an error fetching the prescriptions.</p>;
  }

  const prescriptions = data?.getMyPrescriptions?.prescriptions ?? [];

  return (
    <div className="flex flex-col gap-4">
    
      {(loadingg || loading) && <Loader />}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-[1.125rem] font-HelveticaNeueMedium text-[#0F172A]">
          My Prescriptions
        </h1>
        <button
          onClick={handleOpen}
          className="bg-[#7487FF] py-2 px-4 rounded text-white font-HelveticaNeueMedium"
        >
          + Add New
        </button>
      </div>

      {/* {data && data.getMyPrescriptions && data.getMyPrescriptions.prescriptions.length === 0 ? (
        <p className="text-center">No prescriptions found.</p>
      ) : (
        data && data.getMyPrescriptions && data.getMyPrescriptions.prescriptions.map((prescription) => (
          <Prescription
            key={prescription.id}
            prescription={prescription}
            onDelete={() => handleDelete(prescription.id)}
          />
        ))
      )} */}
        {prescriptions.length === 0 && (
        <p className="text-center">No prescriptions found.</p>
      )}
        {prescriptions.map((prescription) => (
        <Prescription
          key={prescription.id}
          prescription={prescription}
          onDelete={() => handleDelete(prescription.id)}
        />
      ))}

      {open && (
        <Modal isOpen={open} onClose={handleClose}>
            <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddPrescription();
              handleClose();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label style={{ marginBottom: "10px", fontWeight: "600" }}>
              Upload Prescription
            </label>
            <input type="file" accept=".pdf" onChange={handleFileInput} />
       
      </form>
        </Modal>
      )}
    </div>
  );
};

export default MyPrescriptions;
