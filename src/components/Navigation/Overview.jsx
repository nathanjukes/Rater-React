import React from "react";

const Overview = () => {
  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-gray-300 hover:shadow-lg";

  return (
    <div className="grid grid-cols-4 gap-2 m-4">
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Apps
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            4
          </div>
        </div>
      </div>
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Services
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            20
          </div>
        </div>
      </div>
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          APIs
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            67
          </div>
        </div>
      </div>
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Unique Rules
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            14
          </div>
        </div>
      </div>
      <div className={` ${commonClasses} m-2 pb-4 col-span-2`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Most Requested APIs
        </h2>
        <div className="flex justify-center flex-col rounded-lg mt-4 py-4 border-2 shadow-lg text-left">
          <div className="px-4 py-2 pb-1 text-2xl">POST: csdm/users</div>
          <div className="px-4 py-2 pb-1 text-2xl">GET: csdm/workspaces</div>
          <div className="px-4 py-2 pb-1 text-2xl">GET: csdm/devices</div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-3xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Denied Requests
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="flex justify-center flex-col rounded-lg mt-4 py-4 border-2 shadow-lg text-left">
            <div className="px-4 py-2 pb-1 text-2xl">GET: csdm/phones</div>
            <div className="px-4 py-2 pb-1 text-2xl">PUT: csdm/devices</div>
            <div className="px-4 py-2 pb-1 text-2xl">POST: csdm/devices</div>
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Throughput
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="inline-block px-2 py-2  text-4xl font-bold">
            735 rq/m
          </div>
        </div>
      </div>
      <div className={` ${commonClasses} m-2 pb-4 col-span-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          4x1
        </h2>
      </div>
    </div>
  );
};

export default Overview;