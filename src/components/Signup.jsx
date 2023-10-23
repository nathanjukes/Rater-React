import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0 bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 bottom-0 leading-15 h-full w-full">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Rater
      </h1>
      <h1 class="mb-10 text-xl font-extrabold leading-none tracking-tight text-center text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
        Reclaim your APIs and Rule Your Data Flow <br /> with{" "}
        <span class="text-purple-600">the world's #1</span> Rate Control Service
      </h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-mainDarkTheme dark:border-gray-600">
        <form class="space-y-4 md:space-y-6" action="#">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl text-center">
              Create your account now!
            </h1>
            <div class="mb-7 text-center">
              <p class="text-gray-400">
                Already have an account?
                <a
                  href="../dashboard/login.html"
                  class="text-sm text-purple-600 hover:text-purple-500"
                >
                  Log in!
                </a>
              </p>
            </div>
            <div class="space-y-6">
              <div class="input-container">
                <input
                  class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Email"
                ></input>
              </div>
              <div class="relative" x-data="{ show: true }">
                <input
                  type="show ? 'password' : 'text'"
                  placeholder="Password"
                  class="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                ></input>
              </div>
              <div class="input-container">
                <input
                  class="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="text"
                  placeholder="Organisation Name"
                ></input>
              </div>
              <div class="sign-in-button">
                <button
                  type="submit"
                  class="w-full flex justify-center bg-purple-800 hover:bg-purple-700 text-gray-300 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                  onClick={Navbar}
                >
                  <Link to="/navbar">Sign Up!</Link>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
