import { Box, Typography, Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function AboutSection() {
  const list = [
    "Our Cosmetics is 100% from Natural Ingredients",
    "All packaging processes are done by modern machines",
    "You can return our product if not original",
    "Fresh adheres to the strictest safety standards",
    "Strictest safety requirements worldwide",
    "Our skincare is formulated without parabens",
  ];

  const sections = [
    {
      title: "Safety Backed By Science",
      desc: "Our products are designed with natural ingredients and produced using advanced technology.",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      reverse: false,
    },
    {
      title: "Pure & Natural Ingredients",
      desc: "We carefully select natural ingredients and apply strict quality controls.",
      img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
      reverse: true,
    },
  ];

  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 10 }, background: "#f9fafb" }}>
      {sections.map((section, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: section.reverse ? "row-reverse" : "row",
            },
            alignItems: "center",
            gap: 6,
            mb: 10,
          }}
        >
          {/* Image */}
          <Box
            component="img"
            src={section.img}
            alt={section.title}
            sx={{
              width: { xs: "100%", md: "50%" },
              height: { xs: 250, md: 400 },
              objectFit: "cover",
              borderRadius: 3,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          />

          {/* Text */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
              {section.title}
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              {section.desc}
            </Typography>

            <Stack spacing={1}>
              {list.map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center" }}>
                  <CheckIcon sx={{ color: "blue", mr: 1 }} />
                  <Typography>{item}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
