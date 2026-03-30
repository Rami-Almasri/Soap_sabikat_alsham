import React from "react";
import { Box, Typography, Button, Grid, Fade } from "@mui/material";
import { Link } from "react-router-dom";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function Middlebar() {
  const cards = [
    {
      number: 150,
      title: "Categories",
      color: "#00d2ff",
      icon: <CategoryRoundedIcon />,
      path: "categories",
    },
    {
      number: "53%",
      title: "Products",
      color: "#4caf50",
      icon: <Inventory2RoundedIcon />,
      path: "products",
    },
    {
      number: 44,
      title: "Users",
      color: "#ffc107",
      icon: <PeopleAltRoundedIcon />,
      path: "users",
    },
    {
      number: 65,
      title: "Orders",
      color: "#ff5252",
      icon: <ShoppingCartRoundedIcon />,
      path: "orders",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Fade in timeout={800}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 950,
              color: "#4caf50",
              letterSpacing: "-2px",
              mb: 1,
            }}
          >
            DASHBOARD
          </Typography>
          <Box
            sx={{
              width: "60px",
              height: "4px",
              bgcolor: "#4caf50",
              borderRadius: "2px",
            }}
          />
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Fade in timeout={800 + index * 200}>
              <Box
                sx={{
                  position: "relative",
                  height: "240px",
                  p: 3,
                  borderRadius: "35px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  // --- التعديل السحري هنا (خلفية أغمق بكتير) ---
                  background: `linear-gradient(145deg, #121212 0%, #1e1e1e 100%)`,
                  border: `2px solid rgba(255,255,255,0.05)`, // حد خفيف جداً
                  transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.4)",

                  "&:hover": {
                    transform: "translateY(-15px)",
                    borderColor: card.color, // الحواف بتنور بلون الكرت عند اللمس
                    boxShadow: `0 0 30px ${card.color}33`,
                    "& .bg-icon": {
                      transform: "scale(1.3) rotate(-15deg)",
                      opacity: 0.4, // الأيقونة بتوضح أكتر عند الـ Hover
                      filter: `drop-shadow(0 0 20px ${card.color})`,
                    },
                    "& .stat-number": {
                      color: card.color,
                      transform: "scale(1.05)",
                    },
                  },
                }}
              >
                {/* الأيقونة الخلفية - هلق صارت واضحة جداً */}
                <Box
                  className="bg-icon"
                  sx={{
                    position: "absolute",
                    right: -20,
                    top: -20,
                    fontSize: "160px",
                    color: card.color,
                    opacity: 0.15, // وضوح ممتاز على الخلفية الغامقة
                    transition: "0.6s ease",
                    zIndex: 0,
                    "& svg": { fontSize: "inherit" },
                  }}
                >
                  {card.icon}
                </Box>

                {/* المحتوى العلوي */}
                <Box sx={{ zIndex: 1 }}>
                  <Typography
                    variant="h2"
                    className="stat-number"
                    sx={{
                      fontWeight: 900,
                      color: "#fff",
                      mb: 0.5,
                      transition: "0.3s ease",
                    }}
                  >
                    {card.number}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    {card.title}
                  </Typography>
                </Box>

                {/* الزر السفلي الاحترافي */}
                <Button
                  component={Link}
                  to={`/dashboard/${card.path}`}
                  endIcon={
                    <ArrowForwardIosRoundedIcon
                      sx={{ fontSize: "12px !important" }}
                    />
                  }
                  sx={{
                    zIndex: 1,
                    width: "fit-content",
                    borderRadius: "15px",
                    textTransform: "none",
                    fontWeight: "900",
                    px: 3,
                    py: 1.2,
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    "&:hover": {
                      bgcolor: card.color,
                      color: "#000",
                      borderColor: card.color,
                    },
                  }}
                >
                  View Details
                </Button>
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
