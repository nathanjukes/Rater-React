import React from "react";
import { AuthProvider } from "../../context/AuthProvider";
import User from "../Auth/User";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="bg-navBarWhite border-neutral-500 p-8 text-black text-center shadow-neutral-400">
      <h1 class="text-4xl font-bold leading-none tracking-tight text-center">
        Cisco's Dashboard
      </h1>
    </nav>
  );
};

export default Navbar;
