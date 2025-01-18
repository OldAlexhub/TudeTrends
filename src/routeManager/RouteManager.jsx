import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../routes/Home";
import AIML from "../routes/AIML";

const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aiml" element={<AIML />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteManager;
