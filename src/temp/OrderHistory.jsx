import React from 'react'
import Order from '../components/Order'

export default function OrderHistory() {
  return (
    <div>
        <div className='border-[1px] border-[#CBD5E1]/30 rounded-[8px] shadow-md mb-[24px]'>
          <div className='text-[14px] font-[500] leading-[17px] bg-[#F8FAFC] px-[24px] py-[12px] rounded-[8px]'>Order on the way: Expected to arrive by 3pm, 11 Sep</div>
          <Order status="pending" />
        </div>
        <div className='border-[1px] border-[#CBD5E1]/30 rounded-[8px] shadow-md mb-[24px]'>
          <div className='text-[14px] font-[500] leading-[17px] bg-[#F7FEE7] px-[24px] py-[12px] rounded-[8px]'>Order on the way: Expected to arrive by 3pm, 11 Sep</div>
          <Order status="completed" />
        </div>
    </div>
  )
}
