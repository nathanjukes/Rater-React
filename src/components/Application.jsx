import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";

const Application = ({ onPageChange, selectedApp }) => {
  const [app, setApp] = useState(selectedApp);
  const axiosPrivate = useAxiosPrivate();

  console.log("appId:", selectedApp);
  useEffect(() => {
    const getApp = async () => {
      try {
        const response = await axiosPrivate.get(`/apps/${selectedApp}`); // Adjust the endpoint as per your API
        setApp(response.data);
      } catch (error) {
        console.error("Error getting app:", error);
      }
    };

    getApp();
  }, []);

  if (!app) {
    return <div></div>; // Display a loading state while fetching data)
  }

  return (
    <div>
      <h2>{app.name}</h2>
      {/* Display other details of the app */}
    </div>
  );
};

export default Application;
