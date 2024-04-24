import React from 'react'
import Order from '../components/Order'
export default function ProcessingOrders() {
  return (
    <div>
        <div className='border-[1px] border-[#CBD5E1]/30 rounded-[8px] shadow-md mb-[24px]'>
          <Order status="processing" />
        </div>
        <div className='border-[1px] border-[#CBD5E1]/30 rounded-[8px] shadow-md'>
          <Order status="processing" />
        </div>
    </div>
  )
}
