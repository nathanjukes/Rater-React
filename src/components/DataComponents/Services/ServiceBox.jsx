import React from "react";

const ServiceBox = ({ service }) => {
  const activeAPIsCount = service && service.apis ? service.apis.length : 0;
  const parentApp = service.flatStructure
    ? service.flatStructure.split("/")[1]
    : "";

  const buttonStyle =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-2 border-gray-200 hover:shadow-xl";

  return (
    <div className={` ${buttonStyle}`}>
      <h2 className="inline-block p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
        {service.name}
      </h2>
      <div className="flex justify-center mt-4">
        <div className="inline-block px-4 text-lg font-semibold">
          <div className="text-center border-gray-600 rounded-md px-2 mb-2">
            <span className="block text-3xl text-black">{activeAPIsCount}</span>
            <span className="font-light text-2xl">Services Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBox;
