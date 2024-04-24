import React from "react";

import DirectorImage from "../assets/about/directorImage.png";

const AboutSection = ({
  heading1,
  heading2,
  heading3,
  content,
  isDirector,
}) => {
  return (
    <div className="max-w-[90rem] mx-auto mb-[1.5rem]">
      <div className="flex flex-col md:flex-row justify-between gap-2 md:mx-[7.5rem] py-[3rem] px-[1.5rem] bg-[#F8FAFC]">
        <div>
          <h1 className="border-l-[3px] border-[#031B89] px-[1rem]  text-[1.5rem] font-HelveticaNeueBold text-[#031B89] leading-[1.875rem]">
            {heading1}
            <br />
            {heading2}
            <br />
            {heading3 ? heading3 : null}
          </h1>
        </div>

        {/* content */}
        <div className="flex flex-col gap-[1rem] text-[#0F172A]">
          <p className="text-[0.875rem] max-w-[37.5rem] leading-[1.1rem] tracking-tight">
            {content}
          </p>
          {isDirector ? (
            <>
              <div className="max-w-[37.5rem] max-h-[32.188rem]">
                <img src={DirectorImage} className="h-full w-full rounded-lg" />
              </div>
              <div>
                <h1 className="text-[1.25rem] font-HelveticaNeueMedium">
                  Capt. Yamini Joshi (Retd)
                </h1>
                <h2 className="text-[#475569] font-HelveticaNeueItalic">
                  CEO, Multimeds Healthcare
                </h2>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
