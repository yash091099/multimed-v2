import React from 'react'
import MedicineImage from '../assets/MedicineImage.png';
import TrashBin from '../assets/trashBin.svg';
import GreenCheck from '../assets/greenCheck.svg';
export default function CartItem(props) {
  return (
    <div className='flex flex-col gap-[16px] bg-white border border-[#E2E8F0] w-full px-[24px] py-[16px] rounded-[8px] shadow-sm'>
      {props.prescriptionNeeded && <div className='flex gap-[4px] bg-[#F7FEE7] w-fit p-[4px] rounded-[4px]'><img src={GreenCheck} alt="Check" /> <p className='text-[#365314]'>Prescription Needed</p></div>}
      <div className='flex justify-between w-full'>
        <div className='flex gap-[8px]'>
                <img src={MedicineImage} alt="medicine" />
                <div>
                    <h1 className='text-[14px] font-HelveticaNeueBold leading-[17.5px]'>Dolonext DT</h1>
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'>1 strip: 15 capsules</p>
                    <p className='text-[#DC2626] text-[12px] font-[500] leading-[15px] italic'>only 3 left in stock</p>
                </div>
        </div>
        <dvi className="flex gap-[16px]">
            <div>
                <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Manufacturer</p>
                <h1 className='cursor-pointer text-[10px] font-[400] leading-[12.5px] italic underline'>Pfizer</h1>
            </div>
            <div>
                <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Composition</p>
                <h1 className='cursor-pointer text-[10px] font-[400] leading-[12.5px] italic underline'>Piroxicam (20mg)</h1>
            </div>
        </dvi>
        {props.flag && <div className='flex items-start'>
            <div className='flex gap-[4px] items-center text-[16px] font-[500] leading-[20px]'>
                <button className='text-white bg-[#7487FF] px-[8px] py-[4px] rounded-[4px]'>+</button>
                <button>1</button>
                <button className='text-white bg-[#7487FF] px-[8px] py-[4px] rounded-[4px]'>-</button>
            </div>
        </div>}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-[4px] items-center'>
            <p className='text-[#94A3B8] text-[14px] font-[500] leading-[17.5px] line-through'>Rs 1432</p>
            <p className='text-[14px] font-HelveticaNeueMedium leading-[17.5px] '>Rs 1243</p>
            <div className='text-[10px] font-HelveticaNeueNormal leading-[12.5px] bg-[#C2F5E9] p-[4px]'>30% OFF</div>
        </div>
        <div>
            <img src={TrashBin} alt="delete" />
        </div>
      </div>
    </div>
  )
}
