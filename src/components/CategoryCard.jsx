import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ title, image, subCategory }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/products', { state: { subCategory: subCategory } })} className="cursor-pointer">
      <img alt={`${title} image`} src={image} className="rounded-lg" />
      <h1 className="mt-3 font-HelveticaNeueMedium">{title}</h1>
    </div>
  );
};

export default CategoryCard;
