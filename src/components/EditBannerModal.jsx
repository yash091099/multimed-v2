    import React, { useRef, useState } from 'react'
    import uploadFile from '../assets/uploadFile.svg'
    import bannerImage from '../assets/bannerImage.png';
    import downloadIcon from '../assets/download-arrow.svg'
    import deleleIcon from '../assets/deleteDark.svg'
    export default function EditBannerModal(props) {
        const [saveModal, setSaveModal] = useState(false);
        const [deleteModal, setDeleteModal] = useState(false);
        const fileRef = useRef(null);
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0'>
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>{props.setOpenEditBannerModal(false)}}></div>
        <div className='fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[12px] bg-white w-[724px] py-[16px] rounded-[8px] border border-[#CBD5E1]'>
                <div className='flex justify-between px-[16px] py-[8px]'>
                    <h1 className='text-[16px] font-HelveticaNeueBold leading-[20px]'>Edit banner</h1>
                    <button className='text-[24px]' onClick={()=>{props.setOpenEditBannerModal(false)}}>&times;</button>
                </div>
                {/* <div className='px-[16px]'>
                    <div className='flex justify-between'>
                        <div className='flex gap-[7px]'>
                            <img src={downloadIcon} alt="download" onClick={()=>setSaveModal(true)} />
                            <img src={deleleIcon} alt="delete" onClick={()=>setDeleteModal(true)} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[16px] py-[16px]'>
                        <div className='flex justify-center items-center h-[223px] bg-[#F1F5F9] rounded-[4px]'>
                            <img className="w-full h-[223px] object-cover rounded-[4px]" src={bannerImage} alt="upload file" onClick={()=>{fileRef.current.click();}}/>
                            <input ref={fileRef} type='file' className='hidden'  />
                        </div>
                    </div>
                </div> */}
                <div className='px-[16px]'>
                    <div className='flex justify-between' style={{display:"flex",justifyContent:"end"}}>
                        {/* <p className='text-[#475569] text-[12px] leading-[15px] font-HelveticaNeueItalic'>Image name</p> */}
                        <div className='flex gap-[7px]'>
                            <img src={downloadIcon} alt="download" onClick={()=>setSaveModal(true)} />
                            <img src={deleleIcon} alt="delete" onClick={()=>setDeleteModal(true)} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[16px] py-[16px]'>
                        <div className='flex justify-start items-center h-[223px] rounded-[4px]'>
                            <img className="w-[254px] h-[223px] object-cover rounded-[4px]" src={bannerImage} alt="upload file" onClick={()=>{fileRef.current.click();}}/>
                            <input ref={fileRef} type='file' className='hidden'  />
                        </div>
                    </div>
                </div>
                <div className='px-[16px]'>
                    <p className='flex gap-[4px] text-[10px] font-HelveticaNeueItalic leading-[12.5px] italic mb-[4px]'><p className="text-[#64748B] ">Add URL Link</p><span className="text-red-500">*</span></p>
                    <input type="text" className='outline-none text-[14px] font-[400] leading-[17.5px] bg-[#FAFAFA] border border-[#E2E8F0] p-[12px] rounded-sm w-full' placeholder="sdjsdjsocop" />
                </div>
                <div className='text-[#7487FF] text-[14px] leading-[17.5px] font-HelveticaNeueMedium px-[16px]'>
                    + Add Mobile Banner
                </div>
                <div className='flex justify-between px-[16px]'>
                    <button className='flex-1 text-[#031B89] text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] px-[16px] py-[12px] rounded-[4px]' onClick={()=>{props.setOpenEditBannerModal(false)}}>Cancel</button>
                    <button className='flex-1 text-white text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]' onClick={()=>{props.setOpenEditBannerModal(false)}}>Save</button>
                </div>
                {saveModal && <div className='fixed top-0 left-0 right-0 bottom-0'>
                        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>setSaveModal(false)}></div>
                        <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
                            <h1 className="text-[16px] font-[500] leading-[20px]">Downlaod this image?</h1>
                            <p className="text-[12px] font-[400] leading-[15px]">confirm if you want to download.img</p>
                            <div className="flex">
                                <button className="flex-1 text-white bg-[#031B89] px-[16px] py-[8px] rounded-[4px]" onClick={() =>setSaveModal(false)}>Save</button>
                                <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setSaveModal(false)}>Cancel</button>
                            </div>
                        </div>
                </div>}
                {deleteModal && <div className='fixed top-0 left-0 right-0 bottom-0'>
                        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/30' onClick={()=>setDeleteModal(false)}></div>
                        <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
                            <h1 className="text-[16px] font-[500] leading-[20px]">Delete?</h1>
                            <p className="text-[12px] font-[400] leading-[15px]">This is a permanent action and cannot be undone.</p>
                            <div className="flex">
                                <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={() =>setDeleteModal(false)}>Delete</button>
                                <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setDeleteModal(false)}>Cancel</button>
                            </div>
                        </div>
                </div>}
            </div>
        </div>
    )
    }
