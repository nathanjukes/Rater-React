import React, { useEffect } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import User from "../Auth/User";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import Loading from "../Util/Loading";
import { ReactComponent as UserSvg } from "../../assets/userCircle.svg";

const ORGS_URL = "/orgs/me";
const USER_URL = "/users/me";

const Navbar = () => {
  const [orgInfo, setOrgInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
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

    const getUserInfo = async () => {
      try {
        const response = await axiosPrivate.get(USER_URL);
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    };

    getOrgInfo();
    getUserInfo();
  }, []);

  if (!orgInfo || !userInfo) {
    return (
      <nav class="bg-navBarWhite border-neutral-500 p-8 text-black text-center shadow">
        <Loading />
      </nav>
    );
  }

  return (
    <nav class="bg-navBarWhite border-b border-gray-200 p-6 pb-3 pt-4 text-black text-center shadow-sm flex justify-between items-center">
      <h1 class="text-3xl font-bold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        {orgInfo.name}'s Dashboard
      </h1>
      <div class="flex flex-col items-center justify-center text-right">
        <UserSvg class="h-12 w-12"></UserSvg>
        <h2 class="font-normal mt-1">{userInfo.email}</h2>
      </div>
    </nav>
  );
};

export default Navbar;
