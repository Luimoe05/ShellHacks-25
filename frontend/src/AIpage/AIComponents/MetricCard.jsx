import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const MetricCard = ({ title, value, icon, color, trend }) => {
  const getColorValue = (colorName) => {
    const colors = {
      green: "#4CAF50",
      blue: "#2196F3",
      orange: "#FF9800",
      red: "#F44336",
      purple: "#9C27B0",
      gray: "#666666",
    };
    return colors[colorName] || "#2196F3";
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: "#1e1e1e",
        border: `2px solid ${getColorValue(color)}`,
        minWidth: 200,
        maxWidth: 250,
        height: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 8px 25px rgba(${getColorValue(color)}, 0.3)`,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {icon && <Box sx={{ color: getColorValue(color) }}>{icon}</Box>}
        <Typography
          variant="subtitle1"
          sx={{
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "0.9rem",
          }}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        variant="h4"
        sx={{
          color: getColorValue(color),
          fontWeight: 700,
          fontSize: "1.8rem",
          my: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#b0b0b0",
          fontSize: "0.8rem",
        }}
      >
        {trend}
      </Typography>
    </Paper>
  );
};

export default MetricCard;
