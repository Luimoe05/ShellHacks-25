import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  IconButton,
  Paper,
  Chip,
  Avatar,
  GlobalStyles, // <-- NEW IMPORT
} from "@mui/material";
import {
  TrendingUp,
  Security,
  Speed,
  AccountBalance,
  Phone,
  Menu,
  Dashboard,
  Analytics,
  Wallet,
} from "@mui/icons-material";

import HomepageNavbar from "./HomepageNavbar";
import Footer from "../Footer";
import HomepageHero from "./HomepageHero";
import HomepageStats from "./HomepageStats";
import HomepageFeatures from "./HomepageFeatures";
import HomepageCTA from "./HomepageCTA";

export default function FinancialAppHomepage() {
  const features = [
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Smart Investing",
      description:
        "AI-powered investment recommendations tailored to your goals and risk tolerance.",
    },
    {
      icon: <Security sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Bank-Level Security",
      description:
        "256-bit encryption and multi-factor authentication keep your money safe.",
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Instant Transfers",
      description:
        "Transfer money instantly between accounts with zero fees on most transactions.",
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: "#1976d2" }} />,
      title: "Advanced Analytics",
      description:
        "Detailed insights and reports to help you understand your spending patterns.",
    },
  ];

  const stats = [
    { label: "Active Users", value: "2M+" },
    { label: "Total Transactions", value: "$50B+" },
    { label: "Countries Served", value: "25+" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <>
      {/* GLOBAL CSS RESET: Removes default browser margins/padding */}
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            overflowX: "hidden", // Prevents horizontal scroll from viewport width issues
            backgroundColor: "#FFFFFF", // Matches the outer box for seamless color transition
          },
          html: {
            height: "100%",
          },
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#FFFFFF",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        {/* Header */}
        <HomepageNavbar />

        {/* Hero Section */}
        <Container maxWidth="lg">
          <HomepageHero />

          {/* Stats Section */}
          <HomepageStats />

          {/* Features Section */}
          <HomepageFeatures />

          {/* CTA Section */}
          <HomepageCTA />

          {/* Footer */}
          <Footer />
        </Container>
      </Box>
    </>
  );
}
