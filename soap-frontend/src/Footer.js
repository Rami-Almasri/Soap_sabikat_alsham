import { Box, Typography, Link, Grid } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <Box
      sx={{
        background: "linear-gradient(to top, #e0f7fa, #ffffff)",
        py: 10,
        px: { xs: 3, md: 10 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Bubbles */}
      <Box
        sx={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          backgroundColor: "rgba(139,195,74,0.2)",
          top: "-50px",
          left: "-50px",
          animation: "float 6s ease-in-out infinite alternate",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "rgba(139,195,74,0.15)",
          bottom: "-40px",
          right: "-40px",
          animation: "float 8s ease-in-out infinite alternate",
        }}
      />

      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#558b2f" }}
          >
            About Fresh Soap
          </Typography>
          <Typography color="text.secondary">
            We craft natural soaps with love 🌿. Gentle for your skin and
            eco-friendly. Dive into a world of fragrances and colors!
          </Typography>
        </Grid>

        {/* Links */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#558b2f" }}
          >
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link
              href="#"
              sx={{
                color: "#4caf50",
                "&:hover": {
                  color: "#81c784",
                  transform: "translateX(5px)",
                  transition: "0.3s",
                },
              }}
            >
              Home
            </Link>
            <Link
              href="#"
              sx={{
                color: "#4caf50",
                "&:hover": {
                  color: "#81c784",
                  transform: "translateX(5px)",
                  transition: "0.3s",
                },
              }}
            >
              Shop
            </Link>
            <Link
              href="#"
              sx={{
                color: "#4caf50",
                "&:hover": {
                  color: "#81c784",
                  transform: "translateX(5px)",
                  transition: "0.3s",
                },
              }}
            >
              About
            </Link>
            <Link
              href="#"
              sx={{
                color: "#4caf50",
                "&:hover": {
                  color: "#81c784",
                  transform: "translateX(5px)",
                  transition: "0.3s",
                },
              }}
            >
              Contact
            </Link>
          </Box>
        </Grid>

        {/* Social */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: "#558b2f" }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <InstagramIcon
              sx={{
                color: "#4caf50",
                fontSize: 30,
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.3) rotate(10deg)",
                  color: "#81c784",
                  transition: "0.3s",
                },
              }}
            />
            <FacebookIcon
              sx={{
                color: "#4caf50",
                fontSize: 30,
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.3) rotate(10deg)",
                  color: "#81c784",
                  transition: "0.3s",
                },
              }}
            />
            <TwitterIcon
              sx={{
                color: "#4caf50",
                fontSize: 30,
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.3) rotate(10deg)",
                  color: "#81c784",
                  transition: "0.3s",
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>

      <Typography
        sx={{
          textAlign: "center",
          mt: 6,
          color: "text.secondary",
          fontSize: 13,
        }}
      >
        © 2026 Fresh Soap Store. Natural, gentle & delightful.
      </Typography>

      {/* Float Animation Keyframes */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            100% { transform: translateY(20px); }
          }
        `}
      </style>
    </Box>
  );
}
