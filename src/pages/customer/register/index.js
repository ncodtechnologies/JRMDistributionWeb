import axios from "axios";
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import FieldError from "../../../components/FieldError";
import { CUSTOMER_URL } from "../../../urls/apiUrls";
import { CustomerCreateSchema } from "../../../yupSchema/customerCreate";

function CustomerRegister() {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      register(values);
    },
    validationSchema: CustomerCreateSchema,
  });

  const navigate = useNavigate();

  const register = (values) => {
    axios
      .post(CUSTOMER_URL.REGISTER, {
        ...values,
      })
      .then(function (response) {
        NotificationManager.success("Customer registration successfull");
        navigate("/customer");
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
      <div class="rightlogin" style={{ overflowX: "scroll" }}>
        <div class="content" style={{ paddingTop: 50, height: "100%" }}>
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
          <h3>REGISTER AS A CUSTOMER</h3>
          <form onSubmit={handleSubmit}>
            <div class="forminput">
              <label for="">COMPANY NAME</label>
              <input
                type="text"
                placeholder="Company Name"
                {...getFieldProps("company_name")}
              />
              <FieldError error={errors.company_name} />
            </div>
            <div class="forminput">
              <label for="">FULL NAME</label>
              <input
                type="text"
                placeholder="Full Name"
                {...getFieldProps("full_name")}
              />
              <FieldError error={errors.full_name} />
            </div>
            <div class="forminput">
              <label for="">EMAIL</label>
              <input
                type="text"
                placeholder="Email"
                {...getFieldProps("email")}
              />
              <FieldError error={errors.email} />
            </div>
            <div class="forminput">
              <label for="">PHONE</label>
              <input
                type="text"
                placeholder="Phone"
                {...getFieldProps("phone")}
              />
              <FieldError error={errors.phone} />
            </div>
            <div class="forminput">
              <label for="">PASSWORD</label>
              <input
                type="password"
                placeholder="Password"
                {...getFieldProps("password")}
              />
              <FieldError error={errors.password} />
            </div>
            <div class="forminput">
              <label for="">CONFIRM PASSWORD</label>
              <input
                type="password"
                placeholder="Password"
                {...getFieldProps("confirmPassword")}
              />
              <FieldError error={errors.confirmPassword} />
            </div>
            <button
              style={{ marginBottom: 30 }}
              class="btn-primary"
              type="submit"
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomerRegister;
