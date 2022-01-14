import * as Yup from "yup";

export const NewWarrantySchema = Yup.object().shape({
  sold_by: Yup.string().required("Required"),
  purchase_date: Yup.string().required("Required"),
});
