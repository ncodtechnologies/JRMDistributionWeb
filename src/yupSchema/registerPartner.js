import * as yup from "yup";

export const RegPartnerBasicSchema = yup.object({
  full_name: yup.string().required("Required"),
  role: yup.string().required("Required"),
  phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  company_name: yup.string().required("Required"),
  company_location: yup.string().required("Required"),
  company_phone: yup
    .string()
    .matches(/^[6-9]\d{9}$/, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .required("Required"),
  company_years: yup.number().required("Required"),
  billing_address: yup.string().required("Required"),
  billing_postalcode: yup.string().required("Required"),
  shipping_address: yup.string().required("Required"),
  shipping_postalcode: yup.string().required("Required"),
  company_website: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    ),
});

export const RegPartnerCompanySchema = yup.object({
  executive_first_name: yup.string().required("Required"),
  executive_last_name: yup.string().required("Required"),
  executive_email: yup.string().required("Required"),
  executive_role: yup.string().required("Required"),
});

export const RegPartnerBusinessSchema = yup.object({
  annual_sales: yup.number().required("Required"),
  business_percent: yup.number().required("Required"),
  total_employee: yup.number().required("Required"),
  employee_sales: yup.number().required("Required"),
  employee_technical: yup.number().required("Required"),
  business: yup.number().required("Required"),
  enterprise: yup.number().required("Required"),
  technical: yup.number().required("Required"),
  federal_government: yup.number().required("Required"),
  business_others: yup.number().required("Required"),
});

export const RegPartnerAdditionalSchema = yup.object({
  opportunity: yup.string().required("Required"),
});

export const RegPartnerPartnershipLevelSchema = yup.object({
  partnership: yup.string().required("Required"),
  sales_target: yup.string().required("Required"),
});
