import React from "react";
import { Link } from "react-router-dom";
import Signout from "../Auth/Signout";

const Sidebar = ({ onPageChange }) => {
  return (
    <aside class="w-1/6 bg-sideBarPurple p-6 text-gray-200 flex flex-col">
      <button
        onClick={() => onPageChange("AppsDataDisplay")}
        class="flex items-center justify-center mb-6"
      >
        <img
          class="w-16 h-16"
          src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
          alt="logo"
        ></img>
      </button>
      <h2 class="text-4xl font-extrabold mb-6 text-center">Rater</h2>
      <ul class="text-lg font-semibold">
        <button
          class="mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500 w-full transition duration-200"
          onClick={() => onPageChange("AppsDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="mr-3"
            ></img>
            <span>Overview</span>
          </div>
        </button>
        <button
          class="mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500 w-full transition duration-200"
          onClick={() => onPageChange("AppsDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="mr-3"
            ></img>
            <span>Applications</span>
          </div>
        </button>
        <button
          class="mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500 w-full transition duration-200"
          onClick={() => onPageChange("ServicesDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="mr-3"
            ></img>
            <span>Services</span>
          </div>
        </button>
        <button
          class="mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500 w-full transition duration-200"
          onClick={() => onPageChange("ApisDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="mr-3"
            ></img>
            <span>APIs</span>
          </div>
        </button>
        {/*
        <li class="items mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500">
          <div class="flex items-center text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="w-6 h-6 mr-3"
            ></img>
            <span class="text-lg">Metrics</span>
          </div>
        </li>
        <li class="mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500">
          <div class="flex items-center text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="w-6 h-6 mr-3"
            ></img>
            <span class="text-lg">User Management</span>
          </div>
        </li>
        <li class="mb-4 p-4 rounded-lg border-2 border-gray-300 hover:border-gray-500">
          <div class="flex items-center  text-gray-300 font-semibold">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="Logo"
              class="w-6 h-6 mr-3"
            ></img>
            <span class="text-lg">Settings</span>
          </div>
        </li>
  */}
      </ul>

      <button
        id="openModalBtn"
        class="float-right flex items-center bg-gradient-to-r from-violet-300 to-indigo-300 border-2 border-gray-500 hover:border-violet-100 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-100"
      >
        <svg
          class="w-4 h-4 mr-2 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <p class="text-black">New Project</p>
      </button>

      <Signout />
    </aside>
  );
};

export default Sidebar;
