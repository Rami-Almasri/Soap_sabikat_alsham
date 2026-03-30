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
  Chip,
  Skeleton,
  Fade,
  Stack,
} from "@mui/material";
import {
  Search,
  LocalMallOutlined,
  Favorite,
  DeleteOutlineRounded,
  HeartBrokenOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// --- التنسيقات ---
const HeroSection = styled(Box)({
  background: "linear-gradient(135deg, #f1f8e9 0%, #ffffff 100%)",
  padding: "40px 0",
  textAlign: "center",
  borderBottom: "1px solid rgba(0,0,0,0.03)",
});

const StyledCard = styled(Card)({
  height: "100%",
  borderRadius: "28px",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  transition: "all 0.4s ease",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 40px rgba(56, 142, 60, 0.12)",
  },
});

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]); // هاد رح يخزن الـ favorites اللي فيها الـ product
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return navigate("/login");

    axios
      .get("http://127.0.0.1:8000/api/favorites/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // ركز هون: الـ Controller تبعك بيرجع مصفوفة مباشرة
        // الداتا هي res.data
        setFavorites(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching favorites:", err);
        setLoading(false);
      });
  }, [navigate, token]);

  // دالة الحذف من المفضلة
  const removeFavorite = (id, e) => {
    e.stopPropagation();
    axios
      .delete(`http://127.0.0.1:8000/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setFavorites(favorites.filter((fav) => fav.id !== id));
      })
      .catch((err) => console.log(err));
  };

  // الفلترة بناءً على اسم المنتج جوا الـ favorite
  const filteredFavs = favorites.filter((fav) =>
    fav.product?.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box sx={{ bgcolor: "#fbfcfb", minHeight: "100vh", pb: 10 }} dir="rtl">
      <HeroSection>
        <Container maxWidth="md">
          <Chip
            icon={
              <Favorite sx={{ color: "#d32f2f !important", fontSize: 16 }} />
            }
            label="منتجاتك المختارة"
            sx={{
              mb: 2,
              bgcolor: "rgba(211, 47, 47, 0.08)",
              color: "#d32f2f",
              fontWeight: 700,
            }}
          />
          <Typography variant="h4" sx={{ fontWeight: 900, mb: 3 }}>
            قائمة <span style={{ color: "#388e3c" }}>المفضلات</span>
          </Typography>

          <TextField
            fullWidth
            placeholder="ابحث في مفضلاتك..."
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: "500px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
                bgcolor: "white",
              },
            }}
          />
        </Container>
      </HeroSection>

      <Container maxWidth="xl" sx={{ mt: 6 }}>
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((i) => (
              <Grid item key={i} xs={12} sm={6} md={3}>
                <Skeleton
                  variant="rectangular"
                  height={400}
                  sx={{ borderRadius: 7 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : filteredFavs.length > 0 ? (
          <Grid container spacing={3}>
            {filteredFavs.map((fav) => {
              const item = fav.product; // هون عم نسحب المنتج من جوا الـ favorite
              if (!item) return null;

              return (
                <Grid item key={fav.id} xs={12} sm={6} md={4} lg={3}>
                  <Fade in timeout={500}>
                    <StyledCard onClick={() => navigate(`/product/${item.id}`)}>
                      <Box
                        sx={{
                          height: 220,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={
                            item.image?.replace(
                              "localhost",
                              "127.0.0.1:8000",
                            ) || "https://via.placeholder.com/400"
                          }
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <IconButton
                          onClick={(e) => removeFavorite(fav.id, e)}
                          sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            bgcolor: "white",
                            "&:hover": { bgcolor: "#fff0f0" },
                          }}
                        >
                          <DeleteOutlineRounded color="error" />
                        </IconButton>
                      </Box>

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: "#388e3c", fontWeight: 700 }}
                        >
                          {item.weight} غرام
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 800, mb: 1 }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ height: 40, overflow: "hidden" }}
                        >
                          {item.description}
                        </Typography>

                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          sx={{ mt: 2 }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 900,
                              fontSize: "1.1rem",
                              color: "#1b5e20",
                            }}
                          >
                            {item.price} <small>ل.س</small>
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              bgcolor: "#1a1a1a",
                              minWidth: 40,
                              height: 40,
                              borderRadius: 2,
                            }}
                          >
                            <LocalMallOutlined fontSize="small" />
                          </Button>
                        </Stack>
                      </CardContent>
                    </StyledCard>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <HeartBrokenOutlined sx={{ fontSize: 60, color: "#ccc" }} />
            <Typography sx={{ mt: 2 }}>مفضلاتك فارغة حالياً</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
