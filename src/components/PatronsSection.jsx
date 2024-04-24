import React from "react";

import PatronCard from "./PatronCard";

import PatronImage from "../assets/about/patronImage.png";

const PatronsSection = ({ heading1, heading2 }) => {
	return (
		<div className="max-w-[90rem] mx-auto mb-[1.5rem]">
			<div className="flex flex-col md:flex-row justify-between md:mx-[7.5rem] py-[3rem] px-[1.5rem] bg-[#F8FAFC]">
				<div>
					<h1 className="px-[1rem] border-l-[3px] border-[#031B89] text-[1.5rem] font-HelveticaNeueBold text-[#031B89] leading-[1.875rem]">
						{heading1}
						<br />
						{heading2}
					</h1>
				</div>

				{/* content */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:justify-between place-items-center place-content-center">
					<PatronCard
						image={PatronImage}
						name="Priya Sharma"
						occupation="Medical Practitioner"
						content="As a medical practitioner, I rely on Multimeds for top-notch pharmaceuticals. They consistently deliver excellence in healthcare."
					/>
					<PatronCard
						image={PatronImage}
						name="Priya Sharma"
						occupation="Medical Practitioner"
						content="As a medical practitioner, I rely on Multimeds for top-notch pharmaceuticals. They consistently deliver excellence in healthcare."
					/>
					<PatronCard
						image={PatronImage}
						name="Priya Sharma"
						occupation="Medical Practitioner"
						content="As a medical practitioner, I rely on Multimeds for top-notch pharmaceuticals. They consistently deliver excellence in healthcare."
					/>
				</div>
			</div>
		</div>
	);
};

export default PatronsSection;
