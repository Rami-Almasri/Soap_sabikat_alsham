import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  Chip,
  Avatar,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/orderdetils", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setOrders(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#0a1a10",
        }}
      >
        <CircularProgress sx={{ color: "#4caf50" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, #1b3d2f 0%, #050c08 100%)", // خلفية متدرجة عميقة
        py: 10,
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        {/* Header الرهيب */}
        <Stack spacing={1} sx={{ mb: 6, textAlign: "center" }}>
          <HistoryEduRoundedIcon
            sx={{ fontSize: 50, color: "#4caf50", mx: "auto", mb: 1 }}
          />
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{ color: "#fff", letterSpacing: -1 }}
          >
            سجل <span style={{ color: "#4caf50" }}>المشتريات</span>
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)" }}>
            إجمالي الطلبات المكتملة: {orders.length}
          </Typography>
        </Stack>

        {orders.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 10,
              bgcolor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography color="#fff">لا يوجد سجلات حالياً</Typography>
          </Paper>
        ) : (
          <Stack spacing={2.5}>
            {orders.map((order) => (
              <Paper
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                sx={{
                  p: 3,
                  borderRadius: 6,
                  cursor: "pointer",
                  bgcolor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition:
                    "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.08)",
                    transform: "scale(1.03)",
                    borderColor: "#4caf50",
                    boxShadow:
                      "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(76, 175, 80, 0.2)",
                  },
                }}
              >
                {/* لمسة نيون جانبية */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    bgcolor: "#4caf50",
                  }}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={2.5} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: "rgba(76, 175, 80, 0.15)",
                        color: "#4caf50",
                        width: 50,
                        height: 50,
                      }}
                    >
                      <Inventory2OutlinedIcon />
                    </Avatar>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "rgba(255,255,255,0.4)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        ORDER #{order.id}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#fff", fontWeight: 800 }}
                      >
                        ${parseFloat(order.total_price).toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(255,255,255,0.5)", mb: 1 }}
                    >
                      {new Date(order.created_at).toLocaleDateString("ar-EG", {
                        day: "numeric",
                        month: "short",
                      })}
                    </Typography>
                    <IconButton
                      size="small"
                      sx={{
                        color: "#4caf50",
                        bgcolor: "rgba(255,255,255,0.05)",
                      }}
                    >
                      <ArrowForwardIosRoundedIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Stack>

                <Divider
                  sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.05)" }}
                />

                <Stack direction="row" spacing={1}>
                  <Chip
                    label="تم الشحن"
                    size="small"
                    sx={{
                      bgcolor: "#1b3d2f",
                      color: "#4caf50",
                      fontSize: 10,
                      fontWeight: 900,
                      px: 1,
                    }}
                  />
                  <Chip
                    label="دفع عند الاستلام"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      fontSize: 10,
                      px: 1,
                    }}
                  />
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}

        {/* زر العودة السريع */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Button
            onClick={() => navigate("/")}
            sx={{
              color: "rgba(255,255,255,0.4)",
              textTransform: "none",
              fontSize: 14,
              "&:hover": { color: "#4caf50" },
            }}
          >
            العودة للمتجر الرئيسي
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
