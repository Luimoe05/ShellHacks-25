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

export default function HomepageNavbar({ isAuthenticated, userInfo }) {
  console.log("Navbar - isAuthenticated:", isAuthenticated);
  return (
    <AppBar position="static" sx={{ bgcolor: "#121212", boxShadow: 1 }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <AccountBalance sx={{ color: "white", mr: 1, fontSize: 28 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "white", fontWeight: 700 }}
          >
            Moola
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit" sx={{ color: "white" }}>
            Features
          </Button>
          <Button color="inherit" sx={{ color: "white" }}>
            Pricing
          </Button>
          <Button color="inherit" sx={{ color: "white" }}>
            About
          </Button>
          <Button color="inherit" sx={{ color: "white" }}>
            Contact
          </Button>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, ml: 3, gap: 3 }}>
          {isAuthenticated ? (
            <Button
              variant="outlined"
              sx={{ color: "#ff6b6b", borderColor: "#ff6b6b" }}
              onClick={() => {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("userInfo");
                window.location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/logout`;
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ color: "#54B888", borderColor: "#54B888" }}
                onClick={() =>
                  (window.location.href = `${
                    import.meta.env.VITE_BACKEND_URL
                  }/login`)
                }
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#54B888" }}
                onClick={() =>
                  (window.location.href = `${
                    import.meta.env.VITE_BACKEND_URL
                  }/login`)
                }
              >
                Get Started
              </Button>
            </>
          )}
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
