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
    <aside class="w-1/6 bg-sideBarPurple p-6 pb-1 text-gray-200 flex flex-col h-full">
      <div class="flex items-center justify-center mt-2 mb-4">
        <button
          onClick={() => onPageChange("AppsDataDisplay")}
          class="flex items-center justify-center"
        >
          <LogoSvg class="h-24 w-24"></LogoSvg>
          <h2 class="text-4xl font-extrabold text-center tracking-wider text-gray-300 uppercase">
            Rater.io
          </h2>
        </button>
      </div>
      <ul class="text-xl border-gray-500 border-t pt-4">
        <button
          class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("AppsDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <OverviewSvg class="h-12 w-12 mr-3"></OverviewSvg>
            <span>Overview</span>
          </div>
        </button>
        <button
          class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("AppsDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <AppsSvg class="h-12 w-12 mr-3"></AppsSvg>
            <span>Applications</span>
          </div>
        </button>
        <button
          class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("ServicesDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <ServicesSvg class="h-12 w-12 mr-3"></ServicesSvg>
            <span>Services</span>
          </div>
        </button>
        <button
          class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("ApisDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <div class="flex items-center text-gray-300 font-normal tracking-wider">
              <ApisSvg class="h-12 w-12 mr-3"></ApisSvg>
              <span>APIs</span>
            </div>
          </div>
        </button>

        <button
          class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
          onClick={() => onPageChange("ServicesDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <MetricsSvg class="h-12 w-12 mr-3"></MetricsSvg>
            <span>Metrics</span>
          </div>
        </button>
        <div class="mt-5 border-gray-500 border-t-2 pt-4">
          <button
            class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
            onClick={() => onPageChange("ApisDataDisplay")}
          >
            <div class="flex items-center text-gray-300 font-semibold">
              <div class="flex items-center text-gray-300 font-normal tracking-wider">
                <DocumentationSvg class="h-12 w-12 mr-3"></DocumentationSvg>
                <span>Documentation</span>
              </div>
            </div>
          </button>
          <button
            class="w-full sidebar-button rounded-md p-2 my-1 pl-2 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10"
            onClick={() => onPageChange("ApisDataDisplay")}
          >
            <div class="flex items-center text-gray-300 font-semibold">
              <div class="flex items-center text-gray-300 font-normal tracking-wider">
                <SettingsSvg class="h-12 w-12 mr-3"></SettingsSvg>
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
