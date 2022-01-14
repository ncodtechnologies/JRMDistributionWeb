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

export default function ParnerDt() {
  useScript("assets/js/custom/partner_company.js");

  const [showSuccess, setShowSuccess] = useState(false);

  const token = localStorage.getItem("JRMDistribution");

  const {
    state: { partner },
  } = useLocation();

  const navigate = useNavigate();

  const [rejectionReason, setRejectionReason] = useState();
  const [partnershipLevel, setPartnershipLevel] = useState();
  const [salesTarget, setSalesTarget] = useState();

  const approvePartner = () => {
    axios
      .post(ADMIN_URL.APPROVE_PARTNER, {
        partner_id: partner.partner_id,
        salesTarget,
        partnershipLevel,
      })
      .then(function (response) {
        setShowSuccess(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rejectPartner = () => {
    axios
      .post(ADMIN_URL.REJECT_PARTNER, {
        partner_id: partner.partner_id,
        rejectionReason,
      })
      .then(function (response) {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [showRejection, setShowRejection] = useState(false);
  const [showApproval, setShowApproval] = useState(false);

  const handleClose = () => {
    setShowRejection(false);
    setShowApproval(false);
  };
  const handleShowApproval = () => setShowApproval(true);
  const handleShowRejection = () => setShowRejection(true);

  return !showSuccess ? (
    <>
      <HeaderComp activeMenuIndex={0} />
      <section class="content">
        <div class="container">
          <div class="breadcrumbs">
            <a href="">Dashboard</a>
            <span>Deal Registeration</span>
          </div>
          <div class="title">
            <h3>{partner?.company_name}</h3>
          </div>

          <div class="formwrap">
            <div class="fwrap">
              <div class="row">
                <div class="ftitle col-md-12">
                  <h6>
                    <i class="fas fa-caret-right"></i>
                    &nbsp;REGISTRAR INFORMATION
                  </h6>
                </div>
              </div>
              <div class="row fold">
                <table>
                  <tr>
                    <td></td>
                    <td>
                      <span>Full Name</span>
                      <p>{partner?.full_name}</p>
                    </td>
                    <td>
                      <span>Role / Title</span>
                      <p>{partner?.role}</p>
                    </td>
                    <td>
                      <span>Phone</span>
                      <p>{partner?.phone}</p>
                    </td>
                    <td>
                      <span>Email</span>
                      <p>{partner?.email}</p>
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
                    &nbsp;COMPANY INFORMATION
                  </h6>
                </div>
              </div>
              <div class="row fold">
                <table>
                  <tr>
                    <td></td>
                    <td>
                      <span>Full Name</span>
                      <p>{partner?.full_name}</p>
                    </td>
                    <td>
                      <span>Role / Title</span>
                      <p>{partner?.role}</p>
                    </td>
                    <td>
                      <span>Phone</span>
                      <p>{partner?.phone}</p>
                    </td>
                    <td>
                      <span>Email</span>
                      <p>{partner?.email}</p>
                    </td>
                  </tr>
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
                onClick={handleShowRejection}
              >
                REJECT
              </Button>
              <Button
                style={{ backgroundColor: "#25ACAC", width: 150 }}
                variant="success"
                onClick={handleShowApproval}
              >
                APPROVE
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal show={showRejection || showApproval} onHide={handleClose}>
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
            <h6>PARTNER {showApproval ? "APPROVAL" : "REJECTION"}</h6>
          </div>
          {showRejection && (
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

          {showApproval && (
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
                />
              </div>
            </div>
          )}

          <div class="btnreg">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClose();
              }}
              class="btn-border"
            >
              CANCEL
            </a>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (showApproval) approvePartner();
                else rejectPartner();
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
