import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handellogin() {
    axios
      .post("http://127.0.0.1:8000/api/auth/login", {
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        setSuccess(res.data.msg || "Login successful!");
        const token = res.data.data.token; // صححت المسار

        localStorage.setItem("token", token);

        setTimeout(() => setSuccess(""), 4000);

        // تحويل المستخدم للصفحة الرئيسية
        navigate("/"); // بدل window.location.href
      })
      .catch((err) => {
        console.log(err.response); // ✅ أضف هذا لفحص الرد
        const data = err.response?.data;

        let message = "Login failed";

        if (data?.msg) {
          if (typeof data.msg === "string") {
            message = data.msg;
          } else if (typeof data.msg === "object") {
            message = Object.values(data.msg).flat().join(" | ");
          }
        }

        setError(message);
        setSuccess("");
        setTimeout(() => setError(""), 4000);
      });
  }
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        bgcolor: "#efe7d6",
      }}
    >
      {/* LEFT SIDE */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 380,
            bgcolor: "white",
            p: 5,
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "#5a6b4f",
              fontWeight: "bold",
            }}
          >
            sabikat alsham
          </Typography>

          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "#5a6b4f",
              fontWeight: "500",
            }}
          >
            Login
          </Typography>
          {/* Alerts */}
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          >
            <TextField
              required
              label="Email or Username"
              variant="outlined"
              onChange={(event) => {
                setInput({ ...input, email: event.target.value });
              }}
            />
            <TextField
              required
              label="Password"
              variant="outlined"
              type="password"
              onChange={(event) => {
                setInput({ ...input, password: event.target.value });
              }}
            />

            <Button
              onClick={handellogin}
              variant="contained"
              sx={{
                bgcolor: "#5a6b4f",
                borderRadius: "25px",
                py: 1.2,
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#47563e",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#efe7d6",
          p: 5,
          gap: 3,
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec"
          sx={{
            width: "80%",
            borderRadius: 3,
            mb: 2,
            boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
          }}
        />
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a6b4f" }}>
          100% Natural & Organic
        </Typography>
        <Typography sx={{ color: "#5a6b4f", textAlign: "center" }}>
          Vegan or cruelty-free | Antibacterial <br />
          Customizable scents | Handmade
        </Typography>
      </Box>
    </Box>
  );
}
