import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const LOGOUT_PATH = "/auth/logout";
const ORGS_URL = "/orgs";

const Settings = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);

  useEffect(() => {
    const getOrg = async () => {
      try {
        const response = await axiosPrivate.get(ORGS_URL + "/me");
        setOrg(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrg();
  }, []);

  const deleteOrg = async () => {
    try {
      await axiosPrivate.delete(ORGS_URL);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrg = async (enabled) => {
    try {
      const response = await axiosPrivate.put(ORGS_URL + "/" + org.id, {
        healthCheckEnabled: enabled,
      });
      setOrg(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-4 mt-2 pt-4 text-center">
      <h1 className="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
        Organisation Settings
      </h1>
      <div className="grid-container mt-12 ml-4">
        <div className="items-center justify-center">
          <div>
            <button
              onClick={deleteOrg}
              className="px-16 py-10 m-4 my-4 rounded-lg items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold transition-colors"
            >
              <p className="text-gray-300 tracking-wider text-4xl font-normal items-center px-24">
                Delete Org
              </p>
            </button>
            <h1 className="ml-16 mt-6 text-1xl font-light leading-9 mr-20 tracking-tight text-gray-900 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 flex-auto">
              Warning. This action is
              <span className="bg-sideBarPurple rounded-md px-1 mx-2 mr-0 text-backgroundWhite">
                irreversible
              </span>
            </h1>
          </div>
          {org && !org.healthPageEnabled && (
            <div className="mt-20">
              <button
                onClick={() => updateOrg(true)}
                className="px-16 py-10 m-4 my-4 rounded-lg items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold transition-colors"
              >
                <p className="text-gray-300 tracking-wider text-3xl font-normal items-center px-24">
                  Enable Health Page
                </p>
              </button>
              <h1 className="ml-16 mt-6 text-2xl font-light leading-9 mr-20 tracking-tight text-gray-900 md:leading-14 flex-auto">
                Enables a public health page for your organisation, which can
                <br /> be publicly accessed to view your organisation's health
                status, stating <br /> uptime and health. No sensitive
                information will be displayed and it can be <br />
                accessed 24/7 through the health check on the dashboard.
              </h1>
            </div>
          )}
          {org && org.healthPageEnabled && (
            <div className="mt-20">
              <button
                onClick={() => updateOrg(false)}
                className="px-16 py-10 m-4 my-4 rounded-lg items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold transition-colors"
              >
                <p className="text-gray-300 tracking-wider text-3xl font-normal items-center px-24">
                  Disable Health Page
                </p>
              </button>
              <h1 className="ml-16 mt-6 text-2xl font-light leading-9 mr-20 tracking-tight text-gray-900 md:leading-14 flex-auto">
                Disables the public health page for your <br /> organisation, it
                may be turned on again at any time.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
