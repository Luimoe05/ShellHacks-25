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
    "& .MuiOutlinedInput-root": { borderRadius: "15px" },
  };
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  const pickFile = () => fileInputRef.current?.click();
  const onFile = (e) => {
    const file = e.target.files?.[0] || null;
    setData({ ...data, file });
  };

  // === shrink everything as a unit ===
  const SCALE = 0.9; // try 0.85–0.95 to taste

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        px: 8,
        py: 1,
        boxSizing: "border-box",
        ml: 48,
        mt: 2,
        transform: `scale(${SCALE})`,
        transformOrigin: "top left",
        width: `${100 / SCALE}%`, // compensate shrink so layout doesn’t collapse
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
          fontSize: "25px",
        }}
      >
        Tell us about your finances
      </Typography>

      <Typography
        variant="body1"
        sx={{ textAlign: "left", color: "gray", opacity: 1.0, mt: -2, mb: -1 }}
      >
        We’ll personalize Moola’s recommendations based on your numbers.
      </Typography>

      <Box sx={{ width: "45%" }}>
        {/* 1) Income + Credit score */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
              Monthly income <span style={{ color: "gray" }}>ⓘ</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., 4500"
              value={data.monthlyIncome || ""}
              onChange={set("monthlyIncome")}
              sx={roundedInputStyle}
              type="number"
              inputProps={{ min: 0 }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
              Credit score <span style={{ color: "gray" }}>ⓘ</span>
            </Typography>
            <FormControl fullWidth sx={{ textAlign: "left" }}>
              <Select
                value={data.creditScoreRange || "650-699"}
                onChange={set("creditScoreRange")}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { borderRadius: "15px" },
                  "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  "& .MuiSelect-select": { borderRadius: "15px" },
                }}
              >
                {["600-649", "650-699", "700-749", "750-799", "800+"].map((r) => (
                  <MenuItem key={r} value={r}>
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
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
              Housing (per month) <span style={{ color: "gray" }}>ⓘ</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., 1600"
              value={data.housing || ""}
              onChange={set("housing")}
              sx={roundedInputStyle}
              type="number"
              inputProps={{ min: 0 }}
            />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
              Debt payments (per month) <span style={{ color: "gray" }}>ⓘ</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="e.g., 300"
              value={data.debt || ""}
              onChange={set("debt")}
              sx={roundedInputStyle}
              type="number"
              inputProps={{ min: 0 }}
            />
          </Box>
        </Box>

        {/* 3) Goal + Timeframe */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
              Goal <span style={{ color: "gray" }}>ⓘ</span>
            </Typography>
            <FormControl fullWidth sx={{ textAlign: "left" }}>
              <Select
                value={data.goal || "Build emergency fund"}
                onChange={set("goal")}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { borderRadius: "15px" },
                  "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  "& .MuiSelect-select": { borderRadius: "15px" },
                }}
              >
                <MenuItem value="Build emergency fund">Build emergency fund</MenuItem>
                <MenuItem value="Pay off debt">Pay off debt</MenuItem>
                <MenuItem value="Buy a home">Buy a home</MenuItem>
                <MenuItem value="Save for retirement">Save for retirement</MenuItem>
                <MenuItem value="General budgeting">General budgeting</MenuItem>
                <MenuItem value="Build credit">Build credit</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
              Timeframe <span style={{ color: "gray" }}>ⓘ</span>
            </Typography>
            <FormControl fullWidth sx={{ textAlign: "left" }}>
              <Select
                value={data.timeframe || "12 months"}
                onChange={set("timeframe")}
                displayEmpty
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { borderRadius: "15px" },
                  "& .MuiOutlinedInput-root": { borderRadius: "15px" },
                  "& .MuiSelect-select": { borderRadius: "15px" },
                }}
              >
                <MenuItem value="3 months">3 months</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
                <MenuItem value="9 months">9 months</MenuItem>
                <MenuItem value="12 months">12 months</MenuItem>
                <MenuItem value="18 months">18 months</MenuItem>
                <MenuItem value="24 months">24 months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* 4) Destination link */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 0.5, textAlign: "left" }}>
            Destination link <span style={{ color: "gray" }}>ⓘ</span>
          </Typography>
          <TextField
            fullWidth
            placeholder="Link to a shared CSV / bank export / Google Sheet"
            value={data.link || ""}
            onChange={set("link")}
            sx={roundedInputStyle}
          />
        </Box>

        {/* 5) Upload */}
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            onClick={pickFile}
            sx={{ borderRadius: "12px", textTransform: "none" }}
          >
            Upload statement/CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            hidden
            accept=".csv,.xlsx,.xls,.pdf,.ofx,.qfx"
            onChange={onFile}
          />
          <Typography variant="body2" sx={{ color: data.file ? "text.primary" : "red" }}>
            {data.file ? data.file.name : "*Required for more personalized results"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
