import React from "react";

import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const TermsAndConditions = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-2 sm:py-12 px-4 sm:px-24 bg-white">
        <div className="flex-col flex gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-[#CBD5E1] py-4 text-[#0F172A]">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium">
            Terms and Conditions
            </h1>
            <h2 className="text-[1.125rem] font-HelveticaNeueItalic">
              last updated : 23rd March 2024
            </h2>
          </div>

          <p className="text-[#1E293B]">
          <span className="font-HelveticaNeueMedium">
  1. Acceptance of Terms
</span>
<br />
<br />
By accessing and using mymultimeds.com, you agree to comply with and be bound by the following terms and conditions of use. If you do not agree to these terms, please do not use the Website.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  2. User Accounts
</span>
<br />
<br />
a. To access certain features of the Website, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information and password.
<br />
b. You agree to provide accurate and current information during the registration process and to update such information to keep it accurate and current.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  3. Product Information
</span>
<br />
<br />
a. We strive to provide accurate and up-to-date information regarding our products. However, we do not guarantee the accuracy, completeness, or reliability of any product descriptions, images, or specifications on the Website.
<br />
b. Prices are subject to change without notice.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  4. Orders and Payment
</span>
<br />
<br />
a. Placing an order on the Website constitutes an offer to purchase the products at the prices and terms stated.
<br />
b. We reserve the right to refuse or cancel any order for any reason, including but not limited to errors in product or pricing information.
<br />
c. Payment must be received in full before order fulfillment.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  5. Shipping and Delivery
</span>
<br />
<br />
a. We will make reasonable efforts to deliver products within the estimated timeframes. However, we are not responsible for delays beyond our control.
<br />
b. Shipping costs are specified at the time of checkout and are the responsibility of the customer.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  6. Returns and Refunds
</span>
<br />
<br />
a. Our return and refund policy are available on the Website. By making a purchase, you agree to the terms of the policy.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  7. Intellectual Property
</span>
<br />
<br />
a. All content on the Website, including text, graphics, logos, images, and software, is the property of Multimeds Healthcare and is protected by intellectual property laws.
<br />
b. You may not reproduce, distribute, display, or create derivative works from any content on the Website without our express written consent.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  8. Limitation of Liability
</span>
<br />
<br />
a. To the fullest extent permitted by law, Multimeds Healthcare shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with the use or inability to use the Website.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  9. Governing Law
</span>
<br />
<br />
These terms and conditions are governed by the laws of Indian Jurisdiction. Any dispute arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Indian Jurisdiction.
<br />
<br />

<span className="font-HelveticaNeueMedium">
  10. Changes to Terms
</span>
<br />
<br />
Multimeds healthcare reserves the right to modify or update these terms and conditions at any time. Changes will be effective immediately upon posting to the Website.
<br />
<br />

          </p>
        </div>
      </div>

      <WhyChooseUs />
    </div>
  );
};

export default TermsAndConditions;
