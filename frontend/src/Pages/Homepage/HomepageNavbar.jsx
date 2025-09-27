import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { AccountBalance, Menu } from "@mui/icons-material";

export default function HomepageNavbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 1 }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <AccountBalance sx={{ color: "#54B8A9", mr: 1, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#54B8A9", fontWeight: 700 }}
          >
            Moola
          </Typography>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" sx={{ color: "#64748b" }}>
            Features
          </Button>
          <Button color="inherit" sx={{ color: "#64748b" }}>
            Pricing
          </Button>
          <Button color="inherit" sx={{ color: "#64748b" }}>
            About
          </Button>
          <Button color="inherit" sx={{ color: "#64748b" }}>
            Contact
          </Button>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3, gap: 3 }}>
          <Button
            variant="outlined"
            sx={{ color: "#54B888", borderColor: "#54B888" }}
          >
            Sign In
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#54B888" }}>
            Get Started
          </Button>
        </Box>
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "#64748b" }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
