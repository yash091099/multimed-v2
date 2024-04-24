import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Order from "../assets/orderIcon.svg";
import Categories from "./Categories";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from 'react-confetti-explosion';
import { GET_ALL_PRODUCTS } from "../context/mutation";
import Slider from "react-slick";

// Import slick styles for the slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GET_BANNER = gql`
  query GetBanner {
    getBanners {
      status
      message
      banners {
        id
        url
        index
      }
    }
  }
`;

const HeroSection = () => {
  const [confetti, setConfetti] = useState(false);
  const { data: productsData } = useQuery(GET_ALL_PRODUCTS);
  const { data: bannerData } = useQuery(GET_BANNER);
  const banners = bannerData?.getBanners?.banners || [];
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 }},
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true }},
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true }}
    ]
  };

  useEffect(() => {
    if(localStorage.getItem('isLoggedInNow')){
      setConfetti(true);
      setTimeout(() => setConfetti(false), 5000); // Confetti animation time
      localStorage.removeItem('isLoggedInNow');
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col justify-center items-center text-[#0F172A] relative">
      {confetti && <ConfettiExplosion />}
  
      {/* Carousel section */}
      {banners.length > 0 && (
        <div className="w-full" style={{ height: '46vh',padding:"10px" }}>
          <Slider {...settings}>
            {banners.map(banner => (
              <div key={banner.id} >
                <img src={banner.url} alt={`Banner ${banner.index}`} style={{ width: '100vw', height: '46vh' }} />
              </div>
            ))}
          </Slider>
        </div>
      )}
  
      {/* Hero section content */}
      <div className="flex flex-col justify-center items-center gap-1 p-4 z-10 mt-7" style={{ borderRadius: '10px' }}>
        <h1 className="text-[2rem] font-HelveticaNeueBold">
          Welcome to Multimeds!
        </h1>
        <h2 className="max-w-[30rem] text-center text-[1.25rem] text-slate-700">
          Order from over {productsData?.getAllProducts?.products?.length || 0} products including Medicines, medical devices, and other pharma essentials
        </h2>
      </div>
  
      <div className="flex flex-col md:min-w-[40.688rem] sm:min-w-[30rem] min my-3 gap-3 bg-white/75 backdrop-blur-sm p-2 z-10" style={{ borderRadius: '10px' }}>
        <SearchBar
          button={true}
          isPincode={false}
          isHero
          placeholderText="Search for medicines, medical devices and other categories"
        />
        <div className="flex justify-end gap-1 items-center font-HelveticaNeueMedium cursor-pointer">
          <img src={Order} alt="order icon" />
          <h1 onClick={() => navigate('/track-order')}>Track your order</h1>
        </div>
      </div>
  
      <Categories />
    </div>
  );
  
};

export default HeroSection;
