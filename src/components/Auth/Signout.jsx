import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ReactComponent as SignOutSvg } from "../../assets/signOut.svg";

const LOGOUT_PATH = "/auth/logout";

const LogoutButton = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      console.log("Logging out");
      await axiosPrivate.post(LOGOUT_PATH);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-auto flex justify-center items-center">
      <button
        className="flex justify-between items-center p-4 text-gray-300 bg-transparent hover:border-gray-500 rounded-lg border-2 border-gray-300 transition duration-200 w-10/12"
        onClick={logoutUser}
      >
        <h2 className="flex items-center text-gray-300 font-normal tracking-wider">
          Sign out
        </h2>
        <SignOutSvg className="h-12 w-12"></SignOutSvg>
      </button>
    </div>
  );
};

export default LogoutButton;
