// OnboardingStepper.jsx

import React, { useState } from "react";
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

  const handleNext = () => {
    if (activeStep < steps.length - 1) { 
      setActiveStep((prev) => prev + 1);
    } else {
      console.log("Final Data:", formData);
      // Logic for final form submission goes here
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
        <Box sx={{ width: "100%", mx: "auto", pt: 0.5, color: "white" }}>
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
                "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" },
              },
            }}
          >
            <CustomizedSteppers 
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              steps={steps} 
            />
          </Box>
        </Box>
      </BackgroundSlideWrapper>
    </SlidersNavbar>
  );
}