import React from "react";
import Applications from "./AppsList";

const AppsDataDisplay = ({ onPageChange }) => {
  return (
    <div>
      <div class="flex justify-between items-center m-4">
        <h1 class=" text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl underline flex-auto">
          Applications
        </h1>
      </div>
      <Applications onPageChange={onPageChange} />
    </div>
  );
};

export default AppsDataDisplay;