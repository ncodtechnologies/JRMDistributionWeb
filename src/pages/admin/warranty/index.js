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

  const { status } = useParams();

  useEffect(() => {
    setSelectedStatus(status);
    loadWarranties(status);
    loadCount();
    if (!status) {
      setSelectedStatus("PENDING");
      loadWarranties("PENDING");
      loadCount();
    }
  }, [status]);

  const page = "warranties";

  // useEffect(() => {
  //   loadWarranties(selectedStatus);
  //   loadCount();
  // }, [selectedStatus]);

  const [newCount, setNewCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [deactiveCount, setDeactiveCount] = useState(0);
  const [expiredCount, setExpiredCount] = useState(0);

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
          return a + (b.status == "ACTIVE" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setRejectCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "REJECTED" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setDeactiveCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "DEACTIVATED" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setExpiredCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "EXPIRED" ? parseInt(b.count) || 0 : 0);
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
                <Link to={`/${page}/PENDING`}>New ({newCount})</Link>
              )}
              {selectedStatus == "ACTIVE" ? (
                <span>Active ({activeCount})</span>
              ) : (
                <Link to={`/${page}/ACTIVE`}>Active ({activeCount})</Link>
              )}
              {selectedStatus == "REJECTED" ? (
                <span>Rejected ({rejectCount})</span>
              ) : (
                <Link to={`/${page}/REJECTED`}>Rejected ({rejectCount})</Link>
              )}
              {selectedStatus == "DEACTIVATED" ? (
                <span>Deactivated ({deactiveCount})</span>
              ) : (
                <Link to={`/${page}/DEACTIVATED`}>
                  Deactivated ({deactiveCount})
                </Link>
              )}
              {selectedStatus == "EXPIRED" ? (
                <span>Expired ({expiredCount})</span>
              ) : (
                <Link to={`/${page}/EXPIRED`}>Expired ({expiredCount})</Link>
              )}
            </div>
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
                  {selectedStatus != "PENDING" && (
                    <td>
                      {selectedStatus == "REJECTED"
                        ? "Rejection"
                        : selectedStatus == "DEACTIVATED"
                        ? "Deactivation"
                        : "Activation"}{" "}
                      No
                    </td>
                  )}
                  <td>Warranty No</td>
                  <td>Customer</td>
                  <td>Sold By</td>
                  {selectedStatus == "PENDING" && <td>No of Products</td>}
                  <td>Purchase Date</td>
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
                    <tr
                      class="names"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        navigate("/warrantyDt", {
                          state: {
                            warranty_id: row.warranty_id,
                            status_id:
                              row.rejection_no || row.activation_no || 0,
                            status: selectedStatus,
                          },
                        });
                      }}
                    >
                      {selectedStatus != "PENDING" && (
                        <td>
                          #{" "}
                          {selectedStatus == "REJECTED" ||
                          selectedStatus == "DEACTIVATED"
                            ? row.rejection_no
                            : row.activation_no}
                        </td>
                      )}
                      <td style={{ height: 40 }}>{row.warranty_id}</td>
                      <td>{row.customer}</td>
                      <td>{row.sold_by}</td>
                      {selectedStatus == "PENDING" && (
                        <td>{row.product_count}</td>
                      )}
                      <td>
                        {row.purchase_date &&
                          moment(row.purchase_date).format("DD/MM/YYYY")}{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
