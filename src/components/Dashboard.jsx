import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import DashboardDataDisplay from "./DashboardDataDisplay";
import { useState } from "react";
import AppsDataDisplay from "./AppsDataDisplay";

const Dashboard = () => {
  const [page, setPage] = useState("DashboardDataDisplay");

  const handlePageChange = (p) => {
    setPage(p);
  };

  const componentMap = {
    DashboardDataDisplay: DashboardDataDisplay,
    AppsDataDisplay: AppsDataDisplay,
  };

  const SelectedPage = componentMap[page];

  return (
    <div class="flex flex-col md:flex-row h-screen bg-backgroundWhite">
      <Sidebar onPageChange={handlePageChange} />

      {/* Main Area */}
      <main class="w-screen flex flex-col">
        <Navbar />

        {/* Data area with scrollable content */}
        <div class="overflow-auto flex-grow no-scrollbar">
          {SelectedPage ? <SelectedPage /> : <DashboardDataDisplay />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
