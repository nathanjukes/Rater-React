import React, { useEffect, useState } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import User from "../Auth/User";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Util/Loading";
import { ReactComponent as UserSvg } from "../../assets/userCircle.svg";
import { ReactComponent as AppSvg } from "../../assets/appDropdown.svg";
import { ReactComponent as BellSvg } from "../../assets/bell.svg";
import { Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const ORGS_URL = "/orgs/me";
const USER_URL = "/users/me";
const LOGOUT_PATH = "/auth/logout";

const Navbar = ({ onPageChange }) => {
  const [orgInfo, setOrgInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const username =
    userInfo && userInfo.email ? userInfo.email.split("@")[0] : "";

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
        try {
          console.log("Logging out");
          await axiosPrivate.post(LOGOUT_PATH);
        } catch (error) {
          console.error(error);
        }
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    getOrgInfo();
    getUserInfo();
  }, []);

  const handleAppClick = () => {
    onPageChange("AppsDataDisplay");
  };

  const handleAlertsClick = () => {
    onPageChange("Alerts");
  };

  const handleAccountClick = () => {
    onPageChange("Users");
  };

  if (!orgInfo || !userInfo) {
    return (
      <nav className="bg-navBarWhite border-neutral-500 p-8 text-black text-center shadow">
        <Loading />
      </nav>
    );
  }

  return (
    <nav className="bg-navBarWhite border-b border-gray-200 p-6 pb-3 pt-4 text-black text-center shadow-sm flex justify-between items-center">
      <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
        <span className="font-light">Dashboard - </span> {orgInfo.name}
      </h1>
      <div className="flex items-center mr-3">
        <button
          className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-2"
          onClick={handleAlertsClick}
        >
          <BellSvg className="h-10 w-12 hover:cursor-pointer text-sideBarPurple hover:text-buttonPurple"></BellSvg>
        </button>
        <button
          className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-3"
          onClick={handleAppClick}
        >
          <AppSvg className="h-10 w-12 hover:cursor-pointer text-sideBarPurple hover:text-buttonPurple"></AppSvg>
        </button>
        <div
          className="flex flex-col items-center justify-center text-right hover:cursor-pointer"
          onClick={handleAccountClick}
        >
          <UserSvg className="h-16 w-20 hover:cursor-pointer text-sideBarPurple hover:text-buttonPurple"></UserSvg>
          <h2 className="font-normal text-lg hover:underline text-sideBarPurple hover:text-buttonPurple">
            {username}
          </h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
