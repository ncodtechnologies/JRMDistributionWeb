import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerForgotPasswordCodeSection from "./components/code";
import CustomerForgotPasswordEmailSection from "./components/email";
import CustomerForgotPasswordResetSection from "./components/reset";

function CustomerForgotPassword() {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [page, next] = useState(0);

  const navigate = useNavigate();

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
        {page == 0 && (
          <CustomerForgotPasswordEmailSection setEmail={setEmail} next={next} />
        )}
        {page == 1 && (
          <CustomerForgotPasswordCodeSection
            email={email}
            next={next}
            setCode={setCode}
          />
        )}
        {page == 2 && (
          <CustomerForgotPasswordResetSection
            email={email}
            code={code}
            next={next}
          />
        )}
        {page == 3 && (
          <div class="dealsuccess">
            <div class="dtls">
              <img src="assets/images/icons/checked.png" alt="" />
              <p>Password Reset Successfully</p>
              <button onClick={() => navigate("/customer", { replace: true })}>
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomerForgotPassword;
