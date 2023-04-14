import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register/Register";
import Homepage from "../components/Homepage/Homepage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
