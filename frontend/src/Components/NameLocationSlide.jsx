import React from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

export default function NameLocationSlide({ data, setData }) { 
  const roundedInputStyle = {
    "& .MuiOutlinedInput-root": {
    borderRadius: "15px",
    color: "white",                // text color
    backgroundColor: "rgba(255,255,255,0.15)", // box fill (slight transparency)
    "& fieldset": { borderColor: "white" },
    "&:hover fieldset": { borderColor: "white" },
    "&.Mui-focused fieldset": { borderColor: "white" },
  },
  "& .MuiInputLabel-root": { color: "white" },
  "& .MuiInputBase-input": { color: "white" }, // input text inside
  "& .MuiSvgIcon-root": { color: "white" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: 8,
        py: 8,
        boxSizing: "border-box",
        ml: 54,
        mt: 5,
        color: "white",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "left",
          width: "100%",
          mt: 1,
          color: "white",
        }}
      >
        Tell us more about yourself
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          color: "white",
          opacity: 1.0,
          mt: -2,
          mb: -1,
        }}
      >
        Get customized recommendations from our AI financial coach, Moola!
      </Typography>

      {/* --- Name and Country/Region Section --- */}
      <Box sx={{ width: "52%", color: "white" }}>
        {/* 1. Your Name Field */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
        >
          Your Name <span style={{ color: "white" }}>ⓘ</span>
        </Typography>
        <TextField
          fullWidth
          placeholder="Your name or nickname"
          value={data.name || ""}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          sx={roundedInputStyle}
          InputProps={{ style: { color: "white" } }}
        />

        {/* 2. City and Country/Region side by side */}
        <Box sx={{ display: "flex", gap: 2, mt: 2, color: "white" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
            >
              City <span style={{ color: "white" }}>ⓘ</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="Your city"
              value={data.city || ""}
              onChange={(e) => setData({ ...data, city: e.target.value })}
              sx={roundedInputStyle}
              InputProps={{ style: { color: "white" } }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
            >
              Country / region <span style={{ color: "white" }}>ⓘ</span>
            </Typography>
            <FormControl fullWidth sx={roundedInputStyle}>
              <Select
                value={data.country || "United States"}
                onChange={(e) => setData({ ...data, country: e.target.value })}
                displayEmpty
                sx={roundedInputStyle}
              >
                <MenuItem value="" disabled sx={{ color: "white" }}>
                  Select Country/Region
                </MenuItem>
                <MenuItem value="United States" sx={{ color: "white" }}>
                  United States
                </MenuItem>
                <MenuItem value="Canada" sx={{ color: "white" }}>
                  Canada
                </MenuItem>
                <MenuItem value="Mexico" sx={{ color: "white" }}>
                  Mexico
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}