import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useLocation } from "react-router-dom";
import FeaturedDestinations from "./components/FeaturedDestinations";
import ExclusiveOffers from "./components/ExclusiveOffers";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          {/* Add other routes here */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
