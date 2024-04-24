import React from "react";
import Navbar from "../components/Navbar";
import Results from "../components/Results";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import FindByIndex from "../components/Product/FindByIndex";

const SearchResults = () => {
  return (
    <div>
      <Results />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default SearchResults;
