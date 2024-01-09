import React from "react";
import PricingCardTier3 from "./PricingCardTier3";
import PricingCardTier2 from "./PricingCardTier2";
import PricingCardTier1 from "./PricingCardTier1";
import PricingCardStarter from "./PricingCardStarter";

const PricingCardDash = () => {
  return (
    <div className="flex justify-center">
      <PricingCardStarter />
      <PricingCardTier1 />
      <PricingCardTier2 />
      <PricingCardTier3 />
    </div>
  );
};

export default PricingCardDash;
