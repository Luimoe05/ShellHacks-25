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
import { HomeRounded, AccountBalance } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const pages = ["Financials", "Transactions", "Settings", "Logout"];
const settings = ["Profile", "Logout"];

export default function MoolaNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  // Handle Profile navigation
  const handleProfile = () => {
    handleCloseUserMenu();
    navigate("/profile");
  };

  // Handle settings menu click
  const handleSettingClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      handleProfile();
    } else {
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
        p: 2,
      }}
    >
      <Toolbar disableGutters>
        {/* Logo/Title (Desktop) */}
        <AccountBalance sx={{ color: "White", mr: 1, fontSize: 28 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "white",
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
                    color: "#f44336",
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
          component="div"
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
        <Box
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: "10px" }}
        >
          {pages.map((page) => (
            <Button
              key={page}
              onClick={() => handlePageClick(page)}
              sx={{
                my: 2,
                color: "White",
                display: "block",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#474747",
                },
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* Settings Menu and Avatar */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                  ...(setting === "Logout" && {
                    color: "#f44336",
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

        {/* Home Button */}
        <Button
          color="inherit"
          startIcon={<HomeRounded />}
          sx={{
            ml: 2,
            display: { xs: "none", md: "flex" },
            color: "white",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              backgroundColor: "#474747",
            },
          }}
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}
