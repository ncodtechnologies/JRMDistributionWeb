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
                  &nbsp;REGISTRAR INFORMATION
                </h6>
                <h6 class="ar">بيانات القائم بالتسجيل</h6>
              </div>
            </div>
            <div class="row fold">
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
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;REGISTRAR INFORMATION
                </h6>
                <h6 class="ar">بيانات القائم بالتسجيل</h6>
              </div>
            </div>
            <div class="row fold">
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
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;REGISTRAR INFORMATION
                </h6>
                <h6 class="ar">بيانات القائم بالتسجيل</h6>
              </div>
            </div>
            <div class="row fold">
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
          <div class="fwrap">
            <div class="row">
              <div class="ftitle col-md-12">
                <h6>
                  <i class="fas fa-caret-right"></i>
                  &nbsp;REGISTRAR INFORMATION
                </h6>
                <h6 class="ar">بيانات القائم بالتسجيل</h6>
              </div>
            </div>
            <div class="row fold">
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
      </div>
    </>
  );
}
