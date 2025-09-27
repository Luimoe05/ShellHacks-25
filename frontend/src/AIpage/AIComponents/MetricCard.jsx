import React from "react";
import { Box, Paper, Typography } from "@mui/material"; // ✅ added Paper

export default function MetricCard({
  title,
  value,
  icon: IconComponent,
  color,
  trend,
}) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "200px",
        width: "300px",
        backgroundColor: "#121212",
        border: "1px solid white",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-5px)" },
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" color="white" fontWeight={600}>
          {title}
        </Typography>
        {IconComponent && <IconComponent sx={{ color: white, fontSize: 32 }} />}
      </Box>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 1, color: "white" }}>
        {value}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{ color: color, mr: 1 }}
        >
          {trend}
        </Typography>
        <Typography variant="caption" color="white">
          vs. Previous Month
        </Typography>
      </Box>
    </Paper>
  );
}
