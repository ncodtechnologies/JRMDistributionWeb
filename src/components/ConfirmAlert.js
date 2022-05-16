import { useState } from "react";

const ConfirmAlert = ({ handleClose, title, description, onAccept }) => {
  return (
    <>
      <div class="row d-flex justify-content-center" style={{ width: "100%" }}>
        <div class="w-100"></div>
        <h6>{title}</h6>
      </div>

      <div class="row" style={{ padding: "10px 20px 0px 20px" }}>
        <div class="forminput" style={{ width: "100%" }}>
          <div class="labeldiv">
            <label>{description}</label>
          </div>
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
          NO
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onAccept();
          }}
          class="btn-primary"
        >
          YES
        </a>
      </div>
    </>
  );
};

export default ConfirmAlert;
