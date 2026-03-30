import { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  Container,
  Avatar,
  IconButton,
  Badge,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FavoriteBorderRounded,
  SearchRounded,
  LocalMallOutlined,
  DashboardCustomizeOutlined,
  LogoutRounded,
  ExpandMoreRounded,
  SpaOutlined,
} from "@mui/icons-material";
import pic from "./pic1.jpg";

export default function LuxuryGiantNavbar() {
  const [category, setCategory] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [fav, setVaf] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // جلب الكاتيجوريز
    axios
      .get("http://127.0.0.1:8000/api/categories/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategory(res.data.data || []))
      .catch((err) => console.log(err));

    // جلب بيانات المستخدم
    axios
      .get("http://127.0.0.1:8000/api/user/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .then(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
      });
  };

  const isActive = (path) => location.pathname === path;

  // ستايل الروابط المحسن
  const navLinkStyle = (path) => ({
    textDecoration: "none",
    color: isActive(path) ? "#388e3c" : "#1a1a1a",
    fontWeight: isActive(path) ? "900" : "700",
    fontSize: "0.95rem",
    letterSpacing: "0.5px",
    transition: "0.3s all ease",
    position: "relative",
    padding: "10px 0",
    "&:hover": { color: "#388e3c" },
    "&::after": isActive(path)
      ? {
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "3px",
          backgroundColor: "#388e3c",
          borderRadius: "10px",
        }
      : {
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "0%",
          height: "3px",
          backgroundColor: "#388e3c",
          borderRadius: "10px",
          transition: "0.3s width ease",
        },
    "&:hover::after": { width: "100%" },
  });

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 1100,
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        py: 2, // زدنا البادينغ ليستوعب اللوغو الكبير
        boxShadow: "0 4px 30px rgba(0,0,0,0.02)",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo Section - تكبير الشعار هنا */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
          >
            <Avatar
              src={pic}
              variant="rounded"
              sx={{
                width: 90, // كبرنا العرض
                height: 110, // كبرنا الارتفاع
                borderRadius: "16px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.12)",
                border: "2px solid #fff",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "#1a1a1a",
                  fontSize: "1.6rem",
                  letterSpacing: "-0.5px",
                }}
              >
                SABIKAT
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 800,
                  color: "#388e3c",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                ALSHAM
              </Typography>
            </Box>
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 5,
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Box sx={navLinkStyle("/")}>HOME</Box>
            </Link>
            <Link to="/shop/all" style={{ textDecoration: "none" }}>
              <Box sx={navLinkStyle("/shop/all")}>SHOP</Box>
            </Link>

            {/* Category Select المحسن */}
            <Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                navigate(`/products/${e.target.value}`);
              }}
              displayEmpty
              IconComponent={ExpandMoreRounded}
              size="small"
              sx={{
                minWidth: 140,
                fontWeight: "800",
                color: "#1a1a1a",
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
                "&:hover": { color: "#388e3c" },
                bgcolor: "rgba(56, 142, 60, 0.08)",
                borderRadius: "14px",
                px: 1.5,
                transition: "0.3s",
              }}
              renderValue={(selected) => {
                if (!selected) return "Collections";
                const cat = category.find((c) => c.id === selected);
                return cat ? cat.name : "Collections";
              }}
            >
              {category.map((c) => (
                <MenuItem key={c.id} value={c.id} sx={{ fontWeight: 600 }}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>

            <Link to="/myorders" style={{ textDecoration: "none" }}>
              <Box sx={navLinkStyle("/myorders")}>ORDERS</Box>
            </Link>
            <Link to="/Dashpoard" style={{ textDecoration: "none" }}>
              <Box sx={navLinkStyle("/Dashpoard")}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <DashboardCustomizeOutlined sx={{ fontSize: 20 }} />
                  <span>DASHBOARD</span>
                </Stack>
              </Box>
            </Link>
          </Box>

          {/* Action Icons & User */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Tooltip title="Search Products">
              <IconButton
                sx={{ color: "#1a1a1a", bgcolor: "rgba(0,0,0,0.02)" }}
              >
                <SearchRounded />
              </IconButton>
            </Tooltip>

            <Tooltip title="Favorites" onClick={() => navigate("/favorites")}>
              <IconButton
                sx={{ color: "#1a1a1a", bgcolor: "rgba(0,0,0,0.02)" }}
              >
                <Badge
                  badgeContent={0}
                  color="success"
                  sx={{ "& .MuiBadge-badge": { fontWeight: 800 } }}
                >
                  <FavoriteBorderRounded />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="My Shopping Cart">
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{ color: "#1a1a1a", bgcolor: "rgba(0,0,0,0.02)" }}
              >
                <LocalMallOutlined />
              </IconButton>
            </Tooltip>

            <Box
              sx={{ width: "2px", height: "30px", bgcolor: "#f0f0f0", mx: 1 }}
            />

            {user ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    textAlign: "right",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 800, lineHeight: 1, color: "#1a1a1a" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#388e3c",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Admin
                  </Typography>
                </Box>
                <Tooltip title="Logout Session">
                  <IconButton
                    onClick={handleLogout}
                    sx={{
                      bgcolor: "rgba(211, 47, 47, 0.08)",
                      color: "#d32f2f",
                      borderRadius: "14px",
                      "&:hover": { bgcolor: "#d32f2f", color: "#fff" },
                    }}
                  >
                    <LogoutRounded fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  bgcolor: "#388e3c",
                  borderRadius: "12px",
                  fontWeight: 900,
                  px: 4,
                  py: 1.2,
                  "&:hover": {
                    bgcolor: "#1a1a1a",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                LOGIN
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
