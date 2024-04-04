import React, { useContext, useState } from 'react'
import WalletIcon from '../assets/Wallet.svg';
import { useNavigate } from 'react-router-dom';
import ToggleButton from '../components/ToggleButton';
import Context from '../context/AppContext';
import DateRangeSelector from '../components/DateRangeSelector';
export default function WalletAndCoupons() {
  const { showCouponPopUp, setShowCouponPopUp } = useContext(Context);
  const [showPopUp, setShowPopUp] = useState(true);
  const [dateRange, setDataRange] = useState('This Week');
  const navigate = useNavigate();
const data=[];

  const [coupons, setCoupons] = useState([
    { id: 1, status: 'Active', couponName: 'FsRIEpwpsLS', couponType: 'Discount', discounValue: '10%', expiry: '02/11/2023, 11:59 PM' },
    { id: 2, status: 'Expired', couponName: 'FsRIEpwpsLS', couponType: 'Cash', discounValue: 'Rs 1340', expiry: '02/11/2023, 11:59 PM' },
]);
  return (
    <div className='flex flex-col gap-[48px] w-full'>
      <div className='text-[18px] font-[500] leading-[22.5px] tracking-[0.414px]'>
        Wallet
      </div>
      <div className='flex justify-center items-center w-full'>
          <div className='flex flex-col justify-center items-center gap-[16px] border-2 border-[#E2E8F0] w-[467px] h-[186px] rounded-[8px] shadow-sm'>
            <div className='flex items-center justify-center gap-[4px]'>
                <img src={WalletIcon} alt="Wallet Icon" />
                <p className='text-[16px] font-[500] leading-[20px]'>Wallet Balance</p>
            </div>
                <h1 className='text-[40px] font-[700]'>Rs. {'0.00'}</h1>
          </div>
      </div>
      <div>
        <div className='w-full border border-[#E2E8F0] rounded-[8px]'>
          <div className='flex justify-between px-[12px] py-[16px] rounded-t-[8px]'>
            <div className='text-[16px] font-[500] leading-[20px] tracking-[0.368px]'>Transaction History</div>
            <div className='w-[294px]'>
              <DateRangeSelector setRange={setDataRange} />
            </div>
            {/* <div className='p-[8px] text-gray-400 bg-white border border-[#CBD5E1] rounded-[4px] w-[294px]'>
                <select className='outline-none w-full'>
                  <option className='outline-none text-[#CBD5E1]' >Choose Date Range</option>
                  <option className='outline-none text-[#CBD5E1]' >Sample Date 11/08 - 20/09</option>
                </select>
              </div> */}
          </div>
            <div className='flex justify-between text-[#64748B] text-[14px] font-[500] leading-[17.5px] italic bg-[#CBD5E1]/30 px-[48px] py-[24px] border-y-2 border-[#E2E8F0]'>
                <p className='flex-1 text-left'>Date</p>
                <p className='flex-1 text-left'>Transaction amount</p>
                <p className='flex-1 text-left'>Transaction ID</p>
                <p className='flex-1 text-left'>type</p>
            </div>
            <div className='w-full'>
                {data.map(item => {
                return (
                        <div className='flex justify-between text-[14px] font-[500] leading-[17.5px] px-[48px] py-[24px] border-t border-[#E2E8F0]' key={item.id}>
                            <p className='flex-1 text-left'>{item.date}</p>
                            <p className={`flex-1 text-left ${item.transferMoney === 'In' ? 'text-[#65A30D]':'text-[#DC2626]'}`}>Rs {item.amount}</p>
                            <p className='flex-1 text-left'>{item.transactionId}</p>
                            <p className='flex-1 text-left'>{item.type}</p>
                        </div>
                    )})}
                    {!data.length && (
                        <div className='text-center text-[#64748B] text-[14px] font-[500] leading-[17.5px] italic bg-[#CBD5E1]/30 px-[48px] py-[24px] border-y-2 border-[#E2E8F0]'>
                            No transaction history
                        </div>
                    )}
            </div>
        </div>
      </div>
      {/* <div>
        <div className='flex justify-between items-center mb-[16px]'>
          <div className='text-[18px] font-[700] leading-[22.5px] tracking-[0.414px]'>
            Coupon Mangment
          </div>
          <button className='text-white text-[16px] font-[500] leading-[20px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]' onClick={()=>setShowCouponPopUp(true)}>+ Create coupon</button>
        </div>
        <div className='w-full border border-[#E2E8F0] rounded-[8px]'>
            <div className='flex justify-between text-[#64748B] text-[14px] font-[500] leading-[17.5px] italic  bg-[#FAFAFA] px-[48px] py-[24px] rounded-t-[8px] border-b border-[#E2E8F0]'>
                <p className='flex-1 text-left'>Status</p>
                <p className='flex-1 text-left'>Coupon Name</p>
                <p className='flex-1 text-left'>Coupon Type</p>
                <p className='flex-1 text-left'>Discount Value</p>
                <p className='flex-1 text-left'>Expiry</p>
                <p className='flex-1 text-left'></p>
            </div>
            <div className='w-full'>
                {coupons.map(item => {
                return (
                        <div className='flex justify-between text-[14px] font-[500] leading-[17.5px] px-[48px] py-[24px] border-t border-[#E2E8F0]' key={item.id}>
                            <p className={`flex-1 text-left ${item.status === 'Active' ? 'text-[#65A30D]': item.status === 'Expired' ? 'text-[#94A3B8]' : 'text-[#DC2626]'}`}>{item.status}</p>
                            <p className='flex-1 text-left'>{item.couponName}</p>
                            <p className='flex-1 text-left'>{item.couponType}</p>
                            <p className='flex-1 text-left'>{item.discounValue}</p>
                            <p className='flex-1 text-left'>{item.expiry}</p>
                            <div className='flex-1 text-left'><ToggleButton permission={item.status === 'Active'}/></div>
                        </div>
                    )})}
            </div>
        </div>
      </div> */}
    </div>
  )
}
