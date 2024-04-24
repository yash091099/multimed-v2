import React, { useContext, useRef, useState, useEffect } from "react";
import whatsappIcon from "../assets/whatsapp.png";
import telegramIcon from "../assets/telegram.png";
import twitterIcon from "../assets/twitter.png";
import SecondaryHighlight from "./SecondaryHighlight";
import { gql, useMutation, useQuery } from "@apollo/client";
import Bookmark from "../assets/product/bookmarkIcon.svg";
import Share from "../assets/product/shareIcon.svg";
import Arrow from "../assets/product/arrow.svg";
import OfferCoupon from "./OfferCoupon";
import ProductImageCarousel from "./ProductImageCarousel";
import { Link, useNavigate } from "react-router-dom";
import PincodeModal from "./PincodeModal";
import Context from "../context/AppContext";
import Login from "./Login";
import SubscriptionCard from "./Subscription";
import { toast } from "react-toastify";
import Loader from "./loader";
import CouponModal from "./Cart/CouponModal";
import { BookmarkAdd, BookmarkAddSharp } from "@mui/icons-material";
import { ShareOutlined } from "@material-ui/icons";

const ADD_TO_FAVORITE = gql`
  mutation setAsFavorite($productId: String!) {
    setAsFavorite(input: { productId: $productId }) {
      status
      message
    }
  }
`;
const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($cartId: String!, $quantity: Int!) {
    updateCartQuantity(input: { cartId: $cartId, quantity: $quantity }) {
      status
      message
    }
  }
`;

const GET_FAVORITE_PRODUCT = gql`
query
{
  getMyFavorites{
    status
    message
    favorites{
      id
      userId
      productId
      user{
        id
        fullName
        contactNumber
        email
        gmail
        profilePicture
        walletBalance
        role
        successfulReferrals
        referralDiscountPercentage
        remainingReferralDiscounts
        createdAt
        updatedAt
      }
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
      
        category{
          id
          categoryName
          segmentId
          createdAt
        }
   
      }
      createdAt
      updatedAt
    }
  }
}
`

const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!, $quantity: Int!) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      status
      message
    }
  }
`;

const GET_USER_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions {
    getUserSubscriptions {
      status
      message
      subscriptions {
        productId
      }
    }
  }
