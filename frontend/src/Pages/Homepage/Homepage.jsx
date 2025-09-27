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

export default function FinancialAppHomepage() {
  // Add authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- NEW: State to track cursor position for the background glow (REINTRODUCED) ---
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  // Check authentication status
  useEffect(() => {
    // Authentication logic remains the same
    console.log("localStorage auth:", localStorage.getItem("isAuthenticated"));
    console.log("localStorage user:", localStorage.getItem("userInfo"));

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

  // --- NEW: Effect to listen for cursor movement (REINTRODUCED) ---
  useEffect(() => {
    const handleMouseMove = (event) => {
      // Update state with current cursor position (clientX and clientY)
      setGlowPosition({ x: event.clientX, y: event.clientY });
    };

    // Attach listener to window
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      // Cleanup listener on unmount
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Empty dependency array ensures setup runs once on mount

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
            backgroundColor: "#000000",
          },
          html: {
            height: "100%",
          },
        }}
      />

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#121212",
          minHeight: "100vh",
          width: "100vw",
          position: "relative", // Required for positioning the animation layer
          overflow: "hidden", // Ensures the large glow doesn't create scrollbars
          zIndex: 1, // Ensure all content is above the glow layer (which will be zIndex: 0)
        }}
      >
        {/* --- REINTRODUCED: Cursor-following glow element (Z-Index 0) --- */}
        <Box
          sx={{
            position: "fixed", // Use fixed position so it tracks relative to the viewport
            top: `${glowPosition.y}px`,
            left: `${glowPosition.x}px`,
            transform: "translate(-50%, -50%)", // Center the gradient source at the cursor point
            width: "100vmax",
            height: "100vmax",
            // Using low opacity (0.05) for a subtle effect
            backgroundImage:
              "radial-gradient(circle, rgba(25, 118, 210, 0.05) 0%, rgba(18, 18, 18, 0) 50%)",
            zIndex: 0, // Ensure it's behind everything
            pointerEvents: "none",
            opacity: 1,
            transition: "opacity 0.2s",
          }}
        />
        {/* --- END NEW GLOW ELEMENT --- */}

        {/* Header - Content is placed above the glow layer */}
        <HomepageNavbar isAuthenticated={isAuthenticated} userInfo={userInfo} />

        {/* Hero Section and subsequent content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <HomepageHero isAuthenticated={isAuthenticated} />

          {/* Stats Section */}
          <HomepageStats stats={stats} />

          {/* Features Section */}
          <HomepageFeatures features={features} />

          {/* CTA Section */}
          <HomepageCTA />

          {/* Footer */}
          <Footer />
        </Container>
      </Box>
    </>
  );
}
