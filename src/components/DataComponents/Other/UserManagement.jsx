import React from "react";
import { axiosPrivate } from "../../../api/axios";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";
import Loading from "../../Util/Loading";

const USERS_URL = "/users";

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const [newUserRole, setNewRole] = useState("user");
  const [newUserEmail, setNewEmail] = useState("");
  const [newUserPassword, setNewPassword] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [userId, setUserId] = useState("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get(USERS_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };

    getUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this User?"
      );
      if (!confirmDelete) {
        return;
      }

      const response = await axiosPrivate.delete(USERS_URL + "/" + userId);

      console.log("Deleted user:", userId);

      setUsers(users.filter((u) => u.id !== userId));
    } catch (error) {
      window.confirm("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  const editUser = async (userId) => {
    try {
      const response = await axiosPrivate.put(USERS_URL + "/" + userId, {
        role: newUserRole.toLowerCase(),
      });

      console.log("Updated user:", userId);

      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            return response.data;
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axiosPrivate.post("/auth/registerOrgUser", {
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole,
        orgId: users[0].orgId,
      });

      console.log("Created user:", response.data);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const openEditModal = (userId) => {
    setShowEditModal(true);
    setUserId(userId);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setNewRole("user");
    setUserId("");
  };

  const handleNewRole = (event) => {
    setNewRole(event.target.value);
  };

  const updateUserRole = (userId, event) => {
    setNewRole(event.target.value);
    editUser(userId);
    closeEditModal();
  };

  const openNewUserModal = () => {
    setShowNewUserModal(true);
  };

  const closeNewUserModal = () => {
    setShowNewUserModal(false);
    setNewRole("user");
    setNewEmail("");
    setNewPassword("");
  };

  const handleNewEmail = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleUserCreate = (event) => {
    createUser();
    closeNewUserModal();
  };

  if (!users) {
    return <Loading />;
  }

  const commonClasses =
    "bg-white shadow-lg p-3 pb-1 text-center rounded-xl flex flex-col cursor-pointer border-2 border-gray-200 hover:shadow-lg";

  return (
    <div className="grid grid-cols-4 gap-2 m-4">
      <div className={`${commonClasses} m-2 hover:cursor-default`}>
        <h1 class="text-4xl pt-4 font-normal leading-9 tracking-tight text-gray-900 text-center sm:leading-10 md:leading-14">
          Active Accounts
        </h1>
        <div className="flex justify-center">
          <div className="inline-block px-4 py-10 pb-4 text-5xl font-bold">
            {users.length}
          </div>
        </div>
      </div>
      <div className="col-span-3 m-2 h-40">
        <div class="relative overflow-x-auto shadow-lg sm:rounded-lg border-2">
          <table class="table-auto w-full text-sm rtl:text-right">
            <thead>
              <tr class="bg-sideBarPurple text-gray-300 text-lg">
                <th class="px-6 py-3 font-normal tracking-wider">Email</th>
                <th class="px-6 py-3 font-normal tracking-wider">Role</th>
                <th class="px-6 py-3 font-normal tracking-wider"></th>
                <th class="px-6 py-3 font-normal tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } border-b text-center text-base`}
                >
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.role
                      ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                      : ""}
                  </td>
                  {user.role !== "owner" && (
                    <>
                      <td
                        className="px-6 py-4"
                        onClick={(e) => openEditModal(user.id)}
                      >
                        <a
                          href="#"
                          className="font-medium text-black hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                      <td
                        className="px-6 py-4 pr-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (user.role !== "user") {
                            alert("Cannot delete Admin or Owner Account");
                          } else {
                            deleteUser(user.id);
                          }
                        }}
                      >
                        <a
                          href="#"
                          className={`font-medium text-black ${
                            user.role === "user"
                              ? "hover:underline"
                              : "cursor-not-allowed text-gray-400"
                          }`}
                        >
                          Delete
                        </a>
                      </td>
                    </>
                  )}
                  {user.role === "owner" && (
                    <>
                      <td className="px-6 py-4" colSpan="2"></td>
                    </>
                  )}
                </tr>
              ))}
              {showEditModal && (
                <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-8 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4 text-center">
                      Edit User Details
                    </h2>
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block font-semibold mb-2"
                      >
                        Role:
                      </label>
                      <select
                        id="role"
                        value={newUserRole}
                        onChange={handleNewRole}
                        className="border border-gray-400 p-2 rounded-md w-full"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={closeEditModal}
                        className="px-4 py-2 mr-2 bg-gray-500 rounded-md text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={(e) => updateUserRole(userId, e)}
                        className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={`shadow-lg text-center flex flex-col cursor-pointer hover:shadow-lg m-2 bg-sideBarPurple border-2 border-gray-500 hover:border-gray-400 hover:underline hover:bg-buttonPurple text-white font-semibold rounded-lg transition-colors`}
      >
        <button
          className="flex justify-center p-3 py-2"
          onClick={openNewUserModal}
        >
          <div className="inline-block px-4 py-6 text-2xl text-gray-300 font-normal tracking-wider items-center ">
            New User
          </div>
        </button>
      </div>
      {showNewUserModal && (
        <div className="fixed inset-0 flex items-center text-left justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add New User
            </h2>
            <div className="mb-4">
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-2">
                  Email:
                </label>
                <input
                  type="text"
                  id="email"
                  value={newUserEmail}
                  onChange={handleNewEmail}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-semibold mb-2">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={newUserPassword}
                  onChange={handleNewPassword}
                  className="border border-gray-400 p-2 rounded-md w-full"
                />
              </div>
              <label htmlFor="role" className="block font-semibold mb-2">
                Role:
              </label>
              <select
                id="role"
                value={newUserRole}
                onChange={handleNewRole}
                className="border border-gray-400 p-2 rounded-md w-full"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="py-0 pb-4">
              <label htmlFor="">
                Must be an Owner/Admin to create an Admin
              </label>
            </div>
            <div className="flex justify-between">
              <button
                onClick={closeNewUserModal}
                className="px-4 py-2 mr-2 bg-gray-500 rounded-md text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleUserCreate}
                className="px-4 py-2 bg-sideBarPurple rounded-md text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
