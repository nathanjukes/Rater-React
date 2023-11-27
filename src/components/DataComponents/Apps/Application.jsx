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

  if (!app) {
    return <div></div>;
  }

  return (
    <div>
      <div class="flex justify-between items-center m-4">
        <h1 class=" text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl underline flex-auto">
          {app.name}'s Services
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
