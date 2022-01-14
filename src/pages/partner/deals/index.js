import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { PARTNER_URL } from "../../../urls/apiUrls";
import { NewDealSchema } from "../../../yupSchema/newDeal";

export default function Deals() {
  useScript("assets/js/custom/deals.js");

  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit(values) {
      submit(values);
    },
    validationSchema: NewDealSchema,
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
  const [qty, setQty] = useState("");
  const [capacity, setCapacity] = useState("");

  const [dealList, setDealList] = useState([]);

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
    if (productId == "" || productName == "" || qty == "") return;
    setSelectedProducts([
      ...selectedProducts,
      { product_id: productId, name: productName, capacity, qty },
    ]);
    setProductId("");
    setProductName("");
    setQty("");
    setCapacity("");
  };

  const submit = (values) => {
    axios
      .post(PARTNER_URL.ADD_DEAL, {
        ...values,
        products: selectedProducts,
      })
      .then(function (response) {
        loadDeals();
        setShowSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatDeals = (input) => {
    const _out = input.reduce((acc, obj) => {
      const key = obj["deal_id"];
      if (!acc[key]) {
        acc[key] = {
          deal_id: obj["deal_id"],
          company_name: obj["company_name"],
          contact_person: obj["contact_person"],
          mobile_no: obj["mobile_no"],
          revenue: obj["revenue"],
          purchase_date: obj["purchase_date"],
          status: obj["status"],
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
              <button class="btn-filter">
                <img src="assets/images/icons/filter.png" alt="" />
              </button>
            </div>
            <button class="btn-primary">Search</button>
          </div>
          <div class="tabledeal">
            <table class="fold-table">
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
                  .map((deal) => {
                    return (
                      <>
                        <tr class="view">
                          <td></td>
                          <td>
                            <span>Deal No</span>
                            <p>#{deal.deal_id}</p>
                          </td>
                          <td>
                            <span>Customer Name</span>
                            <p>{deal.company_name}</p>
                          </td>
                          <td>
                            <span>Contact Person</span>
                            <p>{deal.contact_person}</p>
                          </td>
                          <td>
                            <span>Mobile No.</span>
                            <p>{deal.mobile_no}</p>
                          </td>
                          <td>
                            <span>Purchase date</span>
                            <p>
                              {moment(deal.purchase_date).format("DD/MM/YYYY")}
                            </p>
                          </td>
                          <td>
                            <span>Expected Revenue</span>
                            <p>{deal.revenue}</p>
                          </td>
                          <td>
                            {deal.status == "PENDING" && (
                              <div class="status pending">Pending</div>
                            )}
                            {deal.status == "APPROVED" && (
                              <div class="status approved">Approved</div>
                            )}
                            {deal.status == "REJECTED" && (
                              <div class="status rejected">Rejected</div>
                            )}
                          </td>
                        </tr>
                        <tr class="fold">
                          <td colspan="8">
                            <table>
                              {deal?.products?.map((prod, index) => {
                                return (
                                  <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                      <span>Product</span>
                                      <p>{prod.product_name}</p>
                                    </td>
                                    <td>
                                      <span>Qty</span>
                                      <p>{prod.qty}</p>
                                    </td>
                                    <td>
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
      <footer>
        <div class="container">
          <div class="dtls">
            <img src="assets/images/logo-wh.svg" alt="" />
            <p>
              Our Technological stack allows for your business to be future
              ready
            </p>
            <ul>
              <li>
                <a href="">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="">
                  <i class="fab fa-whatsapp"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="subscribe">
            <strong>Stay up to date with the latest news!</strong>
            <form action="">
              <input type="text" placeholder="Enter Your Email" />
              <input type="submit" value="subscribe" />
            </form>
          </div>
          <div class="footnav">
            <ul>
              <li>
                <a href="">Home</a>
                <a href="">Mobility</a>
                <a href="">Resources</a>
              </li>
              <li>
                <a href="">SL2100 Communications System</a>
                <a href="">Phones</a>
                <a href="">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="container">
          <p class="copyright">Copyrights JRM for Communications 2021</p>
        </div>
      </footer>
      {newDealOpen && (
        <section id="newdealwrap">
          <div class="newdealform">
            <a href="javascript:void(0)" class="close">
              <i class="fas fa-times"></i>
            </a>
            {!showSuccess ? (
              <div class="dealnew">
                <form onSubmit={handleSubmit}>
                  <h3>NEW DEAL REGISTERATION</h3>
                  <div class="forminput">
                    <div class="labeldiv">
                      <label>
                        Company Name<span>*</span>{" "}
                      </label>
                      <label class="ar">
                        اسم الشركة<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      {...getFieldProps("company_name")}
                    />
                    <FieldError error={errors.company_name} />
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
                        Expected Revenue<span>*</span>
                      </label>
                      <label class="ar">
                        العائد المالي المتوقع<span>*</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="revenue"
                      {...getFieldProps("revenue")}
                    />
                    <FieldError error={errors.revenue} />
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
                      <div class="col-md-3">
                        <input
                          type="text"
                          value={capacity}
                          onChange={(e) => {
                            e.preventDefault();
                            setCapacity(e.target.value);
                          }}
                          placeholder="Capacity"
                        />
                      </div>
                      <div class="col-md-2">
                        <input
                          type="text"
                          value={qty}
                          onChange={(e) => {
                            e.preventDefault();
                            setQty(e.target.value);
                          }}
                          placeholder="Qty"
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
                        <div class="col-md-3">
                          <span>{el.capacity}</span>
                        </div>
                        <div class="col-md-2">
                          <span>{el.qty}</span>
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
