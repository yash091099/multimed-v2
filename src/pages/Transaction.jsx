import React from "react";
import TransactionOutcome from "../components/Cart/TransactionOutcome";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

const Transaction = ({ isFailed }) => {
  return (
    <div>
      <TransactionOutcome isFailed={isFailed} />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Transaction;
