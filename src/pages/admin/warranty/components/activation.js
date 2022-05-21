import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FieldError from "../../../../components/FieldError";

const ActivationPopup = ({
  checkedList,
  activate,
  selWarrantyProdId,
  handleClose,
  selProducts,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <>
      <div class="row d-flex justify-content-center" style={{ width: "100%" }}>
        <img
          src="assets/images/icons/activate_warranty.svg"
          alt=""
          style={{ width: 40, margin: 10 }}
        />
        <div class="w-100"></div>
        <h6>ACTIVATE WARRANTY</h6>
      </div>

      <div style={{ margin: 7, marginTop: 15 }}>
        Active {selWarrantyProdId ? "1" : checkedList.length} products
      </div>

      <div
        style={{
          margin: 5,
          marginTop: 0,
          display: "inline-flex",
          flexWrap: "wrap",
        }}
      >
        {selProducts?.map((el) => (
          <div class="prod-tag">
            {el.product}, {el.serial_no}
          </div>
        ))}
      </div>

      <div class="row" style={{ padding: "10px 20px 0px 20px" }}>
        <div class="forminput" style={{ width: "100%" }}>
          <div class="labeldiv">
            <label>Start Date</label>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
          <FieldError error={!startDate && "Required"} />
        </div>
        <div class="forminput" style={{ width: "100%" }}>
          <div class="labeldiv">
            <label>End Date</label>
          </div>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
          <FieldError error={!endDate && "Required"} />
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
            if (startDate && endDate)
              activate(
                selWarrantyProdId ? [selWarrantyProdId] : checkedList,
                startDate,
                endDate
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

export default ActivationPopup;
