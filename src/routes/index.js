import React from "react";
import { Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import PartnerLogin from "../pages/partner/login";
import CustomerLogin from "../pages/customer/login";
import Deals from "../pages/partner/deals";
import AdminHome from "../pages/admin/home";
import AdminLogin from "../pages/admin/login";
import RegisterPartner from "../pages/partner/register";
import WarrantyList from "../pages/customer/warranty";
import CustomerRegister from "../pages/customer/register";
import CustomerForgotPassword from "../pages/customer/forgot_password";
import PartnerForgotPassword from "../pages/partner/forgot_password";
import AdminDeals from "../pages/admin/deals";
import DealDt from "../pages/admin/deals/dealDt";
import PartnersList from "../pages/admin/partners";
import PartnerDt from "../pages/admin/partners/partnerDt";

export default function AppRoutes() {
  const session = localStorage.getItem("JRMDistribution") || "";
  const roles = localStorage.getItem("JRMDistributionRoles") || "";

  if (session == "") {
    return (
      <Routes>
        <Route path="/" element={<CustomerLogin />} />
        <Route path="/customer" element={<CustomerLogin />} />
        <Route
          path="/customer_forgot_password"
          element={<CustomerForgotPassword />}
        />
        <Route path="/regCustomer" element={<CustomerRegister />} />
        <Route path="/partner" element={<PartnerLogin />} />
        <Route
          path="/partner_forgot_password"
          element={<PartnerForgotPassword />}
        />
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
  } else if (roles.includes("CUSTOMER")) {
    return (
      <Routes>
        <Route path="/" element={<WarrantyList />} />
        <Route path="/warranty" element={<WarrantyList />} />
      </Routes>
    );
  } else if (roles.includes("ADMIN")) {
    return (
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/deals" element={<AdminDeals />} />
        <Route path="/dealDt" element={<DealDt />} />
        <Route path="/partners" element={<PartnersList />} />
        <Route path="/partnerDt" element={<PartnerDt />} />
        <Route path="/regPartner" element={<RegisterPartner />} />
      </Routes>
    );
  }
}
