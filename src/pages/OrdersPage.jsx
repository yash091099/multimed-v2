import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SearchIcon from '../assets/searchIcon.svg';
import menuButton from '../assets/menuButton.svg';
import OrderTuple from '../components/OrderTuple';
import DateRangeSelector from '../components/DateRangeSelector';

// Dummy Data
const dataA = [
    {
        orderId: '12399102XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
    {
        orderId: '12399104XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
    {
        orderId: '12399105XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
    {
        orderId: '12399103XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
]
const dataB = [
    {
        orderId: '12399102XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
    {
        orderId: '12399103XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
]
const dataC = [
    {
        orderId: '12399102XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
    {
        orderId: '12399103XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
    {
        orderId: '12399104XDJJ',
        name: 'Sanjay R',
        phoneNumber: '9801099882',
        emailId: 'sanjayr@gmail.com',
        pincode: '560045',
        date: '13 Sep 2023',
        time: '2:45 PM',
        cost: 'Rs 2345'
    },
]

export default function OrdersPage() {
    const [orderType,setOrderType] = useState(1);
    const [menuId, setMenuId] = useState(undefined);
    const navigate = useNavigate();
    const [data,setData] = useState(dataB);
    const [dateRange, setDateRange] = useState('This Week');
    useEffect(()=>{
        if(orderType === 0) setData(dataA);
        else if(orderType === 1) setData(dataB);
        else if(orderType === 2) setData(dataC);
    },[orderType])
  return (
    <div className='flex flex-col gap-[48px] p-[48px] bg-white w-full'>
        <div className='flex justify-between w-full'>
            <h1 className='font-HelveticaNeueBold font-[700] text-[24px] tracking-[0.552px] leading-[30px]'>Order Management</h1>
            <div className="flex md:flex-row flex-col md:gap-4 gap-2">
            {/* searchbar */}
            <div className="flex items-center md:w-[314px] rounded border border-[#CBD5E1] bg-white px-2">
              <div className="md:p-2 p-1 flex gap-2 items-center w-full">
                <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search for Orders"
                  className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
            <p className='mb-[8px]'>Add filters</p>
            <div className='flex gap-[32px]'>
                <div className='flex items-center gap-[8px]'>
                    <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">Date:</p>
                    <div className='text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl'>
                        {/* <select className='bg-transparent outline-none'>
                            <option>9 September 2023</option>
                        </select> */}
                        <input type="date" className='bg-transparent outline-none' />
                    </div>
                </div>
                <div className='flex items-center gap-[8px]'>
                    <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">Sort by pincode: </p>
                    <div className='text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl'>
                        <select className='bg-transparent outline-none'>
                            <option>All</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center gap-[8px]'>
                    <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">Order cost range: </p>
                    <div className='text-[#CBD5E1] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl'>
                        <select className='bg-transparent outline-none'>
                            <option>Select</option>
                            <option>9801099882</option>
                            <option>6301099385</option>
                            <option>8801099921</option>
                        </select>
                    </div>
                </div>
                <div className='flex items-center gap-[8px]'>
                    <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">Prescription: </p>
                    <div className='text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl'>
                        <select className='bg-transparent outline-none'>
                            <option>All</option>
                            <option>P1</option>
                            <option>P2</option>
                            <option>P3</option>
                            <option>...</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-[24px]'>
            <div className='flex justify-between'>
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
            <div className='w-full border border-[#E2E8F0] rounded-[8px]'>
                <div className='flex justify-between text-[#64748B] text-[14px] font-[500] leading-[17.5px] italic  bg-[#FAFAFA] px-[48px] py-[24px] rounded-t-[8px] border-b border-[#E2E8F0]'>
                    <p className='flex-1 text-left'>Order ID and Cost</p>
                    <p className='flex-1 text-left'>Date</p>
                    <p className='flex-1 text-left'>Delivery Pincode</p>
                    <p className='flex-1 text-left'>Customer Details</p>
                    <p className='flex-1 text-left'>Prescription</p>
                </div>
                <div className='w-full'>
                    {data.map(item => {
                    return (
                            <OrderTuple item={item} orderType={orderType} menuId={menuId} setMenuId={setMenuId}/>
                        )})}
                </div>
            </div>
        </div>
    </div>
  )
}
