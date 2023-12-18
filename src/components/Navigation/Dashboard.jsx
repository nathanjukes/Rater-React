import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import AppsList from "../DataComponents/Apps/AppsList";
import Application from "../DataComponents/Apps/Application";
import AppsDataDisplay from "../DataComponents/Apps/AppsDataDisplay";
import ServicePage from "../DataComponents/Services/ServicePage";
import ApiPage from "../DataComponents/Apis/ApiPage";
import useRequireAuth from "../../hooks/useRequireAuth";
import Footer from "./Footer";
import ServicesList from "../DataComponents/Services/ServicesList";
import Overview from "./Overview";
import ServicesDataDisplay from "../DataComponents/Services/ServicesDataDisplay";
import UserManagement from "../DataComponents/Other/UserManagement";
import ApiDocumentation from "../DataComponents/Other/ApiDocumentation";
import Settings from "../DataComponents/Other/Settings";

const Dashboard = () => {
  // useRequireAuth();
  const [page, setPage] = useState("Overview");
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
    AppsDataDisplay: AppsDataDisplay,
    ServicesDataDisplay: ServicesDataDisplay,
    AppsList: AppsList,
    ServicesList: ServicesList,
    Application: Application,
    Service: ServicePage,
    Api: ApiPage,
    Overview: Overview,
    Users: UserManagement,
    ApiDocumentation: ApiDocumentation,
    Settings: Settings,
  };

  const SelectedPage = componentMap[page];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-backgroundWhite">
      <Sidebar onPageChange={handlePageChange} />
      <main className="w-screen flex flex-col">
        <Navbar />

        <div className="overflow-auto flex-grow no-scrollbar">
          {SelectedPage ? (
            <SelectedPage
              onPageChange={handlePageChange}
              selectedApp={selectedApp}
              serviceId={serviceId}
              apiId={apiId}
            />
          ) : (
            <Overview />
          )}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
