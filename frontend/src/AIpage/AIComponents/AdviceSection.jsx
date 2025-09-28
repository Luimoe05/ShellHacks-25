import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import { LightbulbOutlineRounded } from "@mui/icons-material";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const AdviceSection = () => {
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default advice as fallback
  const defaultAdvice = `Based on your current spending patterns and income, you have a high
   potential for increasing savings by reviewing subscription services. We
   recommend canceling the least used streaming service this month, which
   could free up $22.99. Your debt-to-income ratio is healthy, but focus
   on building a 3-month emergency fund, which is currently at 50% of the
   goal.`;

  return (
    <Paper
      elevation={8}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 6,
        borderRadius: 4,
        borderLeft: "8px solid #55AB9B",
        display: "flex",
        alignItems: "flex-start",
        gap: 3,
        backgroundColor: "#121212",
        height: "fit-content",
        width: "900px",
        m: 3,
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 10px 50px rgba(255, 255, 255, 0.1)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 50px rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
        },
      }}
    >
      <LightbulbOutlineRounded
        sx={{ fontSize: 40, color: "White", flexShrink: 0 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 1, color: "White" }}
        >
          Moola AI Financial Advice
          <Typography
            variant="subtitle2"
            sx={{ color: "#55AB9B", fontWeight: 500 }}
          >
            Personalized financial insights
          </Typography>
        </Typography>

        <Typography variant="body1" color="#DEDEDE" fontWeight={500}>
          {defaultAdvice}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AdviceSection;
