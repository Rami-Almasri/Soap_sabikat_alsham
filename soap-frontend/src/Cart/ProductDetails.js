import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Container,
  Grid,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Skeleton,
  Stack,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/products/show/${id}`)
      .then((res) => {
        setProduct(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const notify = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleAddCart = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/carts/",
        { product_id: product.id, quantity: qty },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => notify(res.data.message || "تمت الإضافة للسلة!"))
      .catch((err) =>
        notify(err.response?.data?.message || "فشلت الإضافة", "error"),
      );
  };

  if (loading)
    return (
      <Container sx={{ py: 10 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Skeleton
              variant="rectangular"
              height={450}
              sx={{ borderRadius: 6 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="30%" height={30} />
            <Skeleton variant="text" width="80%" height={80} />
            <Skeleton
              variant="rectangular"
              height={150}
              sx={{ my: 2, borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="50%"
              height={50}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
        </Grid>
      </Container>
    );

  if (!product)
    return (
      <Typography align="center" sx={{ mt: 10 }}>
        المنتج غير موجود
      </Typography>
    );

  return (
    <Box sx={{ bgcolor: "#fcfcfc", minHeight: "100vh", pb: 10 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 5 } }}>
        {/* زر العودة */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 4,
            color: "text.secondary",
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Shop
        </Button>

        <Grid container spacing={6} alignItems="flex-start">
          {/* قسم الصورة بحجم ثابت ومنظم */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                width: "100%",
                height: { xs: 350, md: 500 }, // الارتفاع الثابت الذي طلبته
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #eee",
                boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // لضمان عدم تمطط الصورة
                  transition: "transform 0.6s ease",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />
            </Paper>
          </Grid>

          {/* قسم المعلومات */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 2 } }}>
              <Typography
                variant="overline"
                sx={{ color: "#4caf50", fontWeight: 800, letterSpacing: 1.5 }}
              >
                {product.category?.name || "Premium Quality"}
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  mb: 2,
                  mt: 1,
                  color: "#2d3436",
                  lineHeight: 1.2,
                }}
              >
                {product.name || "Product Name"}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: "#2e7d32" }}
                >
                  ${product.price}
                </Typography>
                <Chip
                  label={product.stock > 0 ? "In Stock" : "Out of Stock"}
                  color={product.stock > 0 ? "success" : "error"}
                  size="small"
                  sx={{ fontWeight: "bold", borderRadius: 1 }}
                />
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  color: "#636e72",
                  lineHeight: 1.8,
                  mb: 4,
                  fontSize: "1.1rem",
                }}
              >
                {product.description ||
                  "No description provided for this premium item. Experience high quality and durability with our latest collection."}
              </Typography>

              <Divider sx={{ mb: 4 }} />

              {/* المواصفات السريعة */}
              <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    gutterBottom
                  >
                    WEIGHT
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {product.weight}g
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    gutterBottom
                  >
                    AVALIABILITY
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {product.stock} Units
                  </Typography>
                </Box>
              </Box>

              {/* الفوائد Badges */}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 5 }}>
                {product.benefits?.map((b, i) => (
                  <Chip
                    key={i}
                    label={b.name}
                    sx={{
                      bgcolor: "#e8f5e9",
                      color: "#2e7d32",
                      fontWeight: 600,
                    }}
                  />
                ))}
              </Box>

              {/* التحكم والطلب */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                alignItems="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#f1f2f6",
                    borderRadius: 3,
                    p: 0.5,
                  }}
                >
                  <IconButton
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    size="large"
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography
                    sx={{ px: 3, fontWeight: 800, fontSize: "1.2rem" }}
                  >
                    {qty}
                  </Typography>
                  <IconButton
                    onClick={() => qty < product.stock && setQty(qty + 1)}
                    size="large"
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  disabled={product.stock <= 0}
                  onClick={handleAddCart}
                  sx={{
                    py: 2,
                    borderRadius: 4,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    textTransform: "none",
                    bgcolor: "#4caf50",
                    "&:hover": { bgcolor: "#388e3c" },
                    boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  Add To Cart
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* التنبيهات */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%", borderRadius: 3 }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
