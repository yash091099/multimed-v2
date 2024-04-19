import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/searchIcon.svg';
import OrderTuple from '../components/OrderTuple';
// import DateRangeSelector from '../components/DateRangeSelector';
import { gql, useQuery } from '@apollo/client';

const GET_PROCESSING_ORDER = gql`
query{getAllProcessingOrders{
  status
  message

  orders{
    id
    status
    eta
    dateOfOrder
    noOfItems
    total
    userId
    couponId
  
    user{
      id
      fullName
      prescriptions{
        id
        url
        isApproved
        
      }
      email
      contactNumber
      
    }
    address{
      id
      pincode
    }
    coupon{
      id
      code
      percentage
    }
  }
}}`;

const GET_CANCELLED_ORDER = gql`
query{getAllCancelledOrders{
  status
  message

  orders{
    id
    status
    eta
    dateOfOrder
    noOfItems
    total
    userId
    couponId
   
    user{
      id
      fullName
      prescriptions{
        id
        url
        isApproved
        
      }
      email
      contactNumber
      
    }
    address{
      id
      pincode
    }
    coupon{
      id
      code
      percentage
    }
  }
}}`;

const GET_ORDER_HISTORY = gql`
query{getAllOrderHistory{
  status
  message
 
  orders{
    id
    status
    eta
    dateOfOrder
    noOfItems
    total
    userId
    couponId
   
    user{
      id
      fullName
      prescriptions{
        id
        url
        isApproved
        
      }
      email
      contactNumber
      
    }
    address{
      id
      pincode
    }
    coupon{
      id
      code
      percentage
    }
  }
}}`;

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [pincodeFilter, setPincodeFilter] = useState('');
  const [costRange, setCostRange] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [dateRange, setDateRange] = useState('This Week');
  const [data, setData] = useState([]);

  const { data: processingOrderData, refetch: refetchProcessing } = useQuery(GET_PROCESSING_ORDER);
  const { data: cancelledOrderData, refetch: refetchCancelled } = useQuery(GET_CANCELLED_ORDER);
  const { data: orderHistoryData, refetch: refetchHistory } = useQuery(GET_ORDER_HISTORY);

  useEffect(() => {
    switch (orderType) {
      case 0:
        setData(filterData(processingOrderData?.getAllProcessingOrders?.orders || []));
        break;
      case 2:
          setData(filterData(cancelledOrderData?.getAllCancelledOrders?.orders || []));
          break;
        case 1:
          console.log(orderHistoryData?.getAllOrderHistory?.orders,'cancelledOrderData?.getAllCancelledOrders?.orders')
        setData(filterData(orderHistoryData?.getAllOrderHistory?.orders || []));
        break;
      default:
        setData([]);
        break;
    }
  }, [processingOrderData, cancelledOrderData, orderHistoryData, orderType, searchTerm, pincodeFilter, costRange, dateFilter]);

  const refetchDataOrder = () => {
      refetchProcessing();
      refetchCancelled();
      refetchHistory();
  }
  const filterData = (orders) => {
    return orders.filter(order => {
      const pincode = order?.address ? order?.address?.pincode : '';
      const total = order?.total || 0;
      const dateOfOrder = new Date(order?.dateOfOrder);
  
      // Validate if costRange is set properly and split it
      const costRangeParts = costRange?.split('-')?.map(part => parseInt(part?.trim()));
      const minCost = costRangeParts[0] || 0;
      const maxCost = costRangeParts[1] || Infinity;
  
      // Validate dateFilter and set defaults if necessary
      const dates = dateFilter?.split(' to ');
      const startDate = dates[0] ? new Date(dates[0]) : new Date('1970-01-01'); // A default past date
      const endDate = dates[1] ? new Date(dates[1]) : new Date(); // Today if no end date
  
      return (order.userId.includes(searchTerm) || (order?.orderId && order?.orderId.includes(searchTerm))) &&
        pincode.includes(pincodeFilter) &&
        (total >= minCost && total <= maxCost) &&
        (dateOfOrder >= startDate && dateOfOrder <= endDate);
    });
  };
  
  useEffect(() => {
      console.log(data,'data')
  },[data])
  return (
    <div className='flex flex-col gap-[48px] p-[48px] bg-white w-full'>
      <div className='flex justify-between w-full'>
        <h1 className='font-HelveticaNeueBold font-[700] text-[24px] tracking-[0.552px] leading-[30px]'>Order Management</h1>
        <div className="flex md:flex-row flex-col md:gap-4 gap-2">
          <div className="flex items-center md:w-[314px] rounded border border-[#CBD5E1] bg-white px-2">
            <div className="md:p-2 p-1 flex gap-2 items-center w-full">
              <img src={SearchIcon} alt="search icon" className="w-6 h-6" />
              <input
                type="text"
                placeholder="Search for Orders"
                className="placeholder:text-[#94A3B8] md:text-sm text-xs focus:outline-none w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              <input type="date" className='bg-transparent outline-none' onChange={(e) => setDateFilter(e.target.value)} />
            </div>
          </div>
          <div className='flex items-center gap-[8px]'>
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">Sort by pincode: </p>
            <div className='text-[#7487FF] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl'>
              <input className='bg-transparent outline-none' onChange={(e) => setPincodeFilter(e.target.value)} />
            </div>
          </div>
          <div className='flex items-center gap-[8px]'>
            <p className="text-slate-500 font-helvetica-neue text-[12px] font-normal leading-3">Order cost range: </p>
            <div className='text-[#CBD5E1] bg-[#F8FAFC] px-[12px] py-[8px] rounded-3xl'>
              <input className='bg-transparent outline-none' placeholder="100-500" onChange={(e) => setCostRange(e.target.value)} />
            </div>
          </div>
        
        </div>
      </div>
      <div className='flex flex-col gap-[24px]'>
        <div className='flex justify-between'>
          <div className='flex text-[12px] font-normal font-[500] leading-[15px] '>
            <p className={`cursor-pointer text-center py-[8px] min-w-[125px] ${orderType === 0 ? 'border-b-[3px] border-[#031B89]' : 'text-[#64748B] bg-[#F8FAFC]'}`} onClick={() => setOrderType(0)}>Processing Order</p>
            <p className={`cursor-pointer text-center py-[8px] min-w-[125px] ${orderType === 1 ? 'border-b-[3px] border-[#031B89]' : 'text-[#64748B] bg-[#F8FAFC]'}`} onClick={() => setOrderType(1)}>Order History</p>
            <p className={`cursor-pointer text-center py-[8px] min-w-[125px] ${orderType === 2 ? 'border-b-[3px] border-[#031B89]' : 'text-[#64748B] bg-[#F8FAFC]'}`} onClick={() => setOrderType(2)}>Cancelled Orders</p>
          </div>
          {/* <div className='w-[294px]'><DateRangeSelector setRange={setDateRange} /></div> */}
        </div>
        <div className='w-full border border-[#E2E8F0] rounded-[8px]'>
          <div className='flex justify-between text-[#64748B] text-[14px] font-[500] leading-[17.5px] italic bg-[#FAFAFA] px-[48px] py-[24px] rounded-t-[8px] border-b border-[#E2E8F0]'>
            <p className='flex-1 text-left'>Order ID and Cost</p>
            <p className='flex-1 text-left'>Date</p>
            <p className='flex-1 text-left'>Delivery Pincode</p>
            <p className='flex-1 text-left'>Customer Details</p>
            <p className='flex-1 text-left'>Prescription</p>
          </div>
          <div className='w-full'>
            {data.length ? data.map(item => (
              <OrderTuple item={item} orderType={orderType} refetch={refetchDataOrder} />
            )) : <p className="text-center py-4">No data found</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
