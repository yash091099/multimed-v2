// DepartmentPermissionCard.js
import React from "react";
import ToggleButton from "./ToggleButton";

const DepartmentPermissionCard = ({ title, description, permission, setPermission }) => {
  return (
    <div className="rounded-lg md:p-4 p-3 border border-[#DBEAFE] bg-white flex flex-col md:gap-1 gap-2">
      <div className="flex justify-between items-center">
        <h1 className="md:text-base text-sm font-HelveticaNeueMedium text-[#0F172A]">
          {title}
        </h1>
        <ToggleButton permission={permission} setPermission={setPermission} />
      </div>
      <h2 className="md:text-sm text-xs text-[#475569] font-HelveticaNeueItalic">
        {description}
      </h2>
    </div>
  );
};

export default DepartmentPermissionCard;
