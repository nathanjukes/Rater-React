import React from "react";
import { useState, useEffect } from "react";
import { axiosPrivate } from "../../../api/axios";
import Loading from "../../Util/Loading";

const USERS_URL = "/metrics/users";

const UserUsage = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getUserMetrics = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error getting user netrics:", error);
      }
    };

    getUserMetrics();
  }, []);

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

  if (!users) {
    return <Loading />;
  }

  return (
    <div className="m-4 mt-2 pt-4">
      <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
        User Usage
      </h1>
      <h1 class="text-xl ml-4 mt-4 font-light leading-9 tracking-tight text-gray-900 md:leading-14 flex-auto">
        Showing {users.length} Results
      </h1>
      <div className="col-span-3 m-2 mt-2">
        <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2">
          <table class="table-auto w-full text-sm rtl:text-right">
            <thead>
              <tr class="bg-sideBarPurple text-gray-300 text-lg">
                <th class="px-6 py-3 font-normal tracking-wider">Id / Ip</th>
                <th class="px-6 py-3 font-normal tracking-wider">
                  Latest Request
                </th>
                <th class="px-6 py-3 font-normal tracking-wider">
                  Requests (Accepted / Denied)
                </th>
                <th class="px-6 py-3 font-normal tracking-wider">
                  Avg Requests / Day
                </th>
                <th class="px-6 py-3 font-normal tracking-wider">
                  First Request
                </th>
                <th class="px-6 py-3 font-normal tracking-wider">
                  Last Request
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((metric, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td className="px-6 py-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-fit">
                    {metric.data}
                  </td>
                  <td className="px-6 py-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-fit">
                    {formatDate(metric.latestRequestTime)}
                  </td>
                  <td className="px-6 py-4">
                    {metric.acceptedRequestCount} / {metric.deniedRequestCount}
                  </td>
                  <td className="px-6 py-4">{metric.avgRequests}</td>
                  <td className="px-6 py-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-fit">
                    {formatDate(metric.firstRequestTime)}
                  </td>
                  <td className="px-6 py-4 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-fit">
                    {metric.lastRequestedApi}
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

export default UserUsage;
