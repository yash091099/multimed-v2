import React from "react";
import { toast } from 'react-toastify';
import Tooltip from '@material-ui/core/Tooltip';
import Quality from "../assets/whyChooseUs/quality.svg";
import Security from "../assets/whyChooseUs/secure.svg";
import CustomerCare from "../assets/whyChooseUs/customerCare.svg";
import Range from "../assets/whyChooseUs/range.svg";
import Convenience from "../assets/whyChooseUs/convenience.svg";
import Health from "../assets/whyChooseUs/health.svg";
import WhyChooseUsCard from "./WhyChooseUsCard";

const WhyChooseUs = ({ columns3, isContent }) => {
	const handleCopyLink = (code) => {
		if (code) {
		  navigator.clipboard.writeText(code).then(
			() => toast.success('Copied!'),
			() => toast.error('Failed to copy!')
		  );
		}
	  };
	  const openEmail = (email) => {
		window.location.href = `mailto:${email}`;
	  };
	return (
		<div className="flex flex-col gap-6 w-full p-4 sm:py-14 sm:px-[6.25rem] bg-white">
			<div className="flex-col py-8 px-4 sm:px-[4.5rem]">
				<div className="px-4 flex h-[1.875rem] border-l-[0.188rem] border-[#031B89] gap-4 items-center">
					<h1 className="text-[#031B89] text-[1.5rem] font-HelveticaNeueBold">
						Why Choose Us?
					</h1>
				</div>

				{/* Cards */}
				<div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center gap-6 ${columns3 ? 'lg:grid-cols-3':'lg:grid-cols-5'}`}>
					<WhyChooseUsCard
						image={Quality}
						title="Quality Assurance"
						isContent={isContent}
						content="We source pharmaceuticals from trusted manufacturers and distributors, ensuring top-quality standards in every product you receive."
					/>
					<WhyChooseUsCard
						image={Range}
						title="Wide Product Range"
						isContent={isContent}
						content="Our wide pharmaceutical range covers OTC meds, prescriptions, devices, and essentials, meeting diverse health needs efficiently."
					/>
					<WhyChooseUsCard
						image={Convenience}
						title="Convenience"
						isContent={isContent}
						content="We value your time and convenience. Our user-friendly platform lets you order medications from home with ease."
					/>
					<WhyChooseUsCard
						image={CustomerCare}
						title="Customer Care"
						isContent={isContent}
						content="Your satisfaction is our priority. Our dedicated customer care is always ready to assist with inquiries and concerns."
					/>
					<WhyChooseUsCard
						image={Security}
						title="Secure Transactions"
						isContent={isContent}
						content="Your safety is paramount to us. We ensure secure and encrypted transactions to safeguard your personal and financial information."
					/>
				</div>
			</div>

			{/* Content */}
			<div className="xl:max-h-[11rem] flex flex-col sm:flex-row justify-center gap-6 items-center p-4 sm:px-6 sm:py-12 bg-[#C2F5E9]">
				<div className="flex flex-col justify-center items-center gap-4">
					<div className="p-4 bg-[#EEF2FF]">
						<img src={Health} alt="Health Icon" />
					</div>
					<h1 className="text-[1.5rem] font-HelveticaNeueBold text-[#021156] leading-[1.875rem] tracking-tight text-center">
						Join Us in Building a<br />
						Healthier Tomorrow
					</h1>
				</div>
				<div>
					<p className="xl:w-[32.5rem] text-[#021156] leading-[1.25rem] tracking-tight">
						MultiMeds Healthcare invites you to be a part of our journey towards
						a healthier tomorrow. Whether you're managing a chronic condition,
						seeking preventive care, or simply looking for wellness solutions,
						we are here to support you every step of the way. Stay healthy, stay
						happy!
					</p>
				</div>
			</div>

			<div>
				<h1 className="text-center mt-6 font-HelveticaNeueMedium">
					For enquiries, feel free to reach out to us at{" "}
					<a style={{cursor:"pointer"}} onClick={()=>{openEmail("contact@mymultimeds.com")}} className="text-[#7487FF]">
						contact@mymultimeds.com
					</a>
				</h1>
			</div>
		</div>
	);
};

export default WhyChooseUs;