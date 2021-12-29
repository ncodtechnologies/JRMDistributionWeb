import axios from "axios";
import { useEffect, useState } from "react";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { PARTNER_URL } from "../../../urls/apiUrls";
import RegPartnerSchema from "../../../yupSchema/registerPartner";
import RegAdditionalInfo from "./components/additionalInfo";
import RegBasicInfo from "./components/basic";
import RegBusiness from "./components/business";
import RegCompanyContacts from "./components/company";

export default function RegisterPartner() {
  const [selectedSection, setSelectedSection] = useState(0);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState();

  const onChangeData = (key, val) => {
    setData({
      ...data,
      [key]: val,
    });
  };

  const submit = () => {
    console.log(data);
    RegPartnerSchema.validate(data, { abortEarly: false })
      .then(() => {
        setErrors(null);
      })
      .catch(function (err) {
        let obj = {};
        console.log(err?.inner);
        err?.inner?.forEach((el) => {
          obj[el.path] = el.message;
        });
        setErrors(obj);
      });
  };

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  return (
    <>
      <HeaderComp />
      <section class="content">
        <div class="container">
          <div class="title pt-4">
            <h3>JRM - NEC SL2100 REGISTERATION FORM</h3>
          </div>
          <div class="formsteps">
            <div class="container">
              <ul>
                <li class={selectedSection < 4 && "active"}>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection(0);
                    }}
                  >
                    <div class="step">1</div>
                    <p>Basic Info</p>
                    <p class="ar">البيانات الأساسية</p>
                  </a>
                </li>
                <li
                  class={selectedSection < 4 && selectedSection > 0 && "active"}
                >
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection(1);
                    }}
                  >
                    <div class="step">2</div>
                    <p>Company Contacts</p>
                    <p class="ar">بيانات الاتصال</p>
                  </a>
                </li>
                <li
                  class={selectedSection < 4 && selectedSection > 1 && "active"}
                >
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection(2);
                    }}
                  >
                    <div class="step">3</div>
                    <p>Business Information</p>
                    <p class="ar">بيانات الأعمال</p>
                  </a>
                </li>
                <li class={selectedSection == 3 && "active"}>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSection(3);
                    }}
                  >
                    <div class="step">4</div>
                    <p>Additional Info</p>
                    <p class="ar">بيانات إضافية</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {selectedSection == 0 && (
            <RegBasicInfo
              data={data}
              onChangeData={onChangeData}
              errors={errors}
            />
          )}
          {selectedSection == 1 && (
            <RegCompanyContacts
              data={data}
              onChangeData={onChangeData}
              errors={errors}
            />
          )}
          {selectedSection == 2 && (
            <RegBusiness
              data={data}
              onChangeData={onChangeData}
              errors={errors}
            />
          )}
          {selectedSection == 3 && (
            <RegAdditionalInfo
              data={data}
              onChangeData={onChangeData}
              errors={errors}
            />
          )}

          <div class="btnreg">
            {selectedSection > 0 && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection(selectedSection - 1);
                }}
                class="btn-border"
              >
                Previous
              </a>
            )}
            {selectedSection < 3 && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSection(selectedSection + 1);
                }}
                class="btn-primary"
              >
                Next
              </a>
            )}
            {selectedSection == 3 && (
              <a
                href="#"
                class="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                Submit
              </a>
            )}
          </div>
        </div>
      </section>
      <footer>
        <div class="container">
          <div class="dtls">
            <img src="assets/images/logo-wh.svg" alt="" />
            <p>
              Our Technological stack allows for your business to be future
              ready
            </p>
            <ul>
              <li>
                <a href="">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="subscribe">
            <strong>Stay up to date with the latest news!</strong>
            <form action="">
              <input type="text" placeholder="Enter Your Email" />
              <input type="submit" value="subscribe" />
            </form>
          </div>
          <div class="footnav">
            <ul>
              <li>
                <a href="">Home</a>
                <a href="">Mobility</a>
                <a href="">Resources</a>
              </li>
              <li>
                <a href="">SL2100 Communications System</a>
                <a href="">Phones</a>
                <a href="">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="container">
          <p class="copyright">Copyrights JRM for Communications 2021</p>
        </div>
      </footer>
    </>
  );
}
