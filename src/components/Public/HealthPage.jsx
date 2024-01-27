import React from "react";
import PublicNavbar from "./PublicNavbar";
import Footer from "../Navigation/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const HEALTH_URL = "/orgs/health";

const HealthPage = () => {
  const navigate = useNavigate();
  const [healthData, setHealthData] = useState(null);

  const handleHealthSearch = async (e) => {
    e.preventDefault();

    const orgName = document.getElementById("orgName").value;
    try {
      const resp = await axios.get(HEALTH_URL + "/" + orgName);
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
                placeholder="Org Name"
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
          <div className="flex-1 mx-64 mt-4 items-center text-center border-2 border-gray-500 bg-navBarWhite drop-shadow-lg rounded-3xl">
            <div className="p-12 mx-4">
              {healthData === "error" && (
                <h2 className="text-4xl leading-normal font-semibold">
                  Organisation not found or health check disabled.
                </h2>
              )}
              {healthData !== "error" && (
                <div class="grid grid-cols-2 gap-0">
                  <div className="col-span-2">
                    <h2 class="text-5xl flex flex-col justify-center leading-normal font-semibold">
                      {healthData.name}
                      <span className="text-xl font-normal">
                        (Last 24 Hours)
                      </span>
                    </h2>
                  </div>
                  <div className="col-span-1">
                    <h2 class="text-3xl mt-6 leading-normal font-normal">
                      Status -
                      <span class="text-green-700 font-bold ml-2">Healthy</span>
                    </h2>
                  </div>
                  <div className="col-span-1">
                    <h2 class="text-3xl mt-6 leading-normal font-normal">
                      Total Throughput -
                      <span className="font-bold ml-2">
                        {healthData.metadata[0][1]} requests
                      </span>
                    </h2>
                  </div>
                  <div>
                    <h2 class="text-3xl mt-6 leading-normal font-normal">
                      Accepted Requests -
                      <span className="font-bold ml-2">
                        {healthData.metadata[0][0]}
                      </span>
                    </h2>
                  </div>
                  <div>
                    <h2 class="text-3xl mt-6 leading-normal font-normal">
                      Denied Requests -
                      <span className="font-bold ml-2">
                        {healthData.metadata[0][2]}
                      </span>
                    </h2>
                  </div>
                  <div>
                    <h2 class="text-3xl mt-6 leading-normal font-normal">
                      Success Rate -
                      <span className="font-bold ml-2">
                        {healthData.metadata[0][1] !== 0
                          ? (
                              (healthData.metadata[0][0] /
                                healthData.metadata[0][1]) *
                              100
                            ).toFixed(2)
                          : 100}
                        %
                      </span>
                    </h2>
                  </div>
                  <div>
                    <h2 class="text-3xl mt-6 leading-normal font-normal">
                      Error Rate -
                      <span className="font-bold ml-2">
                        {healthData.metadata[0][1] !== 0
                          ? (
                              100 -
                              (healthData.metadata[0][0] /
                                healthData.metadata[0][1]) *
                                100
                            ).toFixed(2)
                          : 0}
                        %
                      </span>
                    </h2>
                  </div>
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
