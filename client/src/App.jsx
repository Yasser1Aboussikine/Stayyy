import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useLocation } from "react-router-dom";
function App() {
  // will be used to hide nav bar for admin view
  const isAdminPath = useLocation().pathname.includes("owner");
  return (
    <>
      {!isAdminPath && <Navbar />}
      <Hero />
    </>
  );
}

export default App;
