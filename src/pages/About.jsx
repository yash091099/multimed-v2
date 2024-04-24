import React from "react";

import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";
import PatronsSection from "../components/PatronsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div>
      <div className="bg-white mt-[0.625rem]">
        {/* Heading */}
        <div className="md:pt-[3rem] mb-[1.5rem]">
          <div className="md:py-[4rem]">
            <h1 className="max-w-[47.5rem] mx-auto py-[1rem] md:py-[2rem] text-[2rem] md:text-[2.5rem] text-center font-HelveticaNeueBold text-[#031B89] leading-[3.125rem] tracking-tight border-b-2 border-[#A9B5FF]">
              Established with a vision to enhance
              <br />
              healthcare accessibility and affordability.
            </h1>
          </div>
        </div>

        {/* About Us */}
        <AboutSection
          heading1="About"
          heading2="Us"
          content="At MultiMeds Healthcare, we are dedicated to providing you with the highest quality pharmaceutical products that cater to your health and well-being needs. Established with a vision to enhance healthcare accessibility and affordability, we strive to make a positive impact on people's lives by delivering reliable and effective medications right to your doorstep."
        />
        {/* Meet The Director */}
        <AboutSection
          heading1="Meet the Director -"
          heading2="Captain Yamini Joshi"
          heading3="(retd)"
          content="At MultiMeds Healthcare, we are dedicated to providing you with the highest quality pharmaceutical products that cater to your health and well-being needs. Established with a vision to enhance healthcare accessibility and affordability, we strive to make a positive impact on people's lives by delivering reliable and effective medications right to your doorstep."
          isDirector
        />

        {/* Our Vision */}
        <AboutSection
          heading1="Our"
          heading2="Vision"
          content="Our vision is to become a leading name in the pharmaceutical industry, recognized for our commitment to excellence, innovation, and customer-centric approach. We envision a healthier and happier world, where everyone has access to safe and affordable medications that contribute to a better quality of life."
        />
        {/* Our Journey */}
        <AboutSection
          heading1="Our"
          heading2="Journey"
          content="MultiMeds Healthcare is more than just an ecommerce platform for pharmaceutical products. It's a culmination of years of experience, a commitment to quality, and a desire to make a meaningful impact on the lives of our customers. Our journey is guided by the principles of integrity, transparency, and a relentless pursuit of excellence in all that we do."
        />

        {/* Patrons Section */}
        <PatronsSection heading1="What our" heading2="patrons say" />

        {/* Why chose us */}
        <WhyChooseUs columns3={true} isContent />

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default About;
