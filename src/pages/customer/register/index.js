import axios from "axios";
import { useFormik } from "formik";
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

  const register = (values) => {
    axios
      .post(CUSTOMER_URL.REGISTER, {
        ...values,
      })
      .then(function (response) {
        window.location.href = "/customer";
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
        <div class="content" style={{ paddingTop: 50 }}>
          <img src="assets/images/logo.svg" alt="" />
          <div class="back">
            <a href="">
              <i class="mdi mdi-arrow-bottom-left"></i>
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
                {...getFieldProps("confim_password")}
              />
              <FieldError error={errors.confim_password} />
            </div>
            <button class="btn-primary" type="submit">
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CustomerRegister;
