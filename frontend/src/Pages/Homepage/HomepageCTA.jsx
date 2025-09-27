import React from "react";
import { Paper, Typography, Box, Chip, Button } from "@mui/material";

export default function HomepageCTA() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 6,
        textAlign: "center",
        borderRadius: 3,
        // Gradient matching the Stats Section
        background: [
          "#2A7B9B", // Solid color fallback
          "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 78%, rgba(191, 237, 83, 1) 100%)",
        ],
        color: "white",
        mb: 6,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
        Ready to Transform Your Finances?
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
        Join millions of users who trust FinanceFlow with their financial
        future.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Chip
          label="No Monthly Fees"
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        />
        <Chip
          label="FDIC Insured"
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        />
        <Chip
          label="24/7 Support"
          variant="outlined"
          sx={{ color: "white", borderColor: "white" }}
        />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Button
          size="large"
          variant="outlined"
          sx={{
            bgcolor: "rgba(227, 227, 227, 0.1)",
            color: "#FFFFFF",
            borderColor: "#FFFFFF",
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "rgba(227, 227, 227, 0.3)",
            },
          }}
        >
          Create Your Account
        </Button>
      </Box>
    </Paper>
  );
}
