export default function Hero() {
  return (
    <section
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "60px 40px",
        backgroundColor: "#f3f2e8",
      }}
    >
      {/* Left side */}
      <div style={{ maxWidth: "500px" }}>
        <p style={{ letterSpacing: "3px", color: "#555" }}>HEALTHY SKIN</p>

        <h1 style={{ fontSize: "48px", margin: "20px 0" }}>
          Organic Anti-Aging Cosmetic Cream
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          Praesent in nunc vel urna consequat mattis eget vel libero.
        </p>

        <button
          style={{
            padding: "12px 30px",
            backgroundColor: "#2f4f1f",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          VIEW ALL
        </button>
      </div>

      {/* Right side image */}
      <img
        src="https://images.unsplash.com/photo-1596462502278-27bfdc403348"
        alt="skin"
        style={{
          width: "500px",
          borderRadius: "10px",
        }}
      />
    </section>
  );
}
