import React from "react";
import { AuthProvider } from "../context/AuthProvider";
import User from "./User";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="flex bg-backgroundWhite border-b-2 border-neutral-500 p-8 text-black text-center shadow-md shadow-neutral-400">
      <h1 class="text-4xl font-bold leading-none tracking-tight inline-block">
        Cisco's Dashboard
      </h1>
      <Link to="/user">CLICK HERE</Link>
    </nav>
  );
};

export default Navbar;
