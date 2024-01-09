import React from "react";
import PublicNavbar from "./PublicNavbar";
import Footer from "../Navigation/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ORGS_URL = "/orgs/health";

const HealthPage = () => {
  const navigate = useNavigate();
  const [healthData, setHealthData] = useState(null);

  const handleHealthSearch = async (e) => {
    e.preventDefault();

    const orgName = document.getElementById("orgName").value;
    try {
      const resp = await axios.get(ORGS_URL + "/" + orgName);
      setHealthData(resp.data);
    } catch (error) {
      console.log(error);
      setHealthData("error");
    }
  };

  return (
    <div className="bg-backgroundWhite flex flex-col min-h-screen">
      <PublicNavbar />
      <div className="flex-1 mx-64 mt-8 items-center text-center">
        <div className="p-12 mx-4">
          <h2 className="text-6xl leading-normal font-semibold">
            Health Check
          </h2>
          <div className="flex justify-center p-6 mt-4 mb-0 pb-0">
            <div>
              <label for="username" class="text-4xl font-medium justify-start">
                Organisation name:
              </label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                placeholder="Microsoft"
                class="mt-6 mb-0 p-4 text-2xl w-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sideBarPurple rounded-2xl"
              />
            </div>
          </div>
          <h2 className="text-lg mt-2 leading-normal font-semibold">
            (Some Organisations may have this feature disabled)
          </h2>
          <button
            className={`mx-4 mt-10 text-2xl tracking-wider font-normal py-3 px-12 rounded-lg text-white bg-sideBarPurple hover:bg-opacity-75`}
            onClick={handleHealthSearch}
          >
            Search
          </button>
        </div>
        {healthData && (
          <div className="flex-1 mx-64 mt-12 items-center text-center border-2 border-gray-700 rounded-3xl">
            <div className="p-12 mx-4">
              {healthData === "error" && (
                <h2 className="text-4xl leading-normal font-semibold">
                  Organisation not found or health check disabled.
                </h2>
              )}
              {healthData !== "error" && (
                <div>
                  <h2 className="text-4xl leading-normal font-semibold">Org</h2>
                  <h2 className="text-3xl mt-6 leading-normal font-normal">
                    Health Status - <span className="text-green-700">Good</span>
                  </h2>
                  <h2 className="text-3xl mt-6 leading-normal font-normal">
                    Uptime - 100% Downtime - 0%
                  </h2>
                  <h2 className="text-3xl mt-6 leading-normal font-semnormalibold">
                    Average Requests / Second - 142
                  </h2>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mx-48">
        <Footer />
      </div>
    </div>
  );
};

export default HealthPage;
