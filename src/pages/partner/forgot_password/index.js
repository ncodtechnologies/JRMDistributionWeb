import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ForgotPasswordCodeSection from "./components/code";
import ForgotPasswordEmailSection from "./components/email";
import ForgotPasswordResetSection from "./components/reset";

function PartnerForgotPassword() {
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
          <h6>PARTNERS IN SUCCESS</h6>
        </div>
      </div>
      <div class="rightlogin">
        {page == 0 && (
          <ForgotPasswordEmailSection setEmail={setEmail} next={next} />
        )}
        {page == 1 && (
          <ForgotPasswordCodeSection
            email={email}
            next={next}
            setCode={setCode}
          />
        )}
        {page == 2 && (
          <ForgotPasswordResetSection email={email} code={code} next={next} />
        )}
        {page == 3 && (
          <div class="dealsuccess">
            <div class="dtls">
              <img src="assets/images/icons/checked.png" alt="" />
              <p>Password Reset Successfully</p>
              <button onClick={() => navigate("/partner", { replace: true })}>
                Login
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default PartnerForgotPassword;
