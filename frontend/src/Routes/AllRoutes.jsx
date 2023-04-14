import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register/Register";
import Homepage from "../components/Homepage/Homepage";
import EventDetails from "../components/EventDetails/EventDetails";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/event_details/:id" element={<EventDetails />} />
    </Routes>
  );
};

export default AllRoutes;
