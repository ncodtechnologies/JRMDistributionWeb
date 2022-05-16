import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL, PARTNER_URL } from "../../../urls/apiUrls";
import { AdminCreateSchema } from "../../../yupSchema/adminCreate";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, userSelector } from "../../../slices/user";

export default function AdminHome() {
  useScript("assets/js/custom/deals.js");

  const { user } = useSelector(userSelector);

  const [newUserOpen, setNewUserOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("JRMDistribution");

  const [adminList, setAdminList] = useState([]);

  const loadAdmins = (values) => {
    axios
      .post(
        ADMIN_URL.GET_ADMINS,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setAdminList([...response?.data?.admins]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createAdmin = (values) => {
    axios
      .post(
        ADMIN_URL.CREATE_ADMIN,
        { ...values },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        if (response?.data?.admin_id) {
          resetForm();
          setShowSuccess(true);
          loadAdmins();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const { getFieldProps, handleSubmit, errors, setFieldValue, resetForm } =
    useFormik({
      initialValues: {},
      onSubmit(values) {
        createAdmin(values);
      },
      validationSchema: AdminCreateSchema,
    });

  return (
    <>
      <HeaderComp activeMenuIndex={4} />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs">
            <span>Users</span>
          </div>
          <div class="title">
            <h3>USER MANAGEMENT</h3>
            <button
              class="btn-border"
              onClick={(e) => {
                e.preventDefault();
                resetForm();
                setFieldValue("admin_id", null);
                setNewUserOpen(true);
                window.openNewDeal();
              }}
              id="newdeal"
            >
              <i class="fas fa-plus"></i>New Admin
            </button>
          </div>
          <div class="searchwrap">
            <div class="searchblk">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/*               <button class="btn-filter">
                <img src="assets/images/icons/filter.png" alt="" />   */}
            </div>
            <button class="btn-primary">Search</button>
          </div>
          <div class="tabledeal">
            <table class="fold-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr class="names">
                  <td>Name</td>
                  <td>Email</td>
                  <td>User Type</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {adminList
                  ?.filter(
                    (row) =>
                      row?.name?.toLowerCase().includes(search.toLowerCase()) ||
                      row?.email
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.type?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((row) => (
                    <tr class="names" style={{ cursor: "pointer" }}>
                      <td>{row.name}</td>
                      <td>{row.email}</td>
                      <td>{row.type}</td>
                      <td align="right">
                        <a
                          href="#"
                          class="btn"
                          onClick={(e) => {
                            e.preventDefault();
                            setNewUserOpen(true);
                            window.openNewDeal();
                            setFieldValue("admin_id", row.admin_id);
                            setFieldValue("name", row.name);
                            setFieldValue("email", row.email);
                            setFieldValue("type", row.type);
                          }}
                        >
                          <i class="fas fa-edit"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {newUserOpen && (
        <section id="newdealwrap">
          <div class="newdealform">
            <a
              href="#"
              onClick={() => {
                resetForm();
                window.closeSlide();
              }}
              class="close"
            >
              <i class="fas fa-times"></i>
            </a>
            {!showSuccess ? (
              <div class="dealnew">
                <h3>NEW ADMIN USER</h3>
                <form onSubmit={handleSubmit}>
                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Name<span>*</span>{" "}
                      </label>
                    </div>
                    <input type="text" {...getFieldProps("name")} />
                    <FieldError error={errors.name} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Email<span>*</span>
                      </label>
                    </div>
                    <input type="text" {...getFieldProps("email")} />
                    <FieldError error={errors.email} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Password<span>*</span>
                      </label>
                    </div>
                    <input type="password" {...getFieldProps("password")} />
                    <FieldError error={errors.password} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Confirm Password<span>*</span>
                      </label>
                    </div>
                    <input
                      type="password"
                      {...getFieldProps("confirmPassword")}
                    />
                    <FieldError error={errors.confirmPassword} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Role<span>*</span>
                      </label>
                    </div>
                    <select class="form-control" {...getFieldProps("type")}>
                      <option value={""}>Select Role</option>
                      <option value={"SUPER"}>SUPER</option>
                      <option value={"REGULAR"}>REGULAR</option>
                    </select>
                    <FieldError error={errors.type} />
                  </div>

                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      width: "90%",
                    }}
                  >
                    <input
                      type="submit"
                      class="btn-primary"
                      // onClick={() => setShowSuccess(true)}
                      value="SUBMIT"
                    />
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div class="dealsuccess">
                  <div class="dtls">
                    <img src="assets/images/icons/checked.png" alt="" />
                    <p>User Created Successfully</p>
                    <button onClick={(e) => window.closeSlide()}>Done</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
