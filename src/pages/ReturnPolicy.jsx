import React from "react";

import Navbar from "../components/Navbar";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const ReturnPolicy = () => {
  return (
    <div>
      <div className="flex justify-center items-center py-2 sm:py-12 px-4 sm:px-24 bg-white">
        <div className="flex-col flex gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-[#CBD5E1] py-4 text-[#0F172A]">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium">
              Return Policy
            </h1>
            <h2 className="text-[1.125rem] font-HelveticaNeueItalic">
              last updated : 23rd March 2024
            </h2>
          </div>

          <p className="text-[#1E293B]">

            <br />
            <br />
                If the product that you have received is damaged, then do not accept the delivery of that product. If after opening the package you discover that the product is damaged or received the wrong product , the same may be returned for a refund. Please note that we cannot promise a replacement for all products as it will depend on the availability of the particular product, in such cases we will offer a refund.
            <br />
            <br />

            <br />
            <br />
            1.	In the aforesaid unlikely situations, if there is something wrong with the order, we'd be happy to assist and resolve your concern. You may raise a Return request with our customer care within 7 days from the delivery of the product. We reserves the right to cancel the Return request, if the customer reaches out to 1mg after 7 days of delivery.
            <br />
            <br />
            2.	Upon receiving your Return/Refund request, We shall verify the authenticity and the nature of the request. If We find that the request is genuine, We will initiate the Return and Refund process. We shall process the refund only once it has received the confirmation from the vendor concerned in respect of the contents of the product relating to that refund.
            <br />
            <br />
            3.	In the event of frivolous and unjustified complaints regarding the quality and content of the products, We reserves the right to pursue necessary legal actions against you and you will be solely liable for all costs incurred by 1mg in this regard.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
            The returns are subject to the below conditions:-
            </span>
            <br />
            <br />
            1.	Any wrong ordering of a product doesn’t qualify for Return;
            <br />

            2.	The batch number of the product being returned should match as mentioned on the invoice;
            <br />
            3.	Return requests arising due to change in prescription do not qualify for Return;
            <br />
            4.	The product being returned should only be in its original manufacturer's packaging i.e. with original price tags, labels, bar-code and invoice.
            <br />
            5.	Partially consumed strips or products do not qualify for Return, only fully unopened strips or products can be returned.

            <br />
            <br />

            {/* <span className=" font-HelveticaNeueMedium">
              2.	Information Collected
            </span> */}
            <br />
            <br />
            Certain categories of products marked as non- returnable on product page, will not qualify for the Return as per Our Return policy. The details of the non- returnable products are mentioned below:
            <br />
            <br />

            <br />
            <br />
            1.	Baby Care - Bottle Nipples, Breast Nipple Care, Breast Pumps, Diapers, Ear Syringes, Nappy, Wet Reminder, Wipes and Wipe Warmers
            <br />
            2.	Food and Nutrition Health Drinks, Health Supplements
            <br />
            3.	Healthcare Devices - Glucometer Lancet/Strip, Healthcare Devices and Kits, Surgical, Health Monitors
            <br />
            4.	Sexual Wellness - Condoms, Fertility Kit/Supplement, Lubricants, Pregnancy Kits
            <br />
            5.	Temperature Controlled and Speciality Medicines - Vials, Injections, Vaccines, Penfills and any other Product, requiring cold storage, or medicines that fall under the category of speciality medicines.
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
                RETURN PROCESS:
            </span>
            <br />
            <br />
            1.	For Return intimation, please visit www.mymultimeds.com/contactus
            <br />
            2.	Our customer care team will verify the claim made by the customer within 72 (seventy-two) business hours from the time of receipt of the complaint.
            <br />
            3.	Once the claim is verified as genuine and reasonable, we will initiate the collection of product(s) to be returned.
            <br />
            4.	The customer will be required to pack the product(s) in original manufacturer’s packaging.
            <br />
            5.	Refund will be completed within 30 (thirty) days from the date of reverse pick up (if required).
            <br />
            <br />

            <span className=" font-HelveticaNeueMedium">
                CANCELLATION POLICY
            </span>
            <br />
            <br />
            1.	The customer can cancel the order for the product till We ship it. Orders once shipped cannot be cancelled.
            <br />
            2.	There may be certain orders that may need to be cancelled by us Some situations include, non-availability of the product or quantities ordered by you or inaccuracies or errors in pricing information specified by our partners.
            <br />
            3.	Invalid address given in order details;
            <br />
            4.	No cancellation charges shall be levied for the cancellation of an order in accordance with the terms of this policy.
            <br />
            <br />
          </p>
        </div>
      </div>

      <WhyChooseUs />
      {/* <Footer /> */}
    </div>
  );
};

export default ReturnPolicy;
