import React from "react";
import { useNavigate } from "react-router-dom";

const HealthConcernCard = ({ title, image, healthConcern }) => {
  const navigate = useNavigate();
  return (
    <div className="relative max-h-[14.375rem]" onClick={() => navigate(`/products/${title}`, { state: { healthConcern: healthConcern } })}>
      <img src={image} alt={`${title} image`} className="max-w-[200px] h-[200px] object-cover rounded-md" />
      <h1 className="absolute top-0 font-HelveticaNeueMedium text-white p-2">
        {title}
      </h1>
      <div className="absolute bottom-0 right-0 p-2">
        <button className="bg-[#031B89] text-white font-HelveticaNeueMedium py-1 px-4 rounded">
          Explore
        </button>
      </div>
    </div>
  );
};

export default HealthConcernCard;