`;


const ProductSection = () => {
  const { selectedProduct,handleRefetchCart,cartListFromContext } = useContext(Context);
  const { subscriptionLoading, error: subscriptionError, data:subscriptionData } = useQuery(GET_USER_SUBSCRIPTIONS);
console.log(subscriptionData)
  const [cartList] = useState(cartListFromContext||[]);
  const[isOpen,setIsopne]=useState(false)
  const currentUrl = encodeURIComponent(window.location.href);
  const whatsappShareUrl = `https://wa.me/?text=${currentUrl}`;
  const telegramShareUrl = `https://t.me/share/url?url=${currentUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
  const [cartId, setCartId] = useState("");
console.log(selectedProduct,'selectedProduct')
  const navigate = useNavigate();
  const shareModalRef = useRef();
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [error, setError] = useState();
  const [shareModal, setShareModal] = useState(false);
  const [quantity, setQuantity] = useState(Number(0));
  const [isLogin, setIsLogin] = useState(true);
  const [productInCart, setProductAlreadyInCart] = useState(false);
  const[productInFavList,setProductInFavList]=useState(false);

const[selectedAddress,setSelectedAddress]=useState({});
const { data: favoriteProductData, refetch: refetchFavoriteProduct } = useQuery(GET_FAVORITE_PRODUCT);

useEffect(() => {
  refetchFavoriteProduct();
},[])
useEffect(() => {
  console.log(favoriteProductData?.getMyFavorites?.favorites,'favoriteProductData')
  if(favoriteProductData?.getMyFavorites?.favorites?.length){
    setProductInFavList(true)
  }

},[favoriteProductData])
  const [setAsFavorite] = useMutation(
    ADD_TO_FAVORITE,
    {
      variables: {
        productId: selectedProduct?.id,
      },
      onCompleted: (data) => {
        if (data.setAsFavorite.status === "SUCCESS") {
          toast.success("Product Added to favorites successfully.");
          handleRefetchCart();
          refetchFavoriteProduct();
        } else {
          toast.error(data?.setAsFavorite?.message || "Error : Add to Favorite ");
        }
      },
      onError: (err) => {
      },
    }
  );
  const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY, {
    variables: { cartId, quantity },
    onCompleted: (data) => {
      if (data.updateCartQuantity.status === "SUCCESS") {
        setTimeout(()=>{
          navigate('/cart');
        },500) ;

      } else {

      }
    }
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    variables: { productId: selectedProduct?.id, quantity },
    onCompleted: (data) => {
      if (data.addToCart.status === "SUCCESS") {
       
        setTimeout(()=>{
          navigate('/cart');
        },500)
      } 
    }
  });


const handleAddressSelect=(data)=>{
  console.log("address selected",data)
  setSelectedAddress(data);
  setIsAddressModal(false)
}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareModal &&
        shareModalRef.current &&
        !shareModalRef.current.contains(event.target)
      ) {
        setShareModal(false);
      }
    };

    const handleScroll = () => {
      if (shareModal) {
        setShareModal(false);
      }
    };

    // document.addEventListener("mousedown", handler);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      // document.removeEventListener("mousedown", handler);
    };
  }, [shareModal, isLogin]);

  const handleSaveProduct = () => {

    setAsFavorite();
  };

  const onQuantityChange = (e) => {
    setError("");
    e.preventDefault();
    setQuantity(Number(e.target.value));
  
  };



  const handleCopyLink = () => {
    toast.success("Copy to clipboard")
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("Page URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const shareOnWhatsApp = () => {
    window.open(whatsappShareUrl, "_blank");
  };

 
  useEffect(() => {
    handleRefetchCart();
    // eslint-disable-next-line
  }, [selectedProduct]);

  useEffect(() => {
    const productInCart = cartList.find(item => item.product.id === selectedProduct?.id);
    if (productInCart) {
      setCartId(productInCart.id);
      setQuantity(productInCart.quantity);
      setProductAlreadyInCart(true);
    } else {
      setQuantity(0);
      setProductAlreadyInCart(false);
    }
    // eslint-disable-next-line
  }, [cartListFromContext, selectedProduct]);

  const handleAddToCart=()=>{
    if(quantity){

      if(productInCart){
        updateCartQuantity().then(() => handleRefetchCart());
      }else{
        addToCart().then(() => handleRefetchCart());
      }
    }else{
      toast.info("Please select a valid quantity")
    }
  }
  const handleClose=()=>{
    setIsopne(false);
  }
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
  const toCapitalize = (str) => {
    
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex py-12 px-[6.25rem] justify-center gap-[1.25rem] bg-white mb-4">
     
      <div className="flex flex-col gap-[1.25rem]">
        <h className="text-[0.875rem] text-[#64748B]">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-[#94A3B8] font-HelveticaNeueMedium"
            style={{ cursor: "pointer" }}
          >
            Home/
          </span>
          <span
            onClick={() => {
              navigate("/products");
            }}
            className="text-[#94A3B8] font-HelveticaNeueMedium"
            style={{ cursor: "pointer" }}
          >
            All Products/
          </span>
          <span className="text-[#031B89] font-HelveticaNeueMedium">
            Product Page
          </span>
        </h>

        <div className="flex flex-col items-center bg-[#F8FAFC] w-[35.813rem] ">
          <ProductImageCarousel image={selectedProduct["productImages"]} />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-4 py-6">
          <div className="border-b border-[#E2E8F0] pb-1 px-2">
            <div className="flex flex-col gap-2 text-[#0F172A]">
              {/* Product name */}
              <div className="w-[38.438rem] flex justify-between items-start">
                <h1 className="text-[1.5rem] font-HelveticaNeueBold">
                  {toCapitalize(selectedProduct["productName"])}
                <p className="text-[1rem] mt-2 font-HelveticaNeue">
                  {getFormattedQuantity(selectedProduct["stocks"][0])}
                </p>
                </h1>

                <div className="flex relative gap-1">
                {productInFavList?<span title="Added to favorites" style={{cursor:'pointer'}} onClick={()=>{toast.info("Already added to favorites")}}><BookmarkAddSharp/></span>: <button
                    onClick={() => {
                      handleSaveProduct(selectedProduct);
                    }}
                    title="Add to favorites"
                  >
                    <img className="w-[35px]" src={Bookmark} alt="icon" />
                  </button>}
                  <button
                    onClick={() => {
                      setShareModal((prev) => !prev);
                    }}
                    title="Share product"
                  >
                    {/* <img className="w-[35px]" src={Share} alt="share icon" /> */}
                    <ShareOutlined/>
                  </button>
                  {shareModal && (
                    <div
                      ref={shareModalRef}
                      className="absolute top-[24px] right-[0px] w-[240px] flex flex-col gap-4 bg-white rounded-md px-2 py-4 shadow-lg border"
                    >
                      <h1 className="text-[#64748B]">Share with friends</h1>
                      <div className="flex gap-4 justify-center">
                        <img
                          className="cursor-pointer w-[40px]"
                          src={whatsappIcon}
                          alt="whatsapp icon"
                          onClick={shareOnWhatsApp}
                        />
                        <img
                          className="cursor-pointer w-[40px]"
                          src={telegramIcon}
                          alt="telegram icon"
                          onClick={() =>
                            window.open(telegramShareUrl, "_blank")
                          }
                        />
                        <img
                          className="cursor-pointer w-[40px]"
                          src={twitterIcon}
                          alt="twitter icon"
                          onClick={() => window.open(twitterShareUrl, "_blank")}
                        />
                      </div>
                      <div className="flex gap-2 text-[12px] border rounded-3xl p-2 w-full">
                        <input
                          type="text"
                          readOnly
                          className="outline-none w-[60%] border-r px-2"
                          value={window.location.href}
                        />
                        <p
                          className="cursor-pointer w-fit text-[#64748B] hover:text-black"
                          onClick={() => {
                            setShareModal(false);
                            handleCopyLink();
                          }}
                        >
                          Copy link
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {selectedProduct?.tags[0]&&<SecondaryHighlight title={selectedProduct?.tags[0]} />}
                {selectedProduct?.tags[1]&&<SecondaryHighlight title={selectedProduct?.tags[1]} />}
                {selectedProduct?.tags[2]&&<SecondaryHighlight title={selectedProduct?.tags[2]} />}
               {selectedProduct?.tags[3]&& <SecondaryHighlight title={selectedProduct?.tags[3]} />}
              </div>

              <p className="text-[0.75rem] font-HelveticaNeueMedium">
              {selectedProduct?.description}
               
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="flex justify-between py-2 px-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                {/* Manufacturer */}
                <div className="w-[11rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    {selectedProduct["marketer"]}
                  </h1>
                  <div>
                    <div className="w-fit ">
                      <h2 className="cursor-pointer text-[0.75rem] font-HelveticaNeueMedium text-[#0F172A]">
                      <span style={{fontWeight:'bold'}}>Manufacturer</span>  <br />

                        {selectedProduct?.stocks?.[0].manufacturer}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Composition*/}
                <div className="w-[11rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B] " >
                  <span style={{fontWeight:'bold'}}>Composition</span>  <br />
                    {selectedProduct?.composition||'--'}
                  </h1>
                  <div>
                    <div className="w-fit border-b border-[#0F172A]">
                      <h2 className="cursor-pointer text-[0.875rem] max-w-[160px] font-HelveticaNeueMedium text-[#0F172A] truncate hover:text-clip">
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {/* Storage */}
                <div className="w-[11rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                  <span style={{fontWeight:'bold'}}> Storage </span><br />
                    {selectedProduct?.storage}

                  </h1>
                  <div>
                    <div className="w-fit">
                      <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                        {/* {selectedProduct?.safetyInformation} */}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Country of Origin*/}
                <div className="w-[11rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                  <span style={{fontWeight:'bold'}}> Country</span> <br /> {selectedProduct?.origin}
                  </h1>
                  <div>
                    <div className="w-fit">
                      <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                        {selectedProduct["Country of Origin"]}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generic Substitutes */}
            {/* <div className="flex bg-[#EFF6FF] p-2 gap-2">
              <div className="flex flex-col w-[16rem] gap-2">
                <h1 className="font-HelveticaNeueMedium">
                  Opt for generic substitutes!
                </h1>
                <p className="text-[0.75rem] leading-[0.938rem]">
                  Generic substitutes have the similar chemical compositions and
                  can help you save upto 50% on medicines!
                </p>
              </div>
              <Link>
                <img src={Arrow} className="w-6 h-6" />
              </Link>
            </div> */}
          </div>
        </div>

        <div>
          <div className="flex justify-between p-4 text-[#0F172A] rounded-4">
            <span className=" text-[0.625rem] font-HelveticaNeueMedium p-2 bg-[#C2F5E9] h-6">
              {selectedProduct?.coupon?.percentage}% OFF
            </span>
            <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-HelveticaNeueMedium text-[#031B89]">
                    MRP : Rs {selectedProduct.stocks?.[0]?.mrpPerSheet-(selectedProduct.stocks?.[0]?.mrpPerSheet*selectedProduct?.coupon?.percentage/100)}
                  </h1>
                  <p className="text-[0.75rem] text-[#94A3B8] pl-1">
                    <span className="line-through">
                      {selectedProduct.stocks?.[0]?.mrpPerSheet} Rs
                    </span>
                  </p>
                </div>

                <br/>

                <div className="flex justify-between items-center">
                  <h1 className="font-HelveticaNeueMedium text-[#031B89]">
                    TOTAL : Rs {quantity * (selectedProduct.stocks?.[0]?.mrpPerSheet-(selectedProduct.stocks?.[0]?.mrpPerSheet*selectedProduct?.coupon?.percentage/100))||0}
                  </h1>
                  <p className="text-[0.75rem] text-[#94A3B8] pl-1">
                    <span className="line-through">
                      {quantity * selectedProduct.stocks?.[0]?.mrpPerSheet} Rs
                    </span>
                  </p>
                </div>
              </div>


            {/* Delivery */}
            <div className="flex flex-col w-[19rem] p-2 gap-2 shadow-custom">
              {/* Main */}
              <div>
                <div className="flex justify-between text-[1.125rem] font-HelveticaNeueMedium">
                  <h1>Delivery ETA:</h1>
                  <h2>
                    <span className="text-[#65A30D]">2pm</span> today
                  </h2>
                </div>
                <div>
                  <div className="flex justify-between text-[0.875rem] font-HelveticaNeueMedium">
                    <h1 className="text-[#64748B]">
                      Delivering to:{" "}
                      <span className="text-[#0F172A]">{selectedAddress?.pincode||'xxxxxx'}</span>
                    </h1>
                    <button
                      onClick={() => {
                        setIsAddressModal(true);
                      }}
                      className="text-[#7487FF]"
                    >
                      change
                    </button>
                    {isAddressModal ? (
                      <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
                        <PincodeModal
                          setIsPincodeModal={setIsAddressModal}
                          onAddressSelect={handleAddressSelect}
                          isLoggedIn={true}
                          isDropdown={false}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* note */}
              <p className="text-[0.625rem] text-[#64748B] font-HelveticaNeueItalic">
                Note : Shipping charges will be calculated at checkout
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4 gap-1 w-[40.438rem]">
            <div className="flex flex-col gap-2">
              <div className="relative flex flex-col gap-1">
                <select
                  onChange={onQuantityChange}
                  value={quantity}
                  className={`left-[0] top-[2.8rem] border border-[#E2E8F0] w-full p-2 gap-2 rounded bg-white`}
                  style={{ height: 40 }}
                >
                  <option value={0} selected disabled>
                    select quantity
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
                {error && <p className="text-[#EF4444] text-xs">{error}</p>}

                <button
                onClick={()=>{handleAddToCart()}}
                  className="w-full font-HelveticaNeueMedium rounded text-[white] bg-[#031B89] p-4 leading-[1.25rem]"
                >
                  {productInCart?'Update':'Add To'} Cart
                </button>
              </div>

              <div>
                {/* <h1 className="uppercase text-[0.75rem] font-HelveticaNeueMedium text-[#94A3B8]">
                  COD available
                </h1> */}
              </div>
            </div>

            <SubscriptionCard  pincode={selectedAddress?.pincode}/>

            <div className="flex flex-col gap-2">
              <OfferCoupon selectedProduct={selectedProduct}/>
              <Link onClick={()=>{setIsopne(true)}}className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
                Explore more offers
              </Link>
            </div>
          </div>
          {isOpen && <CouponModal handleClose={handleClose}/>}

          {!isLogin ? (
            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          ) : null}
          {subscriptionLoading && <Loader/> }
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
