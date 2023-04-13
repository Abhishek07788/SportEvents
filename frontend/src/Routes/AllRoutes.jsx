import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/Register/Register";
import Sprint from "../components/sprint/Sprint";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Sprint />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
