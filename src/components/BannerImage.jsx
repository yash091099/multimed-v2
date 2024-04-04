import React, { useEffect, useState } from "react";
import bannerImage from "../assets/bannerImage.png";
import CreateBannerModal from "./CreateBannerModal";
export default function BannerImage({
  item,
  handleDelete,
  refetchBanner
}) {
  const [flag, setFlag] = useState(false);
  const [editModal, setEditModal] = useState(false);
  return (
    <>
      <div className="relative flex justify-between items-center">
        <p className="text-[14px] font-[700] leading-[17.5px]">{item.file}</p>
        <p
          className="cursor-pointer"
          onClick={() => {
            setFlag((prev) => !prev);
          }}
        >
          ...
        </p>
        {flag  && (
          <div className="absolute top-5 right-1 bg-white rounded p-2">
            <p
              className="cursor-pointer border-b border-[#F1F5F9] text-[12px] font-[400]"
              onClick={() => {
                setEditModal(true)
                setFlag(false);
              
              }}
            >
              Edit
            </p>
            <p
              className="cursor-pointer border-b border-[#F1F5F9] text-[12px] font-[400]"
              onClick={() => {
                handleDelete(item.id);
                setFlag(false);
              }}
            >
              Delete
            </p>
          </div>
        )}
      </div>
      <img
        className="h-[223px] w-full object-cover rounded-[4px]"
        src={item?.url}
        alt="medicine"
      />
              {editModal && <CreateBannerModal length={item.index} item={item} refetchBanner={refetchBanner} setOpenCreateBannerModal={setEditModal} />}

    </>
  );
}
