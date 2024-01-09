import React from "react";
import LogoPng from "../../assets/icon.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const buttonStyle =
    "mx-4 hover:bg-gray-300 text-xl hover:bg-opacity-40 cursor-pointer text-black tracking-wider font-normal py-3 px-4 rounded-lg";
  const [showOptions, setShowOptions] = useState(false);

  const handleButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleSignInClick = () => {
    setShowOptions(!showOptions);
    navigate("/login");
  };

  const handleHealthCheckClick = () => {
    navigate("/health");
  };

  const handleDashboardClick = () => {
    navigate("/");
  };

  return (
    <nav className="bg-navBarWhite">
      <div className="items-center text-center mx-64 pb-3 pt-4 text-black flex justify-between">
        <div className="py-2 text-black text-center flex justify-center items-center">
          <div
            className="hover:cursor-pointer flex justify-center items-center border-gray-700 rounded-2xl p-2"
            onClick={handleDashboardClick}
          >
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
            <a className={buttonStyle} onClick={handleHealthCheckClick}>
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
  );
};

export default PublicNavbar;
