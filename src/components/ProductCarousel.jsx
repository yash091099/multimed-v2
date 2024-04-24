import React, { useContext, useRef, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCarouselCard from "./ProductCarouselCard";
import LeftArrowActive from "../assets/leftArrowActive.svg";
import RightArrowActive from "../assets/rightArrowActive.svg";
import RightArrowInactive from "../assets/rightArrowInactive.svg";
import LeftArrowInactive from "../assets/leftArrowInactive.svg";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/AppContext";
import { useQuery, gql } from "@apollo/client";
import Loader from "./loader";
import { GET_ALL_PRODUCTS } from "../context/mutation";




const ADD_TO_CART = gql`
  mutation addToCart(
    $productId: ID!
    $quantity: Int!
  
      ) {
        addToCart(
      input: {
        productId: $productId
        quantity: $quantity
      }
    ) {
      status
      message
    }
  }
`;

const ProductCarousel = ({ title, subtitle, description, isViewProducts }) => {
  const [productId,setProductId]=useState("")
  const { id } = useParams(); // Get the `id` parameter from the URL

  const [quantity,setProductQuantity]=useState(1)
  const { loading, error, data: dataList, refetch } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (data) => {
      const mergedProductList = data?.getAllProducts?.products?.map((product) => {
        const mergedStocks = product?.stocks?.reduce((acc, stock) => {
          return {
            ...acc,
            noOfUnits: (acc.noOfUnits ?? 0) + stock.noOfUnits,
            weightPerUnit: stock.weightPerUnit,
            boxMrp: stock.boxMrp,
            noOfGrams: stock.noOfGrams,
            noOfKgs: stock.noOfKgs,
            boxes: stock.boxes,
            batchNumber: stock.batchNumber,
            manufacturer: stock.manufacturer,
            manufacturingDate: stock.manufacturingDate,
            expiryDate: stock.expiryDate,
            mrpPerSheet: stock.mrpPerSheet,
            noOfUnits: stock.noOfUnits,
            noOfTabletsPerSheet: stock.noOfTabletsPerSheet,
            sheets: stock.sheets,
            stockType: stock?.stockType
          };
        }, {});
      
        
        
  
        return {
          ...product,
          stocks: [mergedStocks]
        };
      });
  console.log(mergedProductList)
      setProductList(mergedProductList);
      setIsFetched(true);
    },
    onError: (err) => {
      // setLoading(false)
    }
  });

  useEffect(() => {
    // Refetch data when the component mounts or when the `id` parameter changes
    refetch();
  }, [id, refetch]);


    const navigate = useNavigate();
  const {setSelectedProduct} = useContext(Context)
  const [slide, setSlide] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const [productList, setProductList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 5;

 
  const handleRightArrow = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + maxVisibleItems, productList.length - maxVisibleItems));
  };

  const handleLeftArrow = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - maxVisibleItems, 0));
  };

  const addToCartFunc=(item)=>{
    setProductId(item.id);
    setSelectedProduct(item);
    navigate(`/product/${item.id}`);
  }

  return (
    <div>
      {
        isFetched ?
        (
          <div className="flex flex-col justify-between items-center bg-white py-14 px-[6.25rem] text-[#0F172A] mb-4 gap-8 overflow-auto scroll-auto scrollbar-hide">
      {/* Heading and Sub-heading */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col w-[54.5rem] gap-1">
          <h1 className="text-[1.25rem] font-HelveticaNeueMedium">{title}</h1>
          <div>
            <p className="text-[#475569]">{subtitle}</p>
            <p className="text-[#475569]">{description}</p>
          </div>
        </div>
        {isViewProducts ? (
          <div>
            <Link
              to="/products"
              className=" font-HelveticaNeueMedium text-[#7487FF]"
            >
              View All Products
            </Link>
          </div>
        ) : null}
      </div>

      {/* Carousel */}
      <div className="w-full flex justify-between items-end gap-6">
      
      {productList?.filter(item => item?.published).length? productList?.filter(item => item?.published).slice(currentIndex, currentIndex + maxVisibleItems).map((item) => (
  <ProductCarouselCard
    key={item.id}
    id={item.id}
    title={item.productName}
    discount={item.coupon?.percentage }
    product={item}
    sp={item?.stocks?.[0]?.mrpPerSheet-((item.stocks?.[0]?.mrpPerSheet*item?.coupon?.percentage)/100)}
    maxRetailPrice={item.stocks?.[0]?.mrpPerSheet}
    marketer={item.stocks?.[0]?.manufacturer}
    image={item.productImages[0]}
    openProduct={() => {
      addToCartFunc(item)
    }}
  />
)): <>
  <div className="w-full " style={{display:'flex',justifyContent:'center'}}>
    <p  className="text-[#475569] font-HelveticaNeueMedium text-[1.25rem] text-center" >No Products Available</p>
  </div>
</>}
          </div>

     

      {/* Navigation Arrows */}
    {productList?.length > maxVisibleItems &&  <div className="w-full flex gap-1">
            <button onClick={handleLeftArrow} className="cursor-pointer">
              <img src={currentIndex === 0 ? LeftArrowInactive : LeftArrowActive} alt="Left Arrow" />
            </button>
            <button onClick={handleRightArrow} className="cursor-pointer">
              <img src={currentIndex >= productList.length - maxVisibleItems ? RightArrowInactive : RightArrowActive} alt="Right Arrow" />
            </button>
          </div>}
        </div>
      ) : (
        <>
        <div>Loading...</div>
        <Loader />
        </>

      )}
    </div>
  );
};


export default ProductCarousel;
