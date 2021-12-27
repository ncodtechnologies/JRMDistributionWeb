import FieldError from "../../../../components/FieldError";

export default function RegAdditionalInfo({ data, onChangeData, errors }) {
  return (
    <>
      <div class="formwrap">
        <div class="ftitle">
          <h6>REGISTRAR INFORMATION</h6>
          <h6 class="ar">بيانات القائم بالتسجيل</h6>
        </div>
        <div class="fwraps">
          <div class="row">
            <div class="col-md-12">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Please provide a general description of your company and
                    offerings:
                  </label>
                  <label class="ar">أذكر نبذة عن أعمال الشركة</label>
                </div>
                <textarea
                  name=""
                  onChange={(e) =>
                    onChangeData("company_general", e.target.value)
                  }
                >
                  {data?.company_general}
                </textarea>
              </div>
            </div>
            <div class="col-md-12">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Additional Information: Please provide any information
                    relevant to this application
                  </label>
                  <label class="ar">معلومات إضافية</label>
                </div>
                <textarea
                  name=""
                  onChange={(e) =>
                    onChangeData("company_additional", e.target.value)
                  }
                >
                  {data?.company_additional}
                </textarea>
                <FieldError error={errors?.company_additional} />
              </div>
            </div>
            <div class="col-md-12">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Do you have a current opportunity? Please describe.
                    <span>*</span>
                  </label>
                  <label class="ar">
                    هل لديك مشاريع حالية؟ برجاء التوضيح<span>*</span>
                  </label>
                </div>
                <textarea name=""></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
