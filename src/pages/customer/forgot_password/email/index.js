import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../../components/FieldError";
import { CustomerLoginSchema } from "../../../../yupSchema/customerLogin";
import { CUSTOMER_URL } from "../../../../urls/apiUrls";
import { Link } from "react-router-dom";

function CustomerForgotPasswordEmail() {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      login(values);
    },
    validationSchema: CustomerLoginSchema,
  });

  const [invalidLogin, setInvalidLogin] = useState(false);

  const login = (values) => {
    setInvalidLogin(false);
    axios
      .post(CUSTOMER_URL.LOGIN, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        if (response?.data?.result?.result) {
          localStorage.setItem(
            "JRMDistribution",
            response?.data?.result?.token
          );
          localStorage.setItem(
            "JRMDistributionRoles",
            response?.data?.result?.roles
          );
          localStorage.setItem(
            "JRMDistributionUser",
            JSON.stringify(response?.data?.result?.user)
          );
          window.location.href = "/";
        } else setInvalidLogin(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <section id="login">
      <div class="leftlogin">
        <div class="content">
          <img src="assets/images/nec.svg" alt="" />
          <h5>UNIFIED COMMUNICATIONS SYSTEMS</h5>
          <h6>CUSTOMER IN SUCCESS</h6>
        </div>
      </div>
      <div class="rightlogin">
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
              <input
                type="text"
                placeholder="email@email.com"
                {...getFieldProps("email")}
              />
              <FieldError error={errors.email} />
            </div>

            <button class="btn-primary" type="submit">
              Submit
            </button>
            {invalidLogin && <FieldError error={"Invalid Login"} />}
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomerForgotPasswordEmail;
