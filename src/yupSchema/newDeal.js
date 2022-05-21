import * as Yup from "yup";

export const NewDealSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  project_name: Yup.string().required("Required"),
  project_for: Yup.string().required("Required"),
  contact_person: Yup.string().required("Required"),
  mobile_no: Yup.string()
    .matches(/(^7[0-9]{9}|^7[0-9]{10})$/, {
      message: "Please enter valid phone number.",
      excludeEmptyString: false,
    })
    .required("Required"),
  project_value: Yup.string().required("Required"),
  order_date: Yup.string().required("Required"),
  notes: Yup.string().required("Required"),
});
