import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../../components/FieldError";
import { CustomerLoginSchema } from "../../../../yupSchema/customerLogin";
import { CUSTOMER_URL } from "../../../../urls/apiUrls";
import * as Yup from "yup";

function CustomerForgotPasswordResetSection({ email, code, next }) {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      submit(values);
    },
    validationSchema: Yup.object().shape({
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
  });

  const [invalidResp, setInvalidResp] = useState(false);

  const submit = (values) => {
    setInvalidResp(false);
    axios
      .post(CUSTOMER_URL.RESET_PASSWORD, {
        email,
        code,
        password: values.password,
      })
      .then(function (response) {
        if (response?.data?.result) {
          next(3);
        } else {
          setInvalidResp("Invalid code provided. Please try again!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="content">
      <img src="assets/images/logo.svg" alt="" />
      <div class="">
        <a href="#">
          <img src="assets/images/icons/back_icon.svg" style={{ width: 20 }} />
        </a>
      </div>
      <h3>RESET PASSWORD</h3>
      <form onSubmit={handleSubmit}>
        <div class="forminput">
          <label for="">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...getFieldProps("password")}
          />
          <FieldError error={errors.password} />
        </div>
        <div class="forminput">
          <label for="">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...getFieldProps("confirmPassword")}
          />
          <FieldError error={errors.confirmPassword} />
        </div>

        <button class="btn-primary" type="submit">
          Submit
        </button>
        {invalidResp != "" && <FieldError error={invalidResp} />}
      </form>
    </div>
  );
}

export default CustomerForgotPasswordResetSection;
