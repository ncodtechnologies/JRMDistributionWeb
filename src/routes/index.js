import React from "react";
import { Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import PartnerLogin from "../pages/partner/login";
import CustomerLogin from "../pages/customer/login";
import Deals from "../pages/partner/deals";

export default function AppRoutes() {
  const session = localStorage.getItem("JRMDistribution") || "";

  return session == "" ? (
    <Routes>
      <Route path="/" element={<CustomerLogin />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<Deals />} />
      <Route path="/deals" element={<Deals />} />
    </Routes>
  );
}
