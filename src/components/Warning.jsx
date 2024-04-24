import React from "react";

import WarningIcon from "../assets/warning.svg";

const Warning = ({ warning }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="p-3">
        <img src={WarningIcon} alt="warning icon" />
      </div>

      <h1 className="text-sm font-HelveticaNeueMedium">{warning}</h1>
    </div>
  );
};

export default Warning;
