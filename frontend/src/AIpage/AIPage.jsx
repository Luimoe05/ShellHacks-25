import React from "react";
// import Gemini from "./Gemini";
import ChatContainer from "./Chatbox/Chatcontainer";
import AdviceSection from "./AIComponents/AdviceSection";
import MoolaNavbar from "./AIComponents/Moolanavbar";
import MetricCard from "./AIComponents/MetricCard";
// import PDFTest from "../Components/PDFTest"; // Add this import

import { GlobalStyles, Box } from "@mui/material"; // ✅ fixed: Container was unused, removed

export default function AIPage() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            overflowX: "hidden",
            backgroundColor: "#FFFFFF",
          },
          html: {
            height: "100%",
          },
        }}
      />

      {/* <PDFTest /> */}

      <Box sx={{ bgcolor: "#121212" }}>
        <MoolaNavbar />
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/* <Gemini /> */}
          <ChatContainer />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <AdviceSection />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 2,
                // bgcolor: "white",
                p: 4,
                justifyContent: "center",
              }}
            >
              <MetricCard
                title="Revenue"
                value="$12,340"
                icon={null} // pass an icon like <TrendingUpIcon /> if you want
                color="green"
                trend="+12%"
              />
              <MetricCard
                title="Revenue"
                value="$12,340"
                icon={null} // pass an icon like <TrendingUpIcon /> if you want
                color="green"
                trend="+12%"
              />
              <MetricCard
                title="Revenue"
                value="$12,340"
                icon={null} // pass an icon like <TrendingUpIcon /> if you want
                color="green"
                trend="+12%"
              />
              <MetricCard
                title="Revenue"
                value="$12,340"
                icon={null} // pass an icon like <TrendingUpIcon /> if you want
                color="green"
                trend="+12%"
              />
              <MetricCard
                title="Revenue"
                value="$12,340"
                icon={null} // pass an icon like <TrendingUpIcon /> if you want
                color="green"
                trend="+12%"
              />
              <MetricCard
                title="Revenue"
                value="$1,340,123"
                icon={null} // pass an icon like <TrendingUpIcon /> if you want
                color="green"
                trend="+12%"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
