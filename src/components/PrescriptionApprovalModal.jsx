import React, { useRef, useState } from 'react'
// import uploadFile from '../assets/uploadFile.svg'
import downloadIcon from '../assets/download-arrow.svg'
import deleleIcon from '../assets/deleteDark.svg'
export default function PrescriptionApprovalModal(props) {
    const [saveModal, setSaveModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [flag, setFlag] = useState(true);
    const fileRef = useRef(null);
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0'>
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.setApproveModal(false)}}></div>
      {flag && <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[12px] bg-white w-[724px] py-[16px] rounded-[8px] border border-[#CBD5E1]'>
            <div className='flex justify-between px-[16px] py-[8px]'>
                <h1 className='text-[16px] font-HelveticaNeueBold leading-[20px]'>Prescription Approval</h1>
                <button className='text-[24px]' onClick={()=>{props.setApproveModal(false)}}>&times;</button>
            </div>
            <div className='px-[16px]'>
                <div className='flex flex-col justify-between'>
                        <div className='flex flex-col gap-[4px]'>
                            <div className='flex justify-between bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-full'><p className='text-[14px] font-[400] leading-[17.5px]'>XDAHAollalsps..... .pdf</p><button className='text-[#7487FF] text-[12px] leading-[15px] font-HelveticaNeueMedium'>VIEW</button></div>
                            <p className='flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Add URL Link</p><span className="text-red-500">*</span></p>
                        </div>
                    <div className='flex gap-[7px] py-[16px]'>
                        <img src={downloadIcon} alt="download" onClick={()=>{setFlag(false); setSaveModal(true)}} />
                        <img src={deleleIcon} alt="delete" onClick={()=>{setFlag(false); setDeleteModal(true)}} />
                    </div>
                    <hr/>
                </div>
            </div>
            <div className='flex justify-between px-[16px]'>
                <button className='flex-1 text-[#031B89] text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] px-[16px] py-[12px] rounded-[4px]' onClick={()=>{setFlag(false); setDeleteModal(true)}}>Reject prescription</button>
                <button className='flex-1 text-white text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]' onClick={()=>{setFlag(false); setSaveModal(true)}}>Approve Prescription</button>
            </div>
        </div>}
        {saveModal && <div className='fixed top-0 left-0 right-0 bottom-0'>
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.setApproveModal(false); setSaveModal(false)}}></div>
                <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
                    <h1 className="text-[16px] font-[500] leading-[20px]">Approve prescription?</h1>
                    <p className="text-[12px] font-[400] leading-[15px]">This will mark the order into processing</p>
                    <div className="flex">
                        <button className="flex-1 text-white bg-[#031B89] px-[16px] py-[8px] rounded-[4px]" onClick={() =>{props.setApproveModal(false); setSaveModal(false)}}>Approve</button>
                        <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() =>{props.setApproveModal(false); setSaveModal(false)}}>Cancel</button>
                    </div>
                </div>
        </div>}
        {deleteModal && <div className='fixed top-0 left-0 right-0 bottom-0'>
                <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.setApproveModal(false); setDeleteModal(false)}}></div>
                <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
                    <h1 className="text-[16px] font-[500] leading-[20px]">Reject the prescription?</h1>
                    <p className="text-[12px] font-[400] leading-[15px]">The user will have to re-upload a prescription if you reject it.</p>
                    <div className="flex">
                        <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={() =>{setDeleteModal(false); props.setApproveModal(false)}}>Reject</button>
                        <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() =>{props.setApproveModal(false);setDeleteModal(false)}}>Cancel</button>
                    </div>
                </div>
        </div>}
    </div>
  )
}