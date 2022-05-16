import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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
import AdminWarranties from "../pages/admin/warranty";
import AdminCustomer from "../pages/admin/customers";
import Home from "../pages";
import WarrantyDt from "../pages/admin/warranty/warrantyDt";

export default function AppRoutes() {
  const session = localStorage.getItem("JRMDistribution") || "";
  const roles = localStorage.getItem("JRMDistributionRoles") || "";

  if (session == "") {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else if (roles.includes("PARTNER")) {
    return (
      <Routes>
        <Route path="/" element={<Deals />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else if (roles.includes("CUSTOMER")) {
    return (
      <Routes>
        <Route path="/" element={<WarrantyList />} />
        <Route path="/warranty" element={<WarrantyList />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  } else if (roles.includes("ADMIN")) {
    return (
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/home" element={<AdminHome />} />
        <Route path="/deals/:status" element={<AdminDeals />} />
        <Route path="/deals" element={<AdminDeals />} />
        <Route path="/dealDt" element={<DealDt />} />
        <Route path="/partners" element={<PartnersList />} />
        <Route path="/partners/:status" element={<PartnersList />} />
        <Route path="/partnerDt" element={<PartnerDt />} />
        <Route path="/warranties/:status" element={<AdminWarranties />} />
        <Route path="/warranties" element={<AdminWarranties />} />
        <Route path="/warrantyDt" element={<WarrantyDt />} />
        <Route path="/customers" element={<AdminCustomer />} />
        <Route path="/regPartner" element={<RegisterPartner />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    );
  }
}
