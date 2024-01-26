import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";
import UsageGraph from "./UsageGraph";

const METRICS_URL = "/metrics/apis";
const APIS_URL = "/apis";

const ApiMetrics = ({ onPageChange, selectedApp }) => {
  const [metric, setMetric] = useState(null);
  const [api, setApi] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const response = await axiosPrivate.get(
          METRICS_URL + "/" + selectedApp
        );
        setMetric(response.data);
      } catch (error) {
        console.error("Error getting metrics:", error);
      }
    };

    const getApi = async () => {
      try {
        const response = await axiosPrivate.get(APIS_URL + "/" + selectedApp);
        setApi(response.data);
      } catch (error) {
        console.error("Error getting api:", error);
      }
    };

    getMetrics();
    getApi();
  }, []);

  if (!metric || !api) {
    return <Loading />;
  }

  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center items-center rounded-xl flex flex-col border-2 border-gray-200 hover:shadow-lg";

  return (
    <div className="grid grid-cols-4 gap-2 m-4">
      <button className={` ${commonClasses} m-2 pb-4 cursor-default`}>
        <div className="justify-center items-center my-auto">
          <div className="inline-block px-4 py-2 pb-1 text-5xl font-medium">
            <h1 className="text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl flex-auto">
              <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-2 text-backgroundWhite">
                {api.httpMethod}:
              </span>
              /{api.name}
            </h1>
          </div>
          <div className="px-4 py-2 pb-0 text-2xl font-medium">
            App: {api.flatStructure.split("/")[1]} <br /> Service:{" "}
            {api.flatStructure.split("/")[2]}
          </div>
        </div>
      </button>
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Id Rules
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-6 pb-1 text-5xl font-bold">
            {api.idRules.length}
          </div>
        </div>
      </div>
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Role Rules
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-6 pb-1 text-5xl font-bold">
            {api.roleRules.length}
          </div>
        </div>
      </div>{" "}
      <div className={` ${commonClasses} m-2 pb-4`}>
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Ip Rules
        </h2>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-6 pb-1 text-5xl font-bold">
            {api.ipRules.length}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-0 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Throughput
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="inline-block px-2 py-2 pt-0 text-4xl font-bold">
            <span className="text-6xl ml-24">{metric.totalThroughput}</span>
            <span className="text-2xl font-extralight">requests</span>
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-0 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Accepted Requests
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="inline-block px-2 py-10 text-5xl font-bold">
            {metric.acceptedCount}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-0 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Denied Requests
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="inline-block px-2 py-10 text-5xl font-bold">
            {metric.deniedCount}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pt-2 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Success Rate{" "}
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex justify-center items-center py-4 ml-6">
          <div className="inline-block px-4 pt-2 text-5xl font-bold">
            {metric.successRate === "NaN"
              ? "100%"
              : (metric.successRate * 100).toFixed(1) + "%"}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-2 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-0 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Top Users
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="flex justify-center flex-col rounded-xl mt-2 py-4 px-12 border-2 border-gray-300 shadow-lg text-left drop-shadow-lg">
            {metric.topUsersAccepted &&
            Object.keys(metric.topUsersAccepted).length !== 0 ? (
              Object.entries(metric.topUsersAccepted).map(
                ([userId, requests], index) => (
                  <span
                    key={userId}
                    className="bg-opacity-100 rounded-md px-4 py-2 text-black text-xl my-1 border-2 border-gray-300 hover:cursor-pointer hover:shadow-sm hover:shadow-gray-400"
                    onClick={() => onPageChange("UserMetric", userId)}
                  >
                    {index + 1}. {userId} - {requests} requests
                  </span>
                )
              )
            ) : (
              <div>
                <h2 className="text-4xl p-10 py-4 font-bold">
                  No data available
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-2 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Most Denied Users{" "}
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="flex justify-center flex-col rounded-xl mt-2 py-4 px-12 border-2 border-gray-300 shadow-lg text-left drop-shadow-lg">
            {metric.topUsersDenied &&
            Object.keys(metric.topUsersDenied).length !== 0 ? (
              Object.entries(metric.topUsersDenied).map(
                ([userId, requests], index) => (
                  <span
                    key={userId}
                    className="bg-opacity-100 rounded-md px-4 py-2 text-black text-xl my-1 border-2 border-gray-300 hover:cursor-pointer hover:shadow-sm hover:shadow-gray-400"
                    onClick={() => onPageChange("UserMetric", userId)}
                  >
                    {index + 1}. {userId} - {requests} requests
                  </span>
                )
              )
            ) : (
              <div>
                <h2 className="text-4xl p-10 py-4 font-bold">
                  No data available
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 col-span-4 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          User Requests <span className="text-xl">(Last 24 Hours)</span>
        </h2>
        <div className="flex flex-grow">
          <UsageGraph data={metric.requestList} />
        </div>
      </div>
    </div>
  );
};

export default ApiMetrics;
