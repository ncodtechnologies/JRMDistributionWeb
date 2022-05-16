import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL, PARTNER_URL } from "../../../urls/apiUrls";
import { NewDealSchema } from "../../../yupSchema/newDeal";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { Oval } from "react-loader-spinner";
import products from "../../../constants/products";

export default function AdminDeals() {
  useScript("assets/js/custom/deals.js");

  const { getFieldProps, handleSubmit, errors, setFieldValue, values } =
    useFormik({
      initialValues: {},
      onSubmit(values) {
        submit(values);
      },
      validationSchema: NewDealSchema,
    });

  const navigate = useNavigate();

  const [newDealOpen, setNewDealOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("JRMDistribution");

  const [dealList, setDealList] = useState([]);
  const [count, setCount] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  const [selectedProducts, setSelectedProducts] = useState(
    products.map((product) => {
      return {
        active: false,
        product_id: product.product_id,
        name: product.name,
        capacity: 0,
        qty: 0,
      };
    })
  );

  const incProduct = (index) => {
    let _prod = selectedProducts[index];
    _prod.qty++;
    let _selProds = [...selectedProducts];
    _selProds[index] = _prod;
    setSelectedProducts([..._selProds]);
  };
  const decProduct = (index) => {
    let _prod = selectedProducts[index];
    if (_prod.qty > 0) _prod.qty--;
    let _selProds = [...selectedProducts];
    _selProds[index] = _prod;
    setSelectedProducts([..._selProds]);
  };

  const submit = (_values) => {
    setLoading(true);
    let values = { ..._values };
    values.order_date = moment(_values.order_date)
      .format("YYYY-MM-DD")
      .toString();
    axios
      .post(PARTNER_URL.ADD_DEAL, {
        ...values,
        products: selectedProducts.filter(
          (el) => el.qty > 0 && el.active == true
        ),
      })
      .then(function (response) {
        loadDeals();
        loadCount();
        setShowSuccess(true);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const formatDeals = (input) => {
    const _out = input.reduce((acc, obj) => {
      const key = obj["deal_id"];
      if (!acc[key]) {
        acc[key] = {
          deal_id: obj["deal_id"],
          project_name: obj["project_name"],
          project_for: obj["project_for"],
          contact_person: obj["contact_person"],
          email: obj["email"],
          mobile_no: obj["mobile_no"],
          project_value: obj["project_value"],
          purchase_date: obj["purchase_date"],
          status: obj["status"],
          rejection_reason: obj["rejection_reason"],
          products: [],
        };
      }
      // Add object to list for given key's value
      acc[key].products.push({
        product_id: obj["product_id"],
        product_name: obj["product_name"],
        qty: obj["qty"],
        capacity: obj["product_capacity"],
      });
      return acc;
    }, {});

    let out = [];
    Object.keys(_out).map((key, index) => {
      out.push(_out[key]);
    });
    return out;
  };

  const loadDeals = (status) => {
    axios
      .post(
        ADMIN_URL.GET_DEALS,
        {
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setDealList([...formatDeals(response.data.deals)]);
        window.setTableOnClick();
      })
      .catch(function (error) {
        console.log(error);
        console.log("errorr");
      });
  };

  const loadCount = () => {
    axios
      .post(
        ADMIN_URL.GET_DEALS_COUNT,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setCount([...response?.data?.count]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const { status } = useParams();

  useEffect(() => {
    setSelectedStatus(status);
    loadDeals(status);
    loadCount();
    if (!status) {
      setSelectedStatus("PENDING");
      loadDeals("PENDING");
      loadCount();
    }
  }, [status]);

  const page = "deals";

  // useEffect(() => {
  //   loadDeals(selectedStatus);
  //   loadCount();
  // }, [selectedStatus]);

  const [newCount, setNewCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);

  useEffect(() => {
    setNewCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "PENDING" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setActiveCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "APPROVED" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setRejectCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "REJECTED" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
  }, [count]);

  const ProdRow = ({ product, index }) => {
    return (
      <tr>
        <td>
          <input
            type="checkbox"
            checked={selectedProducts[index].active == true}
            onChange={(e) => {
              if (e.target.checked) {
                let _selProds = [...selectedProducts];
                _selProds[index].active = true;
                setSelectedProducts([..._selProds]);
              } else {
                let _selProds = [...selectedProducts];
                _selProds[index].active = false;
                setSelectedProducts([..._selProds]);
              }
            }}
          />
        </td>
        <td>{product.name}</td>
        <td></td>
        <td align="right">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                incProduct(index);
              }}
              class="btn btn-light"
              style={{
                color: "#005BAA",
                backgroundColor: "#005BAA1A",
                borderWidth: 0,
              }}
            >
              <i class="fas fa-plus"></i>
            </a>
            <span style={{ padding: 10 }}>{selectedProducts[index].qty}</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                decProduct(index);
              }}
              class="btn btn-light"
              style={{
                color: "#005BAA",
                backgroundColor: "#005BAA1A",
                borderWidth: 0,
              }}
            >
              <i class="fas fa-minus"></i>
            </a>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <HeaderComp activeMenuIndex={1} />
      <section class="content">
        <div class="container">
          <div class="title">
            <div class="breadcrumbs">
              {selectedStatus == "PENDING" ? (
                <span>New ({newCount})</span>
              ) : (
                <Link to={`/${page}/PENDING`}>
                  New(
                  {newCount})
                </Link>
              )}
              {selectedStatus == "APPROVED" ? (
                <span>Active({activeCount})</span>
              ) : (
                <Link to={`/${page}/APPROVED`}>Active({activeCount})</Link>
              )}
              {selectedStatus == "REJECTED" ? (
                <span>Rejected({rejectCount})</span>
              ) : (
                <Link to={`/${page}/REJECTED`}>Rejected({rejectCount})</Link>
              )}
            </div>
            <button
              class="btn-border"
              onClick={(e) => {
                e.preventDefault();
                setNewDealOpen(true);
                window.openNewDeal();
              }}
              id="newdeal"
            >
              <i class="fas fa-plus"></i>New Deal
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
                  <td>Company Name</td>
                  <td>Contact Person</td>
                  <td>Email</td>
                  <td>Mobile No</td>
                  <td>Expected Revenue</td>
                  {selectedStatus == "REJECTED" && <td>Reason</td>}
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {dealList
                  ?.filter(
                    (row) =>
                      row?.company_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.contact_person
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.mobile_no
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((row) => (
                    <tr
                      class="names"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        navigate("/dealDt", {
                          state: { deal: row },
                        });
                      }}
                    >
                      <td>{row.project_for}</td>
                      <td>{row.contact_person}</td>
                      <td>{row.email}</td>
                      <td>{row.mobile_no}</td>
                      <td>{row.project_value}</td>
                      {selectedStatus == "REJECTED" && (
                        <td>{row.rejection_reason}</td>
                      )}
                      <td align="right" onClick={(e) => e.stopPropagation()}>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="transparent"
                            id="dropdown-basic"
                            style={{ color: "#aaa" }}
                          >
                            <i class="fas fa-ellipsis-h"></i>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              href="#"
                              onClick={(e) => {
                                navigate("/dealDt", {
                                  state: { deal: row },
                                });
                              }}
                            >
                              View Details
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {newDealOpen && (
        <section id="newdealwrap">
          <div class="newdealform">
            <a href="#" onClick={() => window.closeSlide()} class="close">
              <i class="fas fa-times"></i>
            </a>
            {!showSuccess ? (
              <div class="dealnew">
                <form onSubmit={handleSubmit}>
                  <h3>NEW DEAL REGISTERATION</h3>
                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Project Name<span>*</span>{" "}
                      </label>
                      <label class="ar">
                        اسم المشروع<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Project Name"
                      {...getFieldProps("project_name")}
                    />
                    <FieldError error={errors.project_name} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Project For<span>*</span>{" "}
                      </label>
                      <label class="ar">
                        اسم الجهة التابعة<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Project For"
                      {...getFieldProps("project_for")}
                    />
                    <FieldError error={errors.project_for} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Contact Person<span>*</span>
                      </label>
                      <label class="ar">
                        اسم الشخص<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Contact Person"
                      {...getFieldProps("contact_person")}
                    />
                    <FieldError error={errors.contact_person} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Mobile No.<span>*</span>
                      </label>
                      <label class="ar">
                        رقم الموبيل<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Mobile No"
                      {...getFieldProps("mobile_no")}
                    />
                    <FieldError error={errors.mobile_no} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Email<span>*</span>
                      </label>
                      <label class="ar">
                        البريد الالكتروني<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Email"
                      {...getFieldProps("email")}
                    />
                    <FieldError error={errors.email} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Expected Project Value<span>*</span>
                      </label>
                      <label class="ar">
                        القيمة المتوقعة للمشروع<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Expected Project Value"
                      {...getFieldProps("project_value")}
                    />
                    <FieldError error={errors.project_value} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Expected Order Date<span>*</span>
                      </label>
                      <label class="ar">
                        الموعد المتوقع لطلب الشراء<span>*</span>
                      </label>
                    </div>
                    <DatePicker
                      selected={values.order_date}
                      onChange={(date) => {
                        setFieldValue("order_date", date);
                      }}
                    />
                    <FieldError error={errors.order_date} />
                  </div>

                  <div class="newdealsectiontitle">System</div>

                  <div>
                    <table>
                      {products?.map((product, index) => {
                        return (
                          product.category == 1 && (
                            <ProdRow product={product} index={index} />
                          )
                        );
                      })}
                    </table>
                  </div>

                  <div class="newdealsectiontitle">Telephone Sets</div>

                  <div>
                    <table>
                      {products?.map((product, index) => {
                        return (
                          product.category == 2 && (
                            <ProdRow product={product} index={index} />
                          )
                        );
                      })}
                    </table>
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>Notes</label>
                      <label class="ar">ملاحظات</label>
                    </div>
                    <textarea
                      type="text"
                      placeholder="Notes"
                      onChange={(e) => {
                        e.preventDefault();
                        setFieldValue("notes", e.target.value);
                      }}
                    >
                      {values.notes}
                    </textarea>
                    <FieldError error={errors.notes} />
                  </div>

                  <div>
                    <button
                      type="submit"
                      class="btn-primary"
                      // onClick={() => setShowSuccess(true)}
                    >
                      {loading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Oval color="#FFF" height={20} width={20} />
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div class="dealsuccess">
                  <div class="dtls">
                    <img src="assets/images/icons/checked.png" alt="" />
                    <p>
                      Your deal has been submitted successfully <br />
                      Our team will contact you shortly
                    </p>
                    <button
                      onClick={(e) => {
                        window.closeSlide();
                        setNewDealOpen(false);
                        setShowSuccess(false);
                      }}
                    >
                      Done
                    </button>
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
