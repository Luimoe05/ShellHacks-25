import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { LightbulbOutlineRounded } from "@mui/icons-material";

const AdviceSection = () => (
  <Paper
    elevation={8}
    sx={{
      p: { xs: 3, sm: 4 },
      mb: 6,
      borderRadius: 4,
      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
      borderLeft: "8px solid #55AB9B", // Orange accent border
      display: "flex",
      alignItems: "flex-start",
      gap: 3,
      backgroundColor: "#121212",
      height: "fit-content",
      m: 3,
      transition: "all 0.3s ease-in-out", // Ensure smooth transition
      boxShadow: "0 10px 50px rgba(255, 255, 255, 0.1)",
      "&:hover": {
        transform: "translateY(-5px)", // Lift the card 5px up
        boxShadow: "0 10px 50px rgba(255, 255, 255, 0.2)", // Increase shadow depth
        cursor: "pointer",
      },
    }}
  >
    <LightbulbOutlineRounded
      sx={{ fontSize: 40, color: "White", flexShrink: 0 }}
    />
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 1, color: "White" }}>
        Moola AI Financial Advice
      </Typography>
      <Typography variant="body1" color="#DEDEDE" fontWeight={500}>
        Based on your current spending patterns and income, you have a high
        potential for increasing savings by reviewing subscription services. We
        recommend canceling the least used streaming service this month, which
        could free up \$22.99. Your debt-to-income ratio is healthy, but focus
        on building a 3-month emergency fund, which is currently at 50% of the
        goal.
      </Typography>
    </Box>
  </Paper>
);

export default AdviceSection;
