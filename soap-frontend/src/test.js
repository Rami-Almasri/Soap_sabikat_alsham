import { height } from "@mui/system";

export default function Test() {
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    padding: "60px 40px",
  };

  const bigImageStyle = {
    width: "100%",
    height: "700px",
    borderRadius: "10px",
    objectFit: "cover",
  };

  const smallImageStyle = {
    width: "100%",
    height: "340px",
    borderRadius: "10px",
    objectFit: "cover",
  };

  return (
    <div style={containerStyle}>
      {/* العمود الأول */}
      <div>
        <img
          style={bigImageStyle}
          src="https://images.unsplash.com/photo-1612800083994-d568da6256ba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="skin"
        />
      </div>

      {/* العمود الثاني */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <h6
            style={{
              letterSpacing: "3px",
              color: "#555",
              textAlign: "center",
              padding: "50px 0",
            }}
          >
            VITAL CATEGORIES
          </h6>
          <h1 style={{ textAlign: "center", padding: "35px 0" }}>
            Worldwide Fashion Collection
          </h1>
        </div>
        <img
          style={smallImageStyle}
          src="https://images.unsplash.com/photo-1614806687007-2215a9db3b1c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1596462502278-27bfdc403348"
          alt="skin"
        />
      </div>

      {/* العمود الثالث مع صورتين */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <img
          style={smallImageStyle}
          src="https://plus.unsplash.com/premium_photo-1684471006681-969fce3ae6a0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="skin"
        />
        <img
          style={smallImageStyle}
          src="https://images.unsplash.com/photo-1652233172336-6efc037a3766?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="skin"
        />
      </div>
    </div>
  );
}
