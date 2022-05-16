import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: 'url("assets/images/bgHome.png")',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        flexDirection: "column",
      }}
    >
      <img
        src="assets/images/logo_white.svg"
        style={{ width: 80, marginBottom: 20 }}
      />
      <div style={{ margin: 20 }}>
        <Link
          to={"/customer"}
          style={{ margin: 30, color: "white", textDecoration: "underline" }}
        >
          CUSTOMER
        </Link>
        <Link
          to={"/partner"}
          style={{ margin: 30, color: "white", textDecoration: "underline" }}
        >
          PARTNER
        </Link>
      </div>
    </div>
  );
}

export default Home;
