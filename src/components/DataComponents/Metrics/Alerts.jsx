import React from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import Loading from "../../Util/Loading";

const ALERTS_URL = "/alerts";

const Alerts = ({ onPageChange }) => {
  const [userData, setUserData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [newUserData, setNewUserData] = useState(null);
  const [newSurgeData, setNewSurgeData] = useState(null);
  const [showNewUserTrackModal, setShowNewUserTrackModal] = useState(false);
  const [showNewSurgeTrack, setShowNewSurgeTrack] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const openNewUserTrackModal = () => {
    setShowNewUserTrackModal(true);
  };

  const closeNewUserTrackModal = () => {
    setShowNewUserTrackModal(false);
    setNewUserData(null);
  };

  const handleNewUserTrack = async () => {
    addUserToTrack(newUserData);
    closeNewUserTrackModal();
  };

  const openNewSurgeTrack = () => {
    setShowNewSurgeTrack(true);
  };

  const closeNewSurgeTrack = () => {
    setShowNewSurgeTrack(false);
    setNewSurgeData(null);
  };

  const handleNewSurgeTrack = async () => {
    closeNewSurgeTrack();
  };

  useEffect(() => {
    const getApiAlerts = async () => {
      try {
        const response = await axiosPrivate.get(ALERTS_URL + "/apis");
        setUserData(response.data);
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    };
    getUserAlerts();
    //getApiAlerts();
  }, []);

  const addUserToTrack = async (userData) => {
    try {
      const response = await axiosPrivate.post(ALERTS_URL + "/users", {
        userData: userData,
      });
      getUserAlerts();
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserToTrack = async (userData) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to stop tracking this user?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axiosPrivate.delete(
        ALERTS_URL + "/users/" + userData
      );
      getUserAlerts();
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAlerts = async () => {
    try {
      const response = await axiosPrivate.get(ALERTS_URL + "/users");
      setUserData(response.data);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const buttonStyle =
    "shadow-lg shadow-gray-400 p-3 pb-1 text-center rounded-xl flex flex-col border-2 border-gray-200";

  if (!userData) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="m-4 mt-2 pt-4">
      <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
        Alerts
      </h1>
      <div className="grid grid-cols-4 gap-4 p-4 mx-4 mt-4">
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            User Denial Alerts{" "}
            <span className="text-2xl">
              - 100+ denied requests p/m{" "}
              <span
                className="font-bold text-xl hover:cursor-pointer"
                onClick={() => openNewSurgeTrack()}
              >
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            User Surge Alerts{" "}
            <span className="text-2xl">
              - 125+ requests p/m{" "}
              <span
                className="font-bold text-xl hover:cursor-pointer"
                onClick={() => openNewSurgeTrack()}
              >
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">API</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            API Denial Alerts{" "}
            <span className="text-2xl">
              - 125+ requests p/m{" "}
              <span
                className="font-bold text-xl hover:cursor-pointer"
                onClick={() => openNewSurgeTrack()}
              >
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">API</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-2 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            API Surge Alerts{" "}
            <span className="text-2xl">
              - 125+ requests per minute{" "}
              <span
                className="font-bold text-xl hover:cursor-pointer"
                onClick={() => openNewSurgeTrack()}
              >
                (Configure Here)
              </span>
            </span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User Id</th>
                  <th class="px-6 py-3 font-normal tracking-wider">API</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Timeframe
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={1}
                  class={`${
                    1 % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">{1}</td>
                  <td class="px-6 py-4">124</td>
                  <td class="px-6 py-4">10th Jan 15:33 - 15:43</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
        <button
          className={`shadow-lg shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
          onClick={openNewSurgeTrack}
        >
          Setup Denial Alert
        </button>
        <button
          className={`shadow-lg shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
        >
          Block / Limit User
        </button>{" "}
        <button
          className={`shadow-lg shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
          onClick={openNewSurgeTrack}
        >
          Setup Surge Alert
        </button>{" "}
        <button
          className={`shadow-lg shadow-gray-400 rounded-xl flex flex-col border-gray-200 col-span-1 bg-sideBarPurple text-center items-center text-3xl p-10 pb-10 text-gray-100 font-medium tracking-wider border-0 hover:shadow-xl hover:shadow-gray-400 hover:underline`}
        >
          Limit API
        </button>
        <div className={` ${buttonStyle} col-span-4 bg-white`}>
          <h2 className="text-left p-4 pt-4 pb-3 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            User Request Tracking{" "}
            <span className="text-2xl">- Monitoring specified users</span>
          </h2>
          <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
            <table class="table-auto w-full text-sm rtl:text-right">
              <thead>
                <tr class="bg-sideBarPurple text-gray-300 text-lg">
                  <th class="px-6 py-3 font-normal tracking-wider">User</th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Accepted Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    No. of Denied Requests
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider">
                    Total Request Count
                  </th>
                  <th class="px-6 py-3 font-normal tracking-wider"></th>
                </tr>
              </thead>
              <tbody>
                {userData.map((u, index) => (
                  <tr
                    key={index}
                    onClick={() => onPageChange("UserMetric", u.data, "alerts")}
                    class={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } border-b text-center text-base hover:cursor-pointer`}
                  >
                    <td class="px-6 py-4">{u.data}</td>
                    <td class="px-6 py-4">{u.acceptedRequestCount}</td>
                    <td class="px-6 py-4">{u.deniedRequestCount}</td>
                    <td class="px-6 py-4">
                      {u.acceptedRequestCount + u.deniedRequestCount}
                    </td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-light text-sm text-black hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeUserToTrack(u.data);
                        }}
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={openNewUserTrackModal}
            className="w-1/3 ml-auto mr-auto m-4 p-4 flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
          >
            <p className="text-gray-300 font-normal tracking-wider text-xl">
              Add User id
            </p>
          </button>
          {showNewSurgeTrack && (
            <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md px-8">
                <h2 className="text-2xl px-24 font-semibold mb-8 text-center">
                  Add Limit for Surge
                </h2>
                <div className="mb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="userData"
                      className="block font-semibold mb-2"
                    >
                      User Data (Id / Ip):
                    </label>
                    <input
                      type="text"
                      id="userData"
                      value={newUserData}
                      onChange={(e) => setNewSurgeData(e.target.value)}
                      className="border border-gray-400 p-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={closeNewSurgeTrack}
                    className="px-4 py-2 mr-2 bg-gray-500 rounded-md text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNewSurgeTrack}
                    className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          {showNewUserTrackModal && (
            <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md px-8">
                <h2 className="text-2xl px-24 font-semibold mb-8 text-center">
                  Add User to Track
                </h2>
                <div className="mb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="userData"
                      className="block font-semibold mb-2"
                    >
                      User Data (Id / Ip):
                    </label>
                    <input
                      type="text"
                      id="userData"
                      value={newUserData}
                      onChange={(e) => setNewUserData(e.target.value)}
                      className="border border-gray-400 p-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={closeNewUserTrackModal}
                    className="px-4 py-2 mr-2 bg-gray-500 rounded-md text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNewUserTrack}
                    className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;
