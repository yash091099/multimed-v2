import React from "react";

import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const ShippingPolicy = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-2 sm:py-12 px-4 sm:px-24 bg-white">
        <div className="flex-col flex gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-[#CBD5E1] py-4 text-[#0F172A]">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium">
              Shipping Policy
            </h1>
            <h2 className="text-[1.125rem] font-HelveticaNeueItalic">
              last updated : 23rd March 2024
            </h2>
          </div>

          <p className="text-[#1E293B]">
            <span className=" font-HelveticaNeueMedium">
              Shipping Policy
            </span>
            <br/>
            <br/>
            At Multimeds we strive to deliver your orders in a timely and efficient manner. We offer free shipping on all orders worth above 999 and a fixed delivery fee of 90rs for orders below 999.
            <br />
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
              Delivery Time:
            </span>
            <br/>
            <br/>
            We aim to deliver your orders within 1 to 5 days from the date of purchase. Our delivery process starts as soon as your payment is confirmed. We will keep you updated about the delivery status of your order through email and SMS.
            <br />
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
              Delivery Process:
            </span>
            <br/>
            <br/>
            We partner with reliable shipping companies to deliver your orders to you. Once your order is dispatched, you will receive a tracking number and a link to track your order. Our delivery partners will make two attempts to deliver your order at the shipping address. If delivery is not possible, they will leave a note with instructions on how to receive the order.
            <br />
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            Shipping Locations:
            </span>
            <br/>
            <br/>
            We currently ship to all cities and towns in India. If your location is not listed at the time of checkout, please contact us for more information.
            <br />
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            Return Policy:
            </span>
            <br/>
            <br/>
            In case of any issues with your order, we offer a return policy. Please refer to our return policy for more information.
            <br />
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            Contact Us:
            </span>
            <br/>
            <br/>
            For any queries or concerns regarding shipping, please contact our customer support team by email or phone. Our team will be happy to assist you.
            <br />
            <br />
          </p>
        </div>
      </div>
      <WhyChooseUs />
    </div>
  );
};

export default ShippingPolicy;
