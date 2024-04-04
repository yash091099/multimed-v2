import React, { useRef, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import uploadFile from '../assets/uploadFile.svg';
import downloadIcon from '../assets/download-arrow.svg';
import deleteIcon from '../assets/deleteDark.svg';
import { toast } from 'react-toastify';
import { UPDATE_BANNER } from '../context/mutation';
import LoaderOverlay from './loadinOverlay';
import useS3 from '../context/useS3Upload';

export const CREATE_BANNER = gql`
  mutation createBanner($url: String!, $mobileUrl: String!, $index: Int!) {
    createBanner(input: { url: $url, mobileUrl: $mobileUrl , index: $index}) {
      status
      message
      banner {
        id
        url
        mobileUrl
        index
      }
    }
  }
`;

export default function CreateBannerModal({ setOpenCreateBannerModal, refetchBanner, length, item }) {
  const { uploadImageOnS3 } = useS3();

  const [saveModal, setSaveModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [url, setUrl] = useState(item?.url || '');
  const [mobileUrl, setMobileUrl] = useState(item?.mobileUrl || '');
  const [isSavingDisabled, setIsSavingDisabled] = useState(true);
  const fileRef = useRef(null);
  const [createBanner] = useMutation(CREATE_BANNER);
  const [updateBanner] = useMutation(UPDATE_BANNER);
const[loading,setLoading]=useState(false)

const handleFileUpload = async (file) => {
  setLoading(true);
  try {
    const uploadedUrl = await uploadImageOnS3({
      file,
      title: 'banner',
      type: 'banner',
    });    console.log(uploadedUrl, "uploaded url");
    setUrl(uploadedUrl);
    setMobileUrl(uploadedUrl);
    setIsSavingDisabled(false);
  } catch (error) {
    console.error("Error uploading file:", error.message);
  } finally {
    setLoading(false);
  }
};
const checkImageResolution = (file, minWidth, minHeight) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const isValid = img.width >= minWidth && img.height >= minHeight;
      resolve(isValid);
    };
    img.onerror = () => {
      resolve(false);
    };
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.onerror = () => {
      resolve(false);
    };
    reader.readAsDataURL(file);
  });
};


  const handleSave = async () => {
    if (!url || !mobileUrl) {
      return;
    }
    setLoading(true);
    try {
      await createBanner({ variables: { url, mobileUrl, index: length + 1 } });
      toast.success('Banner Added successfully!');
      refetchBanner();
      setOpenCreateBannerModal(false);
    } catch (error) {
      console.error('Error saving banner:', error.message);
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  const updateBannerFunc = async () => {
    if (!url || !mobileUrl) {
      return;
    }
    setLoading(true);
    try {
      await updateBanner({ variables: { url, mobileUrl, index: length,id: item?.id } });
      toast.success('Banner Updated successfully!');
      refetchBanner();
      setOpenCreateBannerModal(false);
    } catch (error) {
      console.error('Error updating banner:', error.message);
      toast.error("Error While updating banner!!");
    }finally{
      setLoading(false)
    }
  };

  const handleDownload = () => {
    if (!url) {
      setSaveModal(false);
      return;
    }
    window.open(url, '_blank');
    setSaveModal(false);
  };

  const handleDelete = () => {
    setUrl('');
    setMobileUrl('');
    setDeleteModal(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30" onClick={() => setOpenCreateBannerModal(false)}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] flex flex-col gap-[12px] bg-white w-[724px] py-[16px] rounded-[8px] border border-[#CBD5E1]">
        <div className="flex justify-between px-[16px] py-[8px]">
          <h1 className="text-[16px] font-HelveticaNeueBold leading-[20px]">{item ? 'Update' : 'Create'} banner</h1>
          <button className="text-[24px]" onClick={() => setOpenCreateBannerModal(false)}>&times;</button>
        </div>
        <div className="px-[16px]">
          <div className="flex justify-between" style={{display:"flex",justifyContent:"end"}}>
            {/* <p className="text-[#475569] text-[12px] leading-[15px] font-HelveticaNeueItalic">Image name</p> */}
            <div className="flex gap-[7px] " >
              <img src={downloadIcon} alt="download" onClick={() => setSaveModal(true)} />
              <img src={deleteIcon} alt="delete" onClick={() => setDeleteModal(true)} />
            </div>
          </div>
          <div className="flex flex-col gap-[16px] py-[16px]">
            {!url && <div className="flex justify-center items-center h-[223px] bg-[#F1F5F9] rounded-[4px]">
              <div className="cursor-pointer flex flex-col gap-[8px] justify-center items-center" onClick={() => fileRef.current.click()}>
                <img src={uploadFile} alt="upload file" />
                <p className="text-[#64748B] text-[14px] font-[500] leading-[17.5px]">Upload image</p>
              </div>
              <input ref={fileRef} type="file" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0])} />
            </div>}
            {url && <img src={url} alt="preview" className="w-full" />}
          </div>
        </div>
        <div className="flex justify-between px-[16px]">
          <button className="flex-1 text-[#031B89] text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] px-[16px] py-[12px] rounded-[4px]" onClick={() => setOpenCreateBannerModal(false)}>Cancel</button>
          <button
            className={`flex-1 text-white text-center text-[14px] font-HelveticaNeueMedium leading-[17.5px] bg-[#031B89] px-[16px] py-[12px] rounded-[4px]}`}
            onClick={item ? updateBannerFunc : handleSave}
          >
            {item ? 'Update' : 'Save'}
          </button>
        </div>
        {saveModal && <div className="fixed top-0 left-0 right-0 bottom-0">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30" onClick={() => setSaveModal(false)}></div>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
            <h1 className="text-[16px] font-[500] leading-[20px]">Download this image?</h1>
            <p className="text-[12px] font-[400] leading-[15px]">Confirm if you want to download.img</p>
            <div className="flex">
              <button className="flex-1 text-white bg-[#031B89] px-[16px] py-[8px] rounded-[4px]" onClick={handleDownload}>Download</button>
              <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setSaveModal(false)}>Cancel</button>
            </div>
          </div>
        </div>}
        {deleteModal && <div className="fixed top-0 left-0 right-0 bottom-0">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30" onClick={() => setDeleteModal(false)}></div>
          <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
            <h1 className="text-[16px] font-[500] leading-[20px]">Delete?</h1>
            <p className="text-[12px] font-[400] leading-[15px]">This is a permanent action and cannot be undone.</p>
            <div className="flex">
              <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={handleDelete}>Delete</button>
              <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => setDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>}
      </div>
      {loading &&<LoaderOverlay/>}
    </div>
  );
}
