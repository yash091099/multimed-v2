import React from "react";

const AdminNavLink = ({ icon, title, isActive, isExpanded }) => {
  return (
    <div
      className={`${
        isActive === title
          ? "border border-[#C2F5E9] bg-[#031E6B]"
          : "opacity-75"
      } ${
        isExpanded ? "w-full" : "w-fit bg-[#031E6B]"
      } rounded p-1 gap-1 flex items-center cursor-pointer`}
    >
      <img src={icon} alt="dashboard icon" className="w-6 h-6" />

      {isExpanded && (
        <h1 className="text-white text-lg font-HelveticaNeueMedium capitalize">
          {title}
        </h1>
      )}
    </div>
  );
};

export default AdminNavLink;
