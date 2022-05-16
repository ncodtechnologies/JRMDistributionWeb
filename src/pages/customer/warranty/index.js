import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL, CUSTOMER_URL, PARTNER_URL } from "../../../urls/apiUrls";
import { NewWarrantySchema } from "../../../yupSchema/newWarranty";
import DatePicker from "react-datepicker";
import { Oval } from "react-loader-spinner";
import products from "../../../constants/products";

import "react-datepicker/dist/react-datepicker.css";

export default function WarrantyList() {
  useScript("assets/js/custom/deals.js");

  const { getFieldProps, handleSubmit, errors, setFieldValue, values } =
    useFormik({
      initialValues: {},
      onSubmit(values) {
        submit(values);
      },
      validationSchema: NewWarrantySchema,
    });

  const refBtnFile = useRef(null);

  const [newDealOpen, setNewDealOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("JRMDistribution");

  const [selectedProducts, setSelectedProducts] = useState([]);

  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [serialNo, setSerialNo] = useState("");

  const [warrantyList, setWarrantyList] = useState([]);

  const onProdChange = (e) => {
    e.preventDefault();
    setProductId(e.target.value);
    setProductName(e.target.options[e.target.selectedIndex].text);
  };

  const remSelProduct = (index) => {
    let prods = [...selectedProducts];
    prods.splice(index, 1);
    setSelectedProducts([...prods]);
  };

  const addProduct = () => {
    if (productId == "" || productName == "" || serialNo == "") return;
    setSelectedProducts([
      ...selectedProducts,
      { product_id: productId, name: productName, serialNo },
    ]);
    setProductId("");
    setProductName("");
    setSerialNo("");
  };

  const [productErr, setProductErr] = useState(false);

  const submit = (_values) => {
    setProductErr(false);
    if (selectedProducts.length == 0) {
      setProductErr(true);
      return;
    }
    let values = { ..._values };
    values.purchase_date = moment(_values.purchase_date)
      .format("YYYY-MM-DD")
      .toString();
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append("products", JSON.stringify(selectedProducts));
    formData.append("invoice", values.file);
    axios({
      method: "post",
      url: CUSTOMER_URL.ADD_WARRANTY,
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        loadWarranties();
        window.closeSlide();
        setShowSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatWarranties = (input) => {
    const _out = input.reduce((acc, obj) => {
      const key = obj["warranty_id"];
      if (!acc[key]) {
        acc[key] = {
          warranty_id: obj["warranty_id"],
          sold_by: obj["sold_by"],
          purchase_date: obj["purchase_date"],
          status: !obj["warranty_product_status_id"] ? "PENDING" : "",
          products: [],
        };
      }
      // Add object to list for given key's value
      acc[key].products.push({
        product_id: obj["product_id"],
        product_name: obj["product_name"],
        serialNo: obj["serial_no"],
        start_date: obj["start_date"],
        end_date: obj["end_date"],
      });
      return acc;
    }, {});

    let out = [];
    Object.keys(_out).map((key, index) => {
      out.push(_out[key]);
    });
    return out;
  };

  const loadWarranties = () => {
    axios
      .post(
        CUSTOMER_URL.GET_WARRANTY,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setWarrantyList([...formatWarranties(response.data.warranties)]);
        window.setTableOnClick();
      })
      .catch(function (error) {
        console.log(error);
        console.log("errorr");
      });
  };

  useEffect(() => {
    // loadDeals();
    loadWarranties();
  }, []);

  return (
    <>
      <HeaderComp />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs"></div>
          <div class="title">
            <h3>ACTIVE WARRANTY</h3>
            <button
              class="btn-border"
              onClick={(e) => {
                e.preventDefault();
                setNewDealOpen(true);
                window.openNewDeal();
              }}
              id="newdeal"
            >
              ACTIVATE WARRANTY
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
            <table class="fold-table">
              <tbody>
                {warrantyList
                  ?.filter((row) =>
                    row?.sold_by?.toLowerCase().includes(search.toLowerCase())
                  )
                  ?.map((warranty) => {
                    return (
                      <>
                        <tr class="view">
                          <td width={30}></td>
                          <td width={"25%"}>
                            <span>Warranty No</span>
                            <p>#{warranty.warranty_id}</p>
                          </td>
                          <td width={"25%"}>
                            <span>Sold by</span>
                            <p>{warranty.sold_by}</p>
                          </td>
                          <td width={"25%"}>
                            <span>No of Products</span>
                            <p>{warranty?.products?.length || 0}</p>
                          </td>
                          <td width={"25%"}>
                            <span>Purchase date</span>
                            <p>
                              {warranty.purchase_date &&
                                moment(warranty.purchase_date).format(
                                  "DD/MM/YYYY"
                                )}{" "}
                              &nbsp;
                            </p>
                          </td>
                          <td>
                            {warranty.status == "APPROVED" && (
                              <div class="status approved">Active</div>
                            )}
                            {warranty.status == "REJECTED" && (
                              <div class="status rejected">Rejected</div>
                            )}
                            {warranty.status == "PENDING" && (
                              <div class="status pending">Pending</div>
                            )}
                          </td>
                        </tr>
                        <tr class="fold">
                          <td colspan="8">
                            <table>
                              {warranty?.products?.map((prod, index) => {
                                return (
                                  <tr>
                                    <td width={20}>{index + 1}</td>
                                    <td width={"23.5%"}>
                                      <span>Product</span>
                                      <p>{prod.product_name}</p>
                                    </td>
                                    <td width={"23%"}>
                                      <span>Serial No</span>
                                      <p>{prod.serialNo}</p>
                                    </td>
                                    <td width={"23%"}>
                                      <span>
                                        {prod.start_date && "Start Date"}
                                      </span>
                                      <p>{prod.start_date}</p>
                                    </td>
                                    <td width={"23.5%"}>
                                      <span>
                                        {prod.start_date && "End Date"}
                                      </span>
                                      <p>{prod.end_date}</p>
                                    </td>
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
                  <h3>ACTIVATE WARRANTY</h3>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Sold By<span>*</span>{" "}
                      </label>
                      <label class="ar">
                        البائع<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Sold by"
                      {...getFieldProps("sold_by")}
                    />
                    <FieldError error={errors.sold_by} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Purchase Date<span>*</span>
                      </label>
                      <label class="ar">
                        تاريخ الشراء <span>*</span>
                      </label>
                    </div>
                    <DatePicker
                      selected={values.purchase_date}
                      onChange={(date) => {
                        setFieldValue("purchase_date", date);
                      }}
                    />
                    <FieldError error={errors.purchase_date} />
                  </div>

                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Products<span>*</span>
                      </label>
                      <label class="ar pad55">
                        المنتجات<span>*</span>
                      </label>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <select
                          onChange={(e) => onProdChange(e)}
                          value={productId}
                        >
                          <option value={null}>Select Product</option>
                          {products?.map((el) => (
                            <option value={el.product_id}>{el.name}</option>
                          ))}
                        </select>
                      </div>
                      <div class="col-md-5">
                        <input
                          type="text"
                          value={serialNo}
                          onChange={(e) => {
                            e.preventDefault();
                            setSerialNo(e.target.value);
                          }}
                          placeholder="Serial No"
                        />
                      </div>
                      <div class="col-md-1">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            addProduct();
                          }}
                          class="btn"
                        >
                          <i class="fa-solid fa-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  {selectedProducts?.map((el, index) => {
                    return (
                      <div class="row product-selected">
                        <div class="col-md-6">
                          <span>{el.name}</span>
                        </div>
                        <div class="col-md-5">
                          <span>{el.serialNo}</span>
                        </div>
                        <div class="col-md-1">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              remSelProduct(index);
                            }}
                            style={{ color: "red" }}
                          >
                            <i class="fas fa-times"></i>
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  <input
                    type="button"
                    class="btn-rounded"
                    value={"Attach"}
                    onClick={(e) => refBtnFile?.current?.click()}
                  />
                  <div style={{ marginTop: 10, marginBottom: 15 }}>
                    {values.file?.name}
                  </div>

                  <input
                    id="file"
                    name="file"
                    ref={refBtnFile}
                    type="file"
                    style={{ visibility: "hidden" }}
                    onChange={(event) => {
                      setFieldValue("file", event.target.files[0]);
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      bottom: 20,
                      width: "90%",
                    }}
                  >
                    <FieldError
                      error={productErr && "Please select atleast a product"}
                    />
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
