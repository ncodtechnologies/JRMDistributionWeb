import { useState } from "react";

const RejectionPopup = ({
  checkedList,
  reject,
  selWarrantyProdId,
  modalType,
  handleClose,
}) => {
  const [reason, setReason] = useState();
  return (
    <>
      <div class="row d-flex justify-content-center" style={{ width: "100%" }}>
        <img
          src="assets/images/icons/reject_warranty.svg"
          alt=""
          style={{ width: 40, margin: 10 }}
        />
        <div class="w-100"></div>
        <h6>{modalType == 0 ? "DEACTIVATE WARRANTY" : "WARRANTY REJECTION"}</h6>
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
            reject(
              selWarrantyProdId ? [selWarrantyProdId] : checkedList,
              reason,
              modalType
            );
          }}
          class="btn-primary"
        >
          SAVE
        </a>
      </div>
    </>
  );
};

export default RejectionPopup;
