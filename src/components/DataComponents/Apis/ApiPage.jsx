import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicesList from "../Services/ServicesList";
import ApisList from "../Apis/ApisList";

const RULES_URL = "/apis/rules/create";

const ApiPage = ({ onPageChange, selectedApp, serviceId, apiId }) => {
  const [api, setApi] = useState(apiId);
  const [newApiLimit, setNewApiLimit] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axiosPrivate.get(`/apis/${apiId}`);
        setApi(response.data);
      } catch (error) {
        console.error("Error getting service:", error);
      }
    };

    getApi();
  }, []);

  const createRule = async () => {
    try {
      const response = await axiosPrivate.post(RULES_URL, {
        userId: newUserId,
        limit: newApiLimit,
        apiId: apiId,
      });
      const createdRule = response.data;

      // Add new app to apps list
      //setApps([...apps, createdRule]);
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const handleNewApiLimit = (event) => {
    setNewApiLimit(event.target.value);
  };

  const handleNewUserId = (event) => {
    setNewUserId(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewApiLimit("");
    setNewUserId("");
  };

  const handleCreateRule = () => {
    console.log("Creating new rule:", newUserId);
    createRule();
    closeModal();
  };

  if (!api) {
    return <div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center m-4">
        <h1 className="text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl flex-auto">
          <span className="bg-blue-500 rounded-md px-2 py-0.5 mr-2 text-white">
            {api.httpMethod}:
          </span>
          /{api.name}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {api && api.idRules && (
          <div className="bg-gray-400 p-4">
            <h2>ID Rules:</h2>
            {api.idRules.map((rule, index) => (
              <div key={index}>
                {" "}
                {index + 1}: {rule.useLimit} - {rule.userId}
              </div>
            ))}
            <button
              onClick={openModal}
              className="m-4 p-4 flex items-center justify-center bg-purple-400 border-2 border-gray-500 hover:border-gray-400 text-white font-semibold rounded-md transition-colors duration-100"
            >
              <p className="text-black text-xl">Add new Id Rule</p>
            </button>
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-md">
                  <h2 className="text-2xl font-semibold mb-4">Add Id Rule</h2>
                  <div className="mb-4">
                    <label
                      htmlFor="userId"
                      className="block font-semibold mb-2"
                    >
                      User Id:
                    </label>
                    <input
                      type="text"
                      id="userId"
                      value={newUserId}
                      onChange={handleNewUserId}
                      className="border border-gray-400 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="apiLimit"
                      className="block font-semibold mb-2"
                    >
                      API Limit:
                    </label>
                    <input
                      type="text"
                      id="apiLimit"
                      value={newApiLimit}
                      onChange={handleNewApiLimit}
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
                      onClick={handleCreateRule}
                      className="px-4 py-2 bg-purple-500 rounded-md text-white"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {api && api.ipRules && (
          <div className="bg-gray-400 p-4">
            <h2>IP Rules:</h2>
            {api.ipRules.map((rule, index) => (
              <div key={index}>
                {" "}
                {index + 1}: {rule.useLimit}
              </div>
            ))}
          </div>
        )}
        {api.roleRules && (
          <div className="bg-gray-400 p-4">
            <h2>Role Rules:</h2>
            {api.roleRules.map((rule, index) => (
              <div key={index}>
                {index + 1}: {rule.useLimit}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiPage;
