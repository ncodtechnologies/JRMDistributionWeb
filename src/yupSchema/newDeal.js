import * as Yup from "yup";

export const NewDealSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  company_name: Yup.string().required("Required"),
  contact_person: Yup.string().required("Required"),
  mobile_no: Yup.string().required("Required"),
  revenue: Yup.string().required("Required"),
});
