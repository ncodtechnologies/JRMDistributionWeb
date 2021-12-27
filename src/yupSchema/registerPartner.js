import * as yup from "yup";

const RegPartnerSchema = yup.object({
  name: yup.string().required("Required"),
  title: yup.string().required("Required"),
  company_additional: yup.string("Requiredd").required("Required"),
});

export default RegPartnerSchema;
