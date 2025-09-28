import React, { useMemo, useRef, useEffect } from "react";
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
  Chip, // Added Chip for displaying file name
} from "@mui/material";
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon, // Added CloseIcon for removing file
} from "@mui/icons-material";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

/**
 * ChatHeroBot is the UI component, accepting all data and handlers from ChatContainer.jsx.
 */
export default function ChatHeroBot({
  // PROPS PASSED FROM ChatContainer.jsx
  messages, // The array of messages (user/AI)
  input,
  setInput,
  sendMessage, // The function that calls the backend
  isLoading,
  messagesEndRef,
  USER_ID,
  AI_ID,
  file, // <--- NEW: Attached file object
  onAttachClick, // <--- NEW: Function to trigger file selection
  onRemoveFile, // <--- NEW: Function to clear the attached file
  // UI PROPS
  accent = "linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)",
  placeholder = "Type your message… (Press Enter to send)",
}) {
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
      e.preventDefault();
      // Ensure we can send if we have a prompt OR if we have a file (for file-only queries)
      const canSend = input.trim() || file;
      if (canSend && !isLoading) {
        sendMessage(e);
      }
    }
  };

  // --- UI PIECES (Moved inside for context) ---

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

        {/* Card bubble */}
        <Paper
          elevation={6}
          sx={{
            px: { xs: 2, sm: 2.4 },
            py: { xs: 1.8, sm: 2.2 },
            borderRadius: 1,
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
            boxShadow:
              "0 12px 26px rgba(255,255,255,0.05), 0 3px 8px rgba(255,255,255,0.03)",
          }}
        >
          <Typography variant="subtitle1">{text}</Typography>
        </Paper>
      </Box>
    );
  }

  // --- Main Render ---

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Container Box and Heading (omitted for brevity) */}

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
          borderRadius: 1,
          border: "4px solid transparent",
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

        {/* Heading (omitted for brevity) */}
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
            bgcolor={"#1E1E1E"}
            sx={{
              flex: 1,
              overflowY: "auto",
              pt: 2,
              pb: 2,
              px: { xs: 1.75, sm: 2.25 },
            }}
          >
            {messages.map((m) =>
              m.sender === AI_ID ? (
                <BotCard key={m.id} text={m.text} accent={accent} />
              ) : (
                <UserPill key={m.id} text={m.text} />
              )
            )}
          </Stack>

          {/* Composer */}
          <Box
            component="form"
            onSubmit={sendMessage} // Use the parent's handler
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              px: { xs: 1.75, sm: 2.25 },
              py: 1.25,
              bgcolor: "#1E1E1E", // <--- Dark grey background
            }}
          >
            {/* Display attached file if one exists */}
            {file && (
              <Box sx={{ mb: 1, px: 2, pt: 1 }}>
                <Chip
                  label={file.name}
                  onDelete={onRemoveFile}
                  deleteIcon={<CloseIcon />}
                  sx={{ bgcolor: "#2E8BC0", color: "white", fontWeight: 600 }}
                />
              </Box>
            )}

            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isLoading
                  ? "Waiting for response..."
                  : file
                  ? `Ask about "${file.name}" or type a new message...`
                  : placeholder
              }
              multiline
              maxRows={6}
              fullWidth
              disabled={isLoading}
              InputProps={{
                sx: { borderRadius: 999 },
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip
                      title={
                        file
                          ? "Change attached PDF"
                          : "Attach PDF file (.pdf only)"
                      }
                    >
                      <IconButton
                        edge="start"
                        disabled={isLoading}
                        onClick={onAttachClick} // <--- Makes the attachment button functional
                      >
                        <AttachFileIcon color={file ? "primary" : "inherit"} />
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
                        // Can send if there is text input OR a file attached
                        disabled={(!input.trim() && !file) || isLoading}
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
                color: "text.secondary",
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
// Note: BotCard and UserPill components are now defined inside the main component function
