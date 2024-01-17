import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicesList from "../Services/ServicesList";
import ApisList from "../Apis/ApisList";
import Loading from "../../Util/Loading";

const RULES_URL = "/apis/rules";
const METRICS_URL = "/metrics/apis";

const ApiPage = ({ onPageChange, selectedApp, serviceId, apiId }) => {
  const [api, setApi] = useState(apiId);
  const [metrics, setMetrics] = useState("");
  const [newApiLimit, setNewApiLimit] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [newUserIp, setNewUserIp] = useState("");
  const [newUserRole, setNewUserRole] = useState("");
  const [showModalId, setShowModalId] = useState(false);
  const [showModalIp, setShowModalIp] = useState(false);
  const [showModalRole, setShowModalRole] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await axiosPrivate.get(`/apis/${apiId}`);
        setApi(response.data);
      } catch (error) {
        console.error("Error getting service:", error);
      }
    };

    const getMetrics = async () => {
      try {
        const response = await axiosPrivate.get(METRICS_URL + "/" + apiId);
        setMetrics(response.data);
      } catch (error) {
        console.error("Error getting metrics:", error);
      }
    };

    getApi();
    getMetrics();
  }, [apiId]);

  const createIdRule = async () => {
    try {
      const response = await axiosPrivate.post(RULES_URL + "/create", {
        userId: newUserId,
        limit: newApiLimit,
        apiId: apiId,
      });
      const createdRule = response.data;

      const currentIdRules = [...api.idRules];
      currentIdRules.push(createdRule);

      setApi({
        ...api,
        idRules: currentIdRules,
      });
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const createIpRule = async () => {
    try {
      const response = await axiosPrivate.post(RULES_URL + "/create", {
        userIp: newUserIp,
        limit: newApiLimit,
        apiId: apiId,
      });
      const createdRule = response.data;

      const currentIpRules = [...api.ipRules];
      currentIpRules.push(createdRule);

      setApi({
        ...api,
        ipRules: currentIpRules,
      });
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const createRoleRule = async () => {
    try {
      const response = await axiosPrivate.post(RULES_URL + "/create", {
        role: newUserRole,
        limit: newApiLimit,
        apiId: apiId,
      });
      const createdRule = response.data;

      const currentRoleRules = [...api.roleRules];
      currentRoleRules.push(createdRule);

      setApi({
        ...api,
        roleRules: currentRoleRules,
      });
    } catch (error) {
      console.error("Error creating rule:", error);
    }
  };

  const deleteRule = async (ruleId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this API Rule?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axiosPrivate.delete(RULES_URL + "/" + ruleId);

      console.log("Deleted api rule:", ruleId);

      setApi((prevApi) => ({
        ...prevApi,
        idRules: prevApi.idRules.filter((r) => r.id !== ruleId),
        ipRules: prevApi.ipRules.filter((r) => r.id !== ruleId),
        roleRules: prevApi.roleRules.filter((r) => r.id !== ruleId),
      }));
    } catch (error) {
      console.error("Error deleting api:", error);
    }
  };

  const handleNewApiLimit = (event) => {
    setNewApiLimit(event.target.value);
  };

  const handleNewUserId = (event) => {
    setNewUserId(event.target.value);
  };

  const handleNewUserIp = (event) => {
    setNewUserIp(event.target.value);
  };

  const handleNewUserRole = (event) => {
    setNewUserRole(event.target.value);
  };

  const openModal = (type) => {
    if (type === "id") {
      setShowModalId(true);
    } else if (type === "ip") {
      setShowModalIp(true);
    } else if (type === "role") {
      setShowModalRole(true);
    }
  };

  const closeModal = () => {
    setShowModalId(false);
    setShowModalIp(false);
    setShowModalRole(false);
    setNewApiLimit("");
    setNewUserId("");
    setNewUserIp("");
    setNewUserRole("");
  };

  const handleCreateRule = (type) => {
    if (type === "id") {
      console.log("Creating new id rule:", newUserId);
      createIdRule();
    } else if (type === "ip") {
      console.log("Creating new ip rule:", newUserIp);
      createIpRule();
    } else if (type === "role") {
      console.log("Creating new role rule:", newUserRole);
      createRoleRule();
    }
    closeModal();
  };

  const handleBackClick = () => {
    if (!selectedApp) {
      onPageChange("ApisDataDisplay");
      return;
    }
    onPageChange("Service", selectedApp, serviceId);
  };

  if (!api || !api.idRules || !api.ipRules || !api.roleRules || !metrics) {
    return <Loading />;
  }

  const buttonStyle =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col border-2 border-gray-200";

  return (
    <div>
      <div className="flex justify-between items-center m-4 pt-4 mt-1">
        <button
          className={`shadow-lg text-center rounded-xl flex flex-col border-2 border-gray-200 ml-4 mt-4 px-5 p-4 pb-3 pt-3 bg-sideBarPurple text-gray-300 font-normal tracking-wider hover:bg-buttonPurple hover:underline`}
          onClick={handleBackClick}
        >
          Back
        </button>
        <h1 className="text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl flex-auto">
          <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-4 text-backgroundWhite">
            {api.httpMethod}:
          </span>
          /{api.name}
        </h1>
      </div>
      <h1 className="text-xl font-normal leading-none tracking-wider text-center text-black flex-auto">
        <span className="bg-sideBarPurple font-light rounded-md px-2 py-0.5 mr-1 text-backgroundWhite">
          API Id:
        </span>
        {api.id}
      </h1>
      <div className="grid grid-cols-4 gap-4 p-4 mx-4">
        <div className="col-span-2">
          {api && api.idRules && (
            <div className={` ${buttonStyle}`}>
              <h2 className="underline p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                ID Rules
              </h2>
              <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
                <table class="table-auto w-full text-sm rtl:text-right">
                  <thead>
                    <tr class="bg-sideBarPurple text-gray-300 text-lg">
                      <th class="px-6 py-3 font-normal tracking-wider">
                        User Id
                      </th>
                      <th class="px-6 py-3 font-normal tracking-wider">
                        Use Limit
                      </th>
                      <th class="px-6 py-3 font-normal tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {api.idRules.map((rule, index) => (
                      <tr
                        key={index}
                        class={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } border-b text-center text-base`}
                      >
                        <td class="px-6 py-4">{rule.userId}</td>
                        <td class="px-6 py-4">{rule.useLimit}</td>
                        <td class="px-6 py-4">
                          <a
                            href="#"
                            class="font-medium text-black hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteRule(rule.id);
                            }}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => openModal("id")}
                className="m-4 p-4  flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
              >
                <p className="text-gray-300 font-normal tracking-wider text-xl">
                  Create Rule
                </p>
              </button>
              {showModalId && (
                <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      New Rule
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="userId"
                        className="block font-semibold mb-2"
                      >
                        User Id:
                      </label>
                      <input
                        type="text"
                        id="userId"
                        value={newUserId}
                        onChange={handleNewUserId}
                        className="border border-gray-400 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="apiLimit"
                        className="block font-semibold mb-2"
                      >
                        Use Limit:
                      </label>
                      <input
                        type="text"
                        id="apiLimit"
                        value={newApiLimit}
                        onChange={handleNewApiLimit}
                        className="border border-gray-400 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 rounded-md text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleCreateRule("id")}
                        className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={` ${buttonStyle} col-span-1 flex flex-col`}>
          <h2 className="inline-block p-4 pt-4 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            Accepted Requests
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="inline-block px-4 pt-2 text-4xl font-bold">
              {metrics.acceptedCount}
            </div>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-1 flex flex-col`}>
          <h2 className="inline-block p-4 pt-4 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            Denied Requests
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="inline-block px-4 pt-2 text-4xl font-bold">
              {metrics.deniedCount}
            </div>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-1 flex flex-col`}>
          <h2 className="inline-block p-4 pt-4 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            Base Limit
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="inline-block px-4 pt-2 text-4xl font-bold">
              {api.basicLimit} requests / minute
            </div>
          </div>
        </div>
        <div className={` ${buttonStyle} col-span-1 flex flex-col`}>
          <h2 className="inline-block p-4 pt-4 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            Custom Rules
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="inline-block px-4 pt-2 text-4xl font-bold">
              {api.idRules.length + api.ipRules.length + api.roleRules.length}
            </div>
          </div>
        </div>
        <div className="col-span-2">
          {api && api.ipRules && (
            <div className={` ${buttonStyle}`}>
              <h2 className="underline p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                IP Rules
              </h2>
              <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
                <table class="table-auto w-full text-sm rtl:text-right">
                  <thead>
                    <tr class="bg-sideBarPurple text-gray-300 text-lg">
                      <th class="px-6 py-3 font-normal tracking-wider">
                        User Ip
                      </th>
                      <th class="px-6 py-3 font-normal tracking-wider">
                        Use Limit
                      </th>
                      <th class="px-6 py-3 font-normal tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {api.ipRules.map((rule, index) => (
                      <tr
                        key={index}
                        class={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } border-b text-center text-base`}
                      >
                        <td class="px-6 py-4">{rule.userIp}</td>
                        <td class="px-6 py-4">{rule.useLimit}</td>
                        <td class="px-6 py-4">
                          <a
                            href="#"
                            class="font-medium text-black hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteRule(rule.id);
                            }}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => openModal("ip")}
                className="m-4 p-4  flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
              >
                <p className="text-gray-300 font-normal tracking-wider text-xl">
                  Create Rule
                </p>
              </button>
              {showModalIp && (
                <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      New Rule
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="userIp"
                        className="block font-semibold mb-2"
                      >
                        User Ip:
                      </label>
                      <input
                        type="text"
                        id="userIp"
                        value={newUserIp}
                        onChange={handleNewUserIp}
                        className="border border-gray-400 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="apiLimit"
                        className="block font-semibold mb-2"
                      >
                        Use Limit:
                      </label>
                      <input
                        type="text"
                        id="apiLimit"
                        value={newApiLimit}
                        onChange={handleNewApiLimit}
                        className="border border-gray-400 p-2 rounded-md w-full"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 rounded-md text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleCreateRule("ip")}
                        className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="col-span-2">
          {api.roleRules && (
            <div className={` ${buttonStyle}`}>
              <h2 className="underline p-4 pt-4 pb-6 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
                Role Rules
              </h2>
              <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2 my-2 mt-1">
                <table class="table-auto w-full text-sm rtl:text-right">
                  <thead>
                    <tr class="bg-sideBarPurple text-gray-300 text-lg">
                      <th class="px-6 py-3 font-normal tracking-wider">
                        User Role
                      </th>
                      <th class="px-6 py-3 font-normal tracking-wider">
                        Use Limit
                      </th>
                      <th class="px-6 py-3 font-normal tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {api.roleRules.map((rule, index) => (
                      <tr
                        key={index}
                        class={`${
                          index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } border-b text-center text-base`}
                      >
                        <td class="px-6 py-4">{rule.role}</td>
                        <td class="px-6 py-4">{rule.useLimit}</td>
                        <td class="px-6 py-4">
                          <a
                            href="#"
                            class="font-medium text-black hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteRule(rule.id);
                            }}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => openModal("role")}
                className="m-4 p-4 flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
              >
                <p className="text-gray-300 font-normal tracking-wider text-xl">
                  Create Rule
                </p>
              </button>
              {showModalRole && (
                <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      New Rule
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="userRole"
                        className="block font-semibold mb-2"
                      >
                        User Role:
                      </label>
                      <input
                        type="text"
                        id="userRole"
                        value={newUserRole}
                        onChange={handleNewUserRole}
                        className="border border-gray-400 p-2 rounded-md w-full"
                        placeholder="Admin"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="apiLimit"
                        className="block font-semibold mb-2"
                      >
                        Use Limit:
                      </label>
                      <input
                        type="text"
                        id="apiLimit"
                        value={newApiLimit}
                        onChange={handleNewApiLimit}
                        className="border border-gray-400 p-2 rounded-md w-full"
                        placeholder="25"
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-zinc-600 rounded-md text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleCreateRule("role")}
                        className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={` ${buttonStyle} col-span-1 flex flex-col`}>
          <h2 className="inline-block p-4 pt-4 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            Total Throughput
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="inline-block px-4 pt-2 text-4xl font-bold">
              {metrics.totalThroughput}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiPage;
