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
                    Annual Sales<span>*</span>
                  </label>
                  <label class="ar">
                    إجمالي المبيعات<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.annual_sales}
                  onChange={(e) => onChangeData("annual_sales", e.target.value)}
                />
                <FieldError error={errors?.annual_sales} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Percent in IP PABX Offerings<span>*</span>
                  </label>
                  <label class="ar">
                    نسبة مبيعات السنترالات<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.business_percent}
                  onChange={(e) =>
                    onChangeData("business_percent", e.target.value)
                  }
                />
                <FieldError error={errors?.business_percent} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>NUMBER OF EMPLOYEES</h6>
          <h6 class="ar">عدد الموظفيين</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Total No. of Employees<span>*</span>
                  </label>
                  <label class="ar">
                    إجمالي عدد الموظفين<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.total_employee}
                  onChange={(e) =>
                    onChangeData("total_employee", e.target.value)
                  }
                />
                <FieldError error={errors?.total_employee} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Sales<span>*</span>
                  </label>
                  <label class="ar">
                    مبيعات<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.employee_sales}
                  onChange={(e) =>
                    onChangeData("employee_sales", e.target.value)
                  }
                />
                <FieldError error={errors?.employee_sales} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Technical<span>*</span>
                  </label>
                  <label class="ar">
                    الفنيين<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.employee_technical}
                  onChange={(e) =>
                    onChangeData("employee_technical", e.target.value)
                  }
                />
                <FieldError error={errors?.employee_technical} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>
            APPROXIMATE CUSTOMER BREAKDOWN BY PERCENTAGE (TOTAL SHOULD EQUAL
            100%):
          </h6>
          <h6 class="ar">توزيع العملاء حسب نسبة المبيعات</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Small/Medium Business<span>*</span>
                  </label>
                  <label class="ar">
                    مبيعات العملاء الصغيرة والمتوسطة<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.business}
                  onChange={(e) => onChangeData("business", e.target.value)}
                />
                <FieldError error={errors?.business} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Enterprise<span>*</span>
                  </label>
                  <label class="ar">
                    عملاء الشركات<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.enterprise}
                  onChange={(e) => onChangeData("enterprise", e.target.value)}
                />
                <FieldError error={errors?.enterprise} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Technical<span>*</span>
                  </label>
                  <label class="ar">
                    الفنيين<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.technical}
                  onChange={(e) => onChangeData("technical", e.target.value)}
                />
                <FieldError error={errors?.technical} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Federal Government<span>*</span>
                  </label>
                  <label class="ar">
                    القطاع الحكومي<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.federal_government}
                  onChange={(e) =>
                    onChangeData("federal_government", e.target.value)
                  }
                />
                <FieldError error={errors?.federal_government} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Others<span>*</span>
                  </label>
                  <label class="ar">
                    اخرى<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.business_others}
                  onChange={(e) =>
                    onChangeData("business_others", e.target.value)
                  }
                />
                <FieldError error={errors?.business_others} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>
            INDUSTRY FOCUS (CHECK ALL THAT APPLY AND INDICATE PERCENT OF TOTAL
            BUSINESS)
          </h6>
          <h6 class="ar">الأسواق المستهدفة</h6>
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
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="real_estate"
                  checked={data?.industry_focus?.includes("real_estate")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Real Estate (العقارات)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="banking_financial"
                  checked={data?.industry_focus?.includes("banking_financial")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Banking and Financial Services (البنوك والاستثمار)
                </label>
              </div>
            </div>

            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="healthcare"
                  checked={data?.industry_focus?.includes("healthcare")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Healthcare (منشأت صحية)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="restaurants"
                  checked={data?.industry_focus?.includes("restaurants")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Restaurants (مطاعم)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="communications"
                  checked={data?.industry_focus?.includes("communications")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Communications (الاتصالات)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="insurance"
                  checked={data?.industry_focus?.includes("insurance")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Insurance (التأمين)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="retail"
                  checked={data?.industry_focus?.includes("retail")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Retail (التجزئة)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="education"
                  checked={data?.industry_focus?.includes("education")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Education (التعليم)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="technology"
                  checked={data?.industry_focus?.includes("technology")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Technology (مؤسسات تقنية)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="energy_utilities"
                  checked={data?.industry_focus?.includes("energy_utilities")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Energy and Utilities (الخدمات والطاقة)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="manufacturing"
                  checked={data?.industry_focus?.includes("manufacturing")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Manufacturing (النصنيع)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="transportation_logistics"
                  checked={data?.industry_focus?.includes(
                    "transportation_logistics"
                  )}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Transportation and Logistics (النقل والمواصلات)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="entertainment_media"
                  checked={data?.industry_focus?.includes(
                    "entertainment_media"
                  )}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Entertainment and Media (الترفيه والاعلام)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="non_profit"
                  checked={data?.industry_focus?.includes("non_profit")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Non-Profit (مؤسسات غير هادفة للربح )
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="pharmaceuticals"
                  checked={data?.industry_focus?.includes("pharmaceuticals")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Pharmaceuticals (شركات أدوية)
                </label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="other"
                  checked={data?.industry_focus?.includes("other")}
                  onChange={(e) => {
                    if (e.target.checked) onCheckItem(e.target.value);
                    else onUncheckItem(e.target.value);
                  }}
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Other (اخرى)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
