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
    goals: "",
    salary: "",
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

  // 1. Create a single object to hold all props passed down to slides
  // NOTE: We only need the form data props for the content slides now.
  const formSlideProps = {
    data: formData,
    setData: setFormData,
  };

  // 2. The slides array contains only the content slides.
  const slides = [
    <NameLocationSlide {...formSlideProps} />,
    <InterestsSlide {...formSlideProps} />,
    <FinancialUserInputSlide {...formSlideProps} />,
  ];

  return (
    <SlidersNavbar>
      <BackgroundSlideWrapper>
        <Box sx={{ width: "100%", mx: "auto", pt:0.5 }}>
          {/* 1. Renders the content that CHANGES */}
          <Box sx={{ mb: 2 }}>{slides[activeStep]}</Box>
          
          {/* 2. Renders the Stepper (and its buttons) that STAYS */}
          <Box sx={{ 
              width: '35%', // Keeping a fixed width for alignment if you wish
              display: 'flex', 
              justifyContent: 'center',
              // Align the persistent stepper
              ml: 62,
              mt:-5,
          }}>
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