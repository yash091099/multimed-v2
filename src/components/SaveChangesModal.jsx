import React, { useEffect, useRef } from "react";

const SaveChangesModal = ({ setIsSaveModal ,handleSubmit}) => {
  let pincodeModalRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!pincodeModalRef.current.contains(e.target)) {
        setIsSaveModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
      <div
        ref={pincodeModalRef}
        className="w-[16.625rem] p-6 absolute z-50 flex flex-col gap-3 border border-[#E2E8F0] bg-white rounded"
      >
        <h1 className="text-[#0F172A] font-HelveticaNeueMedium">
          Save Changes?
        </h1>

        <h2 className="text-xs">
          Are you sure you want to save these changes for this user?
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => {setIsSaveModal(false);handleSubmit()}}
            className="w-[7.5rem] py-2 px-4 rounded text-white bg-[#031B89] text-sm font-HelveticaNeueMedium"
          >
            Save
          </button>

          <button
            onClick={() => setIsSaveModal(false)}
            className="py-2 px-4 text-sm font-HelveticaNeueMedium"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveChangesModal;
