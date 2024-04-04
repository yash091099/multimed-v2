import { Delete, Remove } from '@mui/icons-material'
import { set } from 'date-fns';
import React, { useContext } from 'react'

export default function ProductCard({setStockDetails,stockData,removeManufacturer,setdataToUpdate}) {
console.log(stockData,'stockData');
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

const toupperCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}


  return (
    <div className='relative flex flex-col justify-between h-[200px] p-[20px] rounded-[12px] shadow-md border border-[#E2E8F0] bg-white hover:shadow-lg transition-shadow duration-150 ease-in-out' onClick={() => { setdataToUpdate(stockData); }}>
    <div>
        <h1 className='text-[#1E293B] text-[20px] leading-[1.4] font-semibold'>{toupperCase(stockData?.manufacturer) || "N/A"}</h1>
        <div className='mt-[10px]'>
            <p className='text-[#475569] text-[16px] leading-[1.4] italic mb-[5px]'>Batch No: {stockData?.batchNumber || "N/A"}</p>
            <p className='text-[#475569] text-[16px] leading-[1.4] italic'>Expiry Date: {stockData?.expiryDate || "N/A"}</p>
            <p className='text-[#475569] text-[16px] leading-[1.4] italic'>Manufacturing Date: {stockData?.manufacturingDate || "N/A"}</p>
            <p className='text-[#475569] text-[16px] leading-[1.4] italic'>Quantity: {getFormattedQuantity(stockData)}</p>
            <p className='text-[#475569] text-[16px] leading-[1.4] italic'>MRP: {stockData?.mrpPerSheet || "N/A"}</p>
        </div>
    </div>
    <div className='absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors duration-150 ease-in-out' style={{cursor: "pointer"}} title='Remove Manufacturer' onClick={(e) => {e.stopPropagation(); removeManufacturer(stockData?.manufacturer);}}>
        <Delete />
    </div>
</div>


  )
}
