import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress, Alert } from "@mui/material";
import { LightbulbOutlineRounded } from "@mui/icons-material";

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const AdviceSection = () => {
  const [userData, setUserData] = useState(null);
  const [aiAdvice, setAiAdvice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const generateAIAdvice = async (userData) => {
    try {
      // Encode userData as query parameter for GET request
      const params = new URLSearchParams({
        userData: JSON.stringify(userData),
      });

      const response = await fetch(`${API_BASE_URL}/gemini/advice?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAiAdvice(result.advice);
      }
    } catch (error) {
      console.error("Error generating AI advice:", error);
    }
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env?.VITE_BACKEND_URL}/profile`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile data received:", data); // Debug log
      setUserData(data);
      setError(null);

      await generateAIAdvice(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Default advice as fallback
  const defaultAdvice = `Based on your current spending patterns and income, you have a high
   potential for increasing savings by reviewing subscription services. We
   recommend canceling the least used streaming service this month, which
   could free up $22.99. Your debt-to-income ratio is healthy, but focus
   on building a 3-month emergency fund, which is currently at 50% of the
   goal.`;

  return (
    <Paper
      elevation={8}
      sx={{
        p: { xs: 3, sm: 4 },
        mb: 6,
        borderRadius: 4,
        boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
        borderLeft: "8px solid #55AB9B",
        display: "flex",
        alignItems: "flex-start",
        gap: 3,
        backgroundColor: "#121212",
        height: "fit-content",
        width: "900px",
        m: 3,
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 10px 50px rgba(255, 255, 255, 0.1)",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 50px rgba(255, 255, 255, 0.2)",
          cursor: "pointer",
        },
      }}
    >
      <LightbulbOutlineRounded
        sx={{ fontSize: 40, color: "White", flexShrink: 0 }}
      />
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 1, color: "White" }}
        >
          Moola AI Financial Advice
          {userData && (
            <Typography
              variant="subtitle2"
              sx={{ color: "#55AB9B", fontWeight: 500 }}
            >
              Personalized for {userData.name}
            </Typography>
          )}
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CircularProgress size={20} sx={{ color: "#55AB9B" }} />
            <Typography variant="body2" color="#DEDEDE">
              Generating personalized advice...
            </Typography>
          </Box>
        ) : error ? (
          <Box>
            <Alert
              severity="warning"
              sx={{ mb: 2, backgroundColor: "#2d2d2d", color: "#ff9800" }}
            >
              {error}
            </Alert>
            <Typography variant="body1" color="#DEDEDE" fontWeight={500}>
              {defaultAdvice}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" color="#DEDEDE" fontWeight={500}>
            {aiAdvice || defaultAdvice}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default AdviceSection;
