import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import RouteNotFound from "./ErrorHandling/RouteNotFound";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/hotels" element={<AllRooms />} />

            {user && <Route path="/bookings" element={<MyBookings />} />}

            <Route path="/rooms/:id" element={<RoomDetails />} />
          </Route>

          <Route path="/admin/*" element={<AdminLayout />}></Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="*" element={<RouteNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
