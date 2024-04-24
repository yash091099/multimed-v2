import React, { useState } from 'react'
import ProcessingOrders from './ProcessingOrders';
import CanceledOrders from './CanceledOrders';
import OrderHistory from './OrderHistory';
import DateRangeSelector from '../components/DateRangeSelector';

export default function Orders() {
    const [orderType,setOrderType] = useState(1);
    const [dateRange, setDateRange] = useState('This week');
  return (
    <div>
        <div className='p-[48px]'>
            <div className='mb-[16px]'>Orders</div>
            <div className='flex justify-between mb-[48px]'>
              <div className='flex text-[12px] font-normal font-[500] leading-[15px] '>
                <p className={`cursor-pointer text-center py-[8px] min-w-[125px] ${orderType === 0 ? 'border-b-[3px] border-[#031B89]' : 'text-[#64748B] bg-[#F8FAFC]'}`} onClick={()=>setOrderType(0)}>Processing Order</p>
                <p className={`cursor-pointer text-center py-[8px] min-w-[125px] ${orderType === 1 ? 'border-b-[3px] border-[#031B89]' : 'text-[#64748B] bg-[#F8FAFC]'}`} onClick={()=>setOrderType(1)}>Order History</p>
                <p className={`cursor-pointer text-center py-[8px] min-w-[125px] ${orderType === 2 ? 'border-b-[3px] border-[#031B89]' : 'text-[#64748B] bg-[#F8FAFC]'}`} onClick={()=>setOrderType(2)}>Cancelled Orders</p>
              </div>
              <div className='w-[294px]'><DateRangeSelector setRange={setDateRange} /></div>
              {/* <div className='p-[8px] text-gray-400 bg-white border border-[#CBD5E1] rounded-[4px] w-[294px]'>
                <select className='outline-none w-full'>
                  <option className='outline-none text-[#CBD5E1]' >Choose Date Range</option>
                  <option className='outline-none text-[#CBD5E1]' >Sample Date 11/08 - 20/09</option>
                </select>
              </div> */}
            </div>
            { orderType === 0 ? <ProcessingOrders />: orderType === 1 ? <OrderHistory /> : <CanceledOrders /> }
        </div>
    </div>
  )
}
