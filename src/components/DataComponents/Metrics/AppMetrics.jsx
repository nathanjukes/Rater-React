import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";
import UsageGraph from "./UsageGraph";

const METRICS_URL = "/metrics/apps";
const APPS_URL = "/apps";

const AppMetrics = ({ onPageChange, selectedApp }) => {
  const [metric, setMetric] = useState(null);
  const [app, setApp] = useState(null);
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

    const getApp = async () => {
      try {
        const response = await axiosPrivate.get(APPS_URL + "/" + selectedApp);
        setApp(response.data);
      } catch (error) {
        console.error("Error getting app:", error);
      }
    };

    getMetrics();
    getApp();
  }, []);

  if (!metric || !app) {
    return <Loading />;
  }

  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center items-center rounded-xl flex flex-col border-2 border-gray-200 hover:shadow-lg";

  return (
    <div className="grid grid-cols-4 gap-2 m-4">
      <button className={` ${commonClasses} m-2 pb-4 cursor-default`}>
        <div className="flex justify-center items-center my-auto">
          <div className="inline-block px-4 py-2 pb-1 text-5xl font-medium">
            {app.name}
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
          Most Requested APIs{" "}
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex justify-center flex-col rounded-xl mt-2 py-4 px-32 border-2 border-gray-300 shadow-lg text-left drop-shadow-lg">
          {metric.highestAcceptedAPIs &&
          metric.highestAcceptedAPIs.length != 0 ? (
            metric.highestAcceptedAPIs.map((a) => (
              <div
                className="px-4 text-2xl border-2 border-gray-400 rounded-lg py-3 my-1 hover:cursor-pointer hover:shadow-sm hover:shadow-gray-400"
                onClick={() => onPageChange("Api", null, null, a[0])}
              >
                <span
                  className="bg-sideBarPurple bg-opacity-100 rounded-md px-2 py-0.5 mr-1 text-backgroundWhite"
                  onClick={() => onPageChange("Api", null, null, a[0])}
                >
                  {a[2]}:
                </span>
                <span className="text-md">
                  {a[3].split("/")[2] + "/" + a[3].split("/")[3]} - {a[4]}{" "}
                  requests
                </span>
              </div>
            ))
          ) : (
            <div>
              <h2 className="text-4xl p-10 py-4 font-bold">
                No data available
              </h2>
            </div>
          )}
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
            <span className="text-6xl ml-24">{metric.throughput}</span>
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
            {metric.acceptedRequests}
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
            {metric.deniedRequests}
          </div>
        </div>
      </div>
      <div
        className={` ${commonClasses} m-2 pb-4 col-span-1 flex flex-col justify-start items-center`}
      >
        <h2 className="inline-block p-4 pb-0 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
          Top Users
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex flex-grow justify-center items-center">
          <div className="flex justify-center flex-col rounded-xl mt-0 py-4 px-2 border-2 border-gray-300 shadow-lg text-left drop-shadow-lg">
            {metric.topUsers && metric.topUsers.length != 0 ? (
              metric.topUsers.map((u, index) => (
                <span
                  className="bg-opacity-100 rounded-md px-1 py-1 text-black text-xl my-1 border-2 border-gray-300 hover:cursor-pointer hover:shadow-sm hover:shadow-gray-400"
                  onClick={() => onPageChange("UserMetric", u[0])}
                >
                  {index + 1}. {u[0]} - {u[1]} requests
                </span>
              ))
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
          Most Denied Requests{" "}
          <span className="text-xl">
            <br />
            (Last 24 Hours)
          </span>
        </h2>
        <div className="flex justify-center flex-col rounded-xl mt-2 py-4 px-32 border-2 border-gray-300 shadow-lg text-left drop-shadow-lg">
          {metric.lowestAcceptedAPIs &&
          metric.lowestAcceptedAPIs.length != 0 ? (
            metric.lowestAcceptedAPIs.map((a) => (
              <div
                className="px-4 text-2xl border-2 border-gray-400 rounded-lg py-3 my-1 hover:cursor-pointer hover:shadow-sm hover:shadow-gray-400"
                onClick={() => onPageChange("Api", null, null, a[0])}
              >
                <span className="bg-sideBarPurple bg-opacity-100 rounded-md px-2 py-0.5 mr-1 text-backgroundWhite">
                  {a[2]}:
                </span>
                {a[3].split("/")[2] + "/" + a[3].split("/")[3]} - {a[4]}{" "}
                requests
              </div>
            ))
          ) : (
            <div>
              <h2 className="text-4xl p-10 py-4 font-bold">
                No data available
              </h2>
            </div>
          )}
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

export default AppMetrics;
