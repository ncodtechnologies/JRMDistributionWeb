import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../../components/FieldError";
import { CUSTOMER_URL } from "../../../../urls/apiUrls";
import * as Yup from "yup";

function CustomerForgotPasswordEmailSection({ setEmail, next }) {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      submit(values);
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
  });

  const [invalidResp, setInvalidResp] = useState(false);

  const submit = (values) => {
    setInvalidResp(false);
    axios
      .post(CUSTOMER_URL.SEND_FORGOT_PASS_CODE, {
        email: values.email,
      })
      .then(function (response) {
        if (response?.data?.result) {
          setEmail(values.email);
          next(1);
        } else {
          setInvalidResp("Email not registered. Please register");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="content">
      <img src="assets/images/logo.svg" alt="" />
      <div class="back">
        <a href="">
          <i class="mdi mdi-arrow-bottom-left"></i>
        </a>
      </div>
      <h3>ENTER YOUR EMAIL</h3>
      <form onSubmit={handleSubmit}>
        <div class="forminput">
          <label for="">Email</label>
          <input type="text" placeholder="Email" {...getFieldProps("email")} />
          <FieldError error={errors.email} />
        </div>

        <button class="btn-primary" type="submit">
          Submit
        </button>
        {invalidResp != "" && <FieldError error={invalidResp} />}
      </form>
    </div>
  );
}

export default CustomerForgotPasswordEmailSection;
