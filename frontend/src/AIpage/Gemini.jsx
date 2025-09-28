import React, { useState, useRef, useEffect } from "react";
// FIX: Using the standard relative path: one folder up (..) and into the Components folder
import ChatHeroBot from "./Chatbox/chatboxpage.jsx";
import { Container } from "@mui/material";
// IMPORTANT: Please verify and replace '3000' with the actual port
const BACKEND_URL = "http://localhost:3000/gemini";
const USER_ID = "User";
const AI_ID = "Gemini";

/**
 * Gemini component handles all chat state, logic, and API calls,
 * passing data and handlers down to the ChatHeroBot UI component.
 */
export default function Gemini() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: AI_ID,
      text: "Welcome! Type any message and click 'Send' to receive a response.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // NEW: Add conversation history state for database saving
  const [conversationHistory, setConversationHistory] = useState([]);

  // NEW: Get user info from URL params (for Auth0 integration)
  const urlParams = new URLSearchParams(window.location.search);
  const userParam = urlParams.get("user");
  const user = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

  // Scroll to the bottom of the chat on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // NEW: Save conversation to database on page unload/refresh
  useEffect(() => {
    const saveConversation = async () => {
      if (conversationHistory.length > 0 && user?.sub) {
        try {
          await fetch(`${BACKEND_URL}/save-conversation`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: user.sub,
              conversation: conversationHistory,
            }),
            keepalive: true,
          });
        } catch (error) {
          console.error("Error saving conversation:", error);
        }
      }
    };

    window.addEventListener("beforeunload", saveConversation);
    return () => window.removeEventListener("beforeunload", saveConversation);
  }, [conversationHistory, user]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const userMessageText = input.trim();
    if (!userMessageText || isLoading) return;

    // NEW: Get auth0 user ID for database operations
    const auth0UserId = user?.sub;

    // 1. Add user message to state
    const newUserMessage = {
      id: Date.now(),
      sender: USER_ID,
      text: userMessageText,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Reset input immediately
    setInput("");
    setIsLoading(true); // START LOADING

    // 2. Add temporary loading message for the AI response
    const tempAiId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: tempAiId, sender: AI_ID, text: "Generating response..." },
    ]);

    try {
      // MODIFIED: Send POST request with conversation history for context
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: auth0UserId,
          current_message: userMessageText,
          conversation_history: conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Log the data to the browser console
      console.log("✅ DATA RECEIVED FROM BACKEND (Browser Console):", data);

      const aiResponseText =
        data.explanation ||
        "Error: Explanation field missing in response. Check the Network tab.";

      // NEW: Update conversation history with both user and AI messages
      const newHistory = [
        ...conversationHistory,
        {
          role: "user",
          content: userMessageText,
          timestamp: new Date().toISOString(),
        },
        {
          role: "assistant",
          content: aiResponseText,
          timestamp: new Date().toISOString(),
        },
      ];
      setConversationHistory(newHistory);

      // 4. Update the temporary loading message with the actual AI response
      setMessages((prev) => {
        // Find and replace the temporary 'Generating response...' message
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
      // 6. STOP LOADING
      console.log("Setting isLoading to false in finally block.");
      setIsLoading(false);
    }
  };

  return (
    // Pass all necessary state and handlers to the ChatHeroBot UI component
    <ChatHeroBot
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      isLoading={isLoading}
      messagesEndRef={messagesEndRef}
      USER_ID={USER_ID}
      AI_ID={AI_ID}
    />
  );
}
