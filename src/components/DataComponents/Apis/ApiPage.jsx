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

const RULES_URL = "/apis/rules/create";

const ApiPage = ({ onPageChange, selectedApp, serviceId, apiId }) => {
  const [api, setApi] = useState(apiId);
  const [newApiLimit, setNewApiLimit] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
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

    getApi();
  }, []);

  const createRule = async () => {
    try {
      const response = await axiosPrivate.post(RULES_URL, {
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

  const handleNewApiLimit = (event) => {
    setNewApiLimit(event.target.value);
  };

  const handleNewUserId = (event) => {
    setNewUserId(event.target.value);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewApiLimit("");
    setNewUserId("");
  };

  const handleCreateRule = () => {
    console.log("Creating new rule:", newUserId);
    createRule();
    closeModal();
  };

  if (!api || !api.idRules || !api.ipRules || !api.roleRules) {
    return <Loading />;
  }

  const buttonStyle =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col border-2 border-gray-200";

  return (
    <div>
      <div className="flex justify-between items-center m-4 pt-4">
        <h1 className="text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl flex-auto">
          <span className="bg-sideBarPurple rounded-md px-2 py-0.5 mr-4 text-backgroundWhite">
            {api.httpMethod}:
          </span>
          /{api.name}
        </h1>
      </div>
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
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={openModal}
                className="m-4 p-4  flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
              >
                <p className="text-gray-300 font-normal tracking-wider text-xl">
                  Create Rule
                </p>
              </button>
              {showModal && (
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
                        onClick={handleCreateRule}
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
        <div className={` ${buttonStyle} col-span-1`}>
          <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            1x1
          </h2>
        </div>
        <div className={` ${buttonStyle} col-span-1`}>
          <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            1x1
          </h2>
        </div>
        <div className={` ${buttonStyle} col-span-1`}>
          <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            1x1
          </h2>
        </div>
        <div className={` ${buttonStyle} col-span-1`}>
          <h2 className="inline-block p-4 pb-2 pt-1 text-4xl font-medium leading-none tracking-wider text-black overflow-hidden overflow-ellipsis">
            1x1
          </h2>
        </div>
        <div className="col-span-2">
          {api && api.idRules && (
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
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={openModal}
                className="m-4 p-4  flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
              >
                <p className="text-gray-300 font-normal tracking-wider text-xl">
                  Create Rule
                </p>
              </button>
              {showModal && (
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
                        User Ip:
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
                        onClick={handleCreateRule}
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
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={openModal}
                className="m-4 p-4  flex items-center justify-center bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:shadow-lg text-white font-semibold rounded-md transition-colors duration-100"
              >
                <p className="text-gray-300 font-normal tracking-wider text-xl">
                  Create Rule
                </p>
              </button>
              {showModal && (
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
                        User Role:
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
                        onClick={handleCreateRule}
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
      </div>
    </div>
  );
};

export default ApiPage;
