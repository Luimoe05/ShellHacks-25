import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomepageHero({ isAuthenticated }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 800,
          mb: 2,
          background:
            "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 78%, rgba(191, 237, 83, 1) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "2.5rem", md: "3.5rem" },
        }}
      >
        Your Financial Future Starts Here
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          color: "white",
          fontWeight: 400,
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Take control of your finances with our comprehensive platform. Invest,
        save, and spend smarter with AI-powered insights.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={
            // 1. Condition
            !isAuthenticated
              ? // 2. Value if TRUE (User NOT authenticated -> Login Redirect Handler)
                () => {
                  window.location.href = `${
                    import.meta.env.VITE_BACKEND_URL
                  }/login`;
                }
              : // 3. Value if FALSE (User IS authenticated -> Gemini Handler)
                () => {
                  navigate("/gemini");
                }
          }
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#54B888",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 600,
            boxShadow: 3,
          }}
        >
          Try Moola
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{
            color: "#54B888",
            borderColor: "#54B888",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
          }}
        >
          Watch Demo
        </Button>
      </Box>
    </Box>
  );
}
