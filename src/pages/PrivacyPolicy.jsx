import React from "react";

import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-2 sm:py-12 px-4 sm:px-24 bg-white">
        <div className="flex-col flex gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-[#CBD5E1] py-4 text-[#0F172A]">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium">
              Privacy Policy
            </h1>
            <h2 className="text-[1.125rem] font-HelveticaNeueItalic">
              last updated : 23rd March 2024
            </h2>
          </div>

          <p className="text-[#1E293B]">
            <span className=" font-HelveticaNeueMedium">
            1.	Introduction
            </span>
            <br />
            <br />
            Our ecommerce website values the privacy of our users and is committed to protecting their personal information. This privacy policy outlines the data that we collect and how we use it.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
              2.	Information Collected
            </span>
            <br />
            <br />
              We collect both personal and non-personal information from our users. Personal information may include name, address, phone number, email address, and payment information. Non-personal information may include browser type, device type, and user location.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
              3.	Use of Information
            </span>
            <br />
            <br />
            We use personal information to process orders, communicate with our users, and provide them with information about products and services. Non-personal information is used to improve our website's functionality, analyse trends, and develop marketing strategies.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            4.	Sharing of Information
            </span>
            <br />
            <br />
            We do not sell or rent personal information to third-party companies. We may share personal information with service providers, such as payment processors and shipping companies, to fulfill orders. We may also share non-personal information with third-party analytics providers to better understand user behavior and improve our website's functionality.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            5.	Security Measures
            </span>
            <br />
            <br />
              We implement various security measures to protect user information, including encryption of sensitive data, secure storage of information, and restricted access to user data. We also monitor our systems for potential security breaches and take prompt action if a breach is detected.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            6.	Children's Privacy
            </span>
            <br />
            <br />
            Our website is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under the age of 13. If we discover that we have collected personal information from a child under the age of 13, we will take prompt action to delete that information from our systems.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            7.	Changes to Privacy Policy
            </span>
            <br />
            <br />
            We may update our privacy policy from time to time. Users will be notified of any changes via email or a prominent notice on our website. It is the responsibility of users to review our privacy policy periodically and to discontinue use of our website if they do not agree to any changes.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            8.	Contact Us
            </span>
            <br />
            <br />
            If you have any questions or concerns about our privacy policy, please contact us at: info@mymultimeds.combr 
            <br/>
            <br />
          </p>
        </div>
      </div>

      <WhyChooseUs />
      {/* <Footer /> */}
    </div>
  );
};

export default PrivacyPolicy;
