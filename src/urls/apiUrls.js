const BASE_URL = "http://localhost:8000/controllers/";

export const PARTNER_URL = {
  LOGIN: BASE_URL + "partner/login.php",
  GET_DEALS: BASE_URL + "deal/getDeals.php",
  SEND_FORGOT_PASS_CODE: BASE_URL + "partner/sendForgotPasswordCode.php",
  VERIFY_FORGOT_PASS_CODE: BASE_URL + "partner/verifyForgotPasswordCode.php",
  RESET_PASSWORD: BASE_URL + "partner/resetPassword.php",
};

export const ADMIN_URL = {
  LOGIN: BASE_URL + "admin/login.php",
  GET_ADMINS: BASE_URL + "admin/getAdmins.php",
  CREATE_ADMIN: BASE_URL + "admin/addAdmin.php",
};

export const CUSTOMER_URL = {
  LOGIN: BASE_URL + "customer/login.php",
  REGISTER: BASE_URL + "customer/addCustomer.php",
  SEND_FORGOT_PASS_CODE: BASE_URL + "customer/sendForgotPasswordCode.php",
  VERIFY_FORGOT_PASS_CODE: BASE_URL + "customer/verifyForgotPasswordCode.php",
  RESET_PASSWORD: BASE_URL + "customer/resetPassword.php",
};
