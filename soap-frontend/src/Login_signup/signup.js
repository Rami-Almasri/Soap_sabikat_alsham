import { Typography, Box, TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handelSignup() {
    axios
      .post("http://127.0.0.1:8000/api/auth/signup", input)
      .then((res) => {
        setSuccess(res.data.msg || "Signup successful!");
        setError("");

        // إعادة تهيئة الحقول
        setInput({ username: "", email: "", password: "" });

        setTimeout(() => setSuccess(""), 4000);
        navigate("/login"); // اخفاء الرسالة بعد 4 ثواني
      })
      .catch((err) => {
        const data = err.response?.data;

        let message = "Signup failed";

        if (data?.msg) {
          if (typeof data.msg === "string") {
            message = data.msg;
          } else if (typeof data.msg === "object") {
            // إذا رجع كائن validation، حوله إلى نص
            message = Object.values(data.msg).flat().join(" | "); // أو \n حسب رغبتك
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
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              mb: 2,
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
            Sign up
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
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          >
            <TextField
              required
              label="Username"
              variant="outlined"
              value={input.username}
              onChange={(event) =>
                setInput({ ...input, name: event.target.value })
              }
            />

            <TextField
              required
              label="Email"
              variant="outlined"
              value={input.email}
              onChange={(event) =>
                setInput({ ...input, email: event.target.value })
              }
            />

            <TextField
              required
              label="Password"
              variant="outlined"
              type="password"
              value={input.password}
              onChange={(event) =>
                setInput({ ...input, password: event.target.value })
              }
            />

            <Button
              onClick={handelSignup}
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
              Continue
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
