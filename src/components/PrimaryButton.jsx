import React from "react";

const PrimaryButton = ({ title, handleClick ,disable}) => {

  return (
    <button
      disabled={disable}
      onClick={handleClick}
      className="w-full font-HelveticaNeueMedium rounded text-[white] bg-[#031B89] p-4 leading-[1.25rem]"
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
