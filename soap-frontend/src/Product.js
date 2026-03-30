import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/system";

// كارد ثابت الحجم "بالملّي"
const StyledCard = styled(Card)({
  height: 450, // طول الكارد ثابت للكل
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  transition: "all 0.3s ease-in-out",
  border: "1px solid #f0f0f0",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
  },
});

const ImageBox = styled(Box)({
  height: 200, // تثبيت طول منطقة الصورة
  width: "100%",
  overflow: "hidden",
  flexShrink: 0,
});

export default function Product() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/category/${category}`)
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <Box sx={{ py: 6, bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          sx={{ mb: 5, fontWeight: 800, textAlign: "center", color: "#1a2035" }}
        >
          Products in <span style={{ color: "#2e7d32" }}>{category}</span>
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <StyledCard>
                {/* منطقة الصورة الثابتة */}
                <ImageBox>
                  <CardMedia
                    component="img"
                    image={
                      product.image || "https://via.placeholder.com/300x200"
                    }
                    alt={product.name}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "0.5s hover",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                </ImageBox>

                {/* محتوى الكارد */}
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 2.5,
                  }}
                >
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        height: "1.6em", // حجز سطر واحد للعنوان
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{ color: "#2e7d32", fontWeight: 800, mt: 0.5 }}
                    >
                      ${product.price}
                    </Typography>
                  </Box>

                  {/* منطقة الـ Chips - محجوزة بمساحة ثابتة */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      height: "65px", // مساحة ثابتة لسطرين من الـ Chips
                      overflow: "hidden",
                      mt: 1,
                    }}
                  >
                    {product.benefits && product.benefits.length > 0 ? (
                      product.benefits.map((b, i) => (
                        <Chip
                          key={i}
                          label={b.name}
                          size="small"
                          sx={{
                            bgcolor: "#e8f5e9",
                            color: "#2e7d32",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="caption" color="text.disabled">
                        No specific benefits listed
                      </Typography>
                    )}
                  </Box>

                  {/* دفع الزر لآخر الكارد دائماً */}
                  <Box sx={{ flexGrow: 1 }} />

                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      mt: 2,
                      borderRadius: "12px",
                      bgcolor: "#1a2035",
                      py: 1.2,
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": { bgcolor: "#2e7d32" },
                    }}
                    onClick={() => console.log("Add to cart:", product)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
