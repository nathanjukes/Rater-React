import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicesList from "../Services/ServicesList";
import Loading from "../../Util/Loading";
import AppMetrics from "../Metrics/AppMetrics";

const Application = ({ onPageChange, selectedApp }) => {
  const [app, setApp] = useState(selectedApp);
  const [showMetrics, setShowMetrics] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getApp = async () => {
      try {
        const response = await axiosPrivate.get(`/apps/${selectedApp}`);
        setApp(response.data);
      } catch (error) {
        console.error("Error getting app:", error);
      }
    };

    getApp();
  }, []);

  const handleBackClick = () => {
    onPageChange("AppsDataDisplay");
  };

  const hideMetrics = (bool) => {
    setShowMetrics(bool);
  };

  if (!app || !app.name) {
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
          {app.name}
        </h1>
      </div>
      <ServicesList
        services={app.services}
        onPageChange={onPageChange}
        appId={app.id}
        group={false}
        hideMetrics={hideMetrics}
      />

      {showMetrics && (
        <div
          className={`border-2 border-sideBarPurple m-8 pb-4 rounded-lg drop-shadow-lg`}
        >
          <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto ml-28 pt-4">
            Metrics
          </h1>
          <AppMetrics onPageChange={onPageChange} selectedApp={app.id} />
        </div>
      )}
    </div>
  );
};

export default Application;
