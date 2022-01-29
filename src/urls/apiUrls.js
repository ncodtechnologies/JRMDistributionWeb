const BASE_URL = "http://localhost:8000/controllers/";

export const PARTNER_URL = {
  LOGIN: BASE_URL + "partner/login.php",
  GET_DEALS: BASE_URL + "deal/getAllDeals.php",
  ADD_DEAL: BASE_URL + "deal/addDeal.php",
  REGISTER: BASE_URL + "partner/addPartner.php",
  SEND_FORGOT_PASS_CODE: BASE_URL + "partner/sendForgotPasswordCode.php",
  VERIFY_FORGOT_PASS_CODE: BASE_URL + "partner/verifyForgotPasswordCode.php",
  RESET_PASSWORD: BASE_URL + "partner/resetPassword.php",
};

export const ADMIN_URL = {
  LOGIN: BASE_URL + "admin/login.php",
  GET_ADMINS: BASE_URL + "admin/getAdmins.php",
  GET_DEALS: BASE_URL + "deal/getDeals.php",
  GET_DEALS_COUNT: BASE_URL + "deal/getCount.php",
  CREATE_ADMIN: BASE_URL + "admin/addAdmin.php",
  APPROVE_DEAL: BASE_URL + "deal/approve.php",
  REJECT_DEAL: BASE_URL + "deal/reject.php",
  PARTNERS_LIST: BASE_URL + "partner/getPartners.php",
  GET_PARTNERS_COUNT: BASE_URL + "partner/getCount.php",
  APPROVE_PARTNER: BASE_URL + "partner/approve.php",
  REJECT_PARTNER: BASE_URL + "partner/reject.php",
  GET_WARRANTY: BASE_URL + "warranty/getWarranties.php",
  GET_WARRANTY_COUNT: BASE_URL + "warranty/getCount.php",
  APPROVE_WARRANTY: BASE_URL + "warranty/approve.php",
  REJECT_WARRANTY: BASE_URL + "warranty/reject.php",
  GET_CUSTOMERS: BASE_URL + "customer/getCustomers.php",
  APPROVE_CUSTOMER: BASE_URL + "customer/approve.php",
  REJECT_CUSTOMER: BASE_URL + "customer/reject.php",
  GET_CUSTOMER_COUNT: BASE_URL + "customer/getCount.php",
};

export const CUSTOMER_URL = {
  LOGIN: BASE_URL + "customer/login.php",
  REGISTER: BASE_URL + "customer/addCustomer.php",
  UPDATE: BASE_URL + "customer/updateCustomer.php",
  SEND_FORGOT_PASS_CODE: BASE_URL + "customer/sendForgotPasswordCode.php",
  VERIFY_FORGOT_PASS_CODE: BASE_URL + "customer/verifyForgotPasswordCode.php",
  RESET_PASSWORD: BASE_URL + "customer/resetPassword.php",
  ADD_WARRANTY: BASE_URL + "warranty/addWarranty.php",
  GET_WARRANTY: BASE_URL + "warranty/getAllWarranties.php",
};
