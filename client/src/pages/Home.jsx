import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedRooms from "../components/FeaturedRooms";
import FeaturedDestinations from "../components/FeaturedDestinations";
import ExclusiveOffers from "../components/ExclusiveOffers";
import Testimonials from "../components/Testimonials";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedRooms />
      {/* <FeaturedDestinations /> */}
      {/* <ExclusiveOffers /> */}
      <Testimonials />
      <ContactUs />
    </div>
  );
};

export default Home;
