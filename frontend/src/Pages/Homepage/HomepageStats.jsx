import React from "react";
import { Paper, Grid, Box, Typography } from "@mui/material";

// Mock data (This should ideally be passed as a prop from the parent component)
const stats = [
  { label: "Average Monthly Savings ", value: "20%+" },
  { label: "Hours Saved", value: "1000+" },
  { label: "Active Users", value: "500+" },
  { label: "Uptime", value: "99.9%" },
];

export default function HomepageStats({ statsData = stats }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        mb: 8,
        borderRadius: 3,
        // Gradient based on the latest styling request
        background:
          "linear-gradient(90deg, rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 78%, rgba(191, 237, 83, 1) 100%)",
      }}
    >
      <Grid container spacing={4} display={"flex"} justifyContent={"center"}>
        {statsData.map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "white",
                  mb: 1,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.8)" }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
