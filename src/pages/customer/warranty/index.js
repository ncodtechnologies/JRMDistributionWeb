import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL, CUSTOMER_URL, PARTNER_URL } from "../../../urls/apiUrls";
import { NewWarrantySchema } from "../../../yupSchema/newWarranty";

export default function WarrantyList() {
  useScript("assets/js/custom/deals.js");

  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      submit(values);
    },
    validationSchema: NewWarrantySchema,
  });

  const [newDealOpen, setNewDealOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("JRMDistribution");

  const [selectedProducts, setSelectedProducts] = useState([]);
  const products = [
    { product_id: 1, name: "Product 1", capacity: 10 },
    { product_id: 2, name: "Product 2", capacity: 20 },
    { product_id: 3, name: "Product 3", capacity: 30 },
    { product_id: 4, name: "Product 4", capacity: 40 },
    { product_id: 5, name: "Product 5", capacity: 50 },
  ];

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

  const submit = (values) => {
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
          status: obj["status"],
          products: [],
        };
      }
      // Add object to list for given key's value
      acc[key].products.push({
        product_id: obj["product_id"],
        product_name: obj["product_name"],
        serialNo: obj["serial_no"],
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
              <i class="fas fa-plus"></i>ACTIVATE WARRANTY
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
              <button class="btn-filter">
                <img src="assets/images/icons/filter.png" alt="" />
              </button>
            </div>
            <button class="btn-primary">Search</button>
          </div>
          <div class="tabledeal">
            <table class="fold-table">
              <tbody>
                {warrantyList
                  // ?.filter(
                  //   (row) =>
                  //     row?.company_name
                  //       ?.toLowerCase()
                  //       .includes(search.toLowerCase()) ||
                  //     row?.contact_person
                  //       ?.toLowerCase()
                  //       .includes(search.toLowerCase()) ||
                  //     row?.mobile_no
                  //       ?.toLowerCase()
                  //       .includes(search.toLowerCase())
                  // )
                  ?.map((warranty) => {
                    return (
                      <>
                        <tr class="view">
                          <td></td>
                          <td>
                            <span>Deal No</span>
                            <p>#{warranty.warranty_id}</p>
                          </td>
                          <td>
                            <span>Sold by</span>
                            <p>{warranty.sold_by}</p>
                          </td>
                          <td>
                            <span>No of Products</span>
                            <p>{warranty?.products?.length || 0}</p>
                          </td>
                          <td>
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
                          </td>
                        </tr>
                        <tr class="fold">
                          <td colspan="8">
                            <table>
                              {warranty?.products?.map((prod, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      <span>Product</span>
                                      <p>{prod.product_name}</p>
                                    </td>
                                    <td>
                                      <span>Serial No</span>
                                      <p>{prod.serialNo}</p>
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
            <a href="javascript:void(0)" class="close">
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
                        الرقم المسلسل<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Purchase Date"
                      {...getFieldProps("purchase_date")}
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
                          class="arrow"
                        >
                          <i class="fas fa-plus"></i>
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
                    id="file"
                    name="file"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("file", event.target.files[0]);
                    }}
                  />

                  <div>
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
            )}
          </div>
        </section>
      )}
    </>
  );
}
