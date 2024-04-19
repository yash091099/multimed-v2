import React from "react";

import UserPicture from "../assets/authorImage.png";
import { Link } from "react-router-dom";

const UserCell = (tableData,key) => {
const toUpperCase = (str) => {
  return str?.toUpperCase();
}
  return (
    <div key={key} className="flex md:flex-row flex-col md:justify-between gap-1 border-b border-[#E2E8F0] bg-white md:py-6 md:px-12 p-3 hover:bg-[#DBEAFE]">
      <Link
      title="View/Edit User"
        to="/home/edit_user" state={tableData?.tableData}
        className="lg:w-[11.25rem] md:w-[8rem] md:mb-0 mb-2 flex gap-2 items-center"
      >
        <img src={UserPicture} alt="user image" className="w-6 h-6" />

        <h1 className="md:text-sm text-xs font-HelveticaNeueMedium text-[#0F172A]">
          {toUpperCase(tableData?.tableData?.fullName)||'--'}
        </h1>
      </Link>

      <div className="flex justify-between">
        <h1 className="md:hidden text-xs font-HelveticaNeueItalic text-[#64748B]">
          Employee ID
        </h1>

        <h1 className="lg:w-[11.25rem] md:w-[8rem] md:text-sm text-xs font-HelveticaNeueMedium text-[#0F172A]">
          {tableData?.tableData?.id||'--'}
        </h1>
      </div>

      <div className="flex justify-between">
        <h1 className="md:hidden text-xs font-HelveticaNeueItalic text-[#64748B]">
          Department
        </h1>

        <h1 className="lg:w-[11.25rem] md:w-[8rem] md:text-sm text-xs font-HelveticaNeueMedium text-[#0F172A]">
          {tableData?.tableData?.department?.name||'--'}
        </h1>
      </div>

      <div className="flex justify-between">
        <h1 className="md:hidden text-xs font-HelveticaNeueItalic text-[#64748B]">
          Role
        </h1>

        <h1 className="lg:w-[11.25rem] md:w-[8rem] md:text-sm text-xs font-HelveticaNeueMedium text-[#0F172A]">
          {tableData?.tableData?.role||'--'}
        </h1>
      </div>
    </div>
  );
};

export default UserCell;
