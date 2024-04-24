import React, { useContext, useState } from "react";
import Overview from "./Overview";
import ProductSubstitutes from "./ProductSubstitutes";
import Context from "../context/AppContext";
import { gql, useQuery } from "@apollo/client";

const GET_PRODUCT_BULLET_POINTS = gql`
  query getProductBulletPoints($id: ID!) {
    getProductBulletPoints(input: $id) {
      status
      message
      points {
        id
        point
      }
    }
  }
`;
 
const ProductOverview = () => {
  const {selectedProduct} = useContext(Context);
  const [isActive, setIsActive] = useState(1);
  const { data, loading, error } = useQuery(GET_PRODUCT_BULLET_POINTS, {
    variables: { id: selectedProduct.id },
    skip: !selectedProduct.id 
  });
  const productInfoData = selectedProduct?.bulletPoints.map((point, index) => ({
    id: index + 1,
    Heading: point.point,
    content: point.description,
    author: point.author
  })) || [];

  // Filter for active content
  const res = productInfoData.filter((item) => item.id === isActive);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="flex py-12 px-[6.25rem] justify-center gap-2 mb-4">
      <Overview
        isActive={isActive}
        setIsActive={setIsActive}
        productInfoData={productInfoData}
      />

      {/* Product Introduction */}
      {res.map((item, idx) => {
        return (
          <div className="flex flex-col w-[41.188rem] bg-white p-6 gap-2 rounded">
            <h1 className="font-HelveticaNeueMedium">{item.Heading}</h1>
            {item.content}
          </div>
        );
      })}

      <ProductSubstitutes />
    </div>
  );
};

export default ProductOverview;
