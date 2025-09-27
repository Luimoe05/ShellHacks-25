import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

// IMPORTANT: Please verify and replace '4000' with the actual port
// where your Express backend is running (e.g., 3000, 8080).
const BACKEND_URL = "http://localhost:3000/gemini";

const USER_ID = "User";
const AI_ID = "Gemini";

/**
 * A basic chat interface to test the Gemini backend endpoint using Material UI.
 * This component sends a GET request to your Express server's /gemini endpoint
 * whenever a user types and clicks send.
 */
export default function Gemini() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: AI_ID,
      text: "Welcome! Type any message and click 'Send' to recieve a response.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText || isLoading) return;

    // 1. Add user message to state
    const newUserMessage = {
      id: Date.now(),
      sender: USER_ID,
      text: userMessageText,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Reset input immediately
    setInput("");
    setIsLoading(true);

    // 2. Add temporary loading message for the AI response
    const tempAiId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: tempAiId, sender: AI_ID, text: "Contacting backend..." },
    ]);

    try {
      const encodedPrompt = encodeURIComponent(userMessageText);
      const url = `${BACKEND_URL}?text=${encodedPrompt}`;

      const response = await fetch(url); // Use the full URL with the prompt

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // 👈 SUCCESS: Log the data to the browser console
      console.log("✅ DATA RECEIVED FROM BACKEND (Browser Console):", data);

      const aiResponseText =
        data.explanation ||
        "Error: Explanation field missing in response. Check the Network tab.";

      // 4. Update the temporary loading message with the actual AI response
      setMessages((prev) => {
        // Find and replace the temporary 'Contacting backend...' message
        const newMessages = prev.map((msg) =>
          msg.id === tempAiId ? { ...msg, text: aiResponseText } : msg
        );
        return newMessages;
      });
    } catch (error) {
      console.error("❌ Error fetching AI response (Browser Console):", error);
      // 5. Update the temporary message with an error
      setMessages((prev) => {
        const newMessages = prev.map((msg) =>
          msg.id === tempAiId
            ? {
                ...msg,
                text: `[Error] Failed to connect: ${error.message}. Check your backend port and CORS.`,
              }
            : msg
        );
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // MUI component for a single message bubble
  const Message = ({ message }) => {
    const isUser = message.sender === USER_ID;
    const userColor = "#6366F1"; // Indigo
    const aiColor = "#374151"; // Gray

    return (
      <Box
        sx={{
          maxWidth: { xs: "80%", md: "60%" },
          my: 1.5,
          alignSelf: isUser ? "flex-end" : "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            mb: 0.5,
            textAlign: isUser ? "right" : "left",
            color: "#9CA3AF", // Gray 400
          }}
        >
          {message.sender}
        </Typography>
        <Paper
          sx={{
            p: 1.5,
            color: "white",
            bgcolor: isUser ? userColor : aiColor,
            borderRadius: "12px",
            borderTopRightRadius: isUser ? 0 : "12px",
            borderTopLeftRadius: isUser ? "12px" : 0,
            boxShadow: 3,
            wordBreak: "break-word",
          }}
          elevation={3}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        width: "100%", // Full width
        bgcolor: "#111827", // Gray 900
        color: "white",
        fontFamily: "Roboto, sans-serif",
        borderRadius: 10,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#1F2937", // Gray 800
          boxShadow: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#818CF8" }}>
          Gemini Test Chat (MUI)
        </Typography>
      </Box>

      {/* Chat Messages Area (Scrollable) */}
      <Box
        sx={{
          flexGrow: 1, // Takes all available height
          p: 2,
          overflowY: "auto", // Enables scrolling only for messages
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Field (Fixed) */}
      <Box
        sx={{
          p: 2,
          bgcolor: "#1F2937",
          borderTop: "1px solid #374151",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <form
          onSubmit={sendMessage}
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isLoading
                ? "Waiting for response..."
                : "Type your test message..."
            }
            disabled={isLoading}
            InputProps={{
              sx: {
                borderRadius: "12px",
                color: "white",
                bgcolor: "#374151", // Gray 700
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#6366F1" },
              },
              placeholder: { color: "#9CA3AF" },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!input.trim() || isLoading}
            sx={{
              bgcolor: "#6366F1", // Indigo 500
              "&:hover": { bgcolor: "#4F46E5" }, // Indigo 600
              minWidth: "100px",
              borderRadius: "12px",
              boxShadow: 3,
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
