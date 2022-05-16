import axios from "axios";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import FieldError from "../../../components/FieldError";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL, CUSTOMER_URL, PARTNER_URL } from "../../../urls/apiUrls";
import { NewDealSchema } from "../../../yupSchema/newDeal";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import { Alert, Dropdown, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ConfirmAlert from "../../../components/ConfirmAlert";

export default function AdminCustomer() {
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("JRMDistribution");

  const [customerList, setCustomerList] = useState([]);
  const [count, setCount] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [selCustomerId, setSelCustomerId] = useState();

  const handleCloseModal = () => {
    setShowModal(false);
    setSelCustomerId(null);
  };
  const handleShowModal = (customer_id) => {
    setShowModal(true);
    setSelCustomerId(customer_id);
  };

  const [rejectionReason, setRejectionReason] = useState();

  const loadCustomers = (status) => {
    axios
      .post(
        ADMIN_URL.GET_CUSTOMERS,
        {
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setCustomerList([...response.data.customers]);
      })
      .catch(function (error) {
        console.log(error);
        console.log("errorr");
      });
  };

  const loadCount = () => {
    axios
      .post(
        ADMIN_URL.GET_CUSTOMER_COUNT,
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

  const activateCustomer = (customer_id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmAlert
            handleClose={onClose}
            title={"Confirm Approval"}
            description={"Are you sure?"}
            onAccept={() => approve(customer_id)}
          />
        );
      },
    });
  };

  const rejectCustomer = (deactivate) => {
    axios
      .post(ADMIN_URL.REJECT_CUSTOMER, {
        customer_id: selCustomerId,
        rejectionReason,
        deactivate: deactivate ? true : null,
      })
      .then(function (response) {
        handleCloseModal();
        loadCustomers(selectedStatus);
        loadCount();
        showAlert("Customer Rejected!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const approve = (customer_id) => {
    axios
      .post(ADMIN_URL.APPROVE_CUSTOMER, {
        customer_id,
      })
      .then(function (response) {
        loadCustomers(selectedStatus);
        loadCount();
        showAlert("Customer Approved!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    loadCustomers(selectedStatus);
    loadCount();
  }, [selectedStatus]);

  const [newCount, setNewCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [deactiveCount, setDeactiveCount] = useState(0);

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
    setDeactiveCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.status == "DEACTIVATED" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
  }, [count]);

  const [editRow, setEditRow] = useState();
  const [newRow, setNewRow] = useState(false);

  const [alertMsg, setAlertMsg] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const showAlert = (msg) => {
    setAlertMsg(msg);
    setTimeout(() => {
      setAlertMsg(null);
    }, 3000);
  };

  const registerCustomer = (values) => {
    axios
      .post(CUSTOMER_URL.REGISTER, {
        ...values,
        status: "APPROVED",
      })
      .then(function (response) {
        setSelectedStatus("PENDING");
        loadCustomers("PENDING");
        loadCount();
        setEditRow(null);
        setNewRow(null);
        showAlert("Customer Created Successfully!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateCustomer = (values) => {
    axios
      .post(CUSTOMER_URL.UPDATE, {
        ...values,
      })
      .then(function (response) {
        loadCustomers(selectedStatus);
        loadCount();
        setEditRow(null);
        setNewRow(null);
        showAlert("Customer Info Updated!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const NewRow = ({
    customer_id,
    company_name,
    customer_name,
    phone: _phone,
    email: _email,
  }) => {
    const [companyName, setCompanyName] = useState(company_name);
    const [customerName, setCustomerName] = useState(customer_name);
    const [phone, setPhone] = useState(_phone);
    const [email, setEmail] = useState(_email);
    return (
      <tr class="names">
        <td>
          <div class="forminput">
            <input
              onChange={(e) => {
                e.preventDefault();
                setCompanyName(e.target.value);
              }}
              value={companyName}
              type="text"
            />
          </div>
        </td>
        <td>
          <div class="forminput">
            <input
              onChange={(e) => {
                e.preventDefault();
                setCustomerName(e.target.value);
              }}
              value={customerName}
              type="text"
            />
          </div>
        </td>
        <td>
          <div class="forminput">
            <input
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              value={email}
              type="text"
            />
          </div>
        </td>
        <td>
          <div class="forminput">
            <input
              onChange={(e) => {
                e.preventDefault();
                setPhone(e.target.value);
              }}
              value={phone}
              type="text"
            />
          </div>
        </td>
        <td style={{ verticalAlign: "top" }}>
          <div
            style={{
              width: 60,
              display: "flex",
              justifyContent: "space-around",
              height: "100%",
              marginTop: 8,
            }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEditRow(null);
                setNewRow(null);
              }}
            >
              <img
                src="/assets/images/icons/red_cross.svg"
                style={{ width: 20 }}
              />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!customer_id) {
                  registerCustomer({
                    company_name: companyName,
                    full_name: customerName,
                    email,
                    phone,
                    password: "PASSWORD",
                  });
                } else {
                  updateCustomer({
                    company_name: companyName,
                    full_name: customerName,
                    email,
                    phone,
                    customer_id,
                  });
                }
              }}
            >
              <img
                src="/assets/images/icons/green_tick.svg"
                style={{ width: 20 }}
              />
            </a>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <>
      <HeaderComp activeMenuIndex={2} />
      {alertMsg && (
        <div style={{ position: "fixed", bottom: 0 }} class="col-md-12">
          <Alert variant={alertType}>{alertMsg}</Alert>
        </div>
      )}
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
                  Active({activeCount})
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
              {selectedStatus == "DEACTIVATED" ? (
                <span>Deactivated({deactiveCount})</span>
              ) : (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedStatus("DEACTIVATED");
                  }}
                >
                  Deactivated({deactiveCount})
                </a>
              )}
            </div>
            <button
              class="btn-border"
              onClick={(e) => {
                e.preventDefault();
                setNewRow(true);
              }}
              id="newdeal"
            >
              <i class="fas fa-plus"></i>New Customer
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
                  <td>Customer Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  {(selectedStatus == "DEACTIVATED" ||
                    selectedStatus == "REJECTED") && <td>Reason</td>}
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {customerList
                  ?.filter(
                    (row) =>
                      row?.company_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.full_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.email
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.phone?.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((row) => {
                    return editRow == row.customer_id ? (
                      <NewRow
                        customer_id={row.customer_id}
                        customer_name={row.full_name}
                        company_name={row.company_name}
                        phone={row.phone}
                        email={row.email}
                      />
                    ) : (
                      <tr class="names">
                        <td>{row.company_name}</td>
                        <td>{row.full_name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        {(selectedStatus == "DEACTIVATED" ||
                          selectedStatus == "REJECTED") && (
                          <td>{row.rejection_reason}</td>
                        )}
                        <td align="right">
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
                                  setEditRow(row.customer_id);
                                }}
                              >
                                Edit
                              </Dropdown.Item>
                              {selectedStatus != "APPROVED" && (
                                <Dropdown.Item
                                  href="#"
                                  onClick={(e) => {
                                    activateCustomer(row.customer_id);
                                  }}
                                >
                                  Approve
                                </Dropdown.Item>
                              )}
                              {selectedStatus == "PENDING" && (
                                <Dropdown.Item
                                  href="#"
                                  onClick={(e) => {
                                    handleShowModal(row.customer_id);
                                    setModalType(0);
                                  }}
                                >
                                  Reject
                                </Dropdown.Item>
                              )}
                              {selectedStatus == "APPROVED" && (
                                <Dropdown.Item
                                  href="#"
                                  onClick={(e) => {
                                    handleShowModal(row.customer_id);
                                    setModalType(1);
                                  }}
                                >
                                  Deactivate
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                {newRow && <NewRow />}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <div
            class="row d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <img
              src={"assets/images/icons/reject.svg"}
              alt=""
              style={{ width: 30, margin: 10 }}
            />
            <div class="w-100"></div>
            <h6>{modalType == 0 ? "REJECT CUSTOMER" : "DEACTIVATE PARTNER"}</h6>
          </div>

          <div class="row" style={{ padding: "10px 20px 0px 20px" }}>
            <div class="forminput" style={{ width: "100%" }}>
              <div class="labeldiv">
                <label>Reason</label>
              </div>
              <textarea
                onChange={(e) => setRejectionReason(e.target.value)}
                value={rejectionReason}
                style={{ borderRadius: 3, borderColor: "#191E3530" }}
              />
            </div>
          </div>

          <div class="btnreg">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCloseModal();
              }}
              class="btn-border"
            >
              CANCEL
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (modalType == 0) rejectCustomer(false);
                else rejectCustomer(true);
              }}
              class="btn-primary"
            >
              SUBMIT
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
