import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const SERVICES_URL = "/services";

const ServicesList = ({ services, apiCount, appId }) => {
  const [showModal, setShowModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [servicesList, setServices] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (services) {
      setServices(services);
    }
  }, [services]);

  const handleServiceNameChange = (event) => {
    setNewServiceName(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewServiceName("");
  };

  const createService = async () => {
    try {
      const response = await axiosPrivate.post(SERVICES_URL, {
        name: newServiceName,
        appId: appId,
      });
      const createdService = response.data;

      // Add new service to services list
      setServices([...servicesList, createdService]);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const handleCreate = () => {
    console.log("Creating new service:", newServiceName);
    createService();
    closeModal();
  };

  return (
    <div className="grid grid-cols-4">
      {servicesList &&
        servicesList.map((service) => (
          <div key={service.id} className="p-4">
            <div className="bg-buttonPurple border-2 p-3 border-gray-500 rounded-md flex flex-col cursor-pointer">
              <h2 className="inline-block p-4 text-center uppercase text-2xl font-semibold leading-none tracking-wider text-black">
                {service.name}
              </h2>
              <div className="flex justify-center">
                <div className="inline-block px-4">Active APIs: {apiCount}</div>
              </div>
            </div>
          </div>
        ))}

      <button
        onClick={openModal}
        className="m-4 flex items-center justify-center bg-purple-400 border-2 border-gray-500 hover:border-gray-400 text-white font-semibold rounded-md transition-colors duration-100"
      >
        <p className="text-black text-xl">Create new Service</p>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Create New Service</h2>
            <div className="mb-4">
              <label htmlFor="serviceName" className="block font-semibold mb-2">
                Service Name:
              </label>
              <input
                type="text"
                id="serviceName"
                value={newServiceName}
                onChange={handleServiceNameChange}
                className="border border-gray-400 p-2 rounded-md w-full"
              />
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

export default ServicesList;
