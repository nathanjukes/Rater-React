import React from "react";
import Applications from "./AppsList";

const AppsDataDisplay = ({ onPageChange }) => {
  return (
    <div>
      <div class="flex justify-between items-center m-4 mt-2 pt-4">
        <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
          Applications
        </h1>
      </div>
      <Applications onPageChange={onPageChange} />
    </div>
  );
};

export default AppsDataDisplay;
