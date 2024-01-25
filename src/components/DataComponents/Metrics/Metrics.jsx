import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";
import OrgMetrics from "./OrgMetrics";
import ApiMetrics from "./ApiMetrics";
import AppMetrics from "./AppMetrics";
import ServiceMetrics from "./ServiceMetrics";

const APIS_URL = "/apis";
const SERVICES_URL = "/services";
const ORGS_URL = "/orgs";

const Metrics = ({ onPageChange }) => {
  const [metric, setMetric] = useState(null);
  const [org, setOrg] = useState(null);
  const [services, setServices] = useState(null);
  const [apis, setApis] = useState(null);
  const [selectedOption, setSelectedOption] = useState("org");
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedApi, setSelectedApi] = useState(null);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
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
    const getApis = async () => {
      try {
        const response = await axiosPrivate.get(APIS_URL);
        setApis(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getServices = async () => {
      try {
        const response = await axiosPrivate.get(SERVICES_URL);
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getMetrics();
    getOrg();
    getApis();
    getServices();
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
        setShowServiceModal(true);
        break;
      case "api":
        console.log("API selected");
        setShowApiModal(true);
        break;
      default:
        console.log("Org selected");
    }
  };

  const handleAppChange = (event) => {
    const app = event.target.value;
    setSelectedApp(app);
    console.log(app);
  };

  const handleServiceChange = (event) => {
    const service = event.target.value;
    setSelectedService(service);
    console.log(service);
  };

  const handleApiChange = (event) => {
    const api = event.target.value;
    setSelectedApi(api);
    console.log(api);
  };

  const handleConfirmClickApp = () => {
    setShowAppModal(false);
    setSelectedOption("app");
  };

  const handleConfirmClickService = () => {
    setShowServiceModal(false);
    setSelectedOption("service");
  };

  const handleConfirmClickApi = () => {
    setShowApiModal(false);
    setSelectedOption("api");
  };

  const handleExitClick = () => {
    setShowAppModal(false);
    setShowApiModal(false);
    setShowServiceModal(false);
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
      {selectedOption && (
        <div>
          {(() => {
            switch (selectedOption) {
              case "app":
                if (!selectedApp) {
                  return <Loading />;
                } else {
                  return (
                    <AppMetrics
                      onPageChange={onPageChange}
                      selectedApp={selectedApp}
                    />
                  );
                }
              case "service":
                if (!selectedService) {
                  return <Loading />;
                } else {
                  return (
                    <ServiceMetrics
                      onPageChange={onPageChange}
                      selectedApp={selectedService}
                    />
                  );
                }
              case "api":
                if (!selectedApi) {
                  return <Loading />;
                } else {
                  return (
                    <ApiMetrics
                      onPageChange={onPageChange}
                      selectedApp={selectedApi}
                    />
                  );
                }
              default:
                return <OrgMetrics onPageChange={onPageChange} />;
            }
          })()}
        </div>
      )}
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
                onClick={() => handleConfirmClickApp()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showServiceModal && (
        <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 pb-4 rounded-md items-center mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Select Service to View
            </h2>
            <div className="mb-2 flex items-center justify-center">
              <select
                onChange={handleServiceChange}
                value={selectedService}
                className="border-2 border-gray-200 rounded-md shadow-lg text-xl px-3 pl-2 py-4 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline mx-auto"
              >
                {services && services.length > 0 ? (
                  services.map((s) => (
                    <option value={s.id}>
                      {s.flatStructure.split("/")[1] +
                        " - " +
                        s.flatStructure.split("/")[2]}
                    </option>
                  ))
                ) : (
                  <option value="Service">No Services</option>
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
                onClick={() => handleConfirmClickService()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showApiModal && (
        <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 pb-4 rounded-md items-center mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Select API to View
            </h2>
            <div className="mb-2 flex items-center justify-center">
              <select
                onChange={handleApiChange}
                value={selectedApi}
                className="border-2 border-gray-200 rounded-md shadow-lg text-xl px-3 pl-2 py-4 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline mx-auto"
              >
                {apis && apis.length > 0 ? (
                  apis.map((a) => (
                    <option value={a.id}>
                      {a.flatStructure.split("/")[1] +
                        " - " +
                        a.flatStructure.split("/")[2] +
                        " - " +
                        a.httpMethod +
                        ":" +
                        " /" +
                        a.flatStructure.split("/")[3]}
                    </option>
                  ))
                ) : (
                  <option value="Api">No APIs</option>
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
                onClick={() => handleConfirmClickApi()}
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
