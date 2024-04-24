import React, { useState } from "react";

import Quality from "../assets/login/quality.svg";
import Range from "../assets/whyChooseUs/range.svg";
import Convenience from "../assets/whyChooseUs/convenience.svg";
import CustomerCare from "../assets/whyChooseUs/customerCare.svg";
import Secure from "../assets/whyChooseUs/secure.svg";
import Design1 from "../assets/login/designElement1.svg";
import Design2 from "../assets/login/designElement2.svg";
import Design3 from "../assets/login/designElement3.svg";

const LoginCarousel = () => {
  const slideData = [
    {
      sno: 1,
      design: Design1,
      image: Quality,
      title: "Quality Assurance",
      content:
        "We source pharmaceuticals from trusted manufacturers and distributors, ensuring top-quality standards in every product you receive.",
    },
    {
      sno: 2,
      design: Design2,
      image: Range,
      title: "Wide Product Range",
      content:
        "Our wide pharmaceutical range covers OTC meds, prescriptions, devices, and essentials, meeting diverse health needs efficiently.",
    },
    {
      sno: 3,
      design: Design3,
      image: Convenience,
      title: "Convenience",
      content:
        "We value your time and convenience. Our user-friendly platform lets you order medications from home with ease.",
    },
    {
      sno: 4,
      design: Design3,
      image: CustomerCare,
      title: "Customer Care",
      content:
        "Your satisfaction is our priority. Our dedicated customer care is always ready to assist with inquiries and concerns.",
    },
    {
      sno: 5,
      design: Design3,
      image: Secure,
      title: "Secure Transactions",
      content:
        "Your safety is paramount to us. We ensure secure and encrypted transactions to safeguard your personal and financial information.",
    },
  ];
  const [slide, setSlide] = useState(() =>
    Math.floor(Math.random() * slideData.length)
  );

  const res = slideData.filter((item, index) => {
    return index === slide;
  });

  return (
    <div>
      {res.map((item, index) => {
        return (
          <div className=" min-w-[25rem] pb-8 relative flex flex-col justify-end items-center w-[25rem] h-[30rem] rounded-md bg-[#FAFAFA]">
            <div className="">
              <img
                src={item.image}
                key={index}
                alt="image"
                className="w-[13rem] max-h-[12rem] object-contain"
              />
            </div>

            <div className="flex flex-col justify-center items-center gap-1 mt-[3.75rem]">
              <h1 className="font-HelveticaNeueMedium text-[#1E293B]">
                {item.title}
              </h1>
              <p className="text-[0.875rem] text-center text-[#64748B] max-w-[19.188rem]">
                {item.content}
              </p>
            </div>

            <div className="flex flex-col gap-2 absolute top-[1.625rem] left-[0.938rem]">
              {slideData.map((item, idx) => {
                return (
                  <button
                    onClick={() => {
                      setSlide(idx);
                    }}
                    className={
                      idx === slide
                        ? "w-1 h-[50px] bg-[#031B89] rounded-full"
                        : "w-1 h-1 bg-[#A9B5FF] rounded-full"
                    }
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LoginCarousel;
