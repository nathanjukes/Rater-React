import React, { useState } from "react";
import Sidebar from "../DataComponents/Services/Sidebar";
import Navbar from "./Navbar";
import DashboardDataDisplay from "./DashboardDataDisplay";
import ServicesDataDisplay from "../DataComponents/Services/ServicesDataDisplay";
import Applications from "../DataComponents/Apps/Applications";
import Application from "../DataComponents/Apps/Application";
import AppsDataDisplay from "../DataComponents/Apps/AppsDataDisplay";
import ApisDataDisplay from "../DataComponents/Apis/ApisDataDisplay";

const Dashboard = () => {
  const [page, setPage] = useState("AppsDataDisplay");
  const [selectedApp, setSelectedApp] = useState(null);

  const handlePageChange = (p, appData) => {
    setPage(p);
    setSelectedApp(appData);
  };

  const componentMap = {
    DashboardDataDisplay: DashboardDataDisplay,
    AppsDataDisplay: AppsDataDisplay,
    Applications: Applications,
    Application: Application,
    ServicesDataDisplay: ServicesDataDisplay,
    ApisDataDisplay: ApisDataDisplay,
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
            />
          ) : (
            <DashboardDataDisplay />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
