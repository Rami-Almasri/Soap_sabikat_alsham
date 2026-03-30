import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Alert,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  Grid,
  Stack,
  IconButton,
  Fade,
  Container,
} from "@mui/material";
// Icons
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);

  const [editCategory, setEditCategory] = useState({
    id: "",
    name: "",
    Image: null,
    currentImageUrl: "", // لعرض الصورة القديمة أثناء التعديل
  });

  const API_BASE = "http://127.0.0.1:8000/api/categories";

  // Shared Field Style
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "#4caf50" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
  };

  const getCategories = () => {
    axios
      .get(API_BASE)
      .then((res) => setCategories(res.data.data))
      .catch(() => setError("Error loading categories"));
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Add Category
  const addCategory = () => {
    if (!name) return setError("Please enter a category name");
    const form = new FormData();
    form.append("name", name);
    if (image) form.append("image", image);

    axios
      .post(API_BASE, form)
      .then((res) => {
        setName("");
        setImage(null);
        setSuccess("Category added successfully!");
        setError("");
        getCategories();
      })
      .catch((err) => setError(err.response?.data?.message || "Add failed"));
  };

  // Update Category (FIXED)
  const updateCategory = (id) => {
    const form = new FormData();
    form.append("name", editCategory.name);
    if (editCategory.Image) {
      form.append("image", editCategory.Image); // التأكد من كتابة image بـ i صغيرة
    }

    // الحل السحري لمشكلة التحديث في لارافيل مع الصور
    form.append("_method", "PUT");

    axios
      .post(`${API_BASE}/update/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setOpen(false);
        setSuccess("Category updated successfully!");
        setError("");
        getCategories();
      })
      .catch((err) => setError(err.response?.data?.message || "Update failed"));
  };

  const deleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      axios
        .delete(`${API_BASE}/destroy/${id}`)
        .then((res) => {
          setSuccess("Deleted successfully");
          getCategories();
        })
        .catch(() => setError("Delete failed"));
    }
  };

  const handleEditOpen = (cat) => {
    setEditCategory({
      id: cat.id,
      name: cat.name,
      Image: null,
      currentImageUrl: cat.image,
    });
    setOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        direction: "ltr", // تم التعديل لليسار
        background:
          "radial-gradient(circle at top right, #1b3d2f 0%, #050c08 100%)",
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 6 }}
        >
          <Typography variant="h3" fontWeight="900" sx={{ color: "#fff" }}>
            Manage <span style={{ color: "#4caf50" }}>Categories</span>
          </Typography>
        </Stack>

        {/* Quick Add Section */}
        <Box
          sx={{
            p: 3,
            mb: 5,
            bgcolor: "rgba(255,255,255,0.03)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <TextField
            label="New Category Name"
            sx={{ ...fieldStyle, flexGrow: 1 }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
              color: "#4caf50",
              borderColor: "#4caf50",
              height: "56px",
              borderRadius: "12px",
            }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>

          {image && (
            <Box
              component="img"
              src={URL.createObjectURL(image)}
              sx={{
                width: 56,
                height: 56,
                borderRadius: "12px",
                objectFit: "cover",
                border: "2px solid #4caf50",
              }}
            />
          )}

          <Button
            variant="contained"
            onClick={addCategory}
            startIcon={<AddCircleOutlineTwoToneIcon />}
            sx={{
              bgcolor: "#4caf50",
              color: "#000",
              fontWeight: "bold",
              height: "56px",
              px: 4,
              borderRadius: "12px",
              "&:hover": { bgcolor: "#66bb6a" },
            }}
          >
            Add Category
          </Button>
        </Box>

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

        {/* Categories Grid */}
        <Grid container spacing={4}>
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
              <Fade in timeout={600}>
                <Box
                  sx={{
                    position: "relative",
                    height: "300px",
                    borderRadius: "28px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.1)",
                    transition: "0.4s",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      borderColor: "#4caf50",
                      "& .overlay": { opacity: 1 },
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={cat.image}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />

                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      fontWeight="800"
                      sx={{ color: "#fff", mb: 2 }}
                    >
                      {cat.name}
                    </Typography>

                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleEditOpen(cat)}
                        startIcon={<EditTwoToneIcon />}
                        sx={{
                          bgcolor: "#4caf50",
                          color: "#000",
                          fontWeight: "bold",
                          borderRadius: "8px",
                        }}
                      >
                        Edit
                      </Button>
                      <IconButton
                        onClick={() => deleteCategory(cat.id)}
                        sx={{
                          bgcolor: "rgba(255,82,82,0.1)",
                          color: "#ff5252",
                          "&:hover": { bgcolor: "#ff5252", color: "#fff" },
                        }}
                      >
                        <DeleteSweepTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
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
              borderRadius: "24px",
              minWidth: "450px",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Edit Category
          </DialogTitle>
          <DialogContent
            sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              fullWidth
              label="Category Name"
              sx={fieldStyle}
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
            />

            <Button
              component="label"
              variant="outlined"
              fullWidth
              startIcon={<CloudUploadIcon />}
              sx={{
                color: "#4caf50",
                borderColor: "#4caf50",
                py: 1.5,
                borderRadius: "12px",
              }}
            >
              Change Image
              <input
                type="file"
                hidden
                onChange={(e) =>
                  setEditCategory({ ...editCategory, Image: e.target.files[0] })
                }
              />
            </Button>

            {/* عرض المعاينة للصورة الجديدة أو القديمة */}
            {(editCategory.Image || editCategory.currentImageUrl) && (
              <Box
                component="img"
                src={
                  editCategory.Image
                    ? URL.createObjectURL(editCategory.Image)
                    : editCategory.currentImageUrl
                }
                sx={{
                  width: "100%",
                  height: 180,
                  borderRadius: "16px",
                  objectFit: "cover",
                  border: "1px solid #4caf50",
                }}
              />
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button
              onClick={() => setOpen(false)}
              sx={{ color: "rgba(255,255,255,0.6)" }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => updateCategory(editCategory.id)}
              variant="contained"
              sx={{
                bgcolor: "#4caf50",
                color: "#000",
                fontWeight: "bold",
                px: 4,
                borderRadius: "10px",
              }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}
