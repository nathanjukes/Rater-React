import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";

const APIS_URL = "/apis";

const ApisList = ({ apis, onPageChange, serviceId }) => {
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

  if (!apis) {
    return <Loading />;
  }

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
    console.log("Going to api page:", apiId);
    onPageChange("Api", serviceId, serviceId, apiId);
  };

  return (
    <div className="grid grid-cols-4">
      {apisList &&
        apisList.map((api, index) => (
          <div key={api.id} className="p-4">
            <div
              onClick={() => handleApiClick(api.id)}
              onMouseEnter={() => setHoveredApi(api.id)}
              onMouseLeave={() => setHoveredApi(null)}
            >
              <div className="bg-buttonPurple border-2 p-3 border-gray-500 rounded-md flex flex-col cursor-pointer relative">
                <h2 className="inline-block p-4 text-center uppercase text-2xl font-semibold leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                  {api.name}
                </h2>
                <div className="flex justify-center">
                  <div className="inline-block px-4">
                    Base Limit: {api && api.basicLimit ? api.basicLimit : 0}
                  </div>
                  <div className="inline-block px-4">
                    Active Custom Rules:{" "}
                    {api && api.idRules
                      ? api.idRules.length +
                        api.ipRules.length +
                        api.roleRules.length
                      : 0}
                  </div>
                </div>
                {hoveredApi === api.id && (
                  <button
                    className="absolute top-0 right-0 mt-2 mr-2 bg-zinc-700 hover:bg-zinc-900 text-white font-bold py-1 px-2 rounded-full opacity-100 transition duration-300 ease-in-out z-20 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteApi(api.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
        className="m-4 flex items-center justify-center bg-purple-400 border-2 border-gray-500 hover:border-gray-400 text-white font-semibold rounded-md transition-colors duration-100"
      >
        <p className="text-black text-xl">Add API</p>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Add API</h2>
            <div className="mb-4">
              <label htmlFor="apiName" className="block font-semibold mb-2">
                API Name:
              </label>
              <input
                type="text"
                id="apiName"
                value={newApiName}
                onChange={handleApiNameChange}
                className="border border-gray-400 p-2 rounded-md w-full"
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
              />
            </div>
            <div className="mb-4">
              <label htmlFor="httpMethod" className="block font-semibold mb-2">
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
                className="px-4 py-2 bg-gray-500 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-purple-500 rounded-md text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApisList;
