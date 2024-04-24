import React from "react";
import FeaturedIcon from "../assets/Group.svg";
import BlogImage from "../assets/backimag.jpeg";
import { Link } from "react-router-dom";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Blog() {
  return (
    <>
      <div className="w-full h-[1641px] px-[100px] py-12 bg-neutral-50 flex-col justify-start items-start gap-5 inline-flex">
        <div className="text-slate-900 text-[32px] font-bold font-['Helvetica Neue'] leading-10">
          Blog
        </div>
        <div className="self-stretch justify-start items-start gap-5 inline-flex">
          <div className="flex-col justify-start items-start gap-2 inline-flex">
            <div className="w-full h-[467px] p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
              <Link
                to="/blogDetails"
                className="w-full h-[344px] relative rounded-lg"
              >
                <img
                  src={BlogImage}
                  alt="Blog"
                  className="w-full h-[344px] relative rounded-lg"
                />

                <div className="px-2 py-1 right-[4%] top-[26px] absolute bg-teal-100 rounded justify-center items-center gap-1 inline-flex">
                  <div className="w-6 h-6 relative">
                    <div className="w-6 h-6 left-[-0px] top-[-0px] absolute">
                      <img
                        src={FeaturedIcon}
                        alt="Featured"
                        className="w-6 h-6"
                      />
                    </div>
                  </div>
                  <div className="text-slate-900 text-sm font-medium font-['Helvetica Neue'] leading-[17.50px]">
                    Featured
                  </div>
                </div>
              </Link>
              <div className="self-stretch h-[59px] flex-col justify-start items-start gap-1 flex">
                <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                  Featured Blog title goes here
                </div>
                <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                  For athletes, high altitude produces two contradictory effects
                  on performance. For explosive events .Physiological
                  respiration involves the mechanisms that ensure that the
                  composition of the functional.
                </div>
              </div>
            </div>
            <div className="flex-grow: 1 justify-start items-start gap-2 inline-flex">
              <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 inline-flex">
                <Link
                  to="/blogDetails"
                  className="w-full h-[344px] relative rounded-lg"
                >
                  <img
                    src={BlogImage}
                    alt="Blog"
                    className="w-full h-[344px] relative rounded-lg"
                  />
                </Link>
                <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                  <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                    Featured Blog title goes here
                  </div>
                  <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                    For athletes, high altitude produces two contradictory
                    effects on performance. For explosive events .Physiological
                    respiration involves the mechanisms that ensure that the
                    composition of the functional.
                  </div>
                </div>
              </div>
              <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 inline-flex">
                <Link
                  to="/blogDetails"
                  v
                  className="w-full h-[344px] relative rounded-lg"
                >
                  <img
                    src={BlogImage}
                    alt="Blog"
                    className="w-full h-[344px] relative rounded-lg"
                  />
                </Link>
                <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                  <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                    Featured Blog title goes here
                  </div>
                  <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                    For athletes, high altitude produces two contradictory
                    effects on performance. For explosive events .Physiological
                    respiration involves the mechanisms that ensure that the
                    composition of the functional.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink  flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch h-[486px] p-4 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
              <Link
                to="/blogDetails"
                className="w-full h-[344px] relative rounded-lg"
              >
                <img
                  src={BlogImage}
                  alt="Blog"
                  className="w-[789px] h-[344px] relative rounded-lg"
                />
              </Link>
              <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                  Featured Blog title goes here
                </div>
                <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                  For athletes, high altitude produces two contradictory effects
                  on performance. For explosive events .Physiological
                  respiration involves the mechanisms that ensure that the
                  composition of the functional.
                </div>
              </div>
            </div>
            <div className="self-stretch h-[486px] p-4 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 flex">
              <Link
                to="/blogDetails"
                iv
                className="w-full h-[344px] relative rounded-lg"
              >
                <img
                  src={BlogImage}
                  alt="Blog"
                  className="w-[789px] h-[344px] relative rounded-lg"
                />
              </Link>
              <div className="self-stretch h-[94px] flex-col justify-start items-start gap-1 flex">
                <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                  Featured Blog title goes here
                </div>
                <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                  For athletes, high altitude produces two contradictory effects
                  on performance. For explosive events .Physiological
                  respiration involves the mechanisms that ensure that the
                  composition of the functional.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-start gap-2 inline-flex">
          <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 inline-flex">
            <Link
              to="/blogDetails"
              className="w-full h-[344px] relative rounded-lg"
            >
              <img
                src={BlogImage}
                alt="Blog"
                className="w-full h-[344px] relative rounded-lg"
              />
            </Link>
            <div className="self-stretch h-[77px] flex-col justify-start items-start gap-1 flex">
              <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                Featured Blog title goes here
              </div>
              <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                For athletes, high altitude produces two contradictory effects
                on performance. For explosive events .Physiological respiration
                involves the mechanisms that ensure that the composition of the
                functional.
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 p-6 bg-white rounded-lg shadow border border-slate-200 flex-col justify-start items-start gap-4 inline-flex">
            <Link
              to="/blogDetails"
              className="w-full h-[344px] relative rounded-lg"
            >
              <img
                src={BlogImage}
                alt="Blog"
                className="w-full h-[344px] relative rounded-lg"
              />
            </Link>
            <div className="self-stretch h-[77px] flex-col justify-start items-start gap-1 flex">
              <div className="text-slate-900 text-base font-medium font-['Helvetica Neue'] leading-tight">
                Featured Blog title goes here
              </div>
              <div className="self-stretch text-slate-900 text-sm font-normal font-['Helvetica Neue'] leading-[17.50px]">
                For athletes, high altitude produces two contradictory effects
                on performance. For explosive events .Physiological respiration
                involves the mechanisms that ensure that the composition of the
                functional.
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUs />
    </>
  );
}
