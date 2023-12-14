import React, { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ServiceBox from "./ServiceBox";
import Loading from "../../Util/Loading";

const SERVICES_URL = "/services";

const ServicesList = ({ services, onPageChange, appId }) => {
  const [showModal, setShowModal] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [servicesList, setServices] = useState([]);
  const [hoveredService, setHoveredService] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (services) {
      const sortedServices = services
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      setServices(sortedServices);
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

  const deleteService = async (serviceId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this service?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axiosPrivate.delete(
        SERVICES_URL + "/" + serviceId
      );

      console.log("Deleted service:", serviceId);

      setServices(servicesList.filter((s) => s.id !== serviceId));
    } catch (error) {
      console.error("Error deleting app:", error);
    }
  };

  const handleCreate = () => {
    console.log("Creating new service:", newServiceName);
    createService();
    closeModal();
  };

  const handleServiceClick = (serviceId) => {
    console.log("Going to service page:", serviceId);
    onPageChange("Service", appId, serviceId);
  };

  if (!services) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-4 mx-4">
      {servicesList &&
        servicesList.map((service, index) => (
          <div key={service.id} className="p-4 relative">
            <div
              onClick={() => handleServiceClick(service.id)}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <ServiceBox service={service} />
              {hoveredService === service.id && (
                <button
                  className="absolute top-0 right-0 mt-6 mr-6 bg-sideBarPurple hover:bg-buttonPurple text-white font-bold p-2 px-3 rounded-full opacity-100 transition duration-300 ease-in-out z-20"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteService(service.id);
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
        ))}

      <button
        onClick={openModal}
        className="m-4 flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold rounded-md transition-colors"
      >
        <p className="text-gray-300 font-normal tracking-wider text-2xl">
          New Service
        </p>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              New Service
            </h2>
            <div className="mb-4">
              <label htmlFor="serviceName" className="block font-semibold mb-2">
                Name:
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
};

export default ServicesList;
