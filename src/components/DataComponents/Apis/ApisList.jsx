import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Loading from "../../Util/Loading";

const APIS_URL = "/apis";

const ApisList = ({ apis, onPageChange, serviceId }) => {
  const [showModal, setShowModal] = useState(false);
  const [newApiName, setNewApiName] = useState("");
  const [newBaseLimit, setNewBaseLimit] = useState("");
  const [newHttpMethod, setNewHttpMethod] = useState("");
  const [apisList, setApis] = useState([]);
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
    setNewHttpMethod("");
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
        apisList.map((api) => (
          <div key={api.id} className="p-4">
            <div onClick={() => handleApiClick(api.id)}>
              <div className="bg-buttonPurple border-2 p-3 border-gray-500 rounded-md flex flex-col cursor-pointer">
                <h2 className="inline-block p-4 text-center uppercase text-2xl font-semibold leading-none tracking-wider text-black">
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
