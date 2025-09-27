import React, { useState, useRef, useEffect } from "react";
// FIX: Using the standard relative path: one folder up (..) and into the Components folder
import ChatHeroBot from "./chatboxpage.jsx";

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
    setIsLoading(true); // START LOADING

    // 2. Add temporary loading message for the AI response
    const tempAiId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: tempAiId, sender: AI_ID, text: "Generating response..." },
    ]);

    try {
      // FIX: Ensure the user prompt is sent as a query parameter
      const encodedPrompt = encodeURIComponent(userMessageText);
      const url = `${BACKEND_URL}?text=${encodedPrompt}`;

      const response = await fetch(url); // Use the full URL with the prompt

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Log the data to the browser console
      console.log("✅ DATA RECEIVED FROM BACKEND (Browser Console):", data);

      const aiResponseText =
        data.explanation ||
        "Error: Explanation field missing in response. Check the Network tab.";

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
