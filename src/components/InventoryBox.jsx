import React, { useState } from "react";

import ArrowUp from "../assets/arrowUp.svg";
import ArrowDown from "../assets/arrowDown.svg";
import MedicinesCard from "./MedicinesCard";
import { gql, useMutation } from "@apollo/client";
import {toast} from 'react-toastify'
import LoaderOverlay from "./loadinOverlay";
const UPDATE_SEGMENT_NAME=gql`
  mutation UpdateSegmentName($input: UpdateSegmentNameInput!) {
    updateSegmentName(input: $input) {
      status
      message
    }
  }
`

const DELETE_SEGMENT=gql`
  mutation DeleteSegment($input: ID!) {
    deleteSegment(input: $input) {
      status
      message
    }
  }
`

const InventoryBox = (props) => {
  const {segment,categories,refetch}=props;

  console.log(segment,categories,'+++++++++++++======+++==++++=====+====++++')
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, openIsEdit] = useState(false);
  const [segmentName, setSegmentName] = useState(segment?.segmentName);
  const [updateSegmentName]=useMutation(UPDATE_SEGMENT_NAME)
const handleUpdateSegmentName=async()=>{
  setLoading(true);
  const {data}=await updateSegmentName({
    variables:{
      input:{
        segmentId:segment.id,
        name:segmentName
      }
    }
  })
  if(data?.updateSegmentName?.status==='SUCCESS'){
    openIsEdit(false);
  setLoading(false);

    toast.success('Segment name updated successfully');
    refetch();
  }else{
  setLoading(false);

    toast.error(data?.updateSegmentName?.message||'An error occurred while updating the segment name')
  }
}

const [deleteSegment]=useMutation(DELETE_SEGMENT);

  const handleDeleteSegment=async()=>{
    setLoading(true);
    const {data}=await deleteSegment({
      variables:{
        input:segment.id
      }
    })
    if(data?.deleteSegment?.status==='SUCCESS'){
      setLoading(false);
      toast.success('Segment deleted successfully');
      refetch();
    }else{
      setLoading(false);
      toast.error(data?.deleteSegment?.message||'An error occurred while deleting the segment')
    }
  }
  return (
    <div className="flex flex-col gap-6">
      {/* heading */}
      <div  className="border-b border-[#CBD5E1] flex justify-between py-2 items-center">
        <h1 className="text-2xl font-HelveticaNeueBold">
          {segment?.segmentName} ({categories?.length||0})
        </h1>

        <button className="outline-none bg-transparent" onClick={() => setIsOpen(!isOpen)}>
          <img
            src={isOpen ? ArrowUp : ArrowDown}
            alt="arrow up"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* categories */}
      {isOpen && (
        <>
          <div className="flex justify-between items-center">
            {/* info */}
            <div className="flex gap-1 items-center">
              <h1 className="md:text-sm text-xs text-[#64748B]">
                {segment?.totalCategories||0} categories
              </h1>

              <div className="h-1.5 w-1.5 rounded-full bg-[#E2E8F0]" />

              <h2 className="md:text-sm text-xs text-[#64748B]">
                {segment?.totalProducts||0} products
              </h2>
            </div>

            {/* delete button */}
            <div style={{display:'flex',gap:'10px'}}>

            <button onClick={() =>openIsEdit(true)} className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-white text-[blue] border border-[blue] md:py-3 py-2 px-4 rounded">
              Edit Segment
            </button>
            <button onClick={() =>handleDeleteSegment()} className="md:w-[10.75rem] w-full text-sm font-HelveticaNeueMedium bg-white text-[#EF4444] border border-[#EF4444] md:py-3 py-2 px-4 rounded">
              Delete Segment
            </button>
            </div>
          </div>

          {/* cards */}
          {isEdit && <div>
        <h1 className=" text-sm font-HelveticaNeueBold">Edit Segment Name</h1>
        <input type="text" className="border border-[#CBD5E1]  rounded p-2"  value={segmentName} onChange={(e)=>setSegmentName(e.target.value)} />

        <button onClick={()=>{
            handleUpdateSegmentName();
        }} className=" text-sm m-4  font-HelveticaNeueMedium bg-white text-[#EF4444] border border-[#EF4444] md:py-3 py-2 px-4 rounded">
          Edit Segment Name
        </button>

        </div>}
          <div className="grid grid-cols-2 gap-4">
          {categories?.map((item)=>{
            return(

              <MedicinesCard
              title={item?.categoryName}
              description={item?.categoryDescription}
              products={item?.products?.length||0}
              manufacturers={item?.totalManufacturers||0}
              key={item?.id}
              category={item}

            />
            )
          })  
           }
           {!categories?.length && <h1 className="text-center text-sm font-HelveticaNeueBold">No Categories Found</h1>}
           
          </div>
        </>
      )}
      {loading&& <LoaderOverlay/>}
    
    </div>
  );
};

export default InventoryBox;
