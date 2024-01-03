import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicesList from "../Services/ServicesList";
import ApisList from "../Apis/ApisList";
import useAxiosPrivateRateControl from "../../../hooks/useAxiosPrivateRateControl";
import Loading from "../../Util/Loading";

const API_KEY_URL = "/auth";

const ServicePage = ({ onPageChange, selectedApp, serviceId }) => {
  const [service, setService] = useState(serviceId);
  const [apiKey, setApiKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isKeyCopied, setIsCopied] = useState(false);
  const apiKeyRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const axiosPrivateRateControl = useAxiosPrivateRateControl();

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axiosPrivate.get(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error("Error getting service:", error);
      }
    };

    getService();
  }, []);

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const response = await axiosPrivateRateControl.get(
          `/auth/keys/${serviceId}`
        );
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.log("error getting apiKey:", error);
      }

      if (!apiKey) {
        try {
          const response = await axiosPrivateRateControl.post(API_KEY_URL, {
            serviceId: serviceId,
          });
          setApiKey(response.data.apiKey);
        } catch (error) {
          console.log("error getting apiKey:", error);
        }
      }
    };

    getApiKey();
  }, []);

  const handleBackClick = () => {
    if (!selectedApp) {
      onPageChange("ServicesDataDisplay");
      return;
    }
    onPageChange("Application", selectedApp);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsCopied(false);
  };

  const handleCopyClick = () => {
    const range = document.createRange();
    range.selectNode(apiKeyRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    setIsCopied(true);
  };

  const handleApiKeyRegenerate = async () => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete and regenerate this API key?"
      );
      if (!confirmDelete) {
        return;
      }

      // const response = await axiosPrivate.delete(APIS_URL + "/" + apiId);
    } catch (error) {
      console.error("Error regenerating api key:", error);
    }
    closeModal();
  };

  if (!service || !service.name) {
    return <Loading />;
  }

  const buttonStyle =
    "shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-2 border-gray-200 hover:shadow-xl";

  return (
    <div>
      <div class="flex justify-between items-center m-4">
        <button
          className={`${buttonStyle} ml-4 mt-4 px-5 p-4 pb-3 pt-3 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline`}
          onClick={handleBackClick}
        >
          Back
        </button>
        <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
          {service.name}
        </h1>
        <button
          className={`shadow-lg text-center rounded-xl flex flex-col border-2 border-gray-200 ml-4 mt-4 px-5 p-4 pb-3 pt-3 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline`}
          onClick={openModal}
        >
          Api Key
        </button>
      </div>
      <ApisList
        selectedApp={selectedApp}
        apis={service.apis}
        onPageChange={onPageChange}
        serviceId={service.id}
      />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">API Key</h2>
            <div className="mb-4">
              <h1
                ref={apiKeyRef}
                className="border-2 shadow-lg border-gray-500 p-2 rounded-md w-full text-center text-black font-light tracking-wider hover:cursor-pointer"
                onClick={handleCopyClick}
              >
                {apiKey}
              </h1>
              {isKeyCopied && (
                <h2 className="text-center mt-4 text-gray-900 font-semibold">
                  API Key Copied!
                </h2>
              )}
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-zinc-600 rounded-md text-white hover:underline"
              >
                Close
              </button>
              <button
                onClick={handleApiKeyRegenerate}
                className="px-4 py-2 bg-sideBarPurple rounded-md text-white hover:underline"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePage;
