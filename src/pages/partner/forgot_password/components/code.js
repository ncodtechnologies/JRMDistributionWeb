import axios from "axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import FieldError from "../../../../components/FieldError";
import * as Yup from "yup";
import { PARTNER_URL } from "../../../../urls/apiUrls";

function ForgotPasswordCodeSection({ email, next, setCode }) {
  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      submit(values);
    },
    validationSchema: Yup.object().shape({
      code: Yup.string().required("Required"),
    }),
  });

  const [invalidResp, setInvalidResp] = useState(false);

  const submit = (values) => {
    setInvalidResp(false);
    axios
      .post(PARTNER_URL.VERIFY_FORGOT_PASS_CODE, {
        code: values.code,
        email,
      })
      .then(function (response) {
        if (response?.data?.result) {
          {
            setCode(values.code);
            next(2);
          }
        } else {
          setInvalidResp("Invalid Code!");
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
      <h3>ENTER CODE </h3>
      <h6>Please enter code received in your email </h6>
      <form onSubmit={handleSubmit}>
        <div class="forminput">
          <input type="text" placeholder="Code" {...getFieldProps("code")} />
          <FieldError error={errors.code} />
        </div>

        <button class="btn-primary" type="submit">
          Submit
        </button>
        {invalidResp != "" && <FieldError error={invalidResp} />}
      </form>
    </div>
  );
}

export default ForgotPasswordCodeSection;
