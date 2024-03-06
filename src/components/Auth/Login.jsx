import Navbar from "../Navigation/Navbar";
import Typed from "react-typed";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthProvider";
import Footer from "../Navigation/Footer";

const LOGIN_PATH = "/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emptyFields, setEmptyFields] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    const emailIsEmpty = email === "";
    const passwordIsEmpty = password === "";

    setEmptyFields(emailIsEmpty || passwordIsEmpty);

    if (!emptyFields) {
      setErrorMsg("");
    }
  }, [email, password]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in");

    if (emptyFields) {
      setErrorMsg("Fields are empty");
      return;
    }

    try {
      const resp = await axios.post(
        LOGIN_PATH,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(resp.data);

      const accessToken = resp?.data?.accessToken;
      const refreshToken = resp?.data?.refreshToken;
      setAuth({ email, password, accessToken, refreshToken });

      console.log("Successfully logged in, accessToken: " + auth.accessToken);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrorMsg("Please try again later");
      } else if (error.response?.status === 400) {
        setErrorMsg("Incorrect Email or Password");
      } else {
        setErrorMsg("Please try again later");
      }
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div class="flex flex-col items-center px-6 mx-auto leading-15 w-full">
      <div class="flex items-center">
        <h1 class="mb-4 text-4xl font-extralight leading-none tracking-wider text-gray-800 md:text-5xl lg:text-7xl  uppercase">
          Rater.io
        </h1>
      </div>
      <div class="flex items-center">
        <h1 class="text-xl font-extrabold leading-none tracking-wide text-center text-gray-900 md:text-3xl lg:text-3xl dark:text-gray-800">
          Reclaim your APIs and Rule your
        </h1>
        <Typed
          className="m-2 text-xl font-extrabold leading-none tracking-wide text-center md:text-3xl lg:text-3xl text-purple-800 inline-block"
          strings={[
            "Data Flow",
            "User Management",
            "Test Environments",
            "Endpoint Metrics",
          ]}
          typeSpeed={50}
          backSpeed={50}
          loop
        />
      </div>
      <h1 class="mb-10 text-xl font-extrabold leading-none tracking-wide text-center text-gray-900 md:text-3xl lg:text-3xl dark:text-gray-800">
        with <span class="text-purple-800">the World's #1</span> Rate Control
        Service
      </h1>
      <div class="w-full bg-backgroundWhite rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 drop-shadow-xl shadow-gray-800">
        <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <h1 class="text-xl font-bold tracking-wide text-gray-800 md:text-2xl text-center pb-4">
                Sign in to your account!
              </h1>
              <div class="mb-7 text-center text-md tracking-wide">
                <p class="text-gray-800">
                  Don't have an account?
                  <Link
                    to="/signup"
                    class="m-1 font-semibold text-purple-800 hover:text-purple-900"
                  >
                    Sign Up!
                  </Link>
                </p>
              </div>
            </div>
            <div class="space-y-6">
              <div class="input-container">
                <input
                  class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border-2 border-gray-200 rounded-lg focus:outline-none hover:border-purple-700 focus:border-purple-800 placeholder-gray-500 transition duration-200"
                  type="text"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  required
                  autoCorrect="off"
                />
              </div>
              <div class="input-container">
                <input
                  type="password"
                  placeholder="Password"
                  class="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-200 focus:outline-none hover:border-purple-700 focus:border-purple-800 placeholder-gray-500 transition duration-200"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <h2
                className={
                  errorMsg
                    ? "text-lg font-medium leading-tight tracking-normal text-black text-center"
                    : "hidden"
                }
              >
                <span className="text-purple-600 font-semibold text-lg pr-1">
                  Error:
                </span>
                {errorMsg}
              </h2>
              <div class="sign-in-button">
                <button
                  type="submit"
                  class="w-full flex justify-center bg-sideBarPurple hover:bg-opacity-80 text-gray-300 p-4 rounded-lg tracking-wide font-medium cursor-pointer brightness-125 disabled:opacity-30"
                  disabled={loadingState}
                >
                  <h1>Log in!</h1>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <button
        className={`shadow-lg border border-gray-600 text-center rounded-xl flex flex-col ml-4 mt-4 px-5 p-4 pb-3 pt-3 bg-mainDarkTheme text-gray-300 font-normal tracking-wider hover:underline`}
        onClick={handleBackClick}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default Login;
