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
    } catch (error) {
      console.error(error);
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="mt-auto flex justify-center items-center">
      <button
        className="p-2 py-2 font-thin text-gray-300 bg-transparent hover:border-gray-500 hover:text-gray-400 rounded-lg border-2 text-center border-gray-300 transition duration-200 w-10/12"
        onClick={logoutUser}
      >
        Sign out
      </button>
    </div>
  );
};

export default LogoutButton;
