import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL } from "../../../urls/apiUrls";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import RejectionPopup from "./components/rejection";
import ActivationPopup from "./components/activation";

export default function WarrantyDt() {
  useScript("assets/js/custom/partner_company.js");

  const [showSuccess, setShowSuccess] = useState(false);

  const token = localStorage.getItem("JRMDistribution");

  const {
    state: { warranty_id, status_id, status },
  } = useLocation();

  const statusLabel =
    status == "PENDING"
      ? "WARRANTY"
      : status == "ACTIVE" || status == "EXPIRED"
      ? "ACTIVATION"
      : "REJECTION";

  const [warrantyDt, setWarrantyDt] = useState([{}]);
  const [checkedList, setCheckedList] = useState([]);
  const [selWarrantyProdId, setSelWarrantyProdId] = useState();
  const [successMsg, setSuccessMsg] = useState();

  const loadWarrantyDt = (warranty_id, status_id) => {
    axios
      .post(
        ADMIN_URL.GET_WARRANTY_DT,
        {
          warranty_id,
          status_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        setWarrantyDt([...response.data.warranty]);
        window.setTableOnClick();
      })
      .catch(function (error) {
        console.log(error);
        console.log("errorr");
      });
  };

  useEffect(() => {
    loadWarrantyDt(warranty_id, status_id);
  }, [warranty_id]);

  const navigate = useNavigate();

  const activate = (warranty_product_ids, startDate, endDate) => {
    axios
      .post(ADMIN_URL.ACTIVATE_WARRANTY, {
        products: warranty_product_ids,
        startDate: moment(startDate).format("YYYY-MM-DD").toString(),
        endDate: moment(endDate).format("YYYY-MM-DD").toString(),
      })
      .then(function (response) {
        handleClose();
        setShowSuccess(true);
        setSuccessMsg("THE WARRANTY HAS BEEN ACTIVATED");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reject = (warranty_product_ids, reason, type) => {
    axios
      .post(ADMIN_URL.REJECT_WARRANTY, {
        products: warranty_product_ids,
        reason,
        type,
      })
      .then(function (response) {
        handleClose();
        setShowSuccess(true);
        setSuccessMsg(
          `THE WARRANTY HAS BEEN ${type == 0 ? "DEACTIVATED" : "REJECTED"}`
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = (type) => {
    setShowModal(true);
    setModalType(type);
  };

  return !showSuccess ? (
    <>
      <HeaderComp activeMenuIndex={3} />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs">
            <div class="">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(-1);
                }}
              >
                <img
                  src="assets/images/icons/back_icon.svg"
                  style={{ width: 20 }}
                />
              </a>
            </div>
          </div>
          <div class="title">
            <h3>
              {statusLabel} No. #{warranty_id}
            </h3>
          </div>

          <div class="formwrap">
            <div class="fwrap">
              <div class="row">
                <div class="ftitle col-md-12">
                  <h6>
                    <i class="fas fa-caret-right"></i>
                    &nbsp;WARRANTY INFO
                  </h6>
                </div>
              </div>
              <div class="row fold open">
                <table>
                  <tr>
                    <td>
                      <span>Customer</span>
                      <p>{warrantyDt[0].customer}</p>
                    </td>
                    <td>
                      <span>Sold By</span>
                      <p>{warrantyDt[0].sold_by}</p>
                    </td>
                    <td>
                      <span>No of Products</span>
                      <p>{warrantyDt.length}</p>
                    </td>
                    <td>
                      <span>Purchase date</span>
                      <p>
                        {moment(warrantyDt[0].purchase_date).format(
                          "DD/MM/YYYY"
                        )}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <div class="formwrap">
            <div class="fwrap">
              <div class="row">
                <div class="col-md-12">
                  <div class="forminput">
                    <ul class="docfile">
                      <li>
                        <img src="assets/images/icons/pdf.png" alt="" />
                        <span>Invoice</span>
                        <a
                          href={`https://jrm.com.eg/distribution/uploads/warranty/${warrantyDt[0]?.invoice}`}
                          target="_blank"
                        >
                          <img
                            style={{ height: 15 }}
                            src="assets/images/icons/download.svg"
                            alt=""
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="formwrap">
            <div class="fwrap">
              <div class="row">
                <div class="ftitle col-md-12">
                  <h6>
                    <i class="fas fa-caret-right"></i>
                    &nbsp;PRODUCTS
                  </h6>
                </div>
              </div>
              <div class="row fold open">
                <table>
                  {warrantyDt?.map((prod, index) => {
                    const isNew = prod.action == null;
                    const isActive = prod.action == 1;
                    const isDeactive = prod.action == 0 || prod.action == -1;
                    const isExpired = isActive
                      ? moment().diff(moment(prod.end_date), "days") > 0
                        ? true
                        : false
                      : false;
                    return (
                      <tr
                        style={{
                          borderBottomStyle: "solid",
                          borderBottomColor: "rgb(225,225,225)",
                          borderBottomWidth: 1,
                        }}
                      >
                        <td width={30}>
                          <div class="">
                            <input
                              type="checkbox"
                              id="inlineCheckbox2"
                              checked={checkedList.includes(
                                prod.warranty_product_id
                              )}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setCheckedList([
                                    ...checkedList,
                                    prod.warranty_product_id,
                                  ]);
                                } else {
                                  let _list = [...checkedList];
                                  const i = checkedList.findIndex(
                                    (el) => el == prod.warranty_product_id
                                  );
                                  if (i > -1) {
                                    _list.splice(i, 1);
                                    setCheckedList([..._list]);
                                  }
                                }
                              }}
                            />
                          </div>
                        </td>
                        <td width={25}>{index + 1}</td>
                        <td width={200}>
                          <span>Product</span>
                          <p>{prod.product}</p>
                        </td>
                        <td width={200}>
                          <span>Serial No.</span>
                          <p>{prod.serial_no}</p>
                        </td>
                        {prod.start_date ? (
                          <td width={200}>
                            <span>Start Date</span>
                            <p>
                              {moment(prod.start_date).format("DD/MM/YYYY")}
                            </p>
                          </td>
                        ) : (
                          <td />
                        )}
                        {prod.end_date ? (
                          <td width={200}>
                            <span>End Date</span>
                            <p
                              style={
                                moment().diff(moment(prod.end_date), "days") > 0
                                  ? { color: "red" }
                                  : {}
                              }
                            >
                              {moment(prod.end_date).format("DD/MM/YYYY")}
                            </p>
                          </td>
                        ) : (
                          <td />
                        )}
                        <td></td>
                        <td>
                          <div style={{ float: "right" }}>
                            {isExpired && (
                              <a
                                href="#"
                                class="btn-link-success"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCheckedList([prod.warranty_product_id]);
                                  handleShow(1);
                                }}
                              >
                                RENEW
                              </a>
                            )}
                            {isActive && !isExpired && (
                              <a
                                href="#"
                                class="btn-link-reject"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCheckedList([prod.warranty_product_id]);
                                  handleShow(0);
                                }}
                              >
                                DEACTIVATE
                              </a>
                            )}
                            {isNew && (
                              <a
                                href="#"
                                class="btn-link-reject"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCheckedList([prod.warranty_product_id]);
                                  handleShow(-1);
                                }}
                              >
                                REJECT
                              </a>
                            )}
                            {(isNew || isDeactive) && (
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  setCheckedList([prod.warranty_product_id]);
                                  handleShow(1);
                                }}
                                href="#"
                                class="btn-link-success"
                              >
                                ACTIVATE
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          class="container fixed-bottom"
          style={{ height: 70, backgroundColor: "#FAFBFD", paddingTop: 15 }}
        >
          {checkedList.length > 0 && (
            <div class="row float-right">
              <div>
                {status == "ACTIVE" && (
                  <Button
                    style={{
                      backgroundColor: "#EB4D4B",
                      marginRight: 20,
                      width: 150,
                    }}
                    variant="success"
                    onClick={(e) => {
                      setSelWarrantyProdId(null);
                      handleShow(0);
                    }}
                  >
                    DEACTIVATE
                  </Button>
                )}
                {status == "PENDING" && (
                  <Button
                    style={{
                      backgroundColor: "#EB4D4B",
                      marginRight: 20,
                      width: 150,
                    }}
                    variant="success"
                    onClick={(e) => {
                      setSelWarrantyProdId(null);
                      handleShow(-1);
                    }}
                  >
                    REJECT
                  </Button>
                )}
                {status == "PENDING" && (
                  <Button
                    style={{ backgroundColor: "#25ACAC", width: 150 }}
                    variant="success"
                    onClick={(e) => {
                      setSelWarrantyProdId(null);
                      handleShow(1);
                    }}
                  >
                    ACTIVATE
                  </Button>
                )}
                {status == "EXPIRED" && (
                  <Button
                    style={{ backgroundColor: "#25ACAC", width: 150 }}
                    variant="success"
                    onClick={(e) => {
                      setSelWarrantyProdId(null);
                      handleShow(1);
                    }}
                  >
                    RENEW
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Body>
          {(modalType == 0 || modalType == -1) && (
            <RejectionPopup
              checkedList={checkedList}
              reject={reject}
              selWarrantyProdId={selWarrantyProdId}
              modalType={modalType}
              handleClose={handleClose}
              selProducts={warrantyDt.filter((el) =>
                checkedList.includes(el.warranty_product_id)
              )}
            />
          )}
          {modalType == 1 && (
            <ActivationPopup
              checkedList={checkedList}
              activate={activate}
              selWarrantyProdId={selWarrantyProdId}
              handleClose={handleClose}
              selProducts={warrantyDt.filter((el) =>
                checkedList.includes(el.warranty_product_id)
              )}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  ) : (
    <>
      <HeaderComp activeMenuIndex={3} />
      <div class="dealsuccess">
        <div class="dtls">
          <img src="assets/images/icons/checked.png" alt="" />
          <p>
            <b>{successMsg}</b>
          </p>
          <button
            onClick={(e) => {
              setShowSuccess(false);
              navigate(-1);
            }}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
