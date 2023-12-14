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
    onPageChange("Application", selectedApp);
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
          onClick={handleBackClick}
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
      <h2 class="mt-2 text-2xl font-extralight leading-none tracking-wider text-center text-black md:text-2xl lg:text-2xl flex-auto">
        Api Key: {apiKey}
      </h2>
    </div>
  );
};

export default ServicePage;
