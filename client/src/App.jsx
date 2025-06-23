import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useLocation } from "react-router-dom";
import FeaturedDestinations from "./components/FeaturedDestinations";
import ExclusiveOffers from "./components/ExclusiveOffers";
import Testimonials from "./components/Testimonials";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";

function App() {
  // will be used to hide nav bar for admin view
  const isAdminPath = useLocation().pathname.includes("owner");
  // const room = {
  //   _id: 1111111111,
  //   hotel_name: "Yasser Hotel",
  //   rating: 4.9,
  //   images: [assets.roomImg1],
  //   hotel_address: "494 Falor Circle",
  //   pricePerNight: 199
  // };
  return (
    <>
      {!isAdminPath && <Navbar />}
      <Hero />
      <FeaturedDestinations />
      <ExclusiveOffers />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
