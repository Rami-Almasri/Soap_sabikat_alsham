import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Container,
  Stack,
  Avatar,
  IconButton,
  Skeleton,
  Paper,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetils, setOrderDetils] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/orderdetils/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setOrderDetils(res.data.data);
        const total = res.data.data.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        setTotalPrice(total);
        setLoading(false);
        console.log(res.data.data);
        console.log(id);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "#050c08", p: 4 }}>
        <Skeleton
          variant="text"
          width="40%"
          height={60}
          sx={{ bgcolor: "rgba(255,255,255,0.05)", mx: "auto" }}
        />
        <Grid container spacing={3} mt={4}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ borderRadius: 6, bgcolor: "rgba(255,255,255,0.05)" }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #1b3d2f 0%, #050c08 100%)",
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Back Button */}
        <IconButton
          onClick={() => navigate(-1)}
          sx={{ color: "#4caf50", mb: 4, bgcolor: "rgba(255,255,255,0.03)" }}
        >
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </IconButton>

        {/* Header Section */}
        <Stack alignItems="center" spacing={2} sx={{ mb: 6 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(76, 175, 80, 0.1)",
              color: "#4caf50",
              width: 70,
              height: 70,
            }}
          >
            <ReceiptLongRoundedIcon sx={{ fontSize: 35 }} />
          </Avatar>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{ color: "#fff", letterSpacing: -1 }}
          >
            تفاصيل <span style={{ color: "#4caf50" }}>الطلب</span>
          </Typography>
          <Chip
            label={`رقم المرجع: #${id}`}
            sx={{
              bgcolor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.7)",
              fontWeight: "bold",
            }}
          />
        </Stack>

        {/* Total Price Card */}
        <Paper
          elevation={0}
          sx={{
            mb: 6,
            p: 4,
            borderRadius: 8,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0,0,0,0) 100%)",
            border: "1px solid rgba(76, 175, 80, 0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "rgba(255,255,255,0.6)", mb: 1 }}
          >
            المبلغ الإجمالي المستحق
          </Typography>
          <Typography
            variant="h2"
            fontWeight="900"
            sx={{
              color: "#4caf50",
              textShadow: "0 0 20px rgba(76, 175, 80, 0.4)",
            }}
          >
            ${totalPrice.toLocaleString()}
          </Typography>
        </Paper>

        {/* Products Grid */}
        <Typography
          variant="h5"
          fontWeight="700"
          sx={{
            color: "#fff",
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ShoppingBagOutlinedIcon sx={{ color: "#4caf50" }} /> المنتجات في هذا
          الطلب
        </Typography>

        <Grid container spacing={3}>
          {orderDetils.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  borderRadius: 7,
                  height: "100%",
                  bgcolor: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    borderColor: "#4caf50",
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    mb={3}
                  >
                    <Avatar
                      src={item.product?.image?.replace(
                        "localhost",
                        "127.0.0.1:8000",
                      )}
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 4,
                        bgcolor: "rgba(255,255,255,0.05)",
                      }}
                    />
                    <Chip
                      label={`x${item.quantity}`}
                      sx={{
                        bgcolor: "#4caf50",
                        color: "#000",
                        fontWeight: "900",
                      }}
                    />
                  </Stack>

                  <Typography
                    variant="h6"
                    fontWeight="800"
                    sx={{ color: "#fff", mb: 1, minHeight: 64 }}
                  >
                    {item.product?.name}
                  </Typography>

                  <Divider
                    sx={{ mb: 2, borderColor: "rgba(255,255,255,0.05)" }}
                  />

                  <Stack spacing={1}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        سعر القطعة:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#fff", fontWeight: "700" }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "#4caf50", fontWeight: "700" }}
                      >
                        المجموع:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#4caf50", fontWeight: "900" }}
                      >
                        ${(item.price * item.quantity).toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
