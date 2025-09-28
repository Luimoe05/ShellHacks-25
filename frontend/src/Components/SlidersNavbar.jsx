import React from "react";
import { Typography } from "@mui/material";
import { AccountBalance } from "@mui/icons-material";
import BackgroundSlideWrapper from "./BackgroundSlideWrapper";

const LOGO_COLOR = "#87d9b1";

export default function SlidersNavbar({ children }) {
  return (
    <React.Fragment>
      <AccountBalance
        sx={{
          position: "fixed",
          top: 16,
          left: 16,
          color: LOGO_COLOR,
          fontSize: 28,
          zIndex: 1100,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          position: "fixed",
          top: 14,
          left: 50,
          color: LOGO_COLOR,
          fontWeight: 700,
          zIndex: 1100,
        }}
      >
        Moola
      </Typography>

      <BackgroundSlideWrapper>
        <div style={{ paddingTop: "64px" }}>{children}</div>
      </BackgroundSlideWrapper>
    </React.Fragment>
  );
}
