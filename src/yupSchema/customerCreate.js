import * as Yup from "yup";

export const CustomerCreateSchema = Yup.object().shape({
  full_name: Yup.string().required("Required"),
  company_name: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(/^[6-9]\d{9}$/, {
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
