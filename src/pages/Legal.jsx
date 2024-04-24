import React from "react";

import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const Legal = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-2 sm:py-12 px-4 md:px-24 bg-white">
      <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-2 border-b border-[#CBD5E1] py-4 text-[#0F172A]">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium">Legal</h1>
            <h2 className="text-[1.125rem] font-HelveticaNeueItalic">
              last updated : 23rd March 2024
            </h2>
          </div>

          <p className="text-[#1E293B]">
            Welcome to Multimeds. We value your
            privacy and are committed to protecting your personal information.
            This Privacy Policy outlines how we collect, use, disclose, and
            safeguard your data when you use our website, services, and
            products.
            <br />
            <br />
            By accessing or using our website and services, you consent to the
            practices described in this Privacy Policy. Please take a moment to
            review this policy to understand how your personal information will
            be treated.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">
              Information We Collect
            </span>
            <br />
            <br />
            We may collect various types of information from and about users of
            our website and services, including:
            <br />
            1. Personal Information: Such as your name, contact details, date of
            birth, and other identifying information.
            <br />
            2. Medical Information: Including prescription details, health
            conditions, and treatment history, to provide accurate
            pharmaceutical services.
            <br />
            3. Usage Information: Information about how you interact with our
            website, services, and products, such as IP addresses, browser
            types, and browsing behavior.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">
              How We Use Your Information
            </span>
            <br />
            <br />
            We use the information we collect to:
            <br />
            1. Provide Services: Fulfill your orders, process prescriptions, and
            deliver pharmaceutical products.
            <br />
            2. Improve User Experience: Understand how users interact with our
            platform and make necessary improvements.
            <br />
            3. Communication: Send transaction-related information, updates,
            promotions, and respond to your inquiries.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">
              Disclosure of Your Information
            </span>
            <br />
            <br />
            We may share your information:
            <br />
            1. With Service Providers: To facilitate our services, such as
            payment processing and order fulfillment.
            <br />
            2. Legal Obligations: When required by law, court order, or
            government authority.
            <br />
            3. Business Transfers: In the event of a merger, acquisition, or
            sale of all or a portion of our assets.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">Data Security</span>
            <br />
            <br />
            We take reasonable measures to protect your data from unauthorized
            access, disclosure, alteration, or destruction. However, no data
            transmission over the internet or electronic storage is completely
            secure. We cannot guarantee absolute security.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">Your Choices</span>
            <br />
            <br />
            You have the right to:
            <br />
            1. Access and Update Your Information: You can access and update
            your personal and medical information in your account settings.
            <br />
            2. Opt-Out: You can opt out of receiving promotional communications
            from us.
            <br />
            3. Data Deletion: You can request the deletion of your account and
            associated information.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">
              Children's Privacy
            </span>
            <br />
            <br />
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            you believe a child has provided us with personal information,
            please contact us immediately.
            <br />
            <br />
            <span className=" font-HelveticaNeueMedium">
              Changes to this Privacy Policy
            </span>
            <br />
            <br />
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page. If you
            have any questions about this Privacy Policy, please contact us at:
            info@mymultimeds.com. Thank you for trusting Multimeds with your
            healthcare needs and privacy.
          </p>
        </div>
      </div>

      <WhyChooseUs />
      {/* <Footer /> */}
    </div>
  );
};

export default Legal;
