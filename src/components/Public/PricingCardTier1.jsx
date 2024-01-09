import React from "react";

const PricingCardTier1 = () => {
  return (
    <div className="items-center p-5 px-20 mx-4 text-gray-700 border-2 border-gray-300 shadow-lg bg-navBarWhite rounded-2xl w-160 h-full hover:shadow-gray-400 flex flex-col justify-between">
      <div className="flex flex-col gap-2 py-5">
        <h2 className="text-2xl font-bold mb-2">Starter</h2>
        <h2>Basic use only</h2>
        <h2 className="font-bold text-4xl">
          <span className="font-bold text-4xl">£250</span>{" "}
          <span className="text-2xl">/ Year</span>
        </h2>
      </div>
      <ul class="px-2 pt-4 pb-6 flex flex-col gap-3">
        <li class="flex">- 1 Application</li>
        <li class="flex">- Unlimited Users</li>
        <li class="flex">- Unlimited Services</li>
        <li class="flex">- Unlimited APIs </li>
        <li class="flex">- Unlimited Custom Rules</li>
        <li class="flex">- Custom Suport</li>
        <li class="flex">- Metrics Dashboard</li>
      </ul>
      <button className="mt-6 w-full bg-sideBarPurple rounded-lg p-4 text-xl text-white font-light hover:bg-opacity-75">
        Sign Up!
      </button>
    </div>
  );
};

export default PricingCardTier1;
