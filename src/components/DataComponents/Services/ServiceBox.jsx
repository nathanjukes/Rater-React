import React from "react";

const ServiceBox = ({ service }) => {
  const activeAPIsCount = service && service.apis ? service.apis.length : 0;
  const parentApp = service.flatStructure
    ? service.flatStructure.split("/")[1]
    : "";

  return (
    <div className="bg-buttonPurple border-2 p-3 pb-2 pt-4 border-gray-500 rounded-md cursor-pointer">
      <h2 className="text-center uppercase text-2xl font-semibold leading-none tracking-wider text-black h-12 overflow-hidden overflow-ellipsis">
        {service.name}
      </h2>
      <div className="flex justify-center mt-2">
        <div className="px-4 text-md">Active APIs: {activeAPIsCount}</div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="px-4 text-md">Application: {parentApp}</div>
      </div>
    </div>
  );
};

export default ServiceBox;
