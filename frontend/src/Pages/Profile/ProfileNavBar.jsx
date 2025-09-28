import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { HomeRounded, AccountBalance } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const pages = ["Financials", "Transactions", "Settings"]; // Removed Logout from here

export default function ProfileNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
  };

  // Handle page navigation
  const handlePageClick = (page) => {
    handleCloseNavMenu();
    // Add navigation logic for other pages
    // Example: navigate(`/${page.toLowerCase()}`);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#121212",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        color: "White",
        p: 2,
      }}
    >
      <Toolbar disableGutters>
        {/* Logo/Title (Desktop) */}
        <AccountBalance sx={{ color: "White", mr: 1, fontSize: 28 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Moola
        </Typography>

        {/* Mobile Navigation Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => handlePageClick(page)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            {/* Add Logout to mobile menu */}
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "#f44336",
                "&:hover": {
                  backgroundColor: "rgba(244, 67, 54, 0.1)",
                },
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>

        {/* Mobile Logo/Title */}
        <AccountBalance
          sx={{
            display: { xs: "flex", md: "none" },
            mr: 1,
            color: "#54B8A9",
            fontSize: 24,
          }}
        />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          Moola
        </Typography>

        {/* Desktop Navigation Links */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageClick(page)}
              sx={{ my: 2, color: "White", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* Desktop Logout Button */}
        <Button
          onClick={handleLogout}
          sx={{
            ml: 2,
            display: { xs: "none", md: "flex" },
            color: "#f44336",
            border: "1px solid #f44336",
            "&:hover": {
              backgroundColor: "rgba(244, 67, 54, 0.1)",
            },
          }}
        >
          Logout
        </Button>

        {/* Back to Home Button */}
        <Button
          color="inherit"
          startIcon={<HomeRounded />}
          sx={{ ml: 2, display: { xs: "none", md: "flex" }, color: "white" }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}
