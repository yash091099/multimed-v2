import React, { createContext, useEffect, useState } from 'react'
import { gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/loader";
const Context = createContext({});
export default Context;
const CART_LIST= gql`
query{
  cartProductsListing{
    status
    message
    carts{
      id
      product{
        id
        productName
        productImages
        manufacturer
        composition
        price
        prescriptionRequired
        type
        tags
        concerns
        sku
        manufacturerAddress
        marketer
        marketerAddress
        description
        unitsInPack
        boxContent
        stockQuantity
        sp
        discount
        archived
        published
        storage
        origin
        healthConcern
        subCategory
        createdAt
        updatedAt
        stocks{
          id
          productId
          manufacturer
          groupNumber
          stockType
          boxes
          sheets
          noOfTabletsPerSheet
          noOfUnits
          weightPerUnit
          noOfKgs
          noOfGrams
          noOfUnits
          noOfTabletsPerSheet
          mrpPerSheet
          boxMrp
          batchNumber
          expiryDate
          createdAt
        }
        bulletPoints{
          id
          point
          description
          author
          
        }
        category{
          id
          categoryName
          segmentId
          createdAt
        }
        coupon{
          id
          code
          type
          percentage
          fixedAmount
          description
          status
          expiryDate
          createdAt
        }
      }
      quantity
      prescription
      user{
        id
        fullName
        contactNumber
        email
        walletBalance
        role
        profilePicture
      }
      status
      createdAt
    }
    
  }
}
`;
export function AppContext({children}) {

    const [selectedProduct, setSelectedProduct] = useState(JSON.parse(localStorage.getItem('selectedProduct'))||{});
    const [cartListFromContext,setCartList]=useState();
    const[useWallet,setUseWallet]=useState(false);
    const[done,setDone]=useState(false);
    const [isLoggedIn, setUserLoggedIn] = useState(false);
    const[userWalletDebit,setAmountDebitedFromWallet]=useState(0);
    const [loader,setLoading]=useState(false);
    const { loading, data: cartData, refetch: refetchCart } = useQuery(CART_LIST, { fetchPolicy: "network-only" });
    const showLoader = () => setLoading(true);

    const hideLoader = () => setLoading(false);

    const showToast = (message, type = "default") => {
        toast[type](message);
    };
    useEffect(()=>{
      if(cartData){
        console.log(cartData?.cartProductsListing?.carts,'=================== cart data from app context ======================')
        setCartList(cartData?.cartProductsListing?.carts)
      }
    },[cartData])

    const handleRefetchCart = async () => {
      try {
          showLoader();
          const { data } = await refetchCart();
          setCartList(data?.cartProductsListing?.carts);
          hideLoader();
      } catch (err) {
          console.error('Refetch error:', err);
          showToast("Failed to refresh cart data", "error");
          hideLoader();
      }
  };

    
    useEffect(()=>{
      localStorage.setItem('selectedProduct',JSON.stringify(selectedProduct))
    },[selectedProduct])

      
  return (

    <Context.Provider value={{setCartList,selectedProduct,setDone,done, setCartList,setSelectedProduct,handleRefetchCart,cartListFromContext,useWallet,setUseWallet,userWalletDebit,setAmountDebitedFromWallet,setUserLoggedIn,isLoggedIn}}>

      {(loader ||loading) && <Loader />}
        {children}
    </Context.Provider>
  )
}


    

      // const addToCart = (productToAdd) => {
      //   // Check if the product is already in the cart
      //   const existingProduct = cart.find(product => product.id === productToAdd.id);
      
      //   if (existingProduct) {
      //     // If the product is already in the cart, just increase its quantity
      //     const updatedCart = cart.map(product => {
      //       if (product.id === productToAdd.id) {
      //         return { ...product, quantity: product.quantity + 1 };
      //       }
      //       return product;
      //     });
      //     setCart(updatedCart);
      //   } else {
      //     // If the product is not in the cart, add it with a quantity of 1
      //     setCart([...cart, { ...productToAdd, quantity: 1 }]);
      //   }
      // };

      // const removeFromCart = (productId) => {
      //   const updatedCart = cart.filter(product => product.id !== productId);
      //   setCart(updatedCart);
      // };
      
      // const updateProductQuantity = (productId, newQuantity) => {
      //   // Map through the cart to find the product to update
      //   const updatedCart = cart.map(product => {
      //     if (product.id === productId) {
      //       // Update the quantity of the product
      //       return { ...product, quantity: newQuantity };
      //     }
      //     return product;
      //   });
      
      //   // Update the cart state
      //   setCart(updatedCart);
      // };