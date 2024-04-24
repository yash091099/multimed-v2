import React from "react";

import Tick from "../assets/product/tickIcon.svg";

const SecondaryHighlight = ({ title }) => {
  return (
    <div className="bg-[#FDBDB326] text-[#FBA79B] text-[0.875rem] py-1 px-2 rounded">
      <h1>{title}</h1>
    </div>
  );
};

export default SecondaryHighlight;
