import React from "react";
import PublicNavbar from "./PublicNavbar";
import Footer from "../Navigation/Footer";
import PricingCardDash from "./PricingCardDash";

const Pricing = () => {
  return (
    <div className="bg-backgroundWhite flex flex-col min-h-screen">
      <PublicNavbar />
      <div className="flex-grow my-12 items-center text-center">
        <h2 className="text-4xl leading-normal font-light">
          Find the{" "}
          <span className="text-purple-900 underline font-bold">best</span> plan
          for you
        </h2>
        <div className="justify-center mt-4">
          <PricingCardDash />
        </div>
      </div>
      <div className="footer-wrapper mx-48">
        <Footer className="sticky-footer" />
      </div>
    </div>
  );
};

export default Pricing;
