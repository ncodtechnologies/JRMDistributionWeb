import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../components/FieldError";
import { PartnerLoginSchema } from "../../../yupSchema/partnerLogin";
import { PARTNER_URL } from "../../../urls/apiUrls";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function PartnerLogin() {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      login(values);
    },
    validationSchema: PartnerLoginSchema,
  });

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (values) => {
    setInvalidLogin(false);
    setLoading(true);
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
          localStorage.setItem(
            "JRMDistributionRoles",
            response?.data?.result?.roles
          );
          localStorage.setItem(
            "JRMDistributionUser",
            JSON.stringify(response?.data?.result?.user)
          );
          window.location.reload();
        } else setInvalidLogin(true);

        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <section id="login">
      <div class="leftlogin">
        <div class="content">
          <img src="assets/images/nec.svg" alt="" />
          <h6>UNIFIED COMMUNICATIONS SYSTEMS</h6>
          <h4>PARTNERS IN SUCCESS</h4>
        </div>
      </div>
      <div class="rightlogin">
        <div class="content">
          <img src="assets/images/logo.svg" alt="" />
          <div class="">
            <Link to={"/"}>
              <img
                src="assets/images/icons/back_icon.svg"
                style={{ width: 20 }}
              />
            </Link>
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
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Oval color="#FFF" height={20} width={20} />
                </div>
              ) : (
                "Login"
              )}
            </button>
            {invalidLogin && <FieldError error={"Invalid Login"} />}
          </form>
          <div class="text-center">
            <Link to={"/partner_forgot_password"} class="btn-forgotpass">
              Forgot your Password?
            </Link>
          </div>
        </div>
        <div class="footcontent text-center">
          Don't have an account?{" "}
          <Link to={"/regPartner"} class="btn-forgotpass">
            Register here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PartnerLogin;
