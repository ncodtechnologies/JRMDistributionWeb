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
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function AdminWarranties() {
  useScript("assets/js/custom/deals.js");

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const { getFieldProps, handleSubmit, errors, setFieldValue } = useFormik({
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
  const [warrantyList, setWarrantyList] = useState([]);
  const [count, setCount] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

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
        loadWarranties(selectedStatus);
        loadCount();
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

  const loadWarranties = (status) => {
    axios
      .post(
        ADMIN_URL.GET_WARRANTY,
        {
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        // setDealList([...formatDeals(response.data.warranties)]);
        setWarrantyList([...response.data.warranties]);
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
        ADMIN_URL.GET_WARRANTY_COUNT,
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

  const activateWarranty = (warranty_id) => {
    confirmAlert({
      title: "Confirm Approval",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => approve(warranty_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const rejectWarranty = (warranty_id) => {
    confirmAlert({
      title: "Confirm Rejection",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => reject(warranty_id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const approve = (warranty_id) => {
    axios
      .post(ADMIN_URL.APPROVE_WARRANTY, {
        warranty_id,
      })
      .then(function (response) {
        loadWarranties(selectedStatus);
        loadCount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reject = (warranty_id) => {
    axios
      .post(ADMIN_URL.REJECT_WARRANTY, {
        warranty_id,
      })
      .then(function (response) {
        loadWarranties(selectedStatus);
        loadCount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadWarranties(selectedStatus);
    loadCount();
  }, [selectedStatus]);

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

  return (
    <>
      <HeaderComp activeMenuIndex={3} />
      <section class="content">
        <div class="container">
          <div class="title">
            <div class="breadcrumbs">
              {selectedStatus == "PENDING" ? (
                <span>New ({newCount})</span>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedStatus("PENDING");
                  }}
                >
                  New(
                  {newCount})
                </a>
              )}
              {selectedStatus == "APPROVED" ? (
                <span>Active({activeCount})</span>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedStatus("APPROVED");
                  }}
                >
                  Approved({activeCount})
                </a>
              )}
              {selectedStatus == "REJECTED" ? (
                <span>Rejected({rejectCount})</span>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedStatus("REJECTED");
                  }}
                >
                  Rejected({rejectCount})
                </a>
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
              <button class="btn-filter">
                <img src="assets/images/icons/filter.png" alt="" />
              </button>
            </div>
            <button class="btn-primary">Search</button>
          </div>
          <div class="tabledeal">
            <table class="fold-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr class="names">
                  <td>Deal No</td>
                  <td>Customer</td>
                  <td>Sold By</td>
                  <td>No of Products</td>
                  <td>Purchase Date</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {warrantyList
                  ?.filter(
                    (row) =>
                      row?.customer
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.sold_by?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((row) => (
                    <tr class="names">
                      <td># {row.warranty_id}</td>
                      <td>{row.customer}</td>
                      <td>{row.sold_by}</td>
                      <td>{row.product_count}</td>
                      <td>
                        {row.purchase_date &&
                          moment(row.purchase_date).format("DD/MM/YYYY")}{" "}
                      </td>
                      <td>
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
                                activateWarranty(row.warranty_id);
                              }}
                            >
                              Activate
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#"
                              onClick={(e) => {
                                rejectWarranty(row.warranty_id);
                              }}
                            >
                              Reject
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
