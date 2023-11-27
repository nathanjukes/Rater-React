import React from "react";

const ServiceBox = ({ service }) => {
  const activeAPIsCount = service && service.apis ? service.apis.length : 0;

  return (
    <div className="bg-buttonPurple border-2 p-3 border-gray-500 rounded-md cursor-pointer">
      <h2 className="text-center uppercase text-2xl font-semibold leading-none tracking-wider text-black h-12 overflow-hidden overflow-ellipsis">
        {service.name}
      </h2>
      <div className="flex justify-center mt-2">
        <div className="px-4 text-sm">Active APIs: {activeAPIsCount}</div>
      </div>
    </div>
  );
};

export default ServiceBox;
