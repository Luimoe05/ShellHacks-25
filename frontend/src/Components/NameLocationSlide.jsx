// NameLocationSlide.jsx

import React from "react";
// Removed CustomizedSteppers import
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

// REMOVED Stepper-specific props (activeStep, handleNext, etc.) 
// since the Stepper is no longer here.
export default function NameLocationSlide({ data, setData }) { 
  const handleNoWebsiteCheck = (event) => {
    const isChecked = event.target.checked;
    setData({
      ...data,
      state: isChecked, 
      city: isChecked ? "" : data.city, 
    });
  };

  const roundedInputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '15px', 
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      gap: 3, 
      px: 8, 
      py: 5, 
      boxSizing: 'border-box',
      ml: 50,
      mt: 18,
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          fontWeight: 'bold', 
          textAlign: 'left', 
          width: '100%',
          mt: 1,
        }}
      >
        Tell us more about yourself
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          textAlign: 'left', 
          color: 'gray', 
          opacity: 1.0, 
          mt: -2,
          mb: -1,
        }}
      >
        Get customized recommendations from our AI financial coach, Moola!
      </Typography>
      
      {/* --- Name and Country/Region Section --- */}
      <Box sx={{ width: '52%' }}>
        {/* 1. Your Name Field */}
        <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 0.5, textAlign: 'left' }}>
          Your Name <span style={{ color: 'gray' }}>ⓘ</span>
        </Typography>
        <TextField
          fullWidth
          placeholder="Your name or nickname"
          value={data.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          sx={roundedInputStyle}
        />

        {/* 2. City and Country/Region side by side */}
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, textAlign: 'left' }}>
              City <span style={{ color: 'gray' }}>ⓘ</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Your city"
              value={data.city || ""}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              sx={roundedInputStyle}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5, textAlign: 'left' }}>
              Country / region <span style={{ color: 'gray' }}>ⓘ</span>
            </Typography>
            <FormControl fullWidth sx={{ textAlign: 'left' }}>
              <Select
                value={data.country || "United States"}
                onChange={(e) => setData({ ...data, country: e.target.value })}
                displayEmpty
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderRadius: '15px',
                  },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                  },
                  '& .MuiSelect-select': {
                    borderRadius: '15px',
                  },
                }}
              >
                <MenuItem value="" disabled>Select Country/Region</MenuItem>
                <MenuItem value="United States">United States</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="Mexico">Mexico</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
      
      {/* DELETED: The Stepper was here. Now it's in OnboardingStepper.jsx */}
      
    </Box>
  );
}