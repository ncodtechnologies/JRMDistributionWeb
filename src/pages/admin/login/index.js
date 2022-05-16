import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../components/FieldError";
import { PartnerLoginSchema } from "../../../yupSchema/partnerLogin";
import { ADMIN_URL } from "../../../urls/apiUrls";
import { store } from "../../../store";
import { useDispatch } from "react-redux";
import { setUser, setUserData } from "../../../slices/user";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      login(values);
    },
    validationSchema: PartnerLoginSchema,
  });

  const dispatch = useDispatch();

  const [invalidLogin, setInvalidLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (values) => {
    setInvalidLogin(false);
    setLoading(true);
    axios
      .post(ADMIN_URL.LOGIN, {
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

  const navigate = useNavigate();

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
          <div class="">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            >
              <img
                src="assets/images/icons/back_icon.svg"
                style={{ width: 20 }}
              />
            </a>
          </div>
          <h3>ADMIN LOGIN</h3>
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

export default AdminLogin;
