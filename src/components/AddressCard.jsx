import React from "react";

const AddressCard = ({ onAddressSelect, isSelected, item }) => {
  let data = JSON.parse(localStorage.getItem('userInfo'));
  console.log(item, data, '=============++++++++++++++++++++++++++++++++++++++++++++====');

  return (
    <div
      onClick={() => onAddressSelect(item)}
      className={`${isSelected === item.id ? "bg-[#E0E7FF]" : "bg-[#F8FAFC] hover:bg-[#F1F5F9]"} flex flex-col gap-2 py-2 px-1 cursor-pointer rounded`}
    >
      <div className="flex text-[0.75rem] font-HelveticaNeueMedium gap-1">
        <p>{item.label}</p>
        <p>|</p>
        <p>{data?.name || 'xxxx..xx'} ({data?.contactNumber})</p>
      </div>
      <p className="text-[0.75rem] text-left">
        {item?.houseNumber}, {item?.aptOrBuildingName}, {item?.streetOrAreaName}, {item?.city} ({item?.state}) {item?.pincode}
      </p>
    </div>
  );
};

export default AddressCard;
