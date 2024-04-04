import React, { useState } from 'react'
import CartItem from './CartItem'
import CouponLogo from '../assets/CouponLogo.svg';
import Check from '../assets/check.svg';
import HomeLogo from '../assets/homeLogo.svg';
import BillLogo from '../assets/BillLogo.svg';
import { useNavigate } from 'react-router-dom';
import errorsvg from '../assets/e1.svg';
import RemoveItemModal from './RemoveItemModal';

export default function OrderDetailsComponent() {
    const [removeItem,setRemoveItem] = useState(false);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(false);
  return (
   <div className='flex justify-between gap-[20px] bg-[#FAFAFA]'>
        <div className='flex flex-col gap-[16px] w-full'>

            <div className='flex flex-col gap-[16px] w-full'>
            <h1 className='text-[#475569] text-[12px] font-[500] leading-[15px]'>UNAVAILABLE ITEMS</h1>
            <div className='flex justify-between'><div className='flex gap-[4px] items-center'><img src={errorsvg} alt="error" /><h1 className='text-[#EF4444] text-[14px] font-[500] leading-[15px]'>These items are not available in your cart anymore!</h1></div><button className='text-[#EF4444] text-[14px] font-[500] leading-[15px]' onClick={()=>setRemoveItem(true)}>Remove Items</button></div>
                <CartItem prescriptionNeeded={true} />
                <CartItem prescriptionNeeded={true} />
                <CartItem prescriptionNeeded={true} />
            </div>
            <div className='flex flex-col gap-[16px] w-full'>
                <h1 className='text-[#475569] text-[12px] font-[500] leading-[15px]'>ITEMS NEEDING PRESCRIPTION</h1>
                <CartItem prescriptionNeeded={true} flag={true} />
                <CartItem prescriptionNeeded={true} flag={true} />
                <CartItem prescriptionNeeded={true} flag={true} />
                <CartItem prescriptionNeeded={true} flag={true} />
            </div>
        </div>
        <div className='flex flex-col w-[620px] py-[32px]'>
            <div className='flex flex-col gap-[16px] px-[12px] py-[24px] bg-white border-b border-dashed border-[#CBD5E1]'>
                <div className='flex gap-[4px] items-center'>
                    <img src={CouponLogo} alt="Coupon Logo" />
                    <p className='text-[#0F172A] text-[16px] leading-[20px]'>Coupons</p>
                </div>
                <div className='flex flex-col gap-[4px]'>
                    <div className='flex justify-between text-[#0F172A] text-[14px] leading-[17.5px]'><p>Applied: WELCOME30</p><button className='text-[24px]'>&times;</button></div>
                    <div className='flex gap-[4px] text-[12px] leading-[15px]'><p className='text-[#0F172A]'>You save </p><p className='text-[#4D7C0F]'>Rs. 35.99</p></div>
                </div>
                {flag && <button className='text-[#031B89] text-[14px] leading-[17.5px] border-2 border-[#031B89] w-full rounded-[4px] px-[16px] py-[12px]' onClick={()=>{navigate('/home/orders/order-details/order-tracking')}}>Track Order</button>}
            </div>
            <div className='flex flex-col gap-[16px] px-[12px] py-[24px] bg-white border-b border-dashed border-[#CBD5E1]'>
                <div className='flex gap-[4px] items-center'>
                    <img src={Check} alt="Coupon Logo" />
                    <p className='text-[#0F172A] text-[16px] leading-[20px]'>Prescription</p>
                </div>
                <div className='flex justify-between items-center bg-[#F8FAFC] px-[4px] py-[12px]'>
                    <div className='flex gap-[4px] items-center'><img className="w-[16px]" src={Check} alt="Check" /><p className='text-[14px] leading-[17.5px]'>Prescription uploaded: abcdefg_hijklmn.pdf</p></div>
                    <button className='text-[24px] text-[#475569]'>&times;</button>
                </div>
                {!flag && <button className='text-[#031B89] text-[14px] leading-[17.5px] border-2 border-[#031B89] w-full rounded-[4px] px-[16px] py-[12px]' onClick={()=>setFlag(true)}>Approve Prescription</button>}
            </div>
            <div className='flex flex-col gap-[16px] px-[12px] py-[24px] bg-white border-b border-dashed border-[#CBD5E1]'>
                <div className='flex gap-[4px] items-center'>
                    <img src={BillLogo} alt="Bill Logo" />
                    <p className='text-[#0F172A] text-[16px] leading-[20px]'>Bill Summary</p>
                </div>
                <div className='flex flex-col gap-[12px] text-[12px] font-[400] leading-[15px] border-b border-[#94A3B8]'>
                    <div className='flex justify-between'>
                        <p>Item total (MRP) </p>
                        <p>Rs. 329</p>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <div className='flex justify-between'>
                            <p>Total Discount: </p>
                            <p>-Rs 200</p>
                        </div>
                        <div className='text-[#64748B] px-[24px]'>
                            <div className='flex justify-between'>
                                <p>Coupon</p>
                                <p>-Rs 34.49</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Wallet money: </p>
                                <p>-Rs 165.65</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between mb-[16px]'>
                        <p>Shipping fee</p>
                        <p>Free</p>
                    </div>
                </div>
                <div className='flex justify-between text-[16px] leading-[20px]'>
                    <div>Total Amount:</div>
                    <div>Rs. 129</div>
                </div>
            </div>
            <div className='flex flex-col gap-[16px] px-[12px] py-[24px] bg-white border-b border-dashed border-[#CBD5E1]'>
                <div className='flex justify-between'>
                    <div className='flex gap-[4px] items-center'>
                        <img src={HomeLogo} alt="home Logo" />
                        <p className='text-[#0F172A] text-[16px] leading-[20px]'>Delivering to:</p>
                    </div>
                    <button className='text-[#7487FF] text-[14px] leading-[17.5px]'>Change</button>
                </div>
                <div className='flex flex-col gap-[8px] text-[12px] leading-[15px] bg-[#F8FAFC] py-[8px] px-[4px]'>
                    <div className='font-HelveticaNeueMedium'>My House | Lajo Lakshman (9606041618)</div>
                    <div className='font-[400]'>123, Shapphire Street, Koramangala 5th Block, 560095</div>
                </div>
            </div>        
        </div>
        { removeItem && <RemoveItemModal setRemoveItem={setRemoveItem} />}
      </div>
  )
}
