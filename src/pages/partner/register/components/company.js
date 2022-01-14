import { useState } from "react";
import FieldError from "../../../../components/FieldError";
import useScript from "../../../../hooks/useScript";

export default function RegCompanyContacts({ data, onChangeData, errors }) {
  useScript("assets/js/custom/partner_company.js");
  return (
    <>
      <div class="container">
        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;EXECUTIVE
                </h6>
                <h6 class="ar">المدير المسؤول</h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    الاسم الأول<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.executive_first_name}
                    onChange={(e) => onChangeData("executive_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    Last Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.executive_last_name}
                    onChange={(e) => onChangeData("executive_last_name", e.target.value)}
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
                    value={data?.executive_role}
                    onChange={(e) => onChangeData("executive_role", e.target.value)}
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
                    value={data?.executive_email}
                    onChange={(e) => onChangeData("executive_email", e.target.value)} 
                  />
                  <FieldError error={errors?.email} />

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
                    value={data?.executive_phone}
                    onChange={(e) => onChangeData("executive_phone", e.target.value)} 
                  />
                  <FieldError error={errors?.phone} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;VENDOR MANAGEMENT
                </h6>
                <h6 class="ar">مسؤول علاقات الموردين</h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.vendor_first_name}
                    onChange={(e) => onChangeData("vendor_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.vendor_last_name}
                    onChange={(e) => onChangeData("vendor_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.vendor_role}
                    onChange={(e) => onChangeData("vendor_role", e.target.value)}
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
                    value={data?.vendor_email}
                    onChange={(e) => onChangeData("vendor_email", e.target.value)}
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
                    value={data?.vendor_phone}
                    onChange={(e) => onChangeData("vendor_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;SALES
                </h6>
                <h6 class="ar">مسؤول المبيعات</h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.sales_first_name}
                    onChange={(e) => onChangeData("sales_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.sales_last_name}
                    onChange={(e) => onChangeData("sales_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.sales_role}
                    onChange={(e) => onChangeData("sales_role", e.target.value)}
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
                    value={data?.sales_email}
                    onChange={(e) => onChangeData("sales_email", e.target.value)}
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
                    value={data?.sales_phone}
                    onChange={(e) => onChangeData("sales_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;TECHNICAL
                </h6>
                <h6 class="ar">المسؤول الفني </h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.technical_first_name}
                    onChange={(e) => onChangeData("technical_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.technical_last_name}
                    onChange={(e) => onChangeData("technical_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.technical_role}
                    onChange={(e) => onChangeData("technical_role", e.target.value)}
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
                    value={data?.technical_email}
                    onChange={(e) => onChangeData("technical_email", e.target.value)}
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
                    value={data?.technical_phone}
                    onChange={(e) => onChangeData("technical_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>  

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;SERVICE/SUPPORT (POST SALES)
                </h6>
                <h6 class="ar">مسؤول الصيانة </h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.service_first_name}
                    onChange={(e) => onChangeData("service_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.service_last_name}
                    onChange={(e) => onChangeData("service_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.service_role}
                    onChange={(e) => onChangeData("service_role", e.target.value)}
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
                    value={data?.service_email}
                    onChange={(e) => onChangeData("service_email", e.target.value)}
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
                    value={data?.service_phone}
                    onChange={(e) => onChangeData("service_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>     

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;MARKETING
                </h6>
                <h6 class="ar">مسؤول التسويق </h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.marketting_first_name}
                    onChange={(e) => onChangeData("marketting_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.marketting_last_name}
                    onChange={(e) => onChangeData("marketting_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.marketting_role}
                    onChange={(e) => onChangeData("marketting_role", e.target.value)}
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
                    value={data?.marketting_email}
                    onChange={(e) => onChangeData("marketting_email", e.target.value)}
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
                    value={data?.marketting_phone}
                    onChange={(e) => onChangeData("marketting_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>  

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;PURCHASING
                </h6>
                <h6 class="ar">مسؤول المشتريات </h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.purchasing_first_name}
                    onChange={(e) => onChangeData("purchasing_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.purchasing_last_name}
                    onChange={(e) => onChangeData("purchasing_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.purchasing_role}
                    onChange={(e) => onChangeData("purchasing_role", e.target.value)}
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
                    value={data?.purchasing_email}
                    onChange={(e) => onChangeData("purchasing_email", e.target.value)}
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
                    value={data?.purchasing_phone}
                    onChange={(e) => onChangeData("purchasing_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>  

        <div class="formwrap">
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;ACCOUNTS PAYABLE
                </h6>
                <h6 class="ar">مسؤول الحسابات/حسابات العملاء </h6>
              </div>
            </div>
            <div class="row fold">
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                    First Name<span>*</span>
                    </label>
                    <label class="ar">
                    اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.accounts_payable_first_name}
                    onChange={(e) => onChangeData("accounts_payable_first_name", e.target.value)}
                  />
                  <FieldError error={errors?.name} />
                </div>
              </div>
              <div class="col-md-4">
                <div class="forminput">
                  <div class="labeldiv">
                    <label>
                      Last Name<span>*</span>
                    </label>
                    <label class="ar">
                      اسم العائلة<span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={data?.accounts_payable_last_name}
                    onChange={(e) => onChangeData("accounts_payable_last_name", e.target.value)}
                  />
                  <FieldError error={errors?.title} />
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
                    value={data?.accounts_payable_role}
                    onChange={(e) => onChangeData("accounts_payable_role", e.target.value)}
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
                    value={data?.accounts_payable_email}
                    onChange={(e) => onChangeData("accounts_payable_email", e.target.value)}
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
                    value={data?.accounts_payable_phone}
                    onChange={(e) => onChangeData("accounts_payable_phone", e.target.value)}
                  />
                  <FieldError error={errors?.title} /> 
                </div>
              </div>
            </div>
          </div>
        </div>                           
      </div>
    </>
  );
}
