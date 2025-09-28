import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
// Icons needed for the mock data structure
import { TrendingUp, Security, Speed, Analytics } from "@mui/icons-material";

// Mock data (This should be passed as a prop from the parent component)
const features = [
  {
    icon: <TrendingUp sx={{ fontSize: 40, color: "#54B888" }} />,
    title: "Smart Investing",
    description:
      "AI-powered investment recommendations tailored to your goals and risk tolerance.",
  },
  {
    icon: <Security sx={{ fontSize: 40, color: "#54B888" }} />,
    title: "Bank-Level Security",
    description:
      "256-bit encryption and multi-factor authentication keep your money safe.",
  },
  {
    icon: <Speed sx={{ fontSize: 40, color: "#54B888" }} />,
    title: "Instant Transfers",
    description:
      "Transfer money instantly between accounts with zero fees on most transactions.",
  },
  {
    icon: <Analytics sx={{ fontSize: 40, color: "#54B888" }} />,
    title: "Advanced Analytics",
    description:
      "Detailed insights and reports to help you understand your spending patterns.",
  },
];

export default function HomepageFeatures({ featuresData = features }) {
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          textAlign: "center",
          mb: 2,
          fontWeight: 700,
          color: "white",
        }}
      >
        Why Choose Moola?
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          mb: 6,
          color: "white",
          maxWidth: "600px",
          mx: "auto",
        }}
      >
        Everything you need to manage your money effectively, all in one
        powerful platform.
      </Typography>
      <Grid
        container
        spacing={4}
        display={"flex"}
        justifyContent={"center"}
        sx={{ height: "fit-content" }}
      >
        {featuresData.map((feature, index) => (
          // NOTE: This Grid is being used as an item with custom sizing
          <Grid sx={{ width: "500px", m: 1 }} key={index}>
            <Card
              elevation={2}
              sx={{
                height: "100%",
                p: 2,
                borderRadius: 3,
                bgcolor: "#121212",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow:
                    "0 8px 16px rgba(255, 255, 255, 0.15), 0 0 10px rgba(255, 255, 255, 0.05)",
                },
                // OPTIONAL: Apply a very subtle light shadow even when not hovered
                boxShadow: "0 2px 8px rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "rgba(84, 184, 136, 0.1)",
                      mr: 2,
                      width: 64,
                      height: 64,
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1, color: "white" }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "white" }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
