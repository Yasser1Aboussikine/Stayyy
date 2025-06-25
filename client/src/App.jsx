import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

// Import Components
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
// Import Layouts
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";


function App() {
 
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 w-full">
        <Routes>
          {/* User Routes wrapped in UserLayout */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/hotels" element={<AllRooms />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />

          </Route>

          {/* Admin Routes wrapped in AdminLayout */}
          <Route path="/admin/*" element={<AdminLayout />}>
            {/* Define admin routes here */}
            {/* Example: <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          </Route>

          {/* Public route for SignUp */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

        </Routes>
      </main>
      
    </div>
  );
}

export default App;
