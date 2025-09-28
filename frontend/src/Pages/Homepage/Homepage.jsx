import React, { useState, useEffect } from "react";
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

export default function Homepage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const authParam = urlParams.get("auth");
    const userParam = urlParams.get("user");

    if (authParam === "true" && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        setIsAuthenticated(true);
        setUserInfo(userData);
        setLoading(false);

        // Clean up URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        return;
      } catch (error) {
        console.error("Error parsing user data from URL:", error);
      }
    }

    // Fallback to API check
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

  // PURE CSS APPROACH: No React state or re-renders
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Directly update CSS custom properties on the document
      document.documentElement.style.setProperty("--mouse-x", e.clientX + "px");
      document.documentElement.style.setProperty("--mouse-y", e.clientY + "px");
    };

    // Add event listener
    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        Loading...
      </Box>
    );
  }

  return (
    <>
      <GlobalStyles
        styles={{
          // CSS Variables for mouse position
          ":root": {
            "--mouse-x": "0px",
            "--mouse-y": "0px",
          },
          body: {
            margin: 0,
            padding: 0,
            overflowX: "hidden",
            backgroundColor: "#000000",
          },
          html: {
            height: "100%",
          },
          // CSS-only glow effect
          ".mouse-glow::before": {
            content: '""',
            position: "fixed",
            top: "var(--mouse-y)",
            left: "var(--mouse-x)",
            width: "100vmax",
            height: "100vmax",
            background:
              "radial-gradient(circle, rgba(25, 118, 210, 0.15) 0%, rgba(18, 18, 18, 0) 50%)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 0,
            transition: "opacity 0.2s ease",
          },
        }}
      />

      <Box
        className="mouse-glow" // Apply the CSS class for the glow effect
        sx={{
          flexGrow: 1,
          bgcolor: "#121212",
          minHeight: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* No React-based glow element needed - it's pure CSS now */}

        <HomepageNavbar isAuthenticated={isAuthenticated} userInfo={userInfo} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <HomepageHero isAuthenticated={isAuthenticated} />
          <HomepageStats stats={stats} />
          <HomepageFeatures features={features} />
          <HomepageCTA />
          <Footer />
        </Container>
      </Box>
    </>
  );
}
