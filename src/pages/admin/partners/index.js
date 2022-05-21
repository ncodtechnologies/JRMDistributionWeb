import axios from "axios";
import { useEffect, useState } from "react";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL, PARTNER_URL } from "../../../urls/apiUrls";
import { Modal } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import FieldError from "../../../components/FieldError";

export default function PartnersList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const token = localStorage.getItem("JRMDistribution");

  const [partnetList, setPartnerList] = useState([]);
  const [count, setCount] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("PENDING");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(0);
  const [selPartnerId, setSelPartnerId] = useState();

  const { status } = useParams();

  useEffect(() => {
    setSelectedStatus(status);
    loadPartners(status);
    loadCount();
    if (!status) {
      setSelectedStatus("PENDING");
      loadPartners("PENDING");
      loadCount();
    }
  }, [status]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelPartnerId(null);
  };
  const handleShowModal = (partner_id) => {
    setShowModal(true);
    setSelPartnerId(partner_id);
  };

  const currencyFormat = (num) => {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const [rejectionReason, setRejectionReason] = useState("");
  const [partnershipLevel, setPartnershipLevel] = useState("");
  const [salesTarget, setSalesTarget] = useState("");

  const approvePartner = () => {
    axios
      .post(ADMIN_URL.APPROVE_PARTNER, {
        partner_id: selPartnerId,
        salesTarget,
        partnershipLevel,
      })
      .then(function (response) {
        handleCloseModal();
        loadPartners(selectedStatus);
        loadCount();

        if (modalType == 2)
          NotificationManager.success("Partner tier updated!");
        else if (modalType == 1)
          NotificationManager.success("Partner Activated!");
        else if (modalType == 0)
          NotificationManager.success("Partner Deactivated!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rejectPartner = () => {
    axios
      .post(ADMIN_URL.REJECT_PARTNER, {
        partner_id: selPartnerId,
        rejectionReason,
        deactivate: true,
      })
      .then(function (response) {
        handleCloseModal();
        loadPartners(selectedStatus);
        NotificationManager.success("Partner Rejected!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadPartners = (status) => {
    axios
      .post(
        ADMIN_URL.PARTNERS_LIST,
        {
          status,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setPartnerList([...response.data.partners]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const loadCount = () => {
    axios
      .post(
        ADMIN_URL.GET_PARTNERS_COUNT,
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

  const showStatus = (partnership) => {
    if (partnership == "Gold") return <div class="status gold">Gold</div>;
    else if (partnership == "Authorized")
      return <div class="status authorized">Authorized</div>;
    else if (partnership == "Silver")
      return <div class="status silver">Silver</div>;
    else if (partnership == "Platinum")
      return <div class="status platinum">Platunum</div>;
    else return <div class="status pending">Pending</div>;
  };

  // useEffect(() => {
  //   loadPartners(selectedStatus);
  //   loadCount();
  // }, [selectedStatus]);

  const [newCount, setNewCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [rejectCount, setRejectCount] = useState(0);
  const [deactiveCount, setDeactiveCount] = useState(0);

  useEffect(() => {
    setNewCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.partnership == "PENDING" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setActiveCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return (
            a +
            (b.partnership == "Authorized" ||
            b.partnership == "Gold" ||
            b.partnership == "Silver" ||
            b.partnership == "Platinum"
              ? parseInt(b.count) || 0
              : 0)
          );
        }, 0)
    );
    setRejectCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return a + (b.partnership == "REJECTED" ? parseInt(b.count) || 0 : 0);
        }, 0)
    );
    setDeactiveCount(
      count.length > 0 &&
        count.reduce((a, b) => {
          return (
            a + (b.partnership == "Deactivated" ? parseInt(b.count) || 0 : 0)
          );
        }, 0)
    );
  }, [count]);

  const page = "partners";

  return (
    <>
      <HeaderComp activeMenuIndex={0} />
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
              {selectedStatus == "Authorized" ? (
                <span>Active({activeCount})</span>
              ) : (
                <Link to={`/${page}/Authorized`}>Active({activeCount})</Link>
              )}
              {selectedStatus == "REJECTED" ? (
                <span>Rejected({rejectCount})</span>
              ) : (
                <Link to={`/${page}/REJECTED`}>Rejected({rejectCount})</Link>
              )}
              {selectedStatus == "Deactivated" ? (
                <span>Deactivated({deactiveCount})</span>
              ) : (
                <Link to={`/${page}/Deactivated`}>
                  Deactivated({deactiveCount})
                </Link>
              )}
            </div>
            <button
              class="btn-border"
              onClick={(e) => {
                navigate("/regPartner");
                e.preventDefault();
              }}
              id="newdeal"
            >
              <i class="fas fa-plus"></i>New Partner
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
                  <td>Company Email</td>
                  <td>Contact Person Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Annual Sales</td>
                  <td>
                    {selectedStatus == "Deactivated" ||
                    selectedStatus == "REJECTED"
                      ? "Reason"
                      : "Partnership"}
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {partnetList
                  ?.filter(
                    (row) =>
                      row?.company_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.email
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.full_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.phone
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                      row?.sales_target
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((row) => (
                    <tr
                      class="names"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        navigate("/partnerDt", {
                          state: { partner: row },
                        });
                      }}
                    >
                      <td>{row.company_name}</td>
                      <td>{row.email}</td>
                      <td>{row.full_name}</td>
                      <td>{row.email}</td>
                      <td>{row.phone}</td>
                      <td>{row.sales_target}</td>
                      <td>
                        {selectedStatus == "Deactivated" ||
                        selectedStatus == "REJECTED"
                          ? row.rejection_reason
                          : showStatus(row.partnership)}
                      </td>
                      <td align="right" onClick={(e) => e.stopPropagation()}>
                        <Dropdown>
                          {/* <Dropdown.Toggle
                                variant="transparent"
                                id="dropdown-basic"
                                style={{ color: "#aaa" }}
                                as={(e) => (
                                  <a
                                    href="#"
                                    style={{ color: "#aaa" }}
                                    onClick={(_e) => {
                                      _e.preventDefault();
                                      e.onClick(_e);
                                    }}
                                  >
                                    <i class="fas fa-ellipsis-h"></i>
                                  </a>
                                )}
                              >
                                <i class="fas fa-ellipsis-h"></i>
                              </Dropdown.Toggle> */}
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
                                navigate("/partnerDt", {
                                  state: { partner: row },
                                });
                              }}
                            >
                              View Details
                            </Dropdown.Item>
                            <Dropdown.Item href="#" onClick={(e) => {}}>
                              Edit
                            </Dropdown.Item>
                            {selectedStatus == "Deactivated" ||
                            selectedStatus == "REJECTED" ? (
                              <Dropdown.Item
                                href="#"
                                onClick={(e) => {
                                  handleShowModal(row.partner_id);
                                  setModalType(1);
                                }}
                              >
                                Activate
                              </Dropdown.Item>
                            ) : (
                              <>
                                <Dropdown.Item
                                  href="#"
                                  onClick={(e) => {
                                    handleShowModal(row.partner_id);
                                    setModalType(0);
                                  }}
                                >
                                  Deactivate
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#"
                                  onClick={(e) => {
                                    handleShowModal(row.partner_id);
                                    setModalType(2);
                                  }}
                                >
                                  Change Tier
                                </Dropdown.Item>
                              </>
                            )}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          <div
            class="row d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <img
              src={
                modalType == 0
                  ? "assets/images/icons/reject.svg"
                  : modalType == 1
                  ? "assets/images/icons/approve.svg"
                  : "assets/images/icons/change_tier.svg"
              }
              alt=""
              style={{ width: 30, margin: 10 }}
            />
            <div class="w-100"></div>
            <h6>
              {modalType == 0
                ? "DEACTIVATE PARTNER"
                : modalType == 1
                ? "ACTIVATE PARTNER"
                : "CHANGE TIER"}
            </h6>
          </div>

          {modalType == 0 && (
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
          )}

          {(modalType == 1 || modalType == 2) && (
            <div class="row" style={{ padding: "10px 20px 0px 20px" }}>
              <div class="forminput" style={{ width: "100%" }}>
                <div class="labeldiv">
                  <label>Select Partnership Level</label>
                </div>
                <select
                  onChange={(e) => {
                    e.preventDefault();
                    setPartnershipLevel(e.target.value);
                  }}
                  value={partnershipLevel}
                >
                  <option value="">Select</option>
                  <option value="Authorized">Authorized</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Platinum">Platinum</option>
                </select>
                <FieldError error={partnershipLevel == "" && "Required"} />
              </div>
              <div class="forminput" style={{ width: "100%" }}>
                <div class="labeldiv">
                  <label>Sales Target</label>
                </div>
                <input
                  onChange={(e) => {
                    e.preventDefault();
                    setSalesTarget(e.target.value);
                  }}
                  value={salesTarget}
                  type="text"
                  onBlur={() =>
                    setSalesTarget(currencyFormat(parseInt(salesTarget)))
                  }
                />
                <FieldError error={salesTarget == "" && "Required"} />
              </div>
            </div>
          )}

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
                if (modalType == 0) rejectPartner();
                else if (modalType == 1) {
                  if (salesTarget != "" && partnershipLevel != "") {
                    approvePartner();
                  }
                } else if (salesTarget != "" && partnershipLevel != "") {
                  approvePartner();
                }
              }}
              class="btn-primary"
            >
              SAVE
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
