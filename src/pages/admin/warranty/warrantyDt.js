import moment from "moment";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useScript from "../../../hooks/useScript";
import HeaderComp from "../../../nav/header";
import { ADMIN_URL } from "../../../urls/apiUrls";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

export default function DealDt() {
  useScript("assets/js/custom/partner_company.js");

  const [showSuccess, setShowSuccess] = useState(false);

  const token = localStorage.getItem("JRMDistribution");

  const {
    state: { deal },
  } = useLocation();

  const navigate = useNavigate();

  const [reason, setReason] = useState();

  const approve = () => {
    confirmAlert({
      title: "Confirm Approval",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => approveDeal(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const approveDeal = () => {
    axios
      .post(ADMIN_URL.APPROVE_DEAL, {
        deal_id: deal.deal_id,
      })
      .then(function (response) {
        setShowSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rejectDeal = () => {
    axios
      .post(ADMIN_URL.REJECT_DEAL, {
        deal_id: deal.deal_id,
        reason,
      })
      .then(function (response) {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [showRejection, setShowRejection] = useState(false);

  const handleClose = () => setShowRejection(false);
  const handleShow = () => setShowRejection(true);

  return !showSuccess ? (
    <>
      <HeaderComp activeMenuIndex={1} />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs">
            <a href="">Dashboard</a>
            <span>Deal Registeration</span>
          </div>
          <div class="title">
            <h3>Deal No. #{deal.deal_id}</h3>
          </div>

          <div class="formwrap">
            <div class="fwrap">
              <div class="row">
                <div class="ftitle col-md-12">
                  <h6>
                    <i class="fas fa-caret-right"></i>
                    &nbsp;DEAL INFO
                  </h6>
                </div>
              </div>
              <div class="row fold">
                <table>
                  <tr>
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
                      <p>{moment(deal.purchase_date).format("DD/MM/YYYY")}</p>
                    </td>
                    <td>
                      <span>Expected Revenue</span>
                      <p>{deal.revenue}</p>
                    </td>
                    <td>
                      <div class="status pending">Pending</div>
                    </td>
                  </tr>
                </table>
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
              <div class="row fold">
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
          <div class="row float-right">
            <div>
              <Button
                style={{
                  backgroundColor: "#EB4D4B",
                  marginRight: 20,
                  width: 150,
                }}
                variant="success"
                onClick={handleShow}
              >
                REJECT
              </Button>
              <Button
                style={{ backgroundColor: "#25ACAC", width: 150 }}
                variant="success"
                onClick={() => approve()}
              >
                APPROVE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showRejection} onHide={handleClose}>
        <Modal.Body>
          <div
            class="row d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <img
              src="assets/images/icons/checked.png"
              alt=""
              style={{ width: 30, margin: 10 }}
            />
            <div class="w-100"></div>
            <h6>DEAL REJECTION</h6>
          </div>

          <div class="row" style={{ padding: "10px 20px 0px 20px" }}>
            <div class="forminput" style={{ width: "100%" }}>
              <div class="labeldiv">
                <label>Reason</label>
              </div>
              <textarea
                onChange={(e) => setReason(e.target.value)}
                value={reason}
                style={{ borderRadius: 3, borderColor: "#191E3530" }}
              />
            </div>
          </div>

          <div class="btnreg">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              class="btn-border"
            >
              CANCEL
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                rejectDeal();
              }}
              class="btn-primary"
            >
              SAVE
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  ) : (
    <div class="dealsuccess">
      <div class="dtls">
        <img src="assets/images/icons/checked.png" alt="" />
        <p>
          <b>THE DEAL HAS BEEN APPROVED</b>
        </p>
        <button
          onClick={(e) => {
            setShowSuccess(false);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
