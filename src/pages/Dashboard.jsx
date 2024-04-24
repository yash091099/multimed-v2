import React, { useEffect, useState } from 'react'
import G1 from '../assets/g1.svg'
import G2 from '../assets/g2.svg'
import G3 from '../assets/g3.svg'
import IncreaseArrow from '../assets/IncreaseArrow.svg';
import IncreaseArrow3 from '../assets/IncreaseArrow3.svg';
import DecreaseArrow from '../assets/downArrowG2.svg';
import { Link } from 'react-router-dom';
import DateRangeSelector from '../components/DateRangeSelector';
import OrdersSwitch from '../components/OrdersSwitch';
import Confetti from 'react-confetti';

export default function Dashboard() {
    const orders = [
        {
            "id": "12993382JXD",
            "orderDate": "11th September 2023",
            "totalNoOfItems":"10",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approval pending",
        },
        {
            "id": "12993482JXD",
            "orderDate": "12th September 2023",
            "totalNoOfItems":"3",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approved",
        },
        {
            "id": "12995382JXD",
            "orderDate": "12th September 2023",
            "totalNoOfItems":"14",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approved",
        },
        {
            "id": "12993362JXD",
            "orderDate": "13th September 2023",
            "totalNoOfItems":"22",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approval pending",
        },
        {
            "id": "12993782JXD",
            "orderDate": "13th September 2023",
            "totalNoOfItems":"27",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approval pending",
        },
        {
            "id": "12983382JXD",
            "orderDate": "13th September 2023",
            "totalNoOfItems":"13",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approved",
        },
        {
            "id": "12999382JXD",
            "orderDate": "13th September 2023",
            "totalNoOfItems":"14",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Approval pending",
        },
    ]
    const onTheWayData = [
        {
            "id": "12999382JXD",
            "orderDate": "11th September 2023",
            "totalNoOfItems":"10",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Order Delivered",
        },
        {
            "id": "12991382JXD",
            "orderDate": "11th September 2023",
            "totalNoOfItems":"10",
            "amount":"1243",
            "deliveryAddress":"560023",
            "status":"Order on the way: Expected to arrive by 3pm, 11 Sep",
        },
    ]
    const [dataProcessing, setDataProcessing] = useState(orders);
    const [dataOnTheWay, setDataOnTheWay] = useState(onTheWayData);
    const [stockData, setStockData] = useState([{id: 1, title: 'Stock Expiry alert!', type: 'Alert', product: 'Dolonext DT 500mg', batchNumber: 'DJSDHETUXY3933', expireIn: '1 week'}])
    const [flag, setFlag] = useState(false);
    const [dateRange, setDateRange] = useState('This week');
    const [explode, setExplode] = useState(false);

    useEffect(() => {
        // Trigger confetti on mount
        if(localStorage.getItem('isLoginPage')){
        setExplode(true);
        const timer = setTimeout(() => {
          // Stop confetti after 2 seconds
          localStorage.removeItem('isLoginPage');
          setExplode(false);
        }, 5000);

        return () => clearTimeout(timer);
      }
      }, []);

  return (
    <div className='flex flex-col gap-[24px] p-[48px] w-full font-HelveticaNeue'>
              {explode && <Confetti />}

        <div  className='flex justify-between items-center w-full'>
            <h1 className='text-[24px] font-[700] leading-[30px]'>Dashboard</h1>
            <div className='w-[230px]'>
                <p className='text-[#64748B] text-[10px] font-[300] italic'>Select Date Range</p>
                <DateRangeSelector setRange={setDateRange} />
                </div>
            {/* <div>
                <p className='text-[#64748B] text-[10px] font-[300] leading-[12.5px] italic'>Select Date Range</p>
                <div className='text-[14px] font-[400] leading-[17.5px] border border-[#E2E8F0] px-[12px] py-[8px] w-[230px]'><select className='outline-none bg-transparent w-full'><option>This week</option></select></div>
            </div> */}
        </div>
        <div className='flex flex-col gap-[16px]'>
            <div className='text-[16px] font-[700] leading-[20px]'>Analytics</div>
            <div className='flex gap-[12px]'>
                <div className='flex flex-col gap-[16px] bg-white shadow-md p-[16px] rounded-[8px] w-[364px]'>
                    <h1 className='text-[#94A3B8] text-[12px] font-[500] leading-[15px]'>TOTAL EARNINGS</h1>
                    <img className='w-[144px]' src={G1} alt="graph" />
                    <div className='flex flex-col gap-[4px]'>
                        <div className='flex gap-[4px] items-center'>
                            <img  className='w-[16px]' src={IncreaseArrow} alt='status'/>
                            <p className='text-[#65A30D] text-[12px] font-[400] leading-[15px]'>20% more than last week</p>
                        </div>
                        <h1 className='text-[40px] font-[700] leading-[50px]'>Rs 34,056</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-[16px] bg-white shadow-md p-[16px] rounded-[8px] w-[364px]'>
                    <h1 className='text-[#94A3B8] text-[12px] font-[500] leading-[15px]'>TOTAL CUSTOMERS</h1>
                    <img className='w-[144px]' src={G2} alt="graph" />
                    <div className='flex flex-col gap-[4px]'>
                        <div className='flex gap-[4px] items-center'>
                            <img  className='w-[16px]' src={DecreaseArrow} alt='status'/>
                            <p className='text-[#EF4444] text-[12px] font-[400] leading-[15px]'>30% less than last week</p>
                        </div>
                        <h1 className='text-[40px] font-[700] leading-[50px]'>340</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-[16px] bg-white shadow-md p-[16px] rounded-[8px] w-[364px]'>
                    <h1 className='text-[#94A3B8] text-[12px] font-[500] leading-[15px]'>TOTAL ORDERS TODAY</h1>
                    <img className='w-[144px]' src={G3} alt="graph" />
                    <div className='flex flex-col gap-[4px]'>
                        <div className='flex gap-[4px] items-center'>
                            <img  className='w-[16px]' src={IncreaseArrow3} alt='status'/>
                            <p className='text-[#FBA79B] text-[12px] font-[400] leading-[15px]'>2% more than last week</p>
                        </div>
                        <h1 className='text-[40px] font-[700] leading-[50px]'>340</h1>
                    </div>
                </div>
            </div>
            <div className='text-[16px] font-[700] leading-[20px]'>On-going info</div>
            <div className='flex gap-[12px] table-scroll '>
                <div className='bg-white w-full p-[16px] rounded-[8px] max-h-[470px] overflow-x-auto '>
                    <div className='flex justify-between items-center w-full mb-[16px]'><h1 className='text-[#94A3B8] text-[14px] font-HelveticaNeueMedium'>LIVE ORDERS</h1><div className='flex gap-[8px]'><p className={`text-[14px] font-HelveticaNeueMedium ${flag ? 'text-[#94A3B8]':''}`}>Processing orders</p><OrdersSwitch permission={flag} setPermission={setFlag} /><p className={`text-[14px] font-HelveticaNeueMedium ${flag ? '':'text-[#94A3B8]'}`}>Ongoing orders</p></div></div>
                    {/* <div> */}
                    <div className='flex flex-col gap-[8px]'>
                    {!flag ? dataProcessing.map(item => (<div key={item.id} className='flex flex-col gap-[4px] w-full border border-[#CBD5E1] rounded-[4px]'>
                                <div className={`flex justify-between px-[24px] py-[8px] rounded-t-[4px] ${item.status === "Approval pending" ? 'bg-[#F8FAFC]':'bg-[#F7FEE7]'}`}><h1>Perscription: {item.status}</h1> {item.status === "Approved" ? <p className='cursor-pointer text-[#7487FF] text-[14px] font-HelveticaNeueMedium leading-[17.5px]'>Edit</p>:<p className='cursor-pointer text-[#7487FF] text-[14px] font-HelveticaNeueMedium leading-[17.5px]' onClick={()=>{setDataProcessing(dataProcessing.map(i=>{ if(i.id===item.id) i.status = "Approved"; return i;}))}}>Approve</p>}</div>
                                <div className='flex justify-between px-[24px] py-[12px]'>
                                    <div className='flex items-center gap-[4px]'>
                                        <h1 className='text-[16px] font-HelveticaNeueMedium leading-[20px]'>{item.id}</h1>
                                    </div>
                                    <div className='flex gap-[24px]'>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Date of Order</p>
                                            <h1 className='text-[12px] font-[500] leading-[15px]'>{item.orderDate}</h1>
                                        </div>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Total No items</p>
                                            <h1 className='text-[12px] font-[500] leading-[15px]'>{item.totalNoOfItems}</h1>
                                        </div>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Order Total:</p>
                                            <h1 className='text-[12px] font-[500] leading-[15px]'>Rs {item.amount} (Paid)</h1>
                                        </div>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Delivering to:</p>
                                            <h1 className='text-[#334155] text-[12px] font-[500] leading-[15px]'>{item.deliveryAddress}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>))
                            : onTheWayData.map(item => (<div className='flex flex-col gap-[4px] w-full border border-[#CBD5E1] rounded-[4px]' key={item.id}>
                                <div className={`flex justify-between px-[24px] py-[8px] rounded-t-[4px] ${item.status === "Order Delivered" ? 'bg-[#F7FEE7]':'bg-[#F8FAFC]'}`}><h1>{item.status}</h1><p className='text-[#7487FF] text-[14px] font-HelveticaNeueMedium leading-[17.5px]'></p></div>
                                <div className='flex justify-between px-[24px] py-[12px]'>
                                    <div className='flex items-center gap-[4px]'>
                                        <h1 className='text-[16px] font-HelveticaNeueMedium leading-[20px]'>{item.id}</h1>
                                    </div>
                                    <div className='flex gap-[24px]'>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Date of Order</p>
                                            <h1 className='text-[12px] font-[500] leading-[15px]'>{item.orderDate}</h1>
                                        </div>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Total No items</p>
                                            <h1 className='text-[12px] font-[500] leading-[15px]'>{item.totalNoOfItems}</h1>
                                        </div>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Order Total:</p>
                                            <h1 className='text-[12px] font-[500] leading-[15px]'>Rs {item.amount} (Paid)</h1>
                                        </div>
                                        <div>
                                            <p className='text-[#64748B] text-[10px] font-[400] leading-[12.5px] italic'>Delivering to:</p>
                                            <h1 className='text-[#334155] text-[12px] font-[500] leading-[15px]'>{item.deliveryAddress}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>))}
                        </div>
                    {/* </div> */}
                </div>
                <div className='flex flex-col gap-[8px] bg-white md:w-[620px] p-[16px] rounded-[8px]'>
                    <p className='text-[#94A3B8] text-[12px] font-[500] leading-[15px]'>STOCK MANAGMENT</p>
                    <div>
                        <div className={`flex flex-col gap-[4px] px-[8px] py-[12px] rounded-[4px] ${stockData[0].type === 'Alert' ? 'bg-[#FEF2F2]': 'bg-[#F7FEE7 ]'}`}>
                            <div className='flex justify-between items-center'><h1 className='text-[14px] font-HelveticaNeueBold leading-[17.5px]'>{stockData[0].title}</h1><button className='outline-none bg-transparent'>&times;</button></div>
                            <p className='text-[14px] font-[400] leading-[17.5px]'>Your product: <Link to={'#'}  className='text-[#031B89] font-HelveticaNeueBold underline'>{stockData[0].product}</Link></p>
                            <p className='text-[14px] font-[400] leading-[17.5px]'>Batch number: {stockData[0].batchNumber} expires in {stockData[0].expireIn}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
