import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../../../hooks/useRefreshToken";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import ServicesList from "../Services/ServicesList";
import ApisList from "../Apis/ApisList";

const ServicePage = ({ onPageChange, selectedApp, serviceId }) => {
  const [service, setService] = useState(serviceId);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getService = async () => {
      try {
        const response = await axiosPrivate.get(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error("Error getting service:", error);
      }
    };

    getService();
  }, []);

  if (!service) {
    return <div></div>;
  }

  return (
    <div>
      <div class="flex justify-between items-center m-4">
        <h1 class=" text-4xl font-extralight leading-none tracking-wider text-center text-black md:text-4xl lg:text-5xl underline flex-auto">
          {service.name}'s APIs
        </h1>
      </div>
      <ApisList
        apis={service.apis}
        onPageChange={onPageChange}
        serviceId={service.id}
      />
    </div>
  );
};

export default ServicePage;
