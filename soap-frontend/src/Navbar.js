import { useState, useEffect } from "react";
import { Box, Select, MenuItem } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import pic from "./pic1.jpg";

export default function Navbar() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // <-- هنا state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/").then((res) => {
      setCategory(res.data.data);
    });
  }, []);

  const linkStyle = { textDecoration: "none", color: "black" };

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value); // نخزن القيمة في state
    navigate(`/products/${value}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 3 },
        gap: { xs: 2, md: 0 },
        backgroundColor: "#fff",
        boxShadow: 2,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <img
          src={pic}
          alt="Sabikat Al Sham"
          style={{ width: "70px", height: "80px", borderRadius: "8px" }}
        />
        <h1 style={{ margin: 0, lineHeight: "1" }}>
          <span style={{ display: "block" }}>sabikat</span>
          <span style={{ display: "block" }}>alsham</span>
        </h1>
      </Box>

      {/* Links + Select */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1, md: 5 },
          alignItems: "center",
          mt: { xs: 2, md: 0 },
        }}
      >
        <Link style={linkStyle} to="/">
          HOME
        </Link>
        <Link style={linkStyle} to="/shop/all">
          SHOP
        </Link>
        <Link style={linkStyle} to="#">
          ABOUT
        </Link>
        <Link style={linkStyle} to="/Dashpoard">
          Dashboard
        </Link>
        <Select
          value={selectedCategory}
          onChange={handleChange}
          size="small"
          displayEmpty
          renderValue={(selected) => {
            if (!selected) return "Category"; // تظهر الكلمة إذا لم يتم الاختيار
            const cat = category.find((c) => c.id === selected);
            return cat ? cat.name : "Category";
          }}
        >
          <MenuItem value="">Category</MenuItem>
          {category.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Icons */}
      <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, md: 0 } }}>
        <SearchIcon />
        <FavoriteIcon />
      </Box>
    </Box>
  );
}
