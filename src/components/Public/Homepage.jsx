import React from "react";
import LogoPng from "../../assets/icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Navigation/Footer";
import PublicNavbar from "./PublicNavbar";
import PricingCardDash from "./PricingCardDash";
import dash from "../../assets/dash.jpg";

const Homepage = () => {
  const navigate = useNavigate();
  const handleStartedClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-backgroundWhite flex flex-col min-h-screen">
      <PublicNavbar />
      <div className="flex-1 mx-64 items-center text-center">
        <div className="p-12 mx-4 pb-2">
          <h2 className="text-6xl leading-normal font-sans font-semibold">
            The{" "}
            <span className="text-green-600 border-dotted border-2 border-green-600 p-2">
              easiest
            </span>{" "}
            way to monitor your
            <br /> application's usage and{" "}
            <span className="text-red-700 border-dotted border-2 border-red-700 p-2">
              blockers
            </span>
          </h2>
        </div>
        <div className="p-12 justify-center">
          <h2 className="text-4xl leading-normal font-light">
            Find the{" "}
            <span className="text-purple-900 underline font-bold">best</span>{" "}
            plan for you
          </h2>
          <div className="justify-center mt-4">
            <PricingCardDash />
          </div>
        </div>
        <div className="p-12 pt-8 mx-4">
          <h2 className="text-6xl leading-normal font-sans font-semibold">
            Managing your{" "}
            <span className="text-purple-900 border-dotted border-2 border-purple-900 p-2">
              Rate Limits
            </span>{" "}
            <br />
            has never been easier.
          </h2>
          <h2 className="text-2xl text-gray-700 mt-4">
            Rater is a Rate Control as a Service tool that aims to simplify rate
            limiting for <br /> developers, managers, product owners and anyone
            else who needs to <br /> manage rate limits for an application at
            the click of a button.
          </h2>
          <button
            className="mt-12 w-1/6 bg-sideBarPurple rounded-lg p-4 text-2xl text-white font-light hover:bg-opacity-75"
            onClick={handleStartedClick}
          >
            Get Started
          </button>
        </div>
        <div className="my-4 mr-2 py-4 border-2 border-gray-400 shadow-lg rounded-2xl bg-gray-300 bg-opacity-30 flex justify-center items-center">
          <img src={dash} alt="Demo" className="w-max h-max rounded-xl" />
        </div>
      </div>
      <div className="mx-48">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
