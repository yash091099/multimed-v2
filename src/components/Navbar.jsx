import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from "./ConfirmationModal";
import { Link } from "react-router-dom";
import Logo from "../assets/multimedsLogo.svg";
import Menu from "../assets/menuIcon.svg";
import Cart from "../assets/cartIcon.svg";
import Order from "../assets/orderIcon.svg";
import Offer from "../assets/offerIcon.svg";
import Search from "../assets/searchIcon.svg";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import DiscountBanner from "./DiscountBanner";
import Login from "./Login";
import CartModal from "./Cart/CartModal";
import { useLocation } from "react-router-dom";
import Context from "../context/AppContext";
import CouponModal from "./Cart/CouponModal";



const Navbar = ({   }) => {
  const [isDiscountBanner, setIsDiscountBanner] = useState(false);
  const {handleRefetchCart,cartListFromContext ,setUserLoggedIn} = useContext(Context);
  const [items, setItems] = useState(cartListFromContext||[]);

  const navigate = useNavigate();
  const[isOpen,setIsopne]=useState(false)
  useEffect(() => {
    // Check if the banner should be shown (e.g., first-time login)
    const shouldShowBanner = localStorage.getItem('shouldShowBanner') === 'true';
    setIsDiscountBanner(shouldShowBanner);
  }, []);
 
  const handleClose=()=>{
    setIsopne(false);
  }
  const handleRefetch = async () => {
    try {
        handleRefetchCart();
    } catch (err) {
      console.error('Refetch error:', err);
    }
  };

  useEffect(()=>{
    // console.log(cartListFromContext,'================== cart list from navbar ===============')
    if(cartListFromContext){
      setItems(cartListFromContext)
    }
  },[cartListFromContext])


  const [userDetails, setUserDetails] = useState(localStorage.getItem('token'));
  const [isMenu, setIsMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isCartModal, setIsCartModal] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.openLoginModal) {
      setIsLogin(true)
    }
  }, [location]);


  useEffect(()=>{
  },[items])
  const handleMenu = () => {
    setIsMenu(!isMenu);
  };


  const onLogoutClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };
  
  const handleCartMouseEnter = () => {
    setIsCartModal(true);
  };
  const handleCloseBanner = () => {
    // Update the state and the localStorage when the banner is closed
    setIsDiscountBanner(false);
    localStorage.setItem('shouldShowBanner', 'false');
  };
  return (
    <div className="lg:static w-full fixed top-0 z-50 flex flex-col justify-center ">
  
      <div className="py-2 px-8 h-[4.5rem] flex justify-between items-center bg-white border-b border-slate-300">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="w-[11.144rem] h-[2.555rem] cursor-pointer"
          />
        </Link>

        <SearchBar
          isPincode={true}
          placeholderText="Search for medicines, medical devices and other categories"
        />

        <div className="xl:flex gap-2 font-HelveticaNeueMedium hidden">
          <Link to="/track-order" className="flex gap-1 cursor-pointer items-center">
            <img
              src={Order}
              alt="order icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
            <h1>Track your order</h1>
          </Link>
          <div className="h-[1.375rem] border-l-2 border-slate-900" />
          <Link onClick={()=>{setIsopne(true)}} className="flex gap-1 cursor-pointer items-center">
            <img
              src={Offer}
              alt="offer icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
            <h1>Explore Offers</h1>
          </Link>
        </div>
        {isOpen && <CouponModal handleClose={handleClose}/>}

        {
          userDetails ?
          (
            <button
          className="xl:block hidden bg-[#7487FF] text-white font-HelveticaNeueMedium ${
             py-2 px-4 rounded"
          onClick={onLogoutClick}
        >
          Logout
        </button>
          )
          :(
            <button id='login-btn'
          className="xl:block hidden bg-[#7487FF] text-white font-HelveticaNeueMedium ${
             py-2 px-4 rounded"
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
          )
        }
        

        {isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin} setUserDetails={setUserDetails} /> : null}

        <div className="xl:hidden flex gap-8">
          <button>
            <img src={Search} alt="Menu" className="w-6 h-6" />
          </button>

          <button onClick={handleMenu}>
            <img src={Menu} alt="Menu" className="w-6 h-6 p-1" />
          </button>
        </div>

        <div
            onClick={handleCartMouseEnter}
            onMouseLeave={() => setIsCartModal(false)}
          className="relative"
        >
          <Link to="#" className="hidden xl:block h-[1.5rem] w-[1.5rem]">
            <img src={Cart} alt="cart icon" className="h-[full] w-[full]" />
          </Link>

          {isCartModal ? <CartModal refetch={handleRefetch} cartData={items} /> : null}
        </div>
      </div>
  
      <MobileMenu isMenu={isMenu} />
      {
  showConfirmModal && (
    <ConfirmationModal
      onConfirm={() => {
        localStorage.clear();
        setUserLoggedIn(false);

        navigate('/', { state: { openLoginModal: true } });
        setShowConfirmModal(false);
        setUserDetails(localStorage.getItem('token'));
      }}
      onCancel={() => setShowConfirmModal(false)}
    />
  )
}

      {isDiscountBanner ? <DiscountBanner handleClose={handleCloseBanner}/> : null}
    </div>
  );
};

export default Navbar;
