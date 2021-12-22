import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../components/FieldError";
import { PartnerLoginSchema } from "../../../yupSchema/partnerLogin";
import { PARTNER_URL } from "../../../urls/apiUrls";

function PartnerLogin() {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      login(values);
    },
    validationSchema: PartnerLoginSchema,
  });

  const [invalidLogin, setInvalidLogin] = useState(false);

  const login = (values) => {
    setInvalidLogin(false);
    axios
      .post(PARTNER_URL.LOGIN, {
        email: values.email,
        password: values.password,
      })
      .then(function (response) {
        if (response?.data?.result?.result) {
          localStorage.setItem(
            "JRMDistribution",
            response?.data?.result?.token
          );
          window.location.reload();
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
          <h6>PARTNERS IN SUCCESS</h6>
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
          <h3>LOGIN AS A PATNER</h3>
          <form onSubmit={handleSubmit}>
            <div class="forminput">
              <label for="">Name</label>
              <input
                type="text"
                placeholder="email@email.com"
                {...getFieldProps("email")}
              />
              <FieldError error={errors.email} />
            </div>
            <div class="forminput">
              <label for="">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...getFieldProps("password")}
              />
              <FieldError error={errors.password} />
            </div>
            <button class="btn-primary" type="submit">
              Login
            </button>
            {invalidLogin && <FieldError error={"Invalid Login"} />}
          </form>
          <div class="text-center">
            <a href="" class="btn-forgotpass">
              Forgot your Password?
            </a>
          </div>
        </div>
        <div class="footcontent text-center">
          Don't have an account?{" "}
          <a href="" class="btn-forgotpass">
            Register here
          </a>
        </div>
      </div>
    </section>
  );
}

export default PartnerLogin;
