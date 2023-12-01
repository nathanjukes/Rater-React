import React, { useEffect, useState } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import User from "../Auth/User";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Util/Loading";
import { ReactComponent as UserSvg } from "../../assets/userCircle.svg";
import { ReactComponent as AppSvg } from "../../assets/appDropdown.svg";
import { ReactComponent as BellSvg } from "../../assets/bell.svg";

const ORGS_URL = "/orgs/me";
const USER_URL = "/users/me";

const Navbar = () => {
  const [orgInfo, setOrgInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
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
      }
    };

    getOrgInfo();
    getUserInfo();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
        {orgInfo.name}
      </h1>
      <div className="flex items-center mr-3">
        <button className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-2">
          <BellSvg className="h-10 w-12 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></BellSvg>
        </button>
        <button
          className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-3"
          onClick={toggleDropdown}
        >
          <AppSvg className="h-10 w-12 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></AppSvg>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-60 mx-16 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
            <div class="bg-backgroundWhite border-b-2 border-gray-200 p-2 text-lg">
              <h2>Apps</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              <div>
                <button
                  className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-3"
                  onClick={toggleDropdown}
                >
                  <AppSvg className="h-10 w-12 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></AppSvg>
                </button>
              </div>
              <div>
                <button
                  className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-3"
                  onClick={toggleDropdown}
                >
                  <AppSvg className="h-10 w-12 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></AppSvg>
                </button>
              </div>
              <div>
                <button
                  className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-3"
                  onClick={toggleDropdown}
                >
                  <AppSvg className="h-10 w-12 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></AppSvg>
                </button>
              </div>
              <div>
                <button
                  className="rounded-lg p-0.5 transition duration-75 bg-gray-700 bg-opacity-0 hover:bg-opacity-10 mr-3"
                  onClick={toggleDropdown}
                >
                  <AppSvg className="h-10 w-12 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></AppSvg>
                  <h2>Applications</h2>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-right hover:cursor-pointer">
          <UserSvg className="h-16 w-20 hover:cursor-pointer text-accentButtonGrey hover:text-gray-700"></UserSvg>
          <h2 className="font-normal text-lg hover:underline ">{username}</h2>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
