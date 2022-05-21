import * as Yup from "yup";

export const AdminCreateSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-z ,.'-]+$/i, {
      message: "Please enter valid Name",
      excludeEmptyString: false,
    })
    .required("Required"),
  type: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
