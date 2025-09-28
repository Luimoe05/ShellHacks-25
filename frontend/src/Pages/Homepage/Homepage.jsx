import React, { useState, useEffect } from "react"; // Add useState and useEffect
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
  GlobalStyles,
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
import { supabase } from "../../DB/supabase";

export default function FinancialAppHomepage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dbConnected, setDbConnected] = useState(false);

  // Check authentication status
  useEffect(() => {
    console.log("localStorage auth:", localStorage.getItem("isAuthenticated"));
    console.log("localStorage user:", localStorage.getItem("userInfo"));

    // Test Supabase connection
    testSupabaseConnection();

    fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/status`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        setUserInfo(data.user);
        setLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.from("UserInfo").select("*"); // Remove limit and get data

      if (error) {
        console.log("❌ Database NOT Connected:", error.message);
        setDbConnected(false);
      } else {
        console.log("✅ Database Connected Successfully!");
        console.log("📊 All users in UserInfo table:", data);
        console.log("👥 Total users:", data.length);
        setDbConnected(true);
      }
    } catch (err) {
      console.log("❌ Database Connection Failed:", err.message);
      setDbConnected(false);
    }
  };

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

  // Show loading while checking auth
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        Loading...
      </Box>
    );
  }

  return (
    <>
      {/* GLOBAL CSS RESET */}
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            overflowX: "hidden",
            backgroundColor: "#FFFFFF",
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
        {/* Header - Pass isAuthenticated to navbar if needed */}
        <HomepageNavbar isAuthenticated={isAuthenticated} userInfo={userInfo} />

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
