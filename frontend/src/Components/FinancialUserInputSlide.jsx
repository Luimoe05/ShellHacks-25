import React, { useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function FinancialUserInputSlide({ data, setData }) {
  const fileInputRef = useRef(null);

  const roundedInputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
      color: "white",
      backgroundColor: "rgba(32, 10, 10, 0.1)",
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
    },
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiSvgIcon-root": { color: "white" },
  };

  const onlyDigits = (str) => (str || "").replace(/[^\d]/g, "");
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const pickFile = () => fileInputRef.current?.click();
  const onFile = (e) => {
    const file = e.target.files?.[0] || null;
    setData({ ...data, file });
  };

  const SCALE = 0.9;

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* ROW that right-aligns the form */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* INNER (SCALED) */}
        <Box
          sx={{
            width: "100%",
            maxWidth: 1185,
            transform: `scale(${SCALE})`,
            transformOrigin: "top right",
          }}
        >
          {/* CONTENT */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              px: 8,
              py: 1,
              boxSizing: "border-box",
              mt: 7,
              color: "white",
            }}
          >
            {/* Header */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "left",
                width: "100%",
                mt: 1,
                fontSize: "28px",
                color: "white",
              }}
            >
              Tell us about your finances
            </Typography>

            <Typography
              variant="body1"
              sx={{
                textAlign: "left",
                color: "white",
                opacity: 0.9,
                mt: -2,
                mb: -1,
              }}
            >
              We’ll personalize Moola’s recommendations based on your numbers.
            </Typography>

            {/* Make inputs wider here */}
            <Box sx={{ width: "62%", minWidth: 500 }}>
              {/* 1) Income + Credit score */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
                  >
                    Monthly income <span style={{ color: "white" }}>ⓘ</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g., 4500"
                    value={data.monthlyIncome ?? ""}
                    onChange={(e) =>
                      setData({ ...data, monthlyIncome: onlyDigits(e.target.value) })
                    }
                    onKeyDown={(e) => {
                      const bad = ["e", "E", "+", "-", ".", ","];
                      if (bad.includes(e.key)) e.preventDefault();
                    }}
                    onPaste={(e) => {
                      const t = (e.clipboardData || window.clipboardData).getData("text");
                      if (/[^\d]/.test(t)) {
                        e.preventDefault();
                        setData({
                          ...data,
                          monthlyIncome: (data.monthlyIncome || "") + onlyDigits(t),
                        });
                      }
                    }}
                    inputMode="numeric"
                    type="text"
                    sx={roundedInputStyle}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
                  >
                    Credit score <span style={{ color: "white" }}>ⓘ</span>
                  </Typography>
                  <FormControl fullWidth sx={roundedInputStyle}>
                    <Select
                      value={data.creditScoreRange || "650-699"}
                      onChange={set("creditScoreRange")}
                      displayEmpty
                      sx={roundedInputStyle}
                    >
                      {["600-649", "650-699", "700-749", "750-799", "800+"].map((r) => (
                        <MenuItem key={r} value={r} sx={{ color: "black" }}>
                          {r}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* 2) Housing + Debt */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
                  >
                    Housing (per month) <span style={{ color: "white" }}>ⓘ</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g., 1600"
                    value={data.housing ?? ""}
                    onChange={(e) => setData({ ...data, housing: onlyDigits(e.target.value) })}
                    onKeyDown={(e) => {
                      const bad = ["e", "E", "+", "-", ".", ","];
                      if (bad.includes(e.key)) e.preventDefault();
                    }}
                    onPaste={(e) => {
                      const t = (e.clipboardData || window.clipboardData).getData("text");
                      if (/[^\d]/.test(t)) {
                        e.preventDefault();
                        setData({
                          ...data,
                          housing: (data.housing || "") + onlyDigits(t),
                        });
                      }
                    }}
                    inputMode="numeric"
                    type="text"
                    sx={roundedInputStyle}
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
                  >
                    Debt payments (per month) <span style={{ color: "white" }}>ⓘ</span>
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g., 300"
                    value={data.debt ?? ""}
                    onChange={(e) => setData({ ...data, debt: onlyDigits(e.target.value) })}
                    onKeyDown={(e) => {
                      const bad = ["e", "E", "+", "-", ".", ","];
                      if (bad.includes(e.key)) e.preventDefault();
                    }}
                    onPaste={(e) => {
                      const t = (e.clipboardData || window.clipboardData).getData("text");
                      if (/[^\d]/.test(t)) {
                        e.preventDefault();
                        setData({
                          ...data,
                          debt: (data.debt || "") + onlyDigits(t),
                        });
                      }
                    }}
                    inputMode="numeric"
                    type="text"
                    sx={roundedInputStyle}
                  />
                </Box>
              </Box>

              {/* 3) Goal + Timeframe */}
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
                  >
                    Goal <span style={{ color: "white" }}>ⓘ</span>
                  </Typography>
                  <FormControl fullWidth sx={roundedInputStyle}>
                    <Select
                      value={data.goal || "Build emergency fund"}
                      onChange={set("goal")}
                      displayEmpty
                      sx={roundedInputStyle}
                    >
                      <MenuItem value="Build emergency fund" sx={{ color: "black" }}>
                        Build emergency fund
                      </MenuItem>
                      <MenuItem value="Pay off debt" sx={{ color: "black" }}>
                        Pay off debt
                      </MenuItem>
                      <MenuItem value="Buy a home" sx={{ color: "black" }}>
                        Buy a home
                      </MenuItem>
                      <MenuItem value="Save for retirement" sx={{ color: "black" }}>
                        Save for retirement
                      </MenuItem>
                      <MenuItem value="General budgeting" sx={{ color: "black" }}>
                        General budgeting
                      </MenuItem>
                      <MenuItem value="Build credit" sx={{ color: "black" }}>
                        Build credit
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left", color: "white" }}
                  >
                    Timeframe <span style={{ color: "white" }}>ⓘ</span>
                  </Typography>
                  <FormControl fullWidth sx={roundedInputStyle}>
                    <Select
                      value={data.timeframe || "12 months"}
                      onChange={set("timeframe")}
                      displayEmpty
                      sx={roundedInputStyle}
                    >
                      <MenuItem value="3 months" sx={{ color: "black" }}>3 months</MenuItem>
                      <MenuItem value="6 months" sx={{ color: "black" }}>6 months</MenuItem>
                      <MenuItem value="9 months" sx={{ color: "black" }}>9 months</MenuItem>
                      <MenuItem value="12 months" sx={{ color: "black" }}>12 months</MenuItem>
                      <MenuItem value="18 months" sx={{ color: "black" }}>18 months</MenuItem>
                      <MenuItem value="24 months" sx={{ color: "black" }}>24 months</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* 4) Upload */}
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2, ml: 11 }}>
                <Button
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={pickFile}
                  sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "white", backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Upload statement/PDF
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".pdf"
                  onChange={onFile}
                />
                <Typography variant="body2" sx={{ color: data.file ? "white" : "red" }}>
                  {data.file ? data.file.name : "*Required for more personalized results"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}