import React from "react";
import LogoPng from "../../assets/icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Navigation/Footer";
import PublicNavbar from "./PublicNavbar";

const Homepage = () => {
  return (
    <div className="bg-backgroundWhite flex flex-col min-h-screen">
      <PublicNavbar />
      <div className="flex-1 mx-64 mt-12 items-center text-center">
        <div className="p-12 mx-4">
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
      </div>
      <div className="mx-48">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
