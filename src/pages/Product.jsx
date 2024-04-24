import React, { useContext,useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import ProductCarousel from "../components/ProductCarousel";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";
import ProductOverview from "../components/ProductOverview";
import CompareProducts from "../components/CompareProducts";
import Context from "../context/AppContext";
import { gql, useQuery } from "@apollo/client";
import { GET_ALL_PRODUCTS } from "../context/mutation";

const Product = () => {
  const[productList,setProductList]=useState([])

    const {   data:dataListProduct,refetch } = useQuery(GET_ALL_PRODUCTS,{
    onCompleted: (data) => {
      setProductList(data?.getAllProducts?.products);
    },
    onError: (err) => {
    }
  });  

  const handleRefetch = async () => {
    try {
      const { data } = await refetch();
      // console.log(data?.getAllProducts?.products,'produc')
      setProductList(data?.getAllProducts?.products);
    } catch (err) {
      console.error('Refetch error:', err);
    }
  };


  const {selectedProduct} = useContext(Context);
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[selectedProduct])
  return (
    <div>
      <ProductSection productList={productList}  refetch={handleRefetch} />
      <ProductOverview />
      <CompareProducts />
      <ProductCarousel title="View Similar Products" isViewProducts={false}/>
      <WhyChooseUs columns={5} />
      {/* <Footer /> */}
    </div>
  );
};

export default Product;
