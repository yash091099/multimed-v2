import React from 'react'
import stripImage from '../assets/strip.png';
import ShareIcon from '../assets/ShareIcon.svg';
import CheckedImage from '../assets/Checked.svg';
export default function Order(props) {
  return (
    <>
      <div className='flex justify-between items-center px-[24px] py-[16px]'>
        <div className='flex items-center gap-[16px]'>
            <p className='text-[16px] font-[500] leading-[20px]'>12399102XDJJ</p>
            <button className='flex items-center gap-[4px] text-[#7487FF] text-[12px] font-[500] leading-[15px]'>View Order Details <img src={ShareIcon} alt="Share Icon" /></button>
            { props.status.toLowerCase() !== 'processing' && <button className='text-[#7487FF] text-[12px] font-[500] leading-[15px]'>View Invoice</button>}
        </div>
        <div className='flex gap-[24px]'>
            <div>
                <h3 className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Date of Order</h3>
                <p className='text-[12px] font-[500] leading-[15px]'>11th September 2023</p>
            </div>
            <div>
                <h3 className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Total No items</h3>
                <p className='text-[12px] font-[500] leading-[15px]'>10</p>
            </div>
            {props.status.toLowerCase() !== 'processing' && <>
                <div>
                    <h3 className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Order Total:</h3>
                    <p className='text-[12px] font-[500] leading-[15px]'>Rs 1243 (paid)</p>
                </div>
                <div>
                    <h3 className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Delivery To:</h3>
                    <p className='text-[#7487FF] text-[12px] font-[500] leading-[15px]'>Home</p>
                </div>
            </>}
        </div>
      </div>
      <div className='flex items-center gap-[24px] px-[24px] mb-[16px]'>
            <div className='grid grid-cols-3 gap-y-[8px] gap-x-[24px]'>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
                <div className='flex gap-[8px] items-center'>
                    <img className="rounded-md" src={stripImage} alt='Strip name' />
                    <p className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'> 1 Strip : 15 Capsules x 1</p>
                </div>
            </div>
            <div className='text-[#475569] text-[14px] font-[400] leading-[17.5px]'>
                   + 2 more items
            </div>
      </div>
      <div className='flex gap-1 items-center bg-[#F8FAFC] text-[14px] font-[400] leading-[17.5px] px-[24px] py-[8px] mb-[16px]'>
        <img src={CheckedImage} alt="Approved" /> Prescription Approved: filename.extension
      </div>
      {props.status.toLowerCase() === 'completed' && <div className='flex justify-end px-[24px] mb-[16px]'>
        <button className='w-[245px] text-center text-white text-[16px] font-[500] leading-[20px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]'>Reorder</button>
      </div>}
      {props.status.toLowerCase() === 'pending' && <div className='flex gap-[8px] justify-end px-[24px] mb-[16px]'>
            <button className='border-2 border-[#031B89] text-[#031B89] text-[16px] font-[500] leading-[20px] px-[16px] py-[12px] rounded-[4px]'>Cancel this Order</button>
            <button className='w-[245px] text-center text-white text-[16px] font-[500] leading-[20px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]'>Track Order</button>
      </div>}
      {props.status.toLowerCase() === 'processing' && <div className='flex justify-between px-[24px] mb-[16px]'>
            <div className='flex items-center gap-[24px]'>
                <p className='text-[14px] font-[500] leading-[17.5px]'> Order Total: Rs 1243</p>
                <p className='text-[14px] font-[500] leading-[17.5px]'>Delivery To: <span className='text-[#7487FF]'>Home</span></p>
            </div>
            <button className='w-[245px] text-center text-white text-[16px] font-[500] leading-[20px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]'>Complete Purchase</button>
      </div>}  
    </>
  )
}
