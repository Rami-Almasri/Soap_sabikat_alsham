import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Skeleton,
  Fade,
  Stack,
} from "@mui/material";
import {
  Search,
  LocalMallOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// --- Custom Styled Components ---
const StyledCard = styled(Card)({
  height: "100%",
  borderRadius: "24px",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 15px 30px rgba(56, 142, 60, 0.15)",
  },
});

const ProductImage = styled("img")({
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "24px 24px 0 0",
});

export default function LuxuryShop() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const API_BASE = "http://127.0.0.1:8000";

  useEffect(() => {
    if (!token) return navigate("/login");

    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/categories/everything`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleToggleFavorite = async (e, categoryId, productId) => {
    e.stopPropagation();

    setCategories((prevCategories) =>
      prevCategories.map((cat) => {
        if (cat.id !== categoryId) return cat;
        return {
          ...cat,
          products: cat.products.map((p) =>
            p.id === productId ? { ...p, is_favorite: !p.is_favorite } : p,
          ),
        };
      }),
    );

    try {
      await axios.post(
        `${API_BASE}/api/favorites/toggle/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };

  return (
    <Box sx={{ bgcolor: "#fbfcfb", minHeight: "100vh", pb: 10 }} dir="ltr">
      {/* Hero Section & Search */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          background: "linear-gradient(to bottom, #e8f5e9, #fbfcfb)",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
            نقاء <span style={{ color: "#388e3c" }}>الطبيعي</span>
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4 }}>
            Premium Handmade Soaps & Organic Skin Care
          </Typography>
          <TextField
            fullWidth
            placeholder="Search for a product..."
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: 10, bgcolor: "white" },
            }}
            sx={{ maxWidth: 600 }}
          />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ mt: 4 }}>
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <Skeleton
                  variant="rectangular"
                  height={350}
                  sx={{ borderRadius: 6 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          categories.map((cat) => {
            const filteredProducts = cat.products?.filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase()),
            );
            if (!filteredProducts?.length) return null;

            return (
              <Box key={cat.id} sx={{ mb: 6 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    mb: 4,
                    pl: 2,
                    borderLeft: "5px solid #388e3c", // Border on the left for LTR
                  }}
                >
                  {cat.name}
                </Typography>
                <Grid container spacing={3}>
                  {filteredProducts.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                      <Fade in timeout={500}>
                        <StyledCard
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          <Box sx={{ position: "relative" }}>
                            <ProductImage
                              src={
                                product.image
                                  ? product.image.replace(
                                      "localhost",
                                      "127.0.0.1:8000",
                                    )
                                  : null
                              }
                              alt={product.name}
                              loading="lazy"
                            />

                            <IconButton
                              onClick={(e) =>
                                handleToggleFavorite(e, cat.id, product.id)
                              }
                              sx={{
                                position: "absolute",
                                top: 12,
                                right: 12, // Heart icon on the top-right
                                bgcolor: "rgba(255,255,255,0.85)",
                                backdropFilter: "blur(4px)",
                                "&:hover": { bgcolor: "white" },
                              }}
                            >
                              {product.is_favorite ? (
                                <Favorite sx={{ color: "#d32f2f" }} />
                              ) : (
                                <FavoriteBorder sx={{ color: "#757575" }} />
                              )}
                            </IconButton>
                          </Box>

                          <CardContent sx={{ p: 2.5 }}>
                            <Typography
                              variant="caption"
                              color="primary"
                              sx={{
                                fontWeight: 800,
                                textTransform: "uppercase",
                              }}
                            >
                              {product.weight}g
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 800,
                                mt: 0.5,
                                height: "1.5em",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {product.name}
                            </Typography>

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              sx={{ mt: 3 }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: 900,
                                  color: "#2e7d32",
                                  fontSize: "1.3rem",
                                }}
                              >
                                ${product.price}
                              </Typography>
                              <Button
                                variant="contained"
                                sx={{
                                  bgcolor: "#1a1a1a",
                                  minWidth: 48,
                                  height: 48,
                                  borderRadius: "14px",
                                  "&:hover": { bgcolor: "#333" },
                                }}
                              >
                                <LocalMallOutlined fontSize="small" />
                              </Button>
                            </Stack>
                          </CardContent>
                        </StyledCard>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            );
          })
        )}
      </Container>
    </Box>
  );
}
