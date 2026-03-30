import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Avatar,
  Stack,
  IconButton,
  Fade,
  Divider,
  CircularProgress,
} from "@mui/material";
// أيقونات
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import AdminPanelSettingsTwoToneIcon from "@mui/icons-material/AdminPanelSettingsTwoTone";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const [edituser, setEditUser] = useState({ id: "", name: "", email: "" });

  // ستايل الحقول (Textfields)
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "#4caf50" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
  };

  // ================= جلب البيانات =================
  const getUsers = useCallback(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/user/allusers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setUsers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // ================= العمليات =================
  const handleEdit = (user) => {
    setEditUser({ id: user.id, name: user.name, email: user.email });
    setOpen(true);
  };

  const updateuser = () => {
    axios
      .put(
        `http://127.0.0.1:8000/api/user/update/${edituser.id}`,
        { name: edituser.name, email: edituser.email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        setSuccess("تم تحديث بيانات المستخدم بنجاح ✨");
        setOpen(false);
        getUsers();
      })
      .catch((err) =>
        setError(err.response?.data?.message || "خطأ في التحديث"),
      );
  };

  const deleteUser = (id) => {
    if (
      window.confirm(
        "هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.",
      )
    ) {
      axios
        .delete(`http://127.0.0.1:8000/api/user/destroy/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          setSuccess("تم حذف المستخدم بنجاح");
          getUsers();
        })
        .catch((err) =>
          setError(err.response?.data?.message || "خطأ في الحذف"),
        );
    }
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          bgcolor: "#050c05",
        }}
      >
        <CircularProgress sx={{ color: "#4caf50" }} />
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 4,
        direction: "rtl",
        background:
          "radial-gradient(circle at top right, #1b3d2f 0%, #050c08 100%)",
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 6 }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight="900"
            sx={{ color: "#fff", letterSpacing: -1 }}
          >
            إدارة <span style={{ color: "#4caf50" }}>المستخدمين</span>
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>
            التحكم في صلاحيات وبيانات أعضاء النظام
          </Typography>
        </Box>
        <AdminPanelSettingsTwoToneIcon
          sx={{ color: "#4caf50", fontSize: 50, opacity: 0.8 }}
        />
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: "12px" }}>
          {success}
        </Alert>
      )}

      {/* Users Grid */}
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
            <Fade in timeout={500}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  p: 3,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    borderColor: "#4caf50",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    margin: "auto",
                    mb: 2,
                    bgcolor: "#4caf50",
                    color: "#000",
                    fontSize: 32,
                    fontWeight: "bold",
                    boxShadow: "0 0 20px rgba(76, 175, 80, 0.3)",
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                  variant="h6"
                  fontWeight="800"
                  sx={{ color: "#fff" }}
                >
                  {user.name}
                </Typography>

                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  sx={{ mt: 1, mb: 3 }}
                >
                  <MailTwoToneIcon
                    sx={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {user.email}
                  </Typography>
                </Stack>

                <Divider
                  sx={{ borderColor: "rgba(255,255,255,0.05)", mb: 2 }}
                />

                <Stack direction="row" spacing={1}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleEdit(user)}
                    startIcon={<EditTwoToneIcon sx={{ ml: 1 }} />}
                    sx={{
                      bgcolor: "rgba(76, 175, 80, 0.1)",
                      color: "#4caf50",
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#4caf50", color: "#000" },
                    }}
                  >
                    تعديل
                  </Button>
                  <IconButton
                    onClick={() => deleteUser(user.id)}
                    sx={{
                      bgcolor: "rgba(255, 82, 82, 0.1)",
                      color: "#ff5252",
                      borderRadius: "10px",
                    }}
                  >
                    <DeleteSweepTwoToneIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: "#0a1a10",
            color: "#fff",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
            minWidth: "400px",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", pt: 3 }}>
          تحديث بيانات العضو
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}
        >
          <TextField
            fullWidth
            label="اسم المستخدم"
            sx={fieldStyle}
            value={edituser.name}
            onChange={(e) => setEditUser({ ...edituser, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            sx={fieldStyle}
            value={edituser.email}
            onChange={(e) =>
              setEditUser({ ...edituser, email: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center", gap: 2 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{ color: "rgba(255,255,255,0.5)" }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            onClick={updateuser}
            sx={{
              bgcolor: "#4caf50",
              color: "#000",
              fontWeight: "bold",
              px: 4,
            }}
          >
            حفظ التغييرات
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
