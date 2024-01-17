import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";

const ORGS_URL = "/orgs";

const Metrics = ({ onPageChange }) => {
  const [metric, setMetric] = useState(null);
  const [org, setOrg] = useState(null);
  const [selectedOption, setSelectedOption] = useState("org");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showAppModal, setShowAppModal] = useState(false);
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
    const getOrg = async () => {
      try {
        const response = await axiosPrivate.get(ORGS_URL + "/me");
        setOrg(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getMetrics();
    getOrg();
  }, []);

  const handleOptionChange = (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    switch (newOption) {
      case "org":
        console.log("Org selected");
        break;
      case "app":
        console.log("App selected");
        setShowAppModal(true);
        break;
      case "service":
        console.log("Service selected");
        break;
      case "api":
        console.log("API selected");
        break;
      default:
        console.log("Invalid option selected");
    }
  };

  const handleAppChange = (event) => {
    const app = event.target.value;
    setSelectedApp(app);
    console.log(app);
  };

  const handleConfirmClick = () => {
    setShowAppModal(false);
    setSelectedOption("app");
  };

  const handleExitClick = () => {
    setShowAppModal(false);
    setSelectedOption("org");
  };

  if (!metric || !org) {
    return <Loading />;
  }

  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center items-center rounded-xl flex flex-col border-2 border-gray-200 hover:shadow-lg";

  return (
    <div>
      <div className="flex justify-between items-center m-4 mt-2 pt-4 ml-6">
        <select
          onChange={handleOptionChange}
          value={selectedOption}
          className="border-2 border-gray-200 rounded-md shadow-lg flex flex-col text-xl px-3 pl-2 py-4 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline mr-0"
        >
          <option value="org">Org</option>
          <option value="app">App</option>
          <option value="service">Service</option>
          <option value="api">API</option>
        </select>
        <h1 className="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
          Metrics
        </h1>
      </div>
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
      {showAppModal && (
        <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 pb-4 rounded-md items-center mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Select App to View
            </h2>
            <div className="mb-2 flex items-center justify-center">
              <select
                onChange={handleAppChange}
                value={selectedApp}
                className="border-2 border-gray-200 rounded-md shadow-lg text-xl px-3 pl-2 py-4 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline mx-auto"
              >
                {org.apps && org.apps.length > 0 ? (
                  org.apps.map((app) => (
                    <option value={app.id}>{app.name}</option>
                  ))
                ) : (
                  <option value="App">No Apps</option>
                )}
              </select>
            </div>
            <div className="mb-0 flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-600 rounded-md text-white ml-0"
                onClick={() => handleExitClick()}
              >
                Exit
              </button>
              <button
                className="px-4 py-2 mx-10 bg-sideBarPurple rounded-md text-white mr-0"
                onClick={() => handleConfirmClick()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Metrics;
