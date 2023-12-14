import React from "react";

const Loading = () => {
  return (
    <div className="flex items-start justify-center">
      <div
        className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-solid border-current border-r-transparent mt-12"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
