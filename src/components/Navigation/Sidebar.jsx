import React from "react";
import { Link } from "react-router-dom";
import Signout from "../Auth/Signout";
import { ReactComponent as LogoSvg } from "../../assets/icon.svg";
import { ReactComponent as AppsSvg } from "../../assets/apps.svg";
import { ReactComponent as ApisSvg } from "../../assets/apis.svg";
import { ReactComponent as SettingsSvg } from "../../assets/settings.svg";
import { ReactComponent as OverviewSvg } from "../../assets/overview.svg";
import { ReactComponent as ServicesSvg } from "../../assets/services.svg";
import { ReactComponent as MetricsSvg } from "../../assets/metrics.svg";
import { ReactComponent as DocumentationSvg } from "../../assets/documentation.svg";

const Sidebar = ({ onPageChange }) => {
  const buttonStyle =
    "w-full sidebar-button rounded-md p-2 py-3 my-0.5 pl-4 transition duration-75 bg-gray-300 bg-opacity-0 hover:bg-opacity-10";

  return (
    <aside class="w-1/6 bg-sideBarPurple p-6 pb-1 pt-0 text-gray-200 flex flex-col h-full shadow-gray-400 shadow-lg">
      <div class="flex items-center justify-center mb-2 py-4">
        <button
          onClick={() => onPageChange("Overview")}
          class="flex items-center justify-center bg-gray-950 bg-opacity-30 rounded-2xl"
        >
          <div class="py-1 px-4 my-4 text-5xl font-normal sm:block tracking-widest uppercase text-gray-300">
            RATER.IO
          </div>
        </button>
      </div>
      <ul class="text-lg tracking-widest border-gray-500 border-t pt-4 flex flex-col items-center">
        <button
          className={buttonStyle}
          onClick={() => onPageChange("Overview")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Dashboard</span>
          </div>
        </button>
        <button
          className={buttonStyle}
          onClick={() => onPageChange("AppsDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Applications</span>
          </div>
        </button>
        <button
          className={buttonStyle}
          onClick={() => onPageChange("ServicesDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Services</span>
          </div>
        </button>
        <button
          className={buttonStyle}
          onClick={() => onPageChange("ApisDataDisplay")}
        >
          <div class="flex items-center text-gray-300 font-semibold">
            <div class="flex items-center text-gray-300 font-normal tracking-wider">
              <span>APIs</span>
            </div>
          </div>
        </button>
        <button className={buttonStyle} onClick={() => onPageChange("Alerts")}>
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Alerts</span>
          </div>
        </button>
        <button className={buttonStyle} onClick={() => onPageChange("Metrics")}>
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>Metrics</span>
          </div>
        </button>
        <button
          className={buttonStyle}
          onClick={() => onPageChange("UsagePage")}
        >
          <div class="flex items-center text-gray-300 font-normal tracking-wider">
            <span>User Usage</span>
          </div>
        </button>
        <div class="mt-5 border-gray-500 border-t pt-4 items-center w-full">
          <button className={buttonStyle} onClick={() => onPageChange("Users")}>
            <div class="flex items-center text-gray-300 font-normal tracking-wider">
              <span>Accounts</span>
            </div>
          </button>
          <button
            className={buttonStyle}
            onClick={() => onPageChange("ApiDocumentation")}
          >
            <div class="flex items-center text-gray-300 font-semibold">
              <div class="flex items-center text-gray-300 font-normal tracking-wider">
                <span>Documentation</span>
              </div>
            </div>
          </button>
          <button
            className={buttonStyle}
            onClick={() => onPageChange("Settings")}
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
        &copy; 2024{" "}
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
