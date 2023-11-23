import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import Application from "./Application";
import { Route } from "react-router-dom";

const APPS_URL = "/apps";

const Applications = ({ onPageChange }) => {
  const [apps, setApps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getApps = async () => {
      try {
        const resp = await axiosPrivate.get(APPS_URL, {
          signal: controller.signal,
        });
        isMounted && setApps(resp.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          return;
        }
        console.log(error);
        navigate("/login");
      }
    };

    getApps();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const createApp = async () => {
    try {
      const response = await axiosPrivate.post(APPS_URL, { name: newAppName });
      const createdApp = response.data;

      // Add new app to apps list
      setApps([...apps, createdApp]);
    } catch (error) {
      console.error("Error creating app:", error);
    }
  };

  const handleAppNameChange = (event) => {
    setNewAppName(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewAppName("");
  };

  const handleCreateApp = () => {
    console.log("Creating new app:", newAppName);
    createApp();
    closeModal();
  };

  const handleAppClick = (appId) => {
    console.log("Going to app page:", appId);
    onPageChange("Application", appId);
  };

  return (
    <div className="grid grid-cols-4">
      {apps.map((app) => (
        <div key={app.id} className="p-4">
          <div
            onClick={() => handleAppClick(app.id)} // Call handleAppClick when app is clicked
          >
            <div className="bg-buttonPurple border-2 p-3 border-gray-500 rounded-md flex flex-col cursor-pointer">
              <h2 className="inline-block p-4 text-center uppercase text-2xl font-semibold leading-none tracking-wider text-black">
                {app.name}
              </h2>
              <div className="flex justify-center">
                <div className="inline-block px-4">
                  Active Services: {app.services ? app.services.length : 0}
                </div>
                <div className="inline-block px-4">
                  Active APIs: {app.apiCount}
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
        <p className="text-black text-xl">Create new App</p>
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">
              Create New Application
            </h2>
            <div className="mb-4">
              <label htmlFor="appName" className="block font-semibold mb-2">
                App Name:
              </label>
              <input
                type="text"
                id="appName"
                value={newAppName}
                onChange={handleAppNameChange}
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
                onClick={handleCreateApp}
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

export default Applications;
