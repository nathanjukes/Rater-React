import React from "react";
import LogoPng from "../../assets/icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Navigation/Footer";

const Homepage = () => {
  const navigate = useNavigate();
  const buttonStyle =
    "mx-4 hover:bg-gray-300 text-xl hover:bg-opacity-40 text-black tracking-wider font-normal py-2 px-4 rounded-lg";
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSignInClick = () => {
    setShowOptions(!showOptions);
    navigate("/login");
  };

  return (
    <div className="bg-backgroundWhite flex flex-col min-h-screen">
      <nav className="bg-navBarWhite border-b-2 border-gray-200">
        <div className="items-center text-center mx-64 pb-3 pt-4 text-black flex justify-between">
          <div className="py-2 text-black text-center shadow-sm flex justify-center items-center">
            <div className="hover:cursor-pointer flex justify-center items-center border-gray-700 rounded-2xl p-2">
              <img src={LogoPng} alt="Logo" className="w-16 h-16 mr-2" />
              <h1 className="text-4xl font-medium tracking-wider leading-9 text-gray-900">
                <span>Rater.io</span>
              </h1>
            </div>
            <div className="ml-2 relative inline-block text-left">
              <button className={buttonStyle} onClick={handleButtonClick}>
                Developer
                <svg
                  className="w-2.5 h-2.5 ms-2.5 inline-block"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {showOptions && (
                <div className="absolute bg-white text-gray-700 pt-1 pb-2 px-2 rounded shadow-lg">
                  <a
                    href="#"
                    className="hover:bg-gray-200 block px-4 py-2 text-sm"
                  >
                    Option 1
                  </a>
                  <a
                    href="#"
                    className="hover:bg-gray-200 block px-4 py-2 text-sm"
                  >
                    Option 2
                  </a>
                  <a
                    href="#"
                    className="hover:bg-gray-200 block px-4 py-2 text-sm"
                  >
                    Option 3
                  </a>
                </div>
              )}
            </div>
            <div className="relative inline-block text-left">
              <button className={buttonStyle} onClick={handleButtonClick}>
                Pricing
                <svg
                  className="w-2.5 h-2.5 ms-2.5 inline-block"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
            </div>
            <div className="relative inline-block text-left">
              <a href="https://github.com/nathanjukes" className={buttonStyle}>
                GitHub
              </a>
            </div>
            <div className="relative inline-block text-left">
              <a href="https://github.com/nathanjukes" className={buttonStyle}>
                Health Check
              </a>
            </div>
          </div>
          <div className="relative inline-block text-left">
            <button
              className={`mx-4 text-xl tracking-wider font-normal py-2 px-4 rounded-lg text-white bg-black hover:bg-opacity-75`}
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
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
