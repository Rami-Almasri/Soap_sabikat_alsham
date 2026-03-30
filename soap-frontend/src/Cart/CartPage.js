import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Paper,
  Container,
  Divider,
  Stack,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
  Fade,
  Zoom,
} from "@mui/material";
import {
  AddRounded,
  RemoveRounded,
  DeleteOutlineRounded,
  ShoppingCartCheckoutRounded,
  ArrowBackIosNewRounded,
  LocalMallOutlined,
  ReceiptLongOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); // المنطق القديم للتحميل
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const notify = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // جلب البيانات
  const fetchCart = useCallback(() => {
    if (!token) return navigate("/login");
    axios
      .get("http://127.0.0.1:8000/api/carts/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCart(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token, navigate]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // --- منطق تعديل الكمية القديم (الذي طلبته) ---
  const updateQuantityApi = (id, newQty) => {
    if (newQty < 1) return;
    setProcessingId(id); // قفل الأزرار لهذا المنتج تحديداً
    axios
      .put(
        `http://127.0.0.1:8000/api/carts/update/${id}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then((res) => {
        fetchCart();
        notify(res.data.message, "info");
        setProcessingId(null);
      })
      .catch((res) => {
        setProcessingId(null);
        notify(res.response?.data?.message, "error");
      });
  };

  const removeItemApi = (id) => {
    setProcessingId(id);
    axios
      .delete(`http://127.0.0.1:8000/api/carts/destroy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        notify("تم الحذف من السلة", "success");
        fetchCart();
        setProcessingId(null);
      })
      .catch(() => setProcessingId(null));
  };

  const makeOrder = () => {
    if (cart.length === 0) return notify("السلة فارغة!", "error");

    const orderData = {
      cart: cart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: subTotal,
    };

    axios
      .post("http://127.0.0.1:8000/api/orderdetils/", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        notify("تم تأكيد طلبك بنجاح!", "success");
        setCart([]);
      })
      .catch((err) =>
        notify(err.response?.data?.message || "خطأ في الطلب", "error"),
      );
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#0a0a0a",
        }}
      >
        <CircularProgress sx={{ color: "#4caf50" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        direction: "rtl",
        background:
          "radial-gradient(circle at top right, #1a2e1a 0%, #050505 100%)",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        {/* Navigation */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          <Button
            startIcon={<ArrowBackIosNewRounded sx={{ fontSize: 16, ml: 1 }} />}
            onClick={() => navigate(-1)}
            sx={{
              color: "rgba(255,255,255,0.6)",
              "&:hover": { color: "#fff" },
              fontWeight: "bold",
            }}
          >
            العودة
          </Button>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{ letterSpacing: "-2px" }}
          >
            سلة <span style={{ color: "#4caf50" }}>التسوق</span>
          </Typography>
        </Stack>

        <Grid container spacing={6}>
          {/* قائمة المنتجات */}
          <Grid item xs={12} md={8}>
            {cart.length === 0 ? (
              <Zoom in>
                <Paper
                  sx={{
                    p: 8,
                    textAlign: "center",
                    borderRadius: 10,
                    bgcolor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <LocalMallOutlined
                    sx={{ fontSize: 80, mb: 2, color: "rgba(255,255,255,0.1)" }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    السلة فارغة
                  </Typography>
                </Paper>
              </Zoom>
            ) : (
              <Stack spacing={4}>
                {cart.map((item) => (
                  <Fade in key={item.id}>
                    <Box
                      sx={{
                        position: "relative",
                        p: 3,
                        borderRadius: "40px",
                        bgcolor:
                          processingId === item.id
                            ? "rgba(76, 175, 80, 0.05)"
                            : "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        transition: "0.4s ease",
                        opacity: processingId === item.id ? 0.7 : 1, // تمويه بسيط عند التحديث
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.06)",
                          transform: "scale(1.01)",
                          borderColor: "rgba(76, 175, 80, 0.3)",
                        },
                      }}
                    >
                      {/* عرض الصورة 3D */}
                      <Box
                        sx={{
                          width: 150,
                          height: 150,
                          ml: 4,
                          position: "relative",
                          perspective: "1000px",
                        }}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "35px",
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)",
                            backdropFilter: "blur(10px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                            "&:hover": {
                              transform: "rotateY(-20deg) rotateX(10deg)",
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={
                              item.product.image?.replace(
                                "localhost",
                                "127.0.0.1:8000",
                              ) || "https://via.placeholder.com/150"
                            }
                            sx={{
                              width: "85%",
                              height: "85%",
                              objectFit: "contain",
                              filter:
                                "drop-shadow(0 15px 15px rgba(0,0,0,0.4))",
                            }}
                          />
                        </Box>
                      </Box>

                      {/* معلومات المنتج */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          fontWeight="800"
                          sx={{ mb: 1 }}
                        >
                          {item.product.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: "#4caf50", mb: 2, fontWeight: "900" }}
                        >
                          ${item.product.price}
                        </Typography>

                        {/* أزرار التحكم بالكمية (المنطق القديم) */}
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton
                            onClick={() =>
                              updateQuantityApi(item.id, item.quantity - 1)
                            }
                            disabled={
                              processingId === item.id || item.quantity <= 1
                            }
                            sx={{
                              color: "#fff",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <RemoveRounded fontSize="small" />
                          </IconButton>

                          {processingId === item.id ? (
                            <CircularProgress
                              size={20}
                              sx={{ mx: 2, color: "#4caf50" }}
                            />
                          ) : (
                            <Typography
                              sx={{
                                px: 3,
                                fontSize: "1.2rem",
                                fontWeight: "bold",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                          )}

                          <IconButton
                            onClick={() =>
                              updateQuantityApi(item.id, item.quantity + 1)
                            }
                            disabled={processingId === item.id}
                            sx={{
                              color: "#fff",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <AddRounded fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Box>

                      {/* السعر والحذف */}
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          variant="h4"
                          fontWeight="900"
                          sx={{ mb: 2 }}
                        >
                          $
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </Typography>
                        <IconButton
                          onClick={() => removeItemApi(item.id)}
                          disabled={processingId === item.id}
                          sx={{
                            color: "rgba(255,82,82,0.8)",
                            bgcolor: "rgba(255,82,82,0.05)",
                            "&:hover": { bgcolor: "#FF5252", color: "#fff" },
                          }}
                        >
                          <DeleteOutlineRounded />
                        </IconButton>
                      </Box>
                    </Box>
                  </Fade>
                ))}
              </Stack>
            )}
          </Grid>

          {/* ملخص الفاتورة الزجاجي */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                position: "sticky",
                top: 40,
                p: 4,
                borderRadius: "40px",
                background:
                  "linear-gradient(180deg, rgba(76, 175, 80, 0.15) 0%, rgba(0,0,0,0) 100%)",
                border: "1px solid rgba(76, 175, 80, 0.3)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <ReceiptLongOutlined sx={{ color: "#4caf50" }} />
                <Typography variant="h5" fontWeight="800">
                  تفاصيل الفاتورة
                </Typography>
              </Stack>

              <Stack spacing={3} sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    opacity: 0.7,
                  }}
                >
                  <Typography>المجموع</Typography>
                  <Typography fontWeight="bold">
                    ${subTotal.toLocaleString()}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h5">الإجمالي النهائي</Typography>
                  <Typography variant="h4" fontWeight="900" color="#4caf50">
                    ${subTotal.toLocaleString()}
                  </Typography>
                </Box>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                onClick={makeOrder}
                startIcon={<ShoppingCartCheckoutRounded sx={{ ml: 1 }} />}
                sx={{
                  py: 2.5,
                  borderRadius: "20px",
                  bgcolor: "#4caf50",
                  color: "#000",
                  fontWeight: "900",
                  fontSize: "1.1rem",
                  "&:hover": {
                    bgcolor: "#66bb6a",
                    transform: "translateY(-5px)",
                  },
                  transition: "0.3s",
                }}
              >
                تأكيد الشراء
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            severity={snackbar.severity}
            sx={{ width: "100%", borderRadius: "15px" }}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
