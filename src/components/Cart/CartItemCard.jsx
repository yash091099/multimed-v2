import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { gql } from "@apollo/client";
import PrimaryHighlight from "../PrimaryHighlight";
import Delete from "../../assets/cart/deleteIcon.svg"; // Update this path as necessary
import Context from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const REMOVE_FROM_CART = gql`
  mutation removeFromCart($cartData: ID!) {
    removeFromCart(input: $cartData) {
      status
      message
    }
  }
`;

const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($cartData: String!, $quantity: Int!) {
    updateCartQuantity(input: { cartId: $cartData, quantity: $quantity }) {
      status
      message
    }
  }
`;

const CartItemCard = ({ cartData, refetch,updateQuantity }) => {
  const {setSelectedProduct} = useContext(Context);
  const navigate=useNavigate()
  console.log(cartData, "cartData cartData cartData cartData");
  const [productCount, setProductCount] = useState(cartData?.quantity || 0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(()=>{
    setProductCount(cartData?.quantity || 0)
  },[cartData])

  const [removeFromCart, { loading: removing, error: removeError }] = useMutation(REMOVE_FROM_CART, {
    variables: { cartData: cartData?.id },
    onCompleted: (data) => {
      if (data.removeFromCart.status === "SUCCESS") {
        refetch();
        localStorage.setItem('changeInQuantity', productCount);
        toast.success("Item removed from cart");
      } else {
        toast.error(data.removeFromCart.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [updateCartQuantity, { loading: updating, error: updateError }] = useMutation(UPDATE_CART_QUANTITY, {
    variables: { cartData: cartData?.id, quantity: productCount },
    onCompleted: (data) => {
      if (data.updateCartQuantity.status === "SUCCESS") {
        refetch();
        localStorage.setItem('changeInQuantity', productCount);

        toast.success("Cart updated successfully");
      } else {
        toast.error(data.updateCartQuantity.message);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (productCount !== cartData?.quantity) {
      if (productCount === 0) {
        removeFromCart();
      } else {
        updateCartQuantity();
      }
    }
  }, [productCount]);

  if (removing || updating) {
    return <div>Loading...</div>; // Replace with your loader component
  }

  if (removeError || updateError) {
    return <div>Error occurred</div>; // Replace with your error display component
  }
  function calculateTotalStock(stocks) {
    if (!Array.isArray(stocks) || stocks.length === 0) return "N/A";
  
    const sumQuantities = (acc, stockItem) => {
      switch (stockItem.stockType) {
        case 'Boxes':
          return acc + (stockItem.sheets * stockItem.noOfTabletsPerSheet);
        case 'Units':
          return acc + stockItem.noOfUnits;
        case 'Grams':
          return acc + stockItem.noOfGrams;
        case 'Kilograms':
          return acc + (stockItem.noOfKgs * 1000); 
        default:
          return acc;
      }
    };
  
    const totalStock = stocks.reduce(sumQuantities, 0);
  
    const stockType = stocks[0].stockType;
  
    switch (stockType) {
      case 'Boxes':
      case 'Units':
        return `${totalStock} ${stockType} left in stock`;
      case 'Grams':
        return `${totalStock} Grams left in stock`;
      case 'Kilograms':
        const totalKilograms = totalStock / 1000; // Convert grams back to kilograms for display
        return `${totalKilograms.toFixed(2)} Kilograms left in stock`;
      default:
        return "N/A";
    }
  }
  const maxRetailPrice = cartData?.product?.stocks?.[0]?.mrpPerSheet ?? 0;
  const discount = cartData?.product?.coupon?.percentage ?? 0;
  const sellingPricePerUnit = maxRetailPrice - (maxRetailPrice * discount / 100);
  const totalSellingPrice = sellingPricePerUnit * (productCount ?? 0);
  function getFormattedQuantity(stockData) {
    if (!stockData) return "N/A";
  
    switch (stockData.stockType) {
      case 'Boxes':
        return `${stockData.sheets} Sheets per Box, ${stockData.noOfTabletsPerSheet} Units per Sheet`;
      case 'Units':
        return `${stockData.noOfUnits} Units`;
      case 'Grams':
        return `${stockData.noOfGrams} Grams`;
      case 'Kilograms':
        return `${stockData.noOfKgs} Kilograms`;
      default:
        return "N/A";
    }
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 0) {
      return;
    }
    setProductCount(newQuantity);
    updateQuantity(newQuantity); // Update quantity in parent component

  };

  const toUpperCase = (str) => {
    if(str){

      return str.charAt(0).toUpperCase() + str.slice(1);
    }else{
      return 'N/A'
    }

  }
console.log(cartData)
  return (
    <div className={isHidden ? "hidden" : "flex flex-col rounded-2 gap-4 border border-[#E2E8F0] bg-white py-4 px-6 shadow-cartItem"}>
      {cartData?.product?.prescriptionRequired && <PrimaryHighlight />}

      {/* Product */}
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <img style={{cursor:'pointer'}}
            src={cartData?.product?.productImages[0]} onClick={() => {setSelectedProduct(cartData?.product);navigate(`/product/${cartData?.product?.id}`)}}
            className="rounded h-[3.625rem] w-[3.625rem] object-cover"
          />

          <div className="flex flex-col gap-1">
            <h1 className="w-[14rem] text-[0.875rem] font-HelveticaNeueMedium">
             {toUpperCase(cartData?.product?.productName)}
            </h1>
            <h2 className="text-[0.875rem] text-[#475569]">
              {getFormattedQuantity(cartData?.product?.stocks?.[0])}
            </h2>
            <h2 className="text-[0.75rem] font-HelveticaNeueItalic text-[#DC2626]">
             {calculateTotalStock(cartData?.product?.stocks)  }
            </h2>
          </div>
        </div>

        {/* Manufacturer and composition */}
        <div className="flex gap-4">
          {/* Manufacturer */}
          <div className="w-[7.188rem]">
            <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
              Manufacturer
            </h1>
            <div>
              <div className="w-fit border-b border-[#0F172A]">
                <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
{toUpperCase(cartData?.product?.stocks?.[0]?.manufacturer)}                </h2>
              </div>
            </div>
          </div>
          {/* Composition*/}
          <div className="w-[7.188rem]">
            <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
              Composition
            </h1>
            <div>
              <div className="w-fit border-b border-[#0F172A]">
                <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
{toUpperCase(cartData?.product?.composition)}                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        {productCount === 0 ? (
          <button
            className="h-[1.75rem] w-[5.5rem] py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium"
          >
            ADD
          </button>
        ) : (
          <div className=" justify-center w-[5.5rem] h-[1.75rem] flex items-center gap-1">
            <button
             onClick={() => handleQuantityChange(productCount - 1)} 
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>-</h1>
            </button>

            <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[1.75rem]">
              <h1>{productCount}</h1> 
            </div>

            <button
             onClick={() => handleQuantityChange(productCount + 1)} 
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>+</h1>
            </button>
          </div>
        )}
      
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <p className="text-[0.75rem] text-[#94A3B8]">
            Rs <span className="line-through">{maxRetailPrice?.toFixed(2)}</span>
            </p>
            <h2 className="font-HelveticaNeueMedium text-[#031B89] text-[0.875rem]">
            Rs {totalSellingPrice?.toFixed(2)}
            </h2>
            <h3 className="text-[0.625rem] font-HelveticaNeueMedium p-1 bg-[#C2F5E9] rounded-[0.125rem]">
            {discount > 0 && (
            <h3 className="text-[0.625rem] font-HelveticaNeueMedium p-1 bg-[#C2F5E9] rounded-[0.125rem]">
              {discount}% OFF
            </h3>
          )}            </h3>
          </div>

          <button
            onClick={() => {
              removeFromCart().then(() => refetch());
            }}
          >
            <img src={Delete} className="h-6 w-6" />
          </button>
        </div>

        <h1 className="text-[#475569] text-[0.75rem]">
          ETA Delivery to 560023 : today, 3pm
        </h1>
      </div>
    </div>
  );
};

export default CartItemCard;
