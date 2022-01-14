import { useState } from "react";
import FieldError from "../../../../components/FieldError";

export default function RegBasicInfo({ data, onChangeData, errors }) {
  return (
    <>
      <div class="formwrap">
        <div class="ftitle">
          <h6>REGISTRAR INFORMATION</h6>
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
                  value={data?.full_name}
                  onChange={(e) => onChangeData("full_name", e.target.value)}
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
                  value={data?.role}
                  onChange={(e) => onChangeData("role", e.target.value)}
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
                <input 
                  type="text" 
                  value={data?.phone}
                  onChange={(e) => onChangeData("phone", e.target.value)}
                />
                <FieldError error={errors?.title} />
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
                <input 
                  type="text" 
                  value={data?.email}
                  onChange={(e) => onChangeData("email", e.target.value)}
                />
                <FieldError error={errors?.title} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>COMPANY INFORMATION</h6>
          <h6 class="ar">بيانات الشركة</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Company Legal Name<span>*</span>
                  </label>
                  <label class="ar">
                    اسم الشركة المسجل<span>*</span>
                  </label>
                </div>
                <input 
                  type="text"
                  value={data?.company_name}
                  onChange={(e) => onChangeData("company_name", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Headoffice Location<span>*</span>
                  </label>
                  <label class="ar">
                    عنوان المقر الرئيسي<span>*</span>
                  </label>
                </div>
                <input 
                  type="text" 
                  value={data?.company_location}
                  onChange={(e) => onChangeData("company_location", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
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
                  <label>Fax</label>
                  <label class="ar">فاكس</label>
                </div>
                <input 
                  type="text" 
                  value={data?.company_fax}
                  onChange={(e) => onChangeData("company_fax", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>

            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>Website</label>
                  <label class="ar">الموقع الالكتروني</label>
                </div>
                <input 
                  type="text" 
                  value={data?.company_website}
                  onChange={(e) => onChangeData("company_website", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Years in Business<span>*</span>
                  </label>
                  <label class="ar">
                    عدد سنوات الخبرة في السوق<span>*</span>
                  </label>
                </div>
                <input 
                  type="text" 
                  value={data?.company_years}
                  onChange={(e) => onChangeData("company_years", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>BIILING ADDRESS</h6>
          <h6 class="ar">بيانات الدفع</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Address<span>*</span>
                  </label>
                  <label class="ar">
                    العنوان<span>*</span>
                  </label>
                </div>
                <input 
                  type="text" 
                  value={data?.billing_address}
                  onChange={(e) => onChangeData("billing_addresss", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    City<span>*</span>
                  </label>
                  <label class="ar">
                    المدينة<span>*</span>
                  </label>
                </div>
                <select name="" id="">
                  <option value=""></option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                  <option value="">Option 3</option>
                  <option value="">Option 4</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Region<span>*</span>
                  </label>
                  <label class="ar">
                    المنطقة<span>*</span>
                  </label>
                </div>
                <select name="" id="">
                  <option value=""></option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                  <option value="">Option 3</option>
                  <option value="">Option 4</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>Zip/Postal Code</label>
                  <label class="ar">الرقم البريدي</label>
                </div>
                <input 
                  type="text" 
                  value={data?.billing_postalcode}
                  onChange={(e) => onChangeData("billing_postalcode", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Country<span>*</span>
                  </label>
                  <label class="ar">
                    البلد<span>*</span>
                  </label>
                </div>
                <select name="" id="">
                  <option value=""></option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                  <option value="">Option 3</option>
                  <option value="">Option 4</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox1"
                  value="option1"
                />
                <label class="form-check-label" for="inlineCheckbox1">
                  Billing address same as shipping address
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="formwrap">
        <div class="ftitle">
          <h6>SHIPPING ADDRESS</h6>
          <h6 class="ar">بيانات الشحن</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Address<span>*</span>
                  </label>
                  <label class="ar">
                    العنوان<span>*</span>
                  </label>
                </div>
                <input 
                  type="text" 
                  value={data?.shipping_address}
                  onChange={(e) => onChangeData("shipping_address", e.target.value)}
                />
                <FieldError error={errors?.name} /> 
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    City<span>*</span>
                  </label>
                  <label class="ar">
                    المدينة<span>*</span>
                  </label>
                </div>
                <select name="" id="">
                  <option value=""></option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                  <option value="">Option 3</option>
                  <option value="">Option 4</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    State/Province<span>*</span>
                  </label>
                  <label class="ar">
                    تليفون<span>*</span>
                  </label>
                </div>
                <select name="" id="">
                  <option value=""></option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                  <option value="">Option 3</option>
                  <option value="">Option 4</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>Zip/Postal Code</label>
                  <label class="ar">الرقم البريدي</label>
                </div>
                <input 
                  type="text" 
                  value={data?.shipping_postalcode}
                  onChange={(e) => onChangeData("shipping_postalcode", e.target.value)}
                />
                <FieldError error={errors?.name} />
              </div>
            </div>
            <div class="col-md-4">
              <div class="forminput">
                <div class="labeldiv">
                  <label>
                    Country<span>*</span>
                  </label>
                  <label class="ar">
                    البلد<span>*</span>
                  </label>
                </div>
                <select name="" id="">
                  <option value=""></option>
                  <option value="">Option 1</option>
                  <option value="">Option 2</option>
                  <option value="">Option 3</option>
                  <option value="">Option 4</option>
                </select>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="inlineCheckbox2"
                  value="option2"
                />
                <label class="form-check-label" for="inlineCheckbox2">
                  Billing address same as shipping address
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div class="formwrap">
        <div class="ftitle">
          <h6>COMPANY DOCUMENTS</h6>
          <h6 class="ar">أوراق الشركة</h6>
        </div>
        <div class="fwrap">
          <div class="row">
            <div class="col-md-12">
              <div class="forminput">
                <ul class="docudiv">
                  <li>
                    <p>Please attach the following documents:
                      <span class="ar">برجاء ارفاق المستندات الاتية</span></p>
                    </li>
                    <li>
                      <p>1- Commercial Registeration <strong class="ar">السجل االتجاري</strong></p>
                      <p>2- Taxation Registeration <strong class="ar">البطاقة الضريبية</strong></p>
                      
                    </li>
                  </ul>
                  <div class="docupload">
                    <input type="file" id="file" style="display:none;" />
                    <button id="button" name="button" value="Upload" onclick="thisFileUpload();">Attach</button>
                  </div>
                  <ul class="docfile">
                    <li>
                      <img src="assets/images/icons/pdf.png" alt="" />
                      <span>Document525463</span>
                      <a href="">X</a>
                    </li>
                    <li>
                      <img src="assets/images/icons/pdf.png" alt="" />
                      <span>Document 786852</span>
                      <a href="">X</a>
                    </li>
                    <li>
                      <img src="assets/images/icons/pdf.png" alt="" />
                      <span>Document 545</span>
                      <a href="">X</a>
                    </li>
                    <li>
                      <img src="assets/images/icons/pdf.png" alt="" />
                      <span>Document</span>
                      <a href="">X</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </>
  );
}
