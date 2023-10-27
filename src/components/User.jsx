import React, { useEffect, useRef, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState();
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getLoggedInUser = async () => {
      try {
        const resp = await axiosPrivate.get("/health/me", {
          signal: controller.signal,
        });
        isMounted && setUser(resp.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          return;
        }
        console.log(error);
        navigate("/login");
      }
    };

    getLoggedInUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h2>User Email: {user?.email}</h2>
      <button onClick={refresh}>Refresh token</button>
      <h2>EMPTY</h2>
      <Link to="/dashboard">Back</Link>
      <h2>Token:{auth.accessToken}</h2>
    </div>
  );
};

export default User;
