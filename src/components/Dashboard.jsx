import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardDataDisplay from "./DashboardDataDisplay";
import ServicesDataDisplay from "./ServicesDataDisplay";
import ApisDataDisplay from "./ApisDataDisplay";
import Applications from "./Applications";
import Application from "./Application";

const Dashboard = () => {
  const [page, setPage] = useState("DashboardDataDisplay");
  const [selectedApp, setSelectedApp] = useState(null);

  const handlePageChange = (p, appData) => {
    setPage(p);
    setSelectedApp(appData);
  };

  const componentMap = {
    DashboardDataDisplay: DashboardDataDisplay,
    AppsDataDisplay: Applications,
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
