import axios from "axios";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import FieldError from "../../../components/FieldError";
import HeaderComp from "../../../nav/header";
import { PARTNER_URL } from "../../../urls/apiUrls";
import {
  RegPartnerBasicSchema,
  RegPartnerCompanySchema,
  RegPartnerBusinessSchema,
  RegPartnerAdditionalSchema,
  RegPartnerPartnershipLevelSchema,
} from "../../../yupSchema/registerPartner";
import RegAdditionalInfo from "./components/additionalInfo";
import RegBasicInfo from "./components/basic";
import RegBusiness from "./components/business";
import RegCompanyContacts from "./components/company";
import RegPartnershipLevel from "./components/partnership";

export default function RegisterPartner() {
  const [selectedSection, setSelectedSection] = useState(0);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeData = (key, val) => {
    setData({
      ...data,
      [key]: val,
    });
  };

  const submit = async () => {
    const validated = await validatePage(tabHeads.length - 1);
    if (validated) {
      register(data);
    }
  };

  const validatePage = async (index) => {
    if (index == 0) {
      try {
        const i = await RegPartnerBasicSchema.validate(data, {
          abortEarly: false,
        });
        return true;
      } catch (e) {
        let obj = {};
        e?.inner?.forEach((el) => {
          obj[el.path] = el.message;
        });
        setErrors(obj);
        return false;
      }
    } else if (index == 1) {
      try {
        const i = await RegPartnerCompanySchema.validate(data, {
          abortEarly: false,
        });
        return true;
      } catch (e) {
        let obj = {};
        e?.inner?.forEach((el) => {
          obj[el.path] = el.message;
        });
        setErrors(obj);
        return false;
      }
    } else if (index == 2) {
      try {
        const i = await RegPartnerBusinessSchema.validate(data, {
          abortEarly: false,
        });
        return true;
      } catch (e) {
        let obj = {};
        e?.inner?.forEach((el) => {
          obj[el.path] = el.message;
        });
        setErrors(obj);
        return false;
      }
    } else if (index == 3) {
      try {
        const i = await RegPartnerAdditionalSchema.validate(data, {
          abortEarly: false,
        });
        return true;
      } catch (e) {
        let obj = {};
        e?.inner?.forEach((el) => {
          obj[el.path] = el.message;
        });
        setErrors(obj);
        return false;
      }
    } else if (index == 4) {
      try {
        const i = await RegPartnerPartnershipLevelSchema.validate(data, {
          abortEarly: false,
        });
        return true;
      } catch (e) {
        let obj = {};
        e?.inner?.forEach((el) => {
          obj[el.path] = el.message;
        });
        setErrors(obj);
        return false;
      }
    }
  };

  const register = (values) => {
    setLoading(true);
    axios
      .post(PARTNER_URL.REGISTER, {
        ...values,
      })
      .then(function (response) {
        NotificationManager.success("Partner registration successfull");
        if (roles.includes("ADMIN")) navigate("/partners", { replace: true });
        else navigate("/partner", { replace: true });
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
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
                onClick={async (e) => {
                  e.preventDefault();
                  const validated = await validatePage(selectedSection);
                  if (validated) {
                    setSelectedSection(selectedSection + 1);
                    setErrors(null);
                  } //else setErrors({});
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
                {loading ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Oval color="#FFF" height={20} width={20} />
                  </div>
                ) : (
                  "Submit"
                )}
              </a>
            )}
          </div>
          <FieldError error={errors ? "Please fill all required fields" : ""} />
        </div>
      </section>
    </>
  );
}
