import React from "react";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loading from "../Util/Loading";
import OrgMetrics from "../DataComponents/Metrics/OrgMetrics";

const Overview = ({ onPageChange }) => {
  return (
    <div>
      <OrgMetrics onPageChange={onPageChange} />
    </div>
  );
};

export default Overview;
