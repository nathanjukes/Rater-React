import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ApisList from "../Apis/ApisList";
import Loading from "../../Util/Loading";

const APIS_URL = "/apis";

const ApisDataDisplay = ({ onPageChange }) => {
  const [apis, setApis] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getApis = async () => {
      try {
        const response = await axiosPrivate.get(APIS_URL);
        setApis(response.data);
      } catch (error) {
        console.error("Error getting apis:", error);
      }
    };

    getApis();
  }, []);

  if (!apis) {
    return <Loading />;
  }

  return (
    <div>
      <div class="flex justify-between items-center m-4 mt-2 pt-4">
        <h1 class="text-3xl font-light leading-9 tracking-tight text-gray-900 text-center sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 flex-auto">
          APIs
        </h1>
      </div>
      <ApisList
        selectedApp={null}
        apis={apis}
        onPageChange={onPageChange}
        serviceId={null}
        group={true}
      />
    </div>
  );
};

export default ApisDataDisplay;
