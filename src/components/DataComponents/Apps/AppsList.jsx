import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import Application from "./Application";
import { Route } from "react-router-dom";
import Loading from "../../Util/Loading";

const APPS_URL = "/apps";

const AppsList = ({ onPageChange }) => {
  const [apps, setApps] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [hoveredApp, setHoveredApp] = useState(null);

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

      console.log("Created app:", createdApp.id);

      setApps([...apps, createdApp]);
    } catch (error) {
      console.error("Error creating app:", error);
    }
  };

  const deleteApp = async (appId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this app?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axiosPrivate.delete(`${APPS_URL}/${appId}`);

      console.log("Deleted app:", appId);

      setApps(apps.filter((a) => a.id !== appId));
    } catch (error) {
      console.error("Error deleting app:", error);
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

  if (!apps) {
    return <Loading />;
  }

  if (apps.length === 0) {
    return (
      <div className="flex mx-4">
        <div className="">
          <button
            onClick={openModal}
            className="py-16 px-10 m-4 mt-6 justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold rounded-md transition-colors"
          >
            <p className="text-gray-300 font-normal tracking-wider text-2xl items-center px-24">
              New App+
            </p>
          </button>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  New Application
                </h2>
                <div className="mb-4">
                  <label htmlFor="appName" className="block font-semibold mb-2">
                    Name:
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
                    className="px-4 py-2 bg-zinc-600 rounded-md text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateApp}
                    className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const buttonStyle =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-2 border-gray-200 hover:shadow-xl";

  return (
    <div className="grid grid-cols-4 mx-4">
      {apps.map((app, index) => (
        <div key={app.id} className="p-3 relative">
          <div
            onClick={() => handleAppClick(app.id)}
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            <div className={` ${buttonStyle}`}>
              <h2 className="inline-block p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                {app.name}
              </h2>
              <div className="flex justify-center mt-4">
                <div className="inline-block px-4 text-lg font-semibold">
                  <div className="text-center border-gray-600 rounded-md px-2 mb-2">
                    {app.services ? (
                      <span className="block text-3xl text-black">
                        {app.services.length}
                      </span>
                    ) : (
                      <span className="block text-3xl text-black">0</span>
                    )}
                    <span className="font-light text-2xl">Services Active</span>
                  </div>
                </div>
                <div className="inline-block px-4 text-lg font-semibold">
                  <div className="text-center border-gray-600 rounded-md px-2 mb-2">
                    <span className="block text-3xl text-black">
                      {app.apiCount}
                    </span>
                    <span className="font-light text-2xl">APIs Active</span>
                  </div>
                </div>
              </div>
            </div>
            {hoveredApp === app.id && (
              <button
                className="absolute top-0 right-0 mt-6 mr-6 bg-sideBarPurple hover:bg-buttonPurple text-white font-bold p-2 px-3 rounded-full opacity-100 transition duration-300 ease-in-out z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteApp(app.id);
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
          New App+
        </p>
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              New Application
            </h2>
            <div className="mb-4">
              <label htmlFor="appName" className="block font-semibold mb-2">
                Name:
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
                className="px-4 py-2 bg-zinc-600 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateApp}
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

export default AppsList;
