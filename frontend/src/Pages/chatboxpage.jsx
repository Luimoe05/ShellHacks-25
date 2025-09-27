// chatboxpage.jsx
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
} from "@mui/material";
import { Send as SendIcon, AttachFile as AttachFileIcon } from "@mui/icons-material";
import SmartToyRoundedIcon from "@mui/icons-material/SmartToyRounded";

export default function ChatHeroBot({
  accent = "linear-gradient(135deg, #2E8BC0 0%, #3BB273 100%)",
  placeholder = "Type your message…",
}) {
  const initialMessages = [
    { id: "m1", role: "bot", text: "Hi! My name is Jack\nBefore we start, tell me your name" },
  ];

  const [messages, setMessages] = useState(withIds(initialMessages));
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState("ask_name");
  const listRef = useRef(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: { main: "#2E8BC0" },
          background: { default: "#ffffff", paper: "#ffffff" },
        },
        shape: { borderRadius: 28 },
        typography: {
          fontFamily: "Poppins, Inter, -apple-system, system-ui, sans-serif",
        },
      }),
    []
  );

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  const handleSend = (textParam) => {
    const text = (textParam ?? input).trim();
    if (!text) return;

    setMessages((m) => [...m, makeMsg("user", text)]);
    setInput("");

    const reply = computeReply({ text, phase, userName });
    if (!reply) return;

    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, makeMsg("bot", reply.text)]);
      setTyping(false);
      if (reply.next?.phase) setPhase(reply.next.phase);
      if (reply.next?.userName !== undefined) setUserName(reply.next.userName);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",

          p: 3,
          borderRadius: 2,                       // ← rectangular, slightly curved edges
          border: "4px solid transparent",
          backgroundImage: `linear-gradient(#fff, #fff), ${accent}`,
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
              sx={{ fontWeight: 800, fontSize: { xs: 34, sm: 54 }, lineHeight: 1.15, m: 0 }}
            >
              Meet Our AI
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontWeight: 800, fontSize: { xs: 34, sm: 54 }, lineHeight: 1.15, mt: 0.25, m: 0 }}
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
            borderRadius: 3,
            bgcolor: "#fff",
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
            sx={{
              flex: 1,
              overflowY: "auto",
              pt: 2,
              pb: 2,
              px: { xs: 1.75, sm: 2.25 },
            }}
          >
            {messages.map((m) =>
              m.role === "bot" ? (
                <BotCard key={m.id} text={m.text} accent={accent} />
              ) : (
                <UserPill key={m.id} text={m.text} />
              )
            )}
            {typing && <BotCard text={<TypingDots />} accent={accent} />}
          </Stack>

          {/* Composer */}
          <Box
            sx={{
              borderTop: "1px solid",
              borderColor: "divider",
              px: { xs: 1.75, sm: 2.25 },
              py: 1.25,
              bgcolor: "#fff",
            }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              multiline
              maxRows={6}
              fullWidth
              InputProps={{
                sx: { borderRadius: 999 },
                startAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title="Attach">
                      <IconButton edge="start">
                        <AttachFileIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Send">
                      <IconButton
                        sx={{
                          background: accent,
                          color: "#fff",
                          "&:hover": { opacity: 0.9 },
                        }}
                        onClick={() => handleSend()}
                      >
                        <SendIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="caption"
              sx={{ mt: 0.75, display: "block", color: "text.secondary", textAlign: "center" }}
            >
              Press Enter to send · Shift+Enter for newline
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

/* ── Conversation Logic ── */
function computeReply({ text, phase, userName }) {
  const s = text.trim();

  if (phase === "ask_name") {
    const cleaned = s.replace(/[^a-z\s'-]/gi, "").trim();
    const name = cleaned || "there";
    return {
      text: `Nice to meet you, ${name}!`,
      next: { phase: "done", userName: cleaned || userName },
    };
  }

  return null;
}

/* ── UI Pieces ── */
function BotCard({ text, accent }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ pl: 0.5 }}>
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
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        }}
      >
        <Avatar sx={{ bgcolor: "#fff", width: 32, height: 32, color: "text.primary" }}>
          <SmartToyRoundedIcon fontSize="inherit" />
        </Avatar>
      </Box>

      {/* White card bubble */}
      <Paper
        elevation={6}
        sx={{
          px: { xs: 2, sm: 2.4 },
          py: { xs: 1.8, sm: 2.2 },
          borderRadius: 5,
          boxShadow: "0 10px 28px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
          maxWidth: 620,
          mt: -0.25,
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: "pre-wrap", fontWeight: 600 }}>
          {typeof text === "string" ? text : text}
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
          boxShadow: "0 12px 26px rgba(0,0,0,0.12), 0 3px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="subtitle1">{text}</Typography>
      </Paper>
    </Box>
  );
}

function TypingDots() {
  return (
    <Box sx={{ display: "inline-flex", gap: 0.6, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "text.secondary",
            opacity: 0.6,
            animation: "blink 1.2s infinite",
            animationDelay: `${i * 0.15}s`,
            "@keyframes blink": {
              "0%, 80%, 100%": { opacity: 0.3, transform: "translateY(0)" },
              "40%": { opacity: 1, transform: "translateY(-2px)" },
            },
          }}
        />
      ))}
    </Box>
  );
}

/* ── Helpers ── */
function withIds(initial) {
  return initial.map((m, i) => ({
    id: m.id ?? `init-${i}`,
    role: m.role ?? "bot",
    text: m.text ?? "",
  }));
}
function makeMsg(role, text) {
  return {
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
    role,
    text,
  };
}
