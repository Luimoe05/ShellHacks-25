import React from "react";
import { Box, Typography } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        borderTop: 1,
        borderColor: "#e2e8f0",
        pt: 4,
        pb: 4,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <AccountBalance sx={{ color: "#54B888", mr: 1 }} />
        <Typography variant="h6" sx={{ color: "#54B888", fontWeight: 700 }}>
          Moola
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: "#64748b" }}>
        © 2025 Moola. All rights reserved. | Privacy Policy | Terms of Service
      </Typography>
    </Box>
  );
}
