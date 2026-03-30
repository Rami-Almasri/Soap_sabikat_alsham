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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Stack,
  IconButton,
  Fade,
  Divider,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
// أيقونات
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import Inventory2TwoToneIcon from "@mui/icons-material/Inventory2TwoTone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  // States موحدة وشاملة لكل الحقول
  const initialState = {
    id: "",
    name: "",
    price: "",
    category_id: "",
    stock: "",
    weight: "",
    description: "",
    image: null,
  };
  const [editProduct, setEditProduct] = useState(initialState);
  const [newProduct, setNewProduct] = useState(initialState);

  const getData = useCallback(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/api/categories/everything")
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("خطأ في تحميل البيانات");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleEdit = (product) => {
    setEditProduct({ ...product, image: null }); // نُصفر الصورة عند البدء بالتعديل لعدم إرسال ملف قديم
    setOpen(true);
  };

  const updateProduct = () => {
    const formData = new FormData();
    Object.keys(editProduct).forEach((key) => {
      if (editProduct[key] !== null && editProduct[key] !== undefined) {
        formData.append(key, editProduct[key]);
      }
    });
    formData.append("_method", "PUT");

    axios
      .post(
        `http://127.0.0.1:8000/api/products/update/${editProduct.id}`,
        formData,
      )
      .then(() => {
        setOpen(false);
        getData();
        setSuccess("تم تحديث المنتج بنجاح ✨");
        setTimeout(() => {
          setSuccess("");
        }, 4000);
      })
      .catch(
        (err) =>
          setError(err.response?.data?.message || "حدث خطأ أثناء التحديث"),
        setTimeout(() => {
          setError("");
        }, 4000),
      );
  };

  const addProduct = () => {
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      if (newProduct[key] !== null) formData.append(key, newProduct[key]);
    });

    axios
      .post("http://127.0.0.1:8000/api/products", formData)
      .then(() => {
        setOpenAdd(false);
        setNewProduct(initialState);
        getData();
        setSuccess("تمت إضافة المنتج الجديد بنجاح ✅");
      })
      .catch((err) =>
        setError(err.response?.data?.message || "خطأ في الإضافة"),
      );
  };

  const deleteProduct = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج نهائياً؟")) {
      axios
        .delete(`http://127.0.0.1:8000/api/products/destroy/${id}`)
        .then((res) => {
          getData();
          setSuccess(res.data.message);
        })
        .catch((err) =>
          setError(err.response?.data?.message || "خطأ في الحذف"),
        );
    }
  };

  // تنسيق حقول الإدخال (Style)
  const fieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
      "&:hover fieldset": { borderColor: "#4caf50" },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
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
        <Typography variant="h4" fontWeight="900" sx={{ color: "#fff" }}>
          إدارة <span style={{ color: "#4caf50" }}>المخزون الفاخر</span>
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineTwoToneIcon sx={{ ml: 1 }} />}
          onClick={() => setOpenAdd(true)}
          sx={{
            bgcolor: "#4caf50",
            color: "#000",
            fontWeight: "bold",
            borderRadius: "12px",
            px: 4,
          }}
        >
          إضافة منتج
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: "10px" }}>
          {success}
        </Alert>
      )}

      {categories.map((cat) => (
        <Box key={cat.id} sx={{ mb: 8 }}>
          <Typography
            variant="h5"
            fontWeight="800"
            sx={{
              color: "#fff",
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Inventory2TwoToneIcon sx={{ color: "#4caf50" }} /> {cat.name}
          </Typography>

          <Grid container spacing={4}>
            {cat.products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Fade in timeout={500}>
                  <Box
                    sx={{
                      height: "500px",
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "rgba(255,255,255,0.03)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "24px",
                      border: "1px solid rgba(255,255,255,0.08)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-10px)",
                        borderColor: "#4caf50",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image || "https://via.placeholder.com/200"}
                        sx={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#fff",
                          fontWeight: "700",
                          height: "3em",
                          overflow: "hidden",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mt: 2 }}
                      >
                        <Typography
                          sx={{
                            color: "#4caf50",
                            fontWeight: "900",
                            fontSize: "1.2rem",
                          }}
                        >
                          ${product.price}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.8rem",
                          }}
                        >
                          {product.weight}g
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.85rem",
                          mt: 1,
                          height: "3em",
                          overflow: "hidden",
                        }}
                      >
                        {product.description}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: "auto", pt: 2 }}
                      >
                        <Button
                          fullWidth
                          onClick={() => handleEdit(product)}
                          sx={{ color: "#4caf50", border: "1px solid #4caf50" }}
                        >
                          تعديل
                        </Button>
                        <IconButton
                          onClick={() => deleteProduct(product.id)}
                          sx={{
                            color: "#ff5252",
                            bgcolor: "rgba(255,82,82,0.1)",
                          }}
                        >
                          <DeleteSweepTwoToneIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}

      {/* Dialog الشامل (إضافة / تعديل) */}
      <Dialog
        open={open || openAdd}
        onClose={() => {
          setOpen(false);
          setOpenAdd(false);
        }}
        PaperProps={{
          sx: {
            bgcolor: "#0a150f",
            color: "#fff",
            borderRadius: "20px",
            minWidth: { md: "500px" },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {open ? "تحديث المنتج" : "منتج جديد"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: 2 }}
        >
          <FormControl fullWidth sx={fieldStyle}>
            <InputLabel>التصنيف</InputLabel>
            <Select
              value={open ? editProduct.category_id : newProduct.category_id}
              onChange={(e) =>
                open
                  ? setEditProduct({
                      ...editProduct,
                      category_id: e.target.value,
                    })
                  : setNewProduct({
                      ...newProduct,
                      category_id: e.target.value,
                    })
              }
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            sx={fieldStyle}
            label="اسم المنتج"
            value={open ? editProduct.name : newProduct.name}
            onChange={(e) =>
              open
                ? setEditProduct({ ...editProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              sx={fieldStyle}
              type="number"
              label="السعر"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{ ".MuiTypography-root": { color: "#4caf50" } }}
                  >
                    $
                  </InputAdornment>
                ),
              }}
              value={open ? editProduct.price : newProduct.price}
              onChange={(e) =>
                open
                  ? setEditProduct({ ...editProduct, price: e.target.value })
                  : setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <TextField
              fullWidth
              sx={fieldStyle}
              type="number"
              label="المخزون"
              value={open ? editProduct.stock : newProduct.stock}
              onChange={(e) =>
                open
                  ? setEditProduct({ ...editProduct, stock: e.target.value })
                  : setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />
          </Stack>

          <TextField
            fullWidth
            sx={fieldStyle}
            type="number"
            label="الوزن (جرام)"
            value={open ? editProduct.weight : newProduct.weight}
            onChange={(e) =>
              open
                ? setEditProduct({ ...editProduct, weight: e.target.value })
                : setNewProduct({ ...newProduct, weight: e.target.value })
            }
          />

          <TextField
            fullWidth
            sx={fieldStyle}
            multiline
            rows={3}
            label="وصف المنتج"
            value={open ? editProduct.description : newProduct.description}
            onChange={(e) =>
              open
                ? setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                : setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{ color: "#4caf50", borderColor: "#4caf50", py: 1.5 }}
          >
            تحميل صورة المنتج
            <input
              type="file"
              hidden
              onChange={(e) =>
                open
                  ? setEditProduct({ ...editProduct, image: e.target.files[0] })
                  : setNewProduct({ ...newProduct, image: e.target.files[0] })
              }
            />
          </Button>
          {(open ? editProduct.image : newProduct.image) && (
            <Typography variant="caption" sx={{ color: "#4caf50" }}>
              تم اختيار ملف:{" "}
              {open ? editProduct.image.name : newProduct.image.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => {
              setOpen(false);
              setOpenAdd(false);
            }}
            sx={{ color: "rgba(255,255,255,0.5)" }}
          >
            إلغاء
          </Button>
          <Button
            onClick={open ? updateProduct : addProduct}
            variant="contained"
            sx={{
              bgcolor: "#4caf50",
              color: "#000",
              fontWeight: "bold",
              px: 4,
            }}
          >
            {open ? "تعديل" : "إضافة"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
