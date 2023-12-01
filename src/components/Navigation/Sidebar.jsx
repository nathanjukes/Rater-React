import React from "react";
import { Link } from "react-router-dom";
import Signout from "../Auth/Signout";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { ReactComponent as AppsSvg } from "../../assets/apps.svg";
import { ReactComponent as ApisSvg } from "../../assets/apis.svg";
import { ReactComponent as SettingsSvg } from "../../assets/settings.svg";
import { ReactComponent as OverviewSvg } from "../../assets/overview.svg";
import { ReactComponent as ServicesSvg } from "../../assets/services.svg";
import { ReactComponent as MetricsSvg } from "../../assets/metrics.svg";
import { ReactComponent as DocumentationSvg } from "../../assets/documentation.svg";

const Sidebar = ({ onPageChange }) => {
  return (
    <aside class="w-1/6 bg-sideBarPurple p-6 pb-1 text-gray-200 flex flex-col h-full shadow-gray-400 shadow-lg">
      <div class="flex items-center justify-center mt-2 mb-4">
        <button
          onClick={() => onPageChange("AppsDataDisplay")}
          class="flex items-center justify-center"
        >
          <LogoSvg class="h-24 w-24"></LogoSvg>
          <div class="hidden h-6 text-5xl font-semibold sm:block uppercase">
            Rater.io
          </div>
        </button>
      </div>
      <ul class="text-xl border-gray-500 border-t pt-4 flex flex-col items-center">
        <li class="w-full">
          <button
            class="w-full sidebar-button rounded-md p-2 py-3 my-1 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
            onClick={() => onPageChange("AppsDataDisplay")}
          >
            <div class="flex items-center text-gray-300 font-normal tracking-wider">
              <span>Overview</span>
            </div>
          </button>
        </li>
        <button
          class="w-full sidebar-button rounded-md p-2 py-3 my-2 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("AppsDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Applications</span>
          </div>
        </button>
        <button
          class="w-full sidebar-button rounded-md p-2 py-3 my-2 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("ServicesDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Services</span>
          </div>
        </button>
        <button
          class="w-full sidebar-button rounded-md p-2 py-3 my-2 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("ApisDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <div class="flex items-center text-gray-300 font-normal tracking-wider">
              <span>APIs</span>
            </div>
          </div>
        </button>

        <button
          class="w-full sidebar-button rounded-md p-2 py-3 my-2 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("ServicesDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Metrics</span>
          </div>
        </button>
        <div class="mt-5 border-gray-500 border-t-2 pt-4 items-center w-full">
          <button
            class="w-full sidebar-button rounded-md p-2 py-3 my-2 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
            onClick={() => onPageChange("ApisDataDisplay")}
          >
            <div class="flex items-center text-gray-300 font-semibold">
              <div class="flex items-center text-gray-300 font-normal tracking-wider">
                <span>Documentation</span>
              </div>
            </div>
          </button>
          <button
            class="w-full sidebar-button rounded-md p-2 py-3 my-2 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
            onClick={() => onPageChange("ApisDataDisplay")}
          >
            <div class="flex items-center text-gray-300 font-semibold">
              <div class="flex items-center text-gray-300 font-normal tracking-wider">
                <span>Settings</span>
              </div>
            </div>
          </button>
        </div>
      </ul>
      <Signout />
      <p class="text-center text-sm text-gray-500 mt-2">
        &copy; 2023{" "}
        <a
          href="https://github.com/nathanjukes"
          class="hover:underline"
          target="_blank"
        >
          Rater.
        </a>
      </p>
    </aside>
  );
};

export default Sidebar;
