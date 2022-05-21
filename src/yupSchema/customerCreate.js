import * as Yup from "yup";

export const CustomerCreateSchema = Yup.object().shape({
  full_name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, {
      message: "Please enter valid Name",
      excludeEmptyString: false,
    })
    .required("Required"),
  company_name: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/(^7[0-9]{9}|^7[0-9]{10})$/, {
      message: "Please enter valid number.",
      excludeEmptyString: false,
    })
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
