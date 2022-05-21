import { useState } from "react";
import FieldError from "../../../../components/FieldError";

export default function RegPartenrshipLevel({ data, onChangeData, errors }) {
  return (
    <>
      <div class="formwrap">
        <div class="ftitle">
          <h6>PARTNERSHIP LEVEL</h6>
          <h6 class="ar">بيانات القائم بالتسجيل</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Partner Level<span>*</span>
                  </label>
                  <label class="ar">
                    مستوى الشراكة<span>*</span>
                  </label>
                </div>
                <select
                  onChange={(e) => {
                    e.preventDefault();
                    onChangeData("partnership", e.target.value);
                  }}
                  value={data?.partnership}
                >
                  <option value="">Select</option>
                  <option value="Authorized">Authorized</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>
                <FieldError error={errors?.partnership} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Sales Target<span>*</span>
                  </label>
                  <label class="ar">
                    المسمى الوظيفي<span>*</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={data?.sales_target}
                  onChange={(e) => onChangeData("sales_target", e.target.value)}
                />
                <FieldError error={errors?.sales_target} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
