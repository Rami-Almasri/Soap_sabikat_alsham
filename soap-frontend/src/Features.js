import SpaIcon from "@mui/icons-material/Spa";
import NoFoodIcon from "@mui/icons-material/NoFood";
import ScienceIcon from "@mui/icons-material/Science";
import BlockIcon from "@mui/icons-material/Block";

export default function Features() {
  const data = [
    {
      title: "Natural Ingredients",
      desc: "Praesent in nunc vel urna consequat mattis.",
      icon: <SpaIcon fontSize="large" style={{ color: "#4CAF50" }} />,
    },
    {
      title: "Fragrance Free",
      desc: "Ahasellus entesque praesent in nunc vel urna.",
      icon: <NoFoodIcon fontSize="large" style={{ color: "#FF9800" }} />,
    },
    {
      title: "Allergy Tested",
      desc: "Nunc vel urna consequat praesent.",
      icon: <ScienceIcon fontSize="large" style={{ color: "#2196F3" }} />,
    },
    {
      title: "Paraben Free",
      desc: "Mattis eget vel libero praesent.",
      icon: <BlockIcon fontSize="large" style={{ color: "#F44336" }} />,
    },
  ];

  return (
    <section
      style={{
        padding: "40px 40px",
        display: "flex",
        justifyContent: "space-around",
        textAlign: "center",
        flexWrap: "wrap",
        gap: "40px",
      }}
    >
      {data.map((item, index) => (
        <div key={index} style={{ maxWidth: "200px" }}>
          {item.icon && <div style={{ marginBottom: "10px" }}>{item.icon}</div>}
          <h3>{item.title}</h3>
          <p style={{ color: "#666" }}>{item.desc}</p>
        </div>
      ))}
    </section>
  );
}
