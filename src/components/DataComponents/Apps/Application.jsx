import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicesList from "../Services/ServicesList";

const Application = ({ onPageChange, selectedApp }) => {
  const [app, setApp] = useState(selectedApp);
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

  if (!app) {
    return <div></div>;
  }
  return (
    <div>
      <div class="flex justify-between items-center m-4">
        <button className="text-lg text-gray-900" onClick={handleBackClick}>
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
      />
    </div>
  );
};

export default Application;
