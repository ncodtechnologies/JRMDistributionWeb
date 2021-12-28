const BASE_URL = "http://localhost:8000/controllers/";

export const PARTNER_URL = {
  LOGIN: BASE_URL + "partner/login.php",
  GET_DEALS: BASE_URL + "deal/getDeals.php",
};

export const ADMIN_URL = {
  LOGIN: BASE_URL + "admin/login.php",
  GET_ADMINS: BASE_URL + "admin/getAdmins.php",
  CREATE_ADMIN: BASE_URL + "admin/addAdmin.php",
};

export const CUSTOMER_URL = {
  LOGIN: BASE_URL + "customer/login.php",
  REGISTER: BASE_URL + "customer/addCustomer.php",
};
