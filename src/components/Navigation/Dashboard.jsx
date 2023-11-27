import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardDataDisplay from "./DashboardDataDisplay";
import Applications from "../DataComponents/Apps/AppsList";
import Application from "../DataComponents/Apps/Application";
import AppsDataDisplay from "../DataComponents/Apps/AppsDataDisplay";
import ServicePage from "../DataComponents/Services/ServicePage";
import ApiPage from "../DataComponents/Apis/ApiPage";
import useRequireAuth from "../../hooks/useRequireAuth";
import Footer from "./Footer";

const Dashboard = () => {
  // useRequireAuth();
  const [page, setPage] = useState("AppsDataDisplay");
  const [selectedApp, setSelectedApp] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [apiId, setApiId] = useState(null);

  const handlePageChange = (p, appData, serviceId, apiId) => {
    setPage(p);
    setSelectedApp(appData);
    setServiceId(serviceId);
    setApiId(apiId);
  };

  const componentMap = {
    DashboardDataDisplay: DashboardDataDisplay,
    AppsDataDisplay: AppsDataDisplay,
    Applications: Applications,
    Application: Application,
    Service: ServicePage,
    Api: ApiPage,
  };

  const SelectedPage = componentMap[page];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-backgroundWhite">
      <Sidebar onPageChange={handlePageChange} />

      <main className="w-screen flex flex-col">
        <Navbar />

        <nav
          class="justify-between px-4 mt-2 py-2 text-gray-600"
          aria-label="Breadcrumb"
        >
          <ol class="inline-flex items-center mb-3 space-x-1 md:space-x-2 rtl:space-x-reverse sm:mb-0">
            <li>
              <div class="flex items-center">
                <a
                  href="#"
                  class="ms-1 text-sm font-medium text-gray-500 hover:text-sideBarPurple md:ms-2"
                >
                  Applications
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg
                  class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  class="ms-1 text-sm font-medium text-gray-500 hover:text-sideBarPurple md:ms-2  "
                >
                  Services
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg
                  class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  class="ms-1 text-sm font-medium text-gray-500 hover:text-sideBarPurple md:ms-2  "
                >
                  APIs
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center ">
                <svg
                  class="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span class="ml-1 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  PUT
                </span>
                <span class="mx-1 text-sm font-medium text-gray-500 hover:text-sideBarPurple dark:text-gray-500">
                  /users
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="overflow-auto flex-grow no-scrollbar">
          {SelectedPage ? (
            <SelectedPage
              onPageChange={handlePageChange}
              selectedApp={selectedApp}
              serviceId={serviceId}
              apiId={apiId}
            />
          ) : (
            <DashboardDataDisplay />
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
