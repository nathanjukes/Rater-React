import React from "react";
import { useNavigate } from "react-router-dom";

const PricingCardTier3 = () => {
  const navigate = useNavigate();
  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="items-center p-5 px-20 mx-4 text-gray-700 border-2 border-gray-300 shadow-lg bg-navBarWhite rounded-2xl w-160 h-full hover:shadow-gray-400 flex flex-col justify-between">
      <div className="flex flex-col gap-2 py-5">
        <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
        <h2>For larger companies</h2>
        <h2 className="font-bold text-4xl">Contact Us</h2>
      </div>
      <ul class="px-2 pt-4 pb-6 flex flex-col gap-3">
        <li class="flex">- Unlimited Applications</li>
        <li class="flex">- Unlimited Users</li>
        <li class="flex">- Unlimited Services</li>
        <li class="flex">- Unlimited APIs </li>
        <li class="flex">- Unlimited Custom Rules</li>
        <li class="flex">- Custom Suport</li>
        <li class="flex">- Metrics Dashboard</li>
      </ul>
      <button
        className="mt-6 w-full bg-sideBarPurple rounded-lg p-4 text-xl text-white font-light hover:bg-opacity-75"
        onClick={handleContactClick}
      >
        Contact Us!
      </button>
    </div>
  );
};

export default PricingCardTier3;
