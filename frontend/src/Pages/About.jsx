// src/Pages/About.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Link,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import humzaImg from "../assets/humza.jpg";

// ✅ Import the navbar ONCE with the correct relative path.
// If your file is at src/Pages/Homepage/HomepageNavbar.jsx and this file is src/Pages/About.jsx:
import HomepageNavbar from "./Homepage/HomepageNavbar";
// If your file is actually somewhere else, change the path above accordingly (examples):
// import HomepageNavbar from "../Components/HomepageNavbar";
// import HomepageNavbar from "./HomepageNavbar";

const TEAM = [
  {
    name: "Luis-Angel Moreno",
    linkedin: "https://www.linkedin.com/in/luisanm/",
    img: "/assets/team/member1.jpg",
  },
  {
    name: "Ousman Bah",
    linkedin: "https://www.linkedin.com/in/ousman-bah/",
    img: "/assets/team/member2.jpg",
  },
  {
    name: "Humza Naeem",
    linkedin: "https://www.linkedin.com/in/humzanaeem06/",
    img: humzaImg,
  },
  {
    name: "Karina Villalobos",
    linkedin: "https://www.linkedin.com/in/kvillalobosh/",
    img: "/assets/team/member4.jpg",
  },
];

const initials = (fullName) =>
  fullName
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const avatarImgSx = (memberName) =>
  memberName === "Humza Naeem"
    ? { objectFit: "cover", objectPosition: "center 42%" }
    : { objectFit: "cover", objectPosition: "center" };

export default function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0B0F0E",
        color: "rgba(255,255,255,0.92)",
      }}
    >
      {/* ✅ Navbar at the top (only one import, no duplicates) */}
      <HomepageNavbar />

      <Container maxWidth="lg" sx={{ py: { xs: 7, md: 10 } }}>
        {/* HERO */}
        <Stack spacing={3} alignItems="center" textAlign="center" sx={{ mb: { xs: 6, md: 8 } }}>
          <Chip
            label="ABOUT"
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.85)",
              borderRadius: "999px",
              letterSpacing: 2,
              fontWeight: 700,
              fontSize: { xs: 14, md: 18 },
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 1, md: 1.2 },
            }}
          />

          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              lineHeight: 1.15,
              fontSize: { xs: 32, md: 48 },
              background: "linear-gradient(90deg, #2E8BC0 0%, #3BB273 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            We created Moola to solve a problem that affects nearly everyone.          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 900,
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "18px", md: "22px" },
            }}
          >
            Despite how critical money is to our daily lives, financial literacy is rarely taught in schools. From young adults navigating their first paycheck to families managing long-term goals, people are left to figure it out on their own. 
            Moola bridges that gap by making financial guidance clear, adaptive, and goal-oriented so anyone, at any stage of life, can make smarter financial decisions with confidence.
          </Typography>
        </Stack>

        {/* TEAM HEADER */}
        <Stack spacing={1} alignItems="center" textAlign="center" sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 2, fontWeight: 700, color: "white" }}
          >
            Meet the Team
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontSize: { xs: "18px", md: "20px" },
              maxWidth: "700px",
              mx: "auto",
              mb: 6,
            }}
          >
            Four builders on a mission to help you master your money.
          </Typography>
        </Stack>

        {/* TEAM GRID — with the same hover effect as HomepageFeatures */}
        <Grid container spacing={4} justifyContent="center">
          {TEAM.map((t) => (
            <Grid item xs={12} sm={6} md={3} key={t.name}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  minHeight: 5,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "#121212",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow:
                      "0 8px 16px rgba(255, 255, 255, 0.15), 0 0 10px rgba(255, 255, 255, 0.05)",
                  },
                  boxShadow: "0 2px 8px rgba(255,255,255,0.1)",
                  maxWidth: 260,
                  mx: "auto",
                }}
              >
                {/* Avatar with gradient ring */}
                <Box
                  sx={{
                    mx: "auto",
                    width: 120,
                    height: 120,
                    mb: 2,
                    p: "3px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)",
                  }}
                >
                  <Avatar
                    src={t.img || undefined}
                    alt={t.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: "4px solid #0B0F0E",
                      bgcolor: "rgba(255,255,255,0.08)",
                      overflow: "hidden",
                      "& img": avatarImgSx(t.name),
                    }}
                  >
                    {!t.img ? initials(t.name) : null}
                  </Avatar>
                </Box>

                <CardContent sx={{ p: 0, mt: 2, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "white", textAlign: "center", mb: 1 }}
                  >
                    {t.name}
                  </Typography>

                  <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1.5 }}>
                    <IconButton
                      component={Link}
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.name} LinkedIn`}
                      sx={{
                        color: "#fff",
                        backgroundColor: "rgba(255,255,255,0.12)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
                        borderRadius: 2,
                      }}
                    >
                      <LinkedInIcon fontSize="small" />
                    </IconButton>
                    <Link
                      href={t.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{ typography: "body1", fontWeight: 600, color: "white", alignSelf: "center" }}
                    >
                      LinkedIn
                    </Link>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
