import React from "react";
import { axiosPrivate } from "../../../api/axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Loading from "../../Util/Loading";

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(`/users`);
        //setUsers(response.data);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    const generateRandomEmail = () => {
      const emailLength = 10;
      const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      let email = "";

      for (let i = 0; i < emailLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        email += characters[randomIndex];
      }

      return `${email}@example.com`;
    };

    const generateRandomUsers = () => {
      const randomUsers = [];

      for (let i = 0; i < 10; i++) {
        const randomEmail = generateRandomEmail();
        randomUsers.push({ email: randomEmail });
      }

      setUsers(randomUsers);
    };

    getUsers();
    generateRandomUsers();
  }, []);

  if (!users) {
    return <Loading />;
  }

  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-2 border-gray-200 hover:shadow-lg";

  return (
    <div className="grid grid-cols-4 gap-2 m-4">
      <div className={` ${commonClasses} m-2 h-72`}>
        <h1 class="text-5xl pt-4 font-normal leading-9 tracking-tight text-gray-900 text-center sm:leading-10 md:leading-14">
          User Management
        </h1>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-10 pb-1 text-5xl font-bold">
            {users.length}
          </div>
        </div>
      </div>
      <div className="col-span-3 m-2">
        <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2">
          <table class="table-auto w-full text-sm rtl:text-right">
            <thead>
              <tr class="bg-sideBarPurple text-gray-300 text-lg">
                <th class="px-6 py-3 font-normal tracking-wider">Email</th>
                <th class="px-6 py-3 font-normal tracking-wider"></th>
                <th class="px-6 py-3 font-normal tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  class={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td class="px-6 py-4">{user.email}</td>
                  <td class="px-6 py-4">
                    <a href="#" class="font-medium text-black hover:underline">
                      Edit
                    </a>
                  </td>
                  <td class="px-6 py-4 pr-0">
                    <a href="#" class="font-medium text-black hover:underline">
                      Delete
                    </a>
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

export default UserManagement;
