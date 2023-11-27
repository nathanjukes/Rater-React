import React, { useEffect } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import User from "../Auth/User";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";

const ORGS_URL = "/orgs/me";

const Navbar = () => {
  const [orgInfo, setOrgInfo] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getOrgInfo = async () => {
      try {
        const response = await axiosPrivate.get(ORGS_URL);
        setOrgInfo(response.data);
      } catch (error) {
        console.error("Error getting org info:", error);
      }
    };

    getOrgInfo();
  }, []);

  if (!orgInfo) {
    return <nav></nav>;
  }

  return (
    <nav class="bg-navBarWhite border-neutral-500 p-8 text-black text-center shadow-neutral-400">
      <h1 class="text-4xl font-bold leading-none tracking-tight text-center">
        {orgInfo.name} 's Dashboard
      </h1>
    </nav>
  );
};

export default Navbar;
