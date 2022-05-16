import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { PARTNER_URL } from "../../../urls/apiUrls";
import { NewDealSchema } from "../../../yupSchema/newDeal";
import DatePicker from "react-datepicker";
import { Oval } from "react-loader-spinner";
import products from "../../../constants/products";
import ReactTooltip from "react-tooltip";

import "react-datepicker/dist/react-datepicker.css";

export default function Deals() {
  useScript("assets/js/custom/deals.js");

  const {
    getFieldProps,
    handleSubmit,
    errors,
    setFieldValue,
    values,
    resetForm,
  } = useFormik({
    initialValues: {},
    onSubmit(values) {
      submit(values);
    },
    validationSchema: NewDealSchema,
  });

  const [newDealOpen, setNewDealOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("JRMDistribution");

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

  const [dealList, setDealList] = useState([]);

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
        setShowSuccess(true);
        resetForm();
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
          contact_person: obj["contact_person"],
          mobile_no: obj["mobile_no"],
          project_value: obj["project_value"],
          order_date: obj["order_date"],
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
    const token = localStorage.getItem("JRMDistribution");

    let out = [];
    Object.keys(_out).map((key, index) => {
      out.push(_out[key]);
    });
    return out;
  };

  const loadDeals = () => {
    axios
      .post(
        PARTNER_URL.GET_DEALS,
        {},
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

  useEffect(() => {
    loadDeals();
  }, []);

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
      <HeaderComp />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs">
            <a href="">Dashboard</a>
            <span>Deal Registeration</span>
          </div>
          <div class="title">
            <h3>DEAL REGISTERATION</h3>
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
            <table class="fold-table fold">
              <tbody>
                {dealList
                  ?.filter(
                    (row) =>
                      row?.company_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.project_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.contact_person
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.mobile_no
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((deal) => {
                    return (
                      <>
                        <tr class="view">
                          <td></td>
                          <td width={200}>
                            <span>Deal No</span>
                            <p>#{deal.deal_id}</p>
                          </td>
                          <td width={150}>
                            <span>Project Name</span>
                            <p>{deal.project_name}</p>
                          </td>
                          <td width={150}>
                            <span>Contact Person</span>
                            <p>{deal.contact_person}</p>
                          </td>
                          <td>
                            <span>Mobile No.</span>
                            <p>{deal.mobile_no}</p>
                          </td>
                          <td>
                            <span>Expected Order date</span>
                            <p>
                              {moment(deal.order_date).format("DD/MM/YYYY")}
                            </p>
                          </td>
                          <td>
                            <span>Expected Project Value</span>
                            <p>{deal.project_value}</p>
                          </td>
                          <td>
                            {deal.status == "PENDING" && (
                              <div class="status pending">Pending</div>
                            )}
                            {deal.status == "APPROVED" && (
                              <div class="status approved">Approved</div>
                            )}
                            {deal.status == "REJECTED" && (
                              <>
                                <div
                                  data-tip={deal.rejection_reason}
                                  class="status rejected"
                                >
                                  Rejected
                                </div>
                                <ReactTooltip />
                              </>
                            )}
                          </td>
                        </tr>
                        <tr class="fold">
                          <td colspan="8">
                            <table>
                              {deal?.products?.map((prod, index) => {
                                return (
                                  <tr>
                                    <td width={40}>{index + 1}</td>
                                    <td width={200}>
                                      <span>Product</span>
                                      <p>{prod.product_name}</p>
                                    </td>
                                    <td width={150}>
                                      <span>Qty</span>
                                      <p>{prod.qty}</p>
                                    </td>
                                    <td width={150}>
                                      <span>Capacity</span>
                                      <p>{prod.capacity}</p>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                );
                              })}
                            </table>
                          </td>
                        </tr>
                      </>
                    );
                  })}
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
                      <label>
                        Notes<span>*</span>
                      </label>
                      <label class="ar">
                        ملاحظات<span>*</span>
                      </label>
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
