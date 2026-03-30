import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Paper,
  TableContainer,
  Avatar,
  IconButton,
  Tooltip,
  Grid,
  Card,
  CardContent,
  Stack,
  Fade,
  Zoom,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  VisibilityOutlined,
  LocalMallOutlined,
  TrendingUpRounded,
  AccessTimeRounded,
  CheckCircleOutlineRounded,
  SpaOutlined,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/orderdetils/getallorders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setOrders(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return {
          color: "#2e7d32",
          bg: "rgba(46, 125, 50, 0.12)",
          label: "Delivered",
          icon: <CheckCircleOutlineRounded sx={{ fontSize: 16 }} />,
        };
      case "cancelled":
        return {
          color: "#d32f2f",
          bg: "rgba(211, 47, 47, 0.12)",
          label: "Cancelled",
          icon: <RemoveCircleOutlineRounded sx={{ fontSize: 16 }} />,
        };
      default:
        return {
          color: "#388e3c",
          bg: "rgba(56, 142, 60, 0.12)",
          label: "Pending",
          icon: <AccessTimeRounded sx={{ fontSize: 16 }} />,
        };
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        bgcolor: "#fbfcfb",
        minHeight: "100vh",
        direction: "ltr",
      }}
    >
      {/* --- Header Section (LTR) --- */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        sx={{ mb: 6 }}
      >
        <Box>
          <Chip
            icon={<SpaOutlined sx={{ color: "#388e3c !important" }} />}
            label="Management Console"
            sx={{
              mb: 1.5,
              bgcolor: "rgba(56, 142, 60, 0.1)",
              color: "#388e3c",
              fontWeight: 800,
            }}
          />
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, color: "#1a1a1a", letterSpacing: "-1.5px" }}
          >
            Orders <span style={{ color: "#388e3c" }}>Dashboard</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#666", mt: 1, fontWeight: 500 }}
          >
            Real-time overview of your store's commercial activities.
          </Typography>
        </Box>
        <Avatar
          sx={{
            bgcolor: "#1a1a1a",
            width: 56,
            height: 56,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
        >
          <LocalMallOutlined />
        </Avatar>
      </Stack>

      {/* --- Summary Cards --- */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            title="Total Orders"
            value={orders.length}
            icon={<LocalMallOutlined sx={{ color: "#388e3c" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            title="Active Orders"
            value={
              orders.filter((o) => !o.status || o.status === "pending").length
            }
            icon={<AccessTimeRounded sx={{ color: "#388e3c" }} />}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            title="Net Revenue"
            value={`${orders.reduce((sum, o) => sum + Number(o.total_price), 0).toLocaleString()} SYP`}
            icon={<TrendingUpRounded sx={{ color: "#388e3c" }} />}
          />
        </Grid>
      </Grid>

      {/* --- Main Table Section --- */}
      <Fade in timeout={800}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: "32px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.03)",
            border: "1px solid rgba(0,0,0,0.05)",
            bgcolor: "white",
            overflow: "hidden",
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid #f5f5f5" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#1a1a1a" }}>
              Recent Transactions
            </Typography>
          </Box>
          <Table>
            <TableHead sx={{ bgcolor: "#fafafa" }}>
              <TableRow>
                {[
                  "Order ID",
                  "Customer",
                  "Total Amount",
                  "Status",
                  "Date",
                  "Action",
                ].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      color: "#888",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      py: 2.5,
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {orders.map((order) => {
                const style = getStatusStyle(order.status);
                return (
                  <TableRow
                    key={order.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "#fbfcfb !important" },
                      transition: "0.2s",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 800, color: "#388e3c" }}>
                      #{order.id}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: "rgba(56, 142, 60, 0.1)",
                            color: "#388e3c",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                          }}
                        >
                          {order.user?.name?.charAt(0) || "U"}
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{
                              fontWeight: 800,
                              color: "#1a1a1a",
                              fontSize: "0.9rem",
                            }}
                          >
                            {order.user?.name || "Unknown Customer"}
                          </Typography>
                          <Typography
                            sx={{ color: "#999", fontSize: "0.75rem" }}
                          >
                            {order.user?.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ fontWeight: 900, color: "#1a1a1a" }}>
                      {Number(order.total_price).toLocaleString()}{" "}
                      <span style={{ fontSize: "0.7rem", color: "#888" }}>
                        SYP
                      </span>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={style.icon}
                        label={style.label}
                        sx={{
                          bgcolor: style.bg,
                          color: style.color,
                          fontWeight: 800,
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          "& .MuiChip-label": { px: 1.5 },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color: "#666",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        }}
                      >
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Order Details">
                        <IconButton
                          onClick={() => navigate(`/order/${order.id}`)}
                          sx={{
                            bgcolor: "#f0f0f0",
                            color: "#1a1a1a",
                            "&:hover": { bgcolor: "#388e3c", color: "white" },
                            transition: "0.3s",
                          }}
                        >
                          <VisibilityOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Fade>
    </Box>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <Zoom in timeout={500}>
      <Card
        sx={{
          borderRadius: "28px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.02)",
          border: "1px solid rgba(0,0,0,0.04)",
          transition: "0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 20px 40px rgba(56,142,60,0.08)",
          },
        }}
      >
        <CardContent
          sx={{ display: "flex", alignItems: "center", p: "24px !important" }}
        >
          <Avatar
            sx={{
              bgcolor: "rgba(56, 142, 60, 0.08)",
              width: 60,
              height: 60,
              mr: 2,
            }}
          >
            {icon}
          </Avatar>
          <Box>
            <Typography
              sx={{
                color: "#999",
                fontSize: "0.85rem",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ color: "#1a1a1a", fontSize: "1.6rem", fontWeight: 900 }}
            >
              {value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Zoom>
  );
}
