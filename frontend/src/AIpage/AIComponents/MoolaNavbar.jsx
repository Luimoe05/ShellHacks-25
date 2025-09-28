import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// --- FIX for MenuIcon Error: Imported MenuIcon (which is the Menu component) from its specific path ---
import { HomeRounded, AccountBalance } from "@mui/icons-material"; // Kept working named imports
import MenuIcon from "@mui/icons-material/Menu"; // New, reliable import path
import { useNavigate } from "react-router-dom";

const pages = ["Financials", "Transactions", "Settings", "Logout"]; // Updated pages for financial context
const settings = ["Profile", "Logout"]; // Simplified settings

export default function MoolaNavbar() {
  // TypeScript removed: using standard React.useState and initializing with null
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // TypeScript removed: using standard JavaScript event handling
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/logout`;
  };

  // Handle Profile navigation - FIXED
  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile"); // Navigate to your profile route
  };

  // Handle settings menu click
  const handleSettingClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      handleProfile();
    } else {
      // Handle other settings
      console.log(`${setting} clicked`);
      handleCloseUserMenu();
    }
  };

  // Handle page navigation for desktop menu
  const handlePageClick = (page) => {
    if (page === "Logout") {
      handleLogout();
    } else if (page === "Profile") {
      handleProfile();
    } else {
      // Add navigation logic for other pages
      handleCloseNavMenu();
      // Example: navigate(`/${page.toLowerCase()}`);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#121212",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        color: "White",
        p: 2, // Added padding from user's block
      }}
    >
      {/* Removed horizontal padding from Toolbar */}
      <Toolbar disableGutters>
        {/* Logo/Title (Desktop) */}
        <AccountBalance sx={{ color: "White", mr: 1, fontSize: 28 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#" // Placeholder for homepage link
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
              <MenuItem
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{
                  ...(page === "Logout" && {
                    color: "#f44336", // Red color for logout
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    },
                  }),
                }}
              >
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Mobile Logo/Title - Now uses AccountBalance for consistency */}
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

        {/* Desktop Navigation Links (Financials, Transactions, Settings) */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages
            .filter((page) => page !== "Logout")
            .map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 2, color: "White", display: "block" }}
              >
                {page}
              </Button>
            ))}
        </Box>

        {/* Settings Menu and Avatar */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {/* Using a placeholder Avatar component */}
              <Avatar
                alt="User Settings"
                sx={{ bgcolor: "#FFA726", width: 32, height: 32 }}
              >
                U
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleSettingClick(setting)}
                sx={{
                  // Style logout option differently if needed
                  ...(setting === "Logout" && {
                    color: "#f44336", // Red color for logout
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.1)",
                    },
                  }),
                }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Button to go back to Home (Kept from original simple MoolaNavbar request) */}
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
