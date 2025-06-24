import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
