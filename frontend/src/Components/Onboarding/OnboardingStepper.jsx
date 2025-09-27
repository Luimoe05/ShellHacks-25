import React, { useState } from "react";
import { Box, Stepper, Step, Button } from "@mui/material";
import NameLocationSlide from "./NameLocationSlide";

export default function OnboardingStepper() {
  const steps = ["Your Info", "Interests", "Goals", "Financials"];
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

  const slides = [
    <NameLocationSlide data={formData} setData={setFormData} />,
  ];

  const handleNext = () => {
    if (activeStep < slides.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      console.log("Final Data:", formData);
      // we need to submit formData to backend once user hits next
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  return (
    <Box sx={{ width: "50%", mx: "auto", mt: 8 }}>
      <Box sx={{ mb: 2 }}>{slides[activeStep]}</Box>

      <Stepper activeStep={activeStep} sx={{ mt: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <Box>{label}</Box>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}
