import React from "react";
import PublicNavbar from "./PublicNavbar";
import Footer from "../Navigation/Footer";
import PricingCardDash from "./PricingCardDash";
import Signup from "../Auth/Signup";

const SignUpPublic = () => {
  return (
    <div className="bg-backgroundWhite flex flex-col min-h-screen">
      <PublicNavbar />
      <div className="flex-grow my-12 items-center text-center">
        <div className="justify-center mt-4">
          <Signup />
        </div>
      </div>
      <div className="footer-wrapper mx-48">
        <Footer className="sticky-footer" />
      </div>
    </div>
  );
};

export default SignUpPublic;
