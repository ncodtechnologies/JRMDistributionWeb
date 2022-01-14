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
import RegPartnershipLevel from "./components/partnership";

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

  const roles = localStorage.getItem("JRMDistributionRoles") || "";

  const [tabHeads, setTabHeads] = useState([
    {
      en: "Basic Info",
      ar: "البيانات الأساسية",
    },
    {
      en: "Company Contacts",
      ar: "بيانات الاتصال",
    },
    {
      en: "Business Information",
      ar: "بيانات الأعمال",
    },
    {
      en: "Additional Info",
      ar: "بيانات إضافية",
    },
  ]);

  useEffect(() => {
    if (roles.includes("ADMIN"))
      setTabHeads([
        ...tabHeads,
        {
          en: "Partnership Level",
          ar: "مستوى الشراكة",
        },
      ]);
  }, [roles]);

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
                {tabHeads.map((tab, index) => (
                  <li class={selectedSection >= index && "active"}>
                    <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSection(index);
                      }}
                    >
                      <div class="step">{index + 1}</div>
                      <p>{tab.en}</p>
                      <p class="ar">{tab.ar}</p>
                    </a>
                  </li>
                ))}
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
          {selectedSection == 4 && (
            <RegPartnershipLevel
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
            {selectedSection < tabHeads.length - 1 && (
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
            {selectedSection == tabHeads.length - 1 && (
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
    </>
  );
}
