const FieldError = ({ error }) =>
  error ? (
    <span style={{ color: "red", fontSize: 12, paddingLeft: 10 }}>{error}</span>
  ) : (
    <span />
  );

export default FieldError;
