// OnboardingStepper.jsx
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import NameLocationSlide from "./NameLocationSlide";
import InterestsSlide from "./InterestsSlide";
import FinancialUserInputSlide from "./FinancialUserInputSlide";
import CustomizedSteppers from "./CustomizedStepper";
import BackgroundSlideWrapper from "./BackgroundSlideWrapper";
import SlidersNavbar from "./SlidersNavbar";

export default function OnboardingStepper() {
  const steps = ["Your Info", "Interests", "Financials"];
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    country: "",
    interests: [],
    salary: "",
    goal: "",
    creditScoreRange: "",
    timeframe: "",
    debt: "",
    housing: "",
    monthlyIncome: "",
    file: null,
  });

  useEffect(() => {
    // Get user info from URL params or backend
    const getUserInfo = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get("user");

        if (userParam) {
          const userData = JSON.parse(decodeURIComponent(userParam));
          setUser(userData);
          // Pre-populate name if available
          setFormData((prev) => ({
            ...prev,
            name: userData.name || "",
          }));
        } else {
          // Fallback: try to get from backend
          const userResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/auth/current-user`,
            { credentials: "include" }
          );

          if (userResponse.ok) {
            const userResponseData = await userResponse.json();
            setUser(userResponseData.user);
            setFormData((prev) => ({
              ...prev,
              name: userResponseData.user.name || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error getting user info:", error);
      }
    };

    getUserInfo();
  }, []);

  const submitOnboardingData = async () => {
    setIsSubmitting(true);
    try {
      // Check if we have user info
      if (!user || !user.email || !user.sub) {
        alert("User information not found. Please login again.");
        window.location.href = "/";
        return;
      }

      console.log("Sending data to onboarding/complete:", formData);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/onboarding/complete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      console.log("Response from server:", responseData);

      if (response.ok) {
        console.log("Onboarding completed successfully!");

        // Redirect to homepage after successful completion
        window.location.href = "/";
      } else {
        console.error("Failed to complete onboarding:", responseData);
      }
    } catch (error) {
      console.error("Error during onboarding completion:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log("Final Data:", formData);
      // Backend submission logic
      submitOnboardingData();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const formSlideProps = {
    data: formData,
    setData: setFormData,
  };

  const slides = [
    <NameLocationSlide {...formSlideProps} />,
    <InterestsSlide {...formSlideProps} />,
    <FinancialUserInputSlide {...formSlideProps} />,
  ];

  return (
    <SlidersNavbar>
      <BackgroundSlideWrapper>
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            pt: 0.5,
            color: "white",
            // Add form field sizing styles
            "& .MuiTextField-root, & .MuiFormControl-root": {
              minWidth: "280px",
              "& .MuiOutlinedInput-root": {
                minHeight: "56px",
                fontSize: "16px",
                "& fieldset": {
                  borderRadius: "12px",
                },
              },
              "& .MuiInputBase-input": {
                padding: "16px 14px",
              },
            },
          }}
        >
          {/* 1. Renders the content that CHANGES */}
          <Box sx={{ mb: 2 }}>{slides[activeStep]}</Box>

          {/* 2. Renders the Stepper (and its buttons) that STAYS */}
          <Box
            sx={{
              width: "35%",
              display: "flex",
              justifyContent: "center",
              ml: 62,
              mt: -5,
              color: "white",
              "& .MuiStepLabel-label": { color: "white !important" },
              "& .MuiSvgIcon-root": { color: "white !important" },
              "& .MuiButton-root": {
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              },
            }}
          >
            <CustomizedSteppers
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              steps={steps}
              isSubmitting={isSubmitting}
            />
          </Box>
        </Box>
      </BackgroundSlideWrapper>
    </SlidersNavbar>
  );
}
