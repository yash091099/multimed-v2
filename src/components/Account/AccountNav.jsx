import React, { useState } from "react";

const AccountNav = ({ setElement ,setSubElement}) => {
  const [isActive, setIsActive] = useState(localStorage.getItem("referral") ? 6 : 1);

  const accountOptions = [
    { id: 1, name: "account", child: "profile" },
    { id: 2, name: "account", child: "prescriptions" },
    { id: 3, name: "account", child: "addresses" },
  ];

  const otherOptions = [
    { id: 4, name: "orders" },
    { id: 5, name: "wallet" },
    { id: 6, name: "referrals" },
    { id: 7, name: "support" },
  ];

  const handleClick = (name, id,child) => {
    console.log(name, id,child,"==================")
    setIsActive(id);
    setElement(name);
    setSubElement(child)
  };

  return (
    <div className="h-fit flex flex-col p-1 gap-4 min-w-[8.2rem] bg-white rounded">
      {/* my account options */}
      <div className="gap-1">
        {/* heading */}
        <div className="p-2">
          <h1 className="text-[0.875rem] text-[#64748B]">My account</h1>
        </div>

        <div className="flex flex-col gap-1">
          {accountOptions.map((item, idx) => {
            return (
              <button
                onClick={() => handleClick(item.name, item.id,item?.child)}
                className={`${
                  item.id === isActive
                    ? "bg-[#7487FF] text-white"
                    : "bg-white text-[#64748B]"
                } text-left py-1 px-4`}
              >
                <h1 className="text-[0.75rem] capitalize">{item.child}</h1>
              </button>
            );
          })}
        </div>
      </div>

      {/* other options */}
      {otherOptions.map((item, idx) => {
        return (
          <button
            onClick={() => handleClick(item.name, item.id,'')}
            className={`${
              item.id === isActive
                ? "bg-[#7487FF] text-white"
                : "text-[#64748B] bg-white"
            } p-2`}
          >
            <h1 className="text-left text-[0.875rem] capitalize">
              {item.name}
            </h1>
          </button>
        );
      })}
    </div>
  );
};

export default AccountNav;
