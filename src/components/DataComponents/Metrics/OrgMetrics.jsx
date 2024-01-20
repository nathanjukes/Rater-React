import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";

const OrgMetrics = ({ onPageChange }) => {
  const [metric, setMetric] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const response = await axiosPrivate.get(`/metrics/orgs`);
        setMetric(response.data);
      } catch (error) {
        console.error("Error getting metrics:", error);
      }
    };

    getMetrics();
  }, []);

  if (!metric) {
    return <Loading />;
  }

  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center items-center rounded-xl flex flex-col border-2 border-gray-200 hover:shadow-lg";

  return (
    <div className="grid grid-cols-4 gap-2 m-4">
      <button
        onClick={() => onPageChange("AppsDataDisplay")}
        className={` ${commonClasses} m-2 pb-4`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Apps
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            {metric.appCount}
          </div>
        </div>
      </button>
      <button
        onClick={() => onPageChange("ServicesDataDisplay")}
        className={` ${commonClasses} m-2 pb-4`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Services
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            {metric.serviceCount}
          </div>
        </div>
      </button>
      <button
        onClick={() => onPageChange("ApisDataDisplay")}
        className={` ${commonClasses} m-2 pb-4`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          APIs
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            {metric.apiCount}
          </div>
        </div>
      </button>
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Unique Rules
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-2 pb-1 text-4xl font-bold">
            {metric.uniqueRules}
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
          Most Denied Requests
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
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-4 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          User Requests
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="inline-block px-2 py-2  text-4xl font-bold">
            735 rq/m
          </div>
        </div>
      </div>
      <button
        className={`shadow-lg mx-2 shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
      >
        Setup Denial Alert
      </button>
      <button
        className={`shadow-lg mx-2 shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
      >
        Block / Limit User
      </button>{" "}
      <button
        className={`shadow-lg mx-2 shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
      >
        Setup Surge Alert
      </button>{" "}
      <button
        className={`shadow-lg mx-2 shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
      >
        Limit API
      </button>
    </div>
  );
};

export default OrgMetrics;
