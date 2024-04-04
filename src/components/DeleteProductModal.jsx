import React, { useEffect, useRef } from "react";

export default function DeleteProductModal(props) {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/30"
        onClick={() => props.setDeleteModal(false)}
      ></div>
      <div className="fixed flex flex-col gap-[12px] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] bg-white rounded-[8px] p-[24px]">
            <h1 className="text-[16px] font-[500] leading-[20px]">Delete this product?</h1>
            <p className="text-[12px] font-[400] leading-[15px]">This is a permanent action and cannot be undone.</p>
              <div className="flex">
                  <button className="flex-1 text-white bg-[#DC2626] px-[16px] py-[8px] rounded-[4px]" onClick={() => props.setDeleteModal(false)}>Delete</button>
                  <button className="flex-1 px-[16px] py-[8px] rounded-[4px]" onClick={() => props.setDeleteModal(false)}>Cancel</button>
              </div>
          </div>
    </div>
  );
}
