import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const LOGOUT_PATH = "/auth/logout";

const LogoutButton = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      console.log("Logging out");
      await axiosPrivate.post(LOGOUT_PATH);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-auto">
      <button
        className="w-full p-4 text-gray-300 bg-transparent hover:border-gray-500 rounded-lg border-2 border-gray-300 transition duration-200"
        onClick={logoutUser}
      >
        <h2>Sign out</h2>
      </button>
    </div>
  );
};

export default LogoutButton;
