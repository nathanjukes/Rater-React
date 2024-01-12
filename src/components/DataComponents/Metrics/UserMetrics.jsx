import React from "react";
import { useState, useEffect } from "react";
import { axiosPrivate } from "../../../api/axios";
import Loading from "../../Util/Loading";

const USERS_URL = "/metrics/users";

const UserMetrics = ({ onPageChange, selectedApp, serviceId }) => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL + "/" + selectedApp);
        setMetrics(response.data);
      } catch (error) {
        console.error("Error getting user metrics:", error);
      }
    };

    getMetrics();
  }, [selectedApp]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString(undefined, { month: "long" });
    const day = date.toLocaleString(undefined, { day: "numeric" });
    const hour = date.toLocaleString(undefined, {
      hour: "numeric",
      hour12: false,
    });
    const minute = date.toLocaleString(undefined, {
      minute: "numeric",
      minimumIntegerDigits: 2,
    });

    if (minute.length === 1) {
      return `${day} ${month} ${hour}:0${minute}`;
    }

    return `${day} ${month} ${hour}:${minute}`;
  };

  if (!metrics) {
    return <Loading />;
  }

  const handleBackClick = () => {
    if (serviceId === "usage") {
      onPageChange("UsagePage");
    } else {
      onPageChange("Alerts");
    }
  };

  return (
    <div className="m-4 mt-2 pt-4">
      <div className="flex items-center">
        <button
          className={`shadow-lg text-center rounded-xl flex flex-col border-2 border-gray-200 ml-4 mt-4 px-5 p-4 pb-3 pt-3 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline`}
          onClick={handleBackClick}
        >
          Back
        </button>
        <h1 className="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
          User Metrics
        </h1>
      </div>
      <h1 class="text-xl ml-4 mt-4 font-light leading-9 tracking-tight text-gray-900 md:leading-14 flex-auto">
        Showing {metrics.length} Results for{" "}
        <span className="">{selectedApp}</span>
      </h1>
      <div className="col-span-3 m-2 mt-2">
        <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2">
          <table class="table-auto w-full text-sm rtl:text-right">
            <thead>
              <tr class="bg-sideBarPurple text-gray-300 text-lg">
                <th class="px-6 py-3 font-normal tracking-wider">API</th>
                <th class="px-6 py-3 font-normal tracking-wider">Time</th>
                <th class="px-6 py-3 font-normal tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base hover:bg-zinc-200 hover:bg-opacity-5`}
                >
                  <td className="px-6 py-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-fit">
                    {metric.api}
                  </td>
                  <td className="px-6 py-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-fit">
                    {formatDate(metric.time)}
                  </td>
                  <td className="px-6 py-4 first-letter:uppercase">
                    {metric.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserMetrics;
