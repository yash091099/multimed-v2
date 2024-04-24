import React from "react";
import { Link } from "react-router-dom";

const NavigationMenu = () => {
  return (
    <div className="absolute top-5 left-1 z-50 flex flex-col w-[24rem] bg-white border border-[#E2E8F0] p-6 gap-6 text-[#0F172A]">
      <h1 className="text-[1.125rem] font-HelveticaNeueMedium ">Medicines</h1>

      <div className="flex gap-6">
        {/* main cat 1 */}
        <div className="border-r border-[#E2E8F0] flex flex-col gap-2 w-[10.063rem]">
          <h1>Main category 1</h1>

          <div className="flex flex-col gap-2">
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
          </div>
        </div>

        {/* main cat2 */}
        <div className="flex flex-col gap-2 w-fit">
          <h1>Main category 1</h1>

          <div className="flex flex-col gap-2">
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
            <Link className="text-[0.875rem] font-HelveticaNeueLight">
              Sub-Category
            </Link>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default NavigationMenu;
