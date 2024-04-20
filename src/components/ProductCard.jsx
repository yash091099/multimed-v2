import React from 'react'
import { Delete } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';

export default function ProductCard({ setStockDetails, stockData, removeManufacturer, setdataToUpdate,index }) {
  console.log(stockData, 'stockData');

  function getFormattedQuantity(stockData) {
    if (!stockData) return "N/A";

    switch (stockData.stockType) {
      case 'Boxes':
        return `${stockData.boxes} Boxes, ${stockData.sheets} Sheets per Box, ${stockData.noOfTabletsPerSheet} Units per Sheet`;
      case 'Units':
        return `${stockData.noOfUnits} Units`;
      case 'Grams':
        return `${stockData.noOfGrams} Grams`;
      case 'Kilograms':
        return `${stockData.noOfKgs} Kilograms`;
      default:
        return "N/A";
    }
  }

  const toUpperCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const formatDateString = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date?.toLocaleDateString("en-US", options); 
  }

  const handleEditClick = (e, stockData) => {
    e.stopPropagation();
    setStockDetails(true);
    setdataToUpdate(stockData);
  };

  return (
    <div className='relative flex flex-col justify-between h-[200px] p-[20px] rounded-[12px] shadow-md border border-[#E2E8F0] bg-white hover:shadow-lg transition-shadow duration-150 ease-in-out'>
      <div>
        <h1 className='text-[#1E293B] text-[20px] leading-[1.4] font-semibold'>{toUpperCase(stockData?.manufacturer) || "N/A"}</h1>
        <div className='mt-[10px]'>
          <p className='text-[#475569] text-[16px] leading-[1.4] italic mb-[5px]'>Batch No: {stockData?.batchNumber || "N/A"}</p>
          <p className='text-[#475569] text-[16px] leading-[1.4] italic'>Expiry Date: {formatDateString(localStorage.getItem('manufacturingDate'))|| "N/A"}</p>
<p className='text-[#475569] text-[16px] leading-[1.4] italic'>Manufacturing Date: {formatDateString(localStorage.getItem('expiryDate')) || "N/A"}</p>

          <p className='text-[#475569] text-[16px] leading-[1.4] italic'>Quantity: {getFormattedQuantity(stockData)}</p>
          <p className='text-[#475569] text-[16px] leading-[1.4] italic'>MRP: {stockData?.mrpPerSheet || "N/A"}</p>
        </div>
      </div>
      <div className='flex justify-between items-center px-2 absolute top-2 right-2'>
        <span
        title='Edit Manufacturer'
        >

        <EditIcon
          onClick={(e) => handleEditClick(e, stockData)}
          className='text-gray-400 hover:text-blue-500 transition-colors duration-150 ease-in-out'
          style={{ cursor: "pointer" }}
        />
        </span>
      {index>1 ?  <span
          title='Remove Manufacturer'
        >
        <Delete
          onClick={(e) => { e.stopPropagation(); removeManufacturer(stockData?.manufacturer); }}
          className='text-gray-400 hover:text-red-500 transition-colors duration-150 ease-in-out'
          style={{ cursor: "pointer" }}
        />

        </span>:null}
      </div>
    </div>
  )
}
