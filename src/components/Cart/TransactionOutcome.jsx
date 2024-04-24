import React from "react";

import Success from "../../assets/cart/success.svg";
import Failed from "../../assets/cart/failed.svg";
import Star from "../../assets/cart/star.svg";

import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../PrimaryButton";

const TransactionOutcome = ({ isFailed }) => {
  const navigate=useNavigate()
  return (
    <div className="flex justify-center py-12 gap-[1.25rem] px-[6.25rem]">
      <div className="flex flex-col justify-center items-center rounded-lg bg-white w-[46.5rem] py-14 gap-4">
        <div className="flex justify-center items-center flex-col pb-8 gap-4">
          <div
            className={`${
              isFailed ? "bg-[#DC2626]" : "bg-[#A9B5FF]"
            }  p-14 rounded-full w-fit`}
          >
            <img
              src={isFailed ? Failed : Success}
              alt="success"
              className="w-[12] h-[12]"
            />
          </div>

          <div className="flex flex-col gap-1 items-center">
            <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              {isFailed ? "Success failed" : "Transaction successful"}
            </h1>
            <h2 className=" text-center text-[0.875rem] text-[#475569] w-[14.438rem]">
              {isFailed
                ? "There was an error and your transaction did not go through!"
                : "Your order has been placed."}
            </h2>
          </div>

          {isFailed ? (
            <PrimaryButton handleClick={() => navigate('/cart')}  title="Retry payment" />
          ) : (
            <Link to="/track-order">
              <p className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
                Track your order here
              </p>
            </Link>
          )}
        </div>
      </div>

      {!isFailed ? (
        <div className="w-[29.75rem] flex flex-col justify-center rounded-lg bg-white py-4 px-6 gap-4">
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
            Leave Feedback for you order
          </h1>

          <div className="flex flex-col gap-2">
            {/* stars */}
            <div className="flex gap-4">
              <button>
                <img src={Star} className="w-6 h-6" />
              </button>
              <button>
                <img src={Star} className="w-6 h-6" />
              </button>
              <button>
                <img src={Star} className="w-6 h-6" />
              </button>
              <button>
                <img src={Star} className="w-6 h-6" />
              </button>
              <button>
                <img src={Star} className="w-6 h-6" />
              </button>
            </div>

            <textarea
              placeholder="Tell us more about your order"
              className="focus:outline-none border border-[#CBD5E1] rounded p-2 text-[0.875rem] placeholder:text-[#94A3B8] h-[9.563rem]"
            />

            <PrimaryButton title="Submit Feedback" />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TransactionOutcome;
