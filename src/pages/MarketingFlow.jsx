import React, { useEffect, useRef, useState } from 'react';
import uploadFile from '../assets/uploadFile.svg';
import CreateBannerModal from '../components/CreateBannerModal';
import EditBannerModal from '../components/EditBannerModal';
import BannerImage from '../components/BannerImage';
import { GET_BANNERS, DELETE_BANNER } from '../context/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import LoaderOverlay from '../components/loadinOverlay';

export default function MarketingFlow() {
    const [openCreateBannerModal, setOpenCreateBannerModal] = useState(false);
    const [openEditBannerModal, setOpenEditBannerModal] = useState(false);
    const fileRef = useRef(null);
    const [deleteBanner, { loading: deleteLoading }] = useMutation(DELETE_BANNER);
    const [loading, setLoading] = useState(false);
    const { data, loading: queryLoading, refetch: refetchBanner } = useQuery(GET_BANNERS);
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        if (data) {
            setBanners(data.getBanners?.banners || []);
        }
    }, [data]);

    const handleDeleteBanner = async (id) => {
        setLoading(true); // Set loading state before starting deletion
        try {
            await deleteBanner({ variables: { id: id } });
            toast.success("Banner deleted successfully");
            refetchBanner();
        } catch (error) {
            console.error("Error deleting banner:", error);
            toast.error("Failed to delete banner");
        } finally {
            setLoading(false); // Set loading state after deletion attempt
        }
    };

    const handleRefetch = async () => {
        setLoading(true); // Set loading state before refetching
        try {
            await refetchBanner();
        } catch (error) {
            console.error("Error refetching banners:", error);
            toast.error("Failed to refetch banners");
        } finally {
            setLoading(false); // Set loading state after refetching
        }
    };

    return (
        <div className='flex flex-col gap-[48px] p-[48px] w-full'>
            <div className='flex items-center justify-between w-full'>
                <div>
                    <h1 className='text-[24px] font-[700] leading-[30px]'>Banner Management</h1>
                    <p className='text-[14px] font-[400] leading-[17.5px]'>Star the first image to appear on the website. Select upto 5 images(jpg,gif,mp4)</p>
                </div>
                {banners?.length <= 5 && (
                    <button className='px-[16px] py-[12px] w-[210px] text-[#031B89] text-[14px] font-[500] leading-[17.5px] border-2 border-[#031B89] rounded-[4px]' onClick={() => { setOpenCreateBannerModal(true) }}>
                        Create Banner
                    </button>
                )}
            </div>
            <div className='grid md:grid-cols-2 gap-[16px]'>
                {banners.map(item => (
                    <div key={item.id} className='flex flex-col gap-[16px] px-[24px] py-[16px] rounded-[8px] shadow-md'>
                        <BannerImage item={item} refetchBanner={handleRefetch} handleDelete={handleDeleteBanner} />
                    </div>
                ))}
                {!banners?.length && <p className='text-[14px] font-[700] leading-[17.5px] text-end'>No banners available</p>}
            </div>
            <input ref={fileRef} type='file' className='hidden' />
            {openCreateBannerModal && <CreateBannerModal banners={banners} length={banners.length} refetchBanner={handleRefetch} setOpenCreateBannerModal={setOpenCreateBannerModal} />}
            {openEditBannerModal && <EditBannerModal setOpenEditBannerModal={setOpenEditBannerModal} />}
            {(loading || deleteLoading || queryLoading) && <LoaderOverlay />}
        </div>
    )
}
