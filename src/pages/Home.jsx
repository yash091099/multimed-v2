import React from "react";

import HeroSection from "../components/HeroSection";
import HealthConcerns from "../components/HealthConcerns";
import TopBrands from "../components/TopBrands";
import ProductCarousel from "../components/ProductCarousel";
import WhyChooseUs from "../components/WhyChooseUs";
import DevicePartners from "../components/DevicePartners";

const Home = () => {

  return (
    <div>
      <HeroSection />
      <HealthConcerns />
      <TopBrands title="Our Top brands" />
      <ProductCarousel
          title="Featured Health Products"
          subtitle="Carefully Selected for Your Wellness"
          description="Browse our selection of top-rated medical essentials and wellness products."
          isViewProducts
        />
      <DevicePartners title="Our Device Partners" />
      <WhyChooseUs columns={5} />
    </div>
  );
};

export default Home;
