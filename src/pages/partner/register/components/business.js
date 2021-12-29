import { useState } from "react";
import FieldError from "../../../../components/FieldError";

export default function RegBusiness({ data, onChangeData, errors }) {
  const onCheckItem = (value) => {
    let _tmp = data?.industry_focus?.split(",") || [];
    const i = _tmp.findIndex((el) => el == value);
    if (i == -1) _tmp.push(value);
    console.log(_tmp);
    onChangeData("industry_focus", _tmp.join(","));
  };

  const onUncheckItem = (value) => {
    let _tmp = data?.industry_focus?.split(",") || [];
    const i = _tmp.findIndex((el) => el == value);
    if (i > -1) _tmp.splice(i, 1);
    onChangeData("industry_focus", _tmp.join(","));
  };

  return (
    <>
      <div class="formwrap">
        <div class="ftitle">
          <h6>BUSINESS INFORMATION</h6>
          <h6 class="ar">بيانات القائم بالتسجيل</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Full Name<span>*</span>
                  </label>
                  <label class="ar">
                    الاسم بالكامل<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.name}
                  onChange={(e) => onChangeData("name", e.target.value)}
                />
                <FieldError error={errors?.name} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Role/Title<span>*</span>
                  </label>
                  <label class="ar">
                    المسمى الوظيفي<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.title}
                  onChange={(e) => onChangeData("title", e.target.value)}
                />
                <FieldError error={errors?.title} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Phone<span>*</span>
                  </label>
                  <label class="ar">
                    تليفون<span>*</span>
                  </label>
                </div>
                <input type="text" />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Email<span>*</span>
                  </label>
                  <label class="ar">
                    البريد الألكتروني<span>*</span>
                  </label>
                </div>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>BUSINESS INFORMATION</h6>
          <h6 class="ar">بيانات القائم بالتسجيل</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="Automotive"
                  checked={data?.industry_focus?.includes("Automotive")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Automotive (السيارات)
                </label>
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="Government"
                  checked={data?.industry_focus?.includes("Government")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Government (الحكومة)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
