import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";
import { useMemo } from "react";

const APIS_URL = "/apis";

const ApisList = ({ selectedApp, apis, onPageChange, serviceId, group }) => {
  const [showModal, setShowModal] = useState(false);
  const [newApiName, setNewApiName] = useState("");
  const [newBaseLimit, setNewBaseLimit] = useState("");
  const [newHttpMethod, setNewHttpMethod] = useState("GET");
  const [apisList, setApis] = useState([]);
  const [hoveredApi, setHoveredApi] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (apis) {
      setApis(apis);
    }
  }, [apis]);

  useEffect(() => {
    if (apis) {
      const apisList = apis
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      const apisWithParentService = apisList.map((api) => {
        const parentService = api.flatStructure
          ? api.flatStructure.split("/")[2]
          : "";
        const parentApp = api.flatStructure
          ? api.flatStructure.split("/")[1]
          : "";
        return { ...api, parentService, parentApp };
      });
      setApis(apisWithParentService);
    }
  }, [apis]);

  const groupedApis = useMemo(() => {
    if (!apisList) return {};

    return apisList.reduce((grouped, api) => {
      const { parentService } = api;
      if (!grouped[parentService]) {
        grouped[parentService] = [];
      }
      grouped[parentService].push(api);

      return grouped;
    }, {});
  }, [apisList]);

  const handleApiNameChange = (event) => {
    setNewApiName(event.target.value);
  };

  const handleBaseLimitChange = (event) => {
    setNewBaseLimit(event.target.value);
  };

  const handleHttpMethodChange = (event) => {
    setNewHttpMethod(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewApiName("");
    setNewBaseLimit("");
    setNewHttpMethod("GET");
  };

  const createApi = async () => {
    try {
      const response = await axiosPrivate.post(APIS_URL, {
        name: newApiName,
        serviceId: serviceId,
        basicLimit: newBaseLimit,
        httpMethod: newHttpMethod,
      });
      const createdApi = response.data;

      // Add new service to services list
      setApis([...apisList, createdApi]);
    } catch (error) {
      console.error("Error creating api:", error);
    }
  };

  const deleteApi = async (apiId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this API?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axiosPrivate.delete(APIS_URL + "/" + apiId);

      console.log("Deleted api:", apiId);

      setApis(apisList.filter((a) => a.id !== apiId));
    } catch (error) {
      console.error("Error deleting api:", error);
    }
  };

  const handleCreate = () => {
    console.log("Creating new api:", newApiName);
    createApi();
    closeModal();
  };

  const handleApiClick = (apiId) => {
    console.log("Going to api page:", selectedApp, serviceId, apiId);
    onPageChange("Api", selectedApp, serviceId, apiId);
  };

  if (!apisList) {
    return <Loading />;
  }

  if (apisList.length === 0) {
    return (
      <div className="flex mx-4">
        <button
          onClick={openModal}
          className="px-16 py-20 m-4 my-4 rounded-lg items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold transition-colors"
        >
          <p className="text-gray-300 font-normal tracking-wider text-2xl items-center px-24">
            New API+
          </p>
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                New API
              </h2>
              <div className="mb-4">
                <label htmlFor="apiName" className="block font-semibold mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  id="apiName"
                  value={newApiName}
                  onChange={handleApiNameChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="users"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="baseLimit" className="block font-semibold mb-2">
                  Base Limit:
                </label>
                <input
                  type="text"
                  id="baseLimit"
                  value={newBaseLimit}
                  onChange={handleBaseLimitChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="20"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="httpMethod"
                  className="block font-semibold mb-2"
                >
                  HTTP Method:
                </label>
                <select
                  id="httpMethod"
                  value={newHttpMethod}
                  onChange={handleHttpMethodChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                  <option value="HEAD">HEAD</option>
                  <option value="OPTIONS">OPTIONS</option>
                  <option value="CONNECT">CONNECT</option>
                  <option value="TRACE">TRACE</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-zinc-600 rounded-md text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const buttonStyle =
    "bg-white shadow-lg p-4 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-2 border-gray-200 hover:shadow-xl";

  console.log(group);
  if (group) {
    return (
      <div className="mx-4">
        {Object.keys(groupedApis).map((parentApp) => (
          <div key={parentApp} className="mb-4">
            <h2 className="text-3xl font-normal mb-2 underline ml-4">
              {parentApp}
            </h2>
            <div className="grid grid-cols-4">
              {groupedApis[parentApp].map((api) => (
                <div key={api.id} className="p-4 relative">
                  <div
                    onClick={() => handleApiClick(api.id)}
                    onMouseEnter={() => setHoveredApi(api.id)}
                    onMouseLeave={() => setHoveredApi(null)}
                  >
                    <div className={` ${buttonStyle}`}>
                      <h2 className="inline-block p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                        <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-2 text-backgroundWhite">
                          {api.httpMethod}:
                        </span>
                        /{api.name}
                      </h2>
                      <div className="flex justify-center mt-4">
                        <div className="inline-block px-4 text-lg font-semibold">
                          <div className="text-center border-gray-600 rounded-md px-2 mb-2">
                            <span className="block text-3xl text-black">
                              {api && api.basicLimit ? api.basicLimit : 0} rq/m
                            </span>
                            <span className="font-light text-2xl">
                              Base Limit
                            </span>
                          </div>
                        </div>
                        <div className="inline-block px-4 text-lg font-semibold">
                          <div className="text-center border-gray-600 rounded-md px-2 mb-2">
                            <span className="block text-3xl text-black">
                              {api && api.idRules
                                ? api.idRules.length +
                                  api.ipRules.length +
                                  api.roleRules.length
                                : 0}
                            </span>
                            <span className="font-light text-2xl">
                              Custom Rules
                            </span>
                          </div>
                        </div>
                      </div>
                      {hoveredApi === api.id && (
                        <button
                          className="absolute top-0 right-0 mt-6 mr-6 bg-sideBarPurple hover:bg-buttonPurple text-white font-bold p-2 px-3 rounded-full opacity-100 transition duration-300 ease-in-out z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteApi(api.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14.95 5.05a1 1 0 010 1.414L11.414 10l3.536 3.536a1 1 0 11-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464a1 1 0 111.414-1.414L10 8.586l3.536-3.537a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-4 mx-4">
        {apisList &&
          apisList.map((api, index) => (
            <div key={api.id} className="p-4 relative">
              <div
                onClick={() => handleApiClick(api.id)}
                onMouseEnter={() => setHoveredApi(api.id)}
                onMouseLeave={() => setHoveredApi(null)}
              >
                <div className={` ${buttonStyle}`}>
                  <h2 className="inline-block p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                    <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-2 text-backgroundWhite">
                      {api.httpMethod}:
                    </span>
                    /{api.name}
                  </h2>
                  <div className="flex justify-center mt-4">
                    <div className="inline-block px-4 text-lg font-semibold">
                      <div className="text-center border-gray-600 rounded-md px-2 mb-2">
                        <span className="block text-3xl text-black">
                          {api && api.basicLimit ? api.basicLimit : 0} rq/m
                        </span>
                        <span className="font-light text-2xl">Base Limit</span>
                      </div>
                    </div>
                    <div className="inline-block px-4 text-lg font-semibold">
                      <div className="text-center border-gray-600 rounded-md px-2 mb-2">
                        <span className="block text-3xl text-black">
                          {api && api.idRules
                            ? api.idRules.length +
                              api.ipRules.length +
                              api.roleRules.length
                            : 0}
                        </span>
                        <span className="font-light text-2xl">
                          Custom Rules
                        </span>
                      </div>
                    </div>
                  </div>
                  {hoveredApi === api.id && (
                    <button
                      className="absolute top-0 right-0 mt-6 mr-6 bg-sideBarPurple hover:bg-buttonPurple text-white font-bold p-2 px-3 rounded-full opacity-100 transition duration-300 ease-in-out z-20"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteApi(api.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.95 5.05a1 1 0 010 1.414L11.414 10l3.536 3.536a1 1 0 11-1.414 1.414L10 11.414l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 10 5.05 6.464a1 1 0 111.414-1.414L10 8.586l3.536-3.537a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        <button
          onClick={openModal}
          className="m-4 flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold rounded-md transition-colors"
        >
          <p className="text-gray-300 font-normal tracking-wider text-2xl">
            New API+
          </p>
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-md">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                New API
              </h2>
              <div className="mb-4">
                <label htmlFor="apiName" className="block font-semibold mb-2">
                  Address:
                </label>
                <input
                  type="text"
                  id="apiName"
                  value={newApiName}
                  onChange={handleApiNameChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="users"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="baseLimit" className="block font-semibold mb-2">
                  Base Limit:
                </label>
                <input
                  type="text"
                  id="baseLimit"
                  value={newBaseLimit}
                  onChange={handleBaseLimitChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="20"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="httpMethod"
                  className="block font-semibold mb-2"
                >
                  HTTP Method:
                </label>
                <select
                  id="httpMethod"
                  value={newHttpMethod}
                  onChange={handleHttpMethodChange}
                  className="border border-gray-400 p-2 rounded-md w-full"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="PATCH">PATCH</option>
                  <option value="DELETE">DELETE</option>
                  <option value="HEAD">HEAD</option>
                  <option value="OPTIONS">OPTIONS</option>
                  <option value="CONNECT">CONNECT</option>
                  <option value="TRACE">TRACE</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-zinc-600 rounded-md text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ApisList;
