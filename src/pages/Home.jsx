import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Context from '../context/AppContext'
import alertImage from '../assets/alertNotification.svg';
import notificationImage from '../assets/notificationI1.svg'
import SaveChangesModal from '../components/SaveChangesModal';

export default function Home() {
  const [data, setData] = useState(
    [
      // {
      //   id: 3,
      //   title: 'Stock Expiry alert!',
      //   product: 'Dolonext DT 500mg',
      //   text: 'batch number : DJSDHSUDOL1344 expires in 1 day!',
      //   timeStemp: 'Oct 20 2023, 07:45 am',
      //   type: 'Alert',
      //   status: 'unread',
      // },
      // {
      //   id: 4,
      //   title: 'Stock Expiry alert!',
      //   product: 'Dolonext DT 500mg',
      //   text: 'batch number : DJSDHSUDOL1344 expires in 1 day!',
      //   timeStemp: 'Oct 20 2023, 07:45 am',
      //   type: 'Alert',
      //   status: 'unread',
      // }
])
  const {saveModal, setSaveModal} = useContext(Context);
  return (
    <div className='flex'>
            <AdminNav />
            <Outlet />
            <div className='flex flex-col gap-2 fixed top-8 right-1'>
              {data.map(item => (<div className={`flex justify-between items-center gap-8 w-full px-[12px] py-[16px] shadow-xl rounded-md ${item.type ==='Alert' ? 'border-l-4 border-[#F87171] bg-[#FEF2F2]':'border-l-4 border-[#84CC16] bg-[#F7FEE7]'}`}>
                  <div className='flex gap-[12px] items-center'>
                      <img className={`p-[12px] rounded-[50%] ${item.type === 'Alert' ? 'bg-[#F87171]':'bg-[#7487FF]'}`} src={item.type === 'Alert' ? alertImage:notificationImage} alt='notification' />
                      <div className='flex flex-col gap-[4px]'>
                          <div className='flex justify-between'><h1 className='text-[16px] font-[500] leading-[20px]'>{item.title}</h1><p className='text-[12px] font-[400]'>12 min ago</p></div>
                          <div className='flex'><h2 className='text-[14px] font-[400] leading-[17.5px]'>Your Product: </h2><h2 className='text-[#031B89] text-[14px] font-[400] leading-[17.5px]'>{item.product}</h2></div>
                          <h2 className='text-[14px] font-[400] leading-[17.5px]'>{item.text}</h2>
                          {/* <p className='text-[12px] font-[400] leading-[15px]'>{item.timeStemp}</p> */}
                          {item.title === 'Stock Expiry alert!' && <span className='text-[#7487FF] text-[16px] font-[700] leading-[20px]'>Got to Product</span>}
                      </div>
                  </div>
                  <button className='text-[24px]' onClick={()=>{setData(data.filter(i => i.id!==item.id))}}>&times;</button>
              </div>))}
            </div>
    </div>
  )
}
