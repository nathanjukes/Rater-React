import React from "react";
import ServicesList from "./ServicesList";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const SERVICES_URL = "/services";

const ServicesDataDisplay = ({ onPageChange }) => {
  const [services, setServices] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axiosPrivate.get(SERVICES_URL);
        setServices(response.data);
      } catch (error) {
        console.error("Error getting service:", error);
      }
    };

    getServices();
  }, []);

  return (
    <div>
      <div class="flex justify-between items-center m-4 mt-2 pt-4">
        <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
          Services
        </h1>
      </div>
      <ServicesList
        services={services}
        onPageChange={onPageChange}
        appId={null}
      />
    </div>
  );
};

export default ServicesDataDisplay;
