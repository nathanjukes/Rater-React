import React from "react";
import { useNavigate } from "react-router-dom";

const PricingCardStarter = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/signup");
  };

  return (
    <div className="items-center p-5 px-20 mx-4 text-gray-700 border-2 border-gray-300 shadow-lg bg-navBarWhite rounded-2xl w-160 h-full hover:shadow-gray-400 flex flex-col justify-between">
      <div className="flex flex-col gap-2 py-5">
        <h2 className="text-2xl font-bold mb-2">Personal</h2>
        <h2>Personal use only</h2>
        <h2 className="font-bold text-4xl">
          <span className="font-bold text-4xl">Free</span>{" "}
          <span className="text-2xl">/ Year</span>
        </h2>
      </div>
      <ul class="px-2 pt-4 pb-6 flex flex-col gap-3">
        <li class="flex">- 1 Application</li>
        <li class="flex">- Unlimited Users</li>
        <li class="flex">- Unlimited Services</li>
        <li class="flex">- Unlimited APIs </li>
        <li class="flex">- Unlimited Custom Rules</li>
      </ul>
      <button
        className="mt-24 w-full bg-sideBarPurple rounded-lg p-4 text-xl text-white font-light hover:bg-opacity-75"
        onClick={handleLoginClick}
      >
        Sign Up!
      </button>
    </div>
  );
};

export default PricingCardStarter;
