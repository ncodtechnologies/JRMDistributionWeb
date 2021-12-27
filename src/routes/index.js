import React from "react";
import { Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import PartnerLogin from "../pages/partner/login";
import Deals from "../pages/partner/deals";
import AdminHome from "../pages/admin/home";
import AdminLogin from "../pages/admin/login";
import RegisterPartner from "../pages/partner/register";

export default function AppRoutes() {
  const session = localStorage.getItem("JRMDistribution") || "";
  const roles = localStorage.getItem("JRMDistributionRoles") || "";

  if (session == "") {
    return (
      <Routes>
        <Route path="/" element={<PartnerLogin />} />
        <Route path="/partner" element={<PartnerLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/regPartner" element={<RegisterPartner />} />
      </Routes>
    );
  } else if (roles.includes("PARTNER")) {
    return (
      <Routes>
        <Route path="/" element={<Deals />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    );
  } else if (roles.includes("ADMIN")) {
    return (
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<AdminHome />} />
      </Routes>
    );
  }
}
