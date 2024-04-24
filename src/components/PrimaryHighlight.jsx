import React from "react";

import Tick from "../assets/product/tickIcon.svg";

const PrimaryHighlight = () => {
  return (
    <div className="flex gap-1 bg-[#F7FEE7] text-[#365314] text-[0.875rem] p-1 rounded items-center">
      <img src={Tick} className="w-4 h-4" />
      <h1>Prescription Needed</h1>
    </div>
  );
};

export default PrimaryHighlight;
