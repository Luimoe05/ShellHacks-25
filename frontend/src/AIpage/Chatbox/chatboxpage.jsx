import React, { useMemo, useRef, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Paper,
  Avatar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  CssBaseline,
  ThemeProvider,
  createTheme,
  CircularProgress,
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
} from "@mui/icons-material";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

/**
 * ChatHeroBot is the UI component, accepting all data and handlers from Gemini.jsx.
 * All internal state and logic (initialMessages, phase, handleSend logic) have been removed.
 */
export default function ChatHeroBot({
  // PROPS PASSED FROM GEMINI.JSX
  messages, // The array of messages (user/AI)
  input,
  setInput,
  sendMessage, // The function that calls the backend
  isLoading,
  messagesEndRef,
  USER_ID,
  AI_ID,
  // UI PROPS
  accent = "linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)",
  placeholder = "Type your message… (Press Enter to send)",
}) {
  // Removed all internal state (messages, typing, phase, etc.)

  const listRef = messagesEndRef || useRef(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark", // <--- Switched to Dark Mode
          primary: { main: "#2E8BC0" },
          // Set custom dark grey backgrounds
          background: { default: "#121212", paper: "#1E1E1E" },
        },
        shape: { borderRadius: 28 },
        typography: {
          fontFamily: "Poppins, Inter, -apple-system, system-ui, sans-serif",
        },
      }),
    []
  );

  // The scrolling effect remains, tied to the parent's message state
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  // Use the parent's sendMessage function for Enter key events
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // e.preventDefault() is handled by the form submit in sendMessage now
      // We still prevent default here if Enter is pressed to avoid newline insertion
      e.preventDefault();
      if (input.trim() && !isLoading) {
        sendMessage(e);
      }
    }
  };

  // --- UI PIECES ---

  function BotCard({ text, accent }) {
    return (
      <Stack
        direction="row"
        spacing={1.5}
        alignItems="flex-start"
        sx={{ pl: 0.5 }}
      >
        {/* Bot icon with gradient */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: accent,
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            // Changed to a subtle white shadow for dark mode
            boxShadow: "0 4px 16px rgba(255, 255, 255, 0.05)",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#121212",
              width: 32,
              height: 32,
              color: "text.primary",
            }}
          >
            <SmartToyRoundedIcon fontSize="inherit" />
          </Avatar>
        </Box>

        {/* Card bubble (will be dark grey from theme.palette.background.paper) */}
        <Paper
          elevation={6}
          sx={{
            px: { xs: 2, sm: 2.4 },
            py: { xs: 1.8, sm: 2.2 },
            borderRadius: 5,
            // Changed to a subtle white shadow for dark mode
            boxShadow:
              "0 10px 28px rgba(255,255,255,0.05), 0 2px 6px rgba(255,255,255,0.03)",
            maxWidth: 620,
            mt: -0.25,
          }}
        >
          {isLoading && text === "Generating response..." ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {text}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-wrap", fontWeight: 600 }}
            >
              {text}
            </Typography>
          )}
        </Paper>
      </Stack>
    );
  }

  function UserPill({ text }) {
    return (
      <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 0.5 }}>
        <Paper
          elevation={6}
          sx={{
            bgcolor: "#2E8BC0",
            color: "#fff",
            px: { xs: 2.8, sm: 3.2 },
            py: { xs: 1.2, sm: 1.4 },
            borderRadius: 999,
            fontWeight: 700,
            // Changed to a subtle white shadow for dark mode
            boxShadow:
              "0 12px 26px rgba(255,255,255,0.05), 0 3px 8px rgba(255,255,255,0.03)",
          }}
        >
          <Typography variant="subtitle1">{text}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ===== Whole Page Gradient Border (rectangular w/ soft corners) ===== */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 920,
          mx: "auto",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",

          p: 3,
          m: 3,
          borderRadius: 1, // ← rectangular, slightly curved edges
          border: "4px solid transparent",
          // Background for the border wrapper is set to dark grey
          backgroundImage: `linear-gradient(#121212, #121212), ${accent}`,
          backgroundOrigin: "padding-box, border-box",
          backgroundClip: "padding-box, border-box",
          boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* Top-left gradient blob */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            top: -140,
            left: -140,
            width: 320,
            height: 320,
            background: accent,
            borderBottomRightRadius: 320,
          }}
        />

        {/* Heading (aligned & shifted right) */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: 10, sm: 12 },
            mb: { xs: 4, sm: 6 },
            display: "flex",
            justifyContent: "flex-start",
            px: 2,
          }}
        >
          <Box sx={{ display: "inline-block", textAlign: "left", ml: 10 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 34, sm: 54 },
                lineHeight: 1.15,
                m: 0,
                color: "white",
              }}
            >
              Meet Our AI
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: 34, sm: 54 },
                lineHeight: 1.15,
                mt: 0.25,
                m: 0,
                color: "white",
              }}
            >
              Coach{" "}
              <Box
                component="span"
                sx={{
                  background: accent,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Moola
              </Box>
            </Typography>
          </Box>
        </Box>

        {/* Chat container */}
        <Box
          sx={{
            borderRadius: 1,
            bgcolor: "#1E1E1E", // <--- Dark grey background
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: { xs: "50vh", sm: "60vh" },
            overflow: "hidden",
          }}
        >
          {/* Messages */}
          <Stack
            ref={listRef}
            spacing={3}
            // Using a slightly different shade to distinguish from the border box
            bgcolor={"#1E1E1E"}
            sx={{
              flex: 1,
              overflowY: "auto",
              pt: 2,
              pb: 2,
              px: { xs: 1.75, sm: 2.25 },
            }}
          >
            {/* FIX: messages array is now guaranteed by props */}
            {messages.map((m) =>
              m.sender === AI_ID ? (
                <BotCard key={m.id} text={m.text} accent={accent} />
              ) : (
                <UserPill key={m.id} text={m.text} />
              )
            )}
            {/* Removed internal typing indicator logic */}
          </Stack>

          {/* Composer */}
          <Box
            component="form"
            onSubmit={sendMessage} // Use the parent's handler
            sx={{
              borderTop: "1px solid",
              // `borderColor: "divider"` automatically picks a light color in dark mode
              borderColor: "divider",
              px: { xs: 1.75, sm: 2.25 },
              py: 1.25,
              bgcolor: "#1E1E1E", // <--- Dark grey background
            }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "Waiting for response..." : placeholder}
              multiline
              maxRows={6}
              fullWidth
              disabled={isLoading}
              InputProps={{
                sx: { borderRadius: 999 },
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title="Attach">
                      <IconButton edge="start" disabled={isLoading}>
                        <AttachFileIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Send">
                      <IconButton
                        type="submit"
                        sx={{
                          background: accent,
                          color: "white",
                          "&:hover": { opacity: 0.9 },
                          minWidth: 48, // Ensure button is square
                          minHeight: 48,
                        }}
                        disabled={!input.trim() || isLoading}
                      >
                        {isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SendIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="caption"
              sx={{
                mt: 0.75,
                display: "block",
                color: "text.secondary", // This will be light grey in dark mode
                textAlign: "center",
              }}
            >
              Press Enter to send · Shift+Enter for newline
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// Removed unnecessary helper functions (makeMsg, withIds) and
// custom logic (computeReply, TypingDots) as they are not needed by the UI.
// The remaining helper components (BotCard, UserPill) are now internal to the main function
// or need to be moved out if they cause issues.
// I moved them out for safety, and simplified the implementation slightly.

/* ── UI Pieces (Moved outside for cleaner export) ── */
function BotCard({ text, accent, isLoading }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
      sx={{ pl: 0.5 }}
    >
      {/* Bot icon with gradient */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: accent,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          // Dark mode shadow fix
          boxShadow: "0 4px 16px rgba(255,255,255,0.05)",
        }}
      >
        <Avatar
          sx={{ bgcolor: "#fff", width: 32, height: 32, color: "text.primary" }}
        >
          <SmartToyRoundedIcon fontSize="inherit" />
        </Avatar>
      </Box>

      {/* Card bubble (uses theme.palette.background.paper in dark mode) */}
      <Paper
        elevation={6}
        sx={{
          px: { xs: 2, sm: 2.4 },
          py: { xs: 1.8, sm: 2.2 },
          borderRadius: 5,
          // Dark mode shadow fix
          boxShadow:
            "0 10px 28px rgba(255,255,255,0.05), 0 2px 6px rgba(255,255,255,0.03)",
          maxWidth: 620,
          mt: -0.25,
        }}
      >
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", fontWeight: 600 }}
        >
          {text}
        </Typography>
      </Paper>
    </Stack>
  );
}

function UserPill({ text }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 0.5 }}>
      <Paper
        elevation={6}
        sx={{
          bgcolor: "#2E8BC0",
          color: "#fff",
          px: { xs: 2.8, sm: 3.2 },
          py: { xs: 1.2, sm: 1.4 },
          borderRadius: 999,
          fontWeight: 700,
          // Dark mode shadow fix
          boxShadow:
            "0 12px 26px rgba(255,255,255,0.05), 0 3px 8px rgba(255,255,255,0.03)",
        }}
      >
        <Typography variant="subtitle1">{text}</Typography>
      </Paper>
    </Box>
  );
}
