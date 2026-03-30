import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import TableChartIcon from "@mui/icons-material/TableChart";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import MapIcon from "@mui/icons-material/Map";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import pic1 from "./pic1.jpg";
import dash from "./dash.avif";
const menuItems = [
  { text: "DASHBOARD", icon: <DashboardIcon /> },
  { text: "USER PROFILE", icon: <PersonIcon /> },
  { text: "TABLE LIST", icon: <TableChartIcon /> },
  { text: "TYPOGRAPHY", icon: <TextFieldsIcon /> },
  { text: "ICONS", icon: <EmojiObjectsIcon /> },
  { text: "MAPS", icon: <MapIcon /> },
  { text: "NOTIFICATIONS", icon: <NotificationsIcon /> },
];

export default function Sidebar() {
  return (
    <div display="flex">
      <Box
        sx={{
          width: { xs: "200px", md: "250px" },
          height: "100vh",
          backgroundImage: `url(${dash})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          paddingTop: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            mb: 4,
          }}
        >
          CREATIVE TIM
        </Typography>

        {menuItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              mb: 1,
            }}
          >
            {item.icon}
            <Typography sx={{ fontWeight: 500 }}>{item.text}</Typography>
          </Box>
        ))}

        <Box sx={{ flexGrow: 1 }} />

        {/* Upgrade Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: "10px 20px",
            backgroundColor: "rgba(255,255,255,0.2)",
            borderRadius: 1,
            marginBottom: 2,
            cursor: "pointer",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <UpgradeIcon />
          <Typography sx={{ fontWeight: 500 }}>UPGRADE TO PRO</Typography>
        </Box>
      </Box>
    </div>
  );
}
