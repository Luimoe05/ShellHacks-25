import React from "react";
import {
  Box,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
} from "@mui/material";

export default function InterestsSlide({ data, setData }) {
  const roundedInputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      color: "white", 
      "& fieldset": { borderColor: "white" }, 
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
      backgroundColor: "rgba(255,255,255,0.1)", 
    },
    "& .MuiInputBase-input": { color: "white" }, 
  };

  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const options = [
    { value: "investing",  label: "Investing & markets",
      hint: "Stocks, ETFs, crypto, or getting started with simple portfolios." },
    { value: "budgeting",  label: "Budgeting & saving",
      hint: "Track spending, build an emergency fund, and save consistently." },
    { value: "credit",     label: "Build credit",
      hint: "Improve score, lower utilization, and pick the right cards." },
    { value: "debt",       label: "Pay off debt",
      hint: "Student loans, credit cards, snowball/avalanche strategies." },
    { value: "retirement", label: "Retirement & long-term",
      hint: "Roth/Traditional IRA, 401(k), long-term planning." },
    { value: "smallbiz",   label: "Small business finances",
      hint: "Track expenses, taxes, and cash flow for a business." },
    { value: "other",      label: "Other",
      hint: "Tell us what you’re aiming for—Moola will adapt." },
  ];

  const isOther = (data.interestCategory || "") === "other";
  const SCALE = 1; 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        px: 6,
        py: 4,
        boxSizing: "border-box",
        ml: 57,           
        mt: 1,
        transform: `scale(${SCALE})`,
        transformOrigin: "top left",
        width: `${100 / SCALE}%`,
        color: "white", 
        "@media (max-width:1200px)": {
          transform: "scale(0.82)",
          width: `${100 / 0.82}%`,
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "left",
          width: "100%",
          mt: 0,
          fontSize: "clamp(24px, 3.2vw, 25px)",
          lineHeight: 1.15,
          color: "white",
        }}
      >
        What are you most interested in?
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "left",
          color: "white",
          opacity: 0.9,
          mt: 0.5,
          mb: 2,
          pt: 1,
          fontSize: "clamp(13px, 1.2vw, 16px)",
        }}
      >
        Select the best description of your primary focus. You can change this later.
      </Typography>

      <Box sx={{ width: { xs: "90%", md: "50%" } }}>
        <RadioGroup
          value={data.interestCategory || ""}
          onChange={(e) => setData({ ...data, interestCategory: e.target.value })}
        >
          {options.map((opt) => (
            <FormControlLabel
              key={opt.value}
              value={opt.value}
              control={<Radio size="small" sx={{ color: "white" }} />} 
              sx={{
                alignItems: "flex-start",
                width: "100%",
                mb: 2,
                color: "white", 
                "& .MuiFormControlLabel-label": { width: "100%", color: "white" },
              }}
              label={
                <Box>
                  <Typography sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: 16, color: "white" }}>
                    {opt.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white", mt: 0.5 }}>
                    {opt.hint}
                  </Typography>
                  {opt.value === "other" && isOther && (
                    <Box sx={{ mt: 1 }}>
                      <TextField
                        fullWidth
                        placeholder="Briefly describe your focus"
                        value={data.interestOther || ""}
                        onChange={set("interestOther")}
                        sx={roundedInputStyle}
                        InputProps={{ style: { color: "white" } }}
                      />
                    </Box>
                  )}
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </Box>
    </Box>
  );
}
