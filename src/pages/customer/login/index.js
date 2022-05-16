import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../components/FieldError";
import { CustomerLoginSchema } from "../../../yupSchema/customerLogin";
import { CUSTOMER_URL } from "../../../urls/apiUrls";
import { Link, useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

function CustomerLogin() {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      login(values);
    },
    validationSchema: CustomerLoginSchema,
  });

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (values) => {
    setInvalidLogin(false);
    setLoading(true);
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
          window.location.reload();
        } else setInvalidLogin(true);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };

  const navigate = useNavigate();

  return (
    <section id="login">
      <div class="leftlogin-customer">
        <div class="content">
          <img src="assets/images/nec.svg" alt="" />
          <h4 style={{ color: "white", marginTop: 20 }}>The SL2100</h4>
          <h4 style={{ color: "white" }}>Communications Systems</h4>
          <h4 style={{ color: "#FFD400" }}>Built-in Brilliance</h4>
        </div>
      </div>
      <div class="rightlogin">
        <div class="content">
          <img src="assets/images/logo.svg" alt="" />
          <div class="">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <img
                src="assets/images/icons/back_icon.svg"
                style={{ width: 20 }}
              />
            </a>
          </div>
          <h3>LOGIN AS A CUSTOMER</h3>
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
            <Link to={"/customer_forgot_password"} class="btn-forgotpass">
              Forgot your Password?
            </Link>
          </div>
        </div>
        <div class="footcontent text-center">
          Don't have an account?{" "}
          <Link to={"/regCustomer"} class="btn-forgotpass">
            Register here
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CustomerLogin;
