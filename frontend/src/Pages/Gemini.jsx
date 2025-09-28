import React, { useState, useRef, useEffect } from "react";
import ChatHeroBot from "./chatboxpage.jsx";

const BACKEND_URL = "http://localhost:3000/gemini";
const USER_ID = "User";
const AI_ID = "Gemini";

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
  const [conversationHistory, setConversationHistory] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const userParam = urlParams.get("user");
  const user = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Save conversation to database on page unload/refresh
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

    const auth0UserId = user?.sub;

    // Add user message to UI
    const newUserMessage = {
      id: Date.now(),
      sender: USER_ID,
      text: userMessageText,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsLoading(true);

    // Add loading message
    const tempAiId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: tempAiId, sender: AI_ID, text: "Generating response..." },
    ]);

    try {
      // Send request with conversation history for context
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
      console.log("DATA RECEIVED FROM BACKEND:", data);

      const aiResponseText =
        data.explanation || "Error: No explanation received";

      // Update conversation history with both user and AI messages
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

      // Update UI with AI response
      setMessages((prev) => {
        return prev.map((msg) =>
          msg.id === tempAiId ? { ...msg, text: aiResponseText } : msg
        );
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => {
        return prev.map((msg) =>
          msg.id === tempAiId
            ? {
                ...msg,
                text: `[Error] Failed to connect: ${error.message}`,
              }
            : msg
        );
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to manually save conversation
  const saveConversationNow = async () => {
    if (conversationHistory.length > 0 && user?.sub) {
      try {
        const response = await fetch(`${BACKEND_URL}/save-conversation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.sub,
            conversation: conversationHistory,
          }),
        });

        if (response.ok) {
          console.log("Conversation saved manually");
        }
      } catch (error) {
        console.error("Error saving conversation:", error);
      }
    }
  };

  // Function to start new conversation
  const startNewConversation = () => {
    setConversationHistory([]);
    setMessages([
      {
        id: 1,
        sender: AI_ID,
        text: "Welcome! Type any message and click 'Send' to receive a response.",
      },
    ]);
  };

  return (
    <div>
      <div
        style={{
          padding: "10px",
          background: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        <button onClick={startNewConversation} style={{ marginRight: "10px" }}>
          New Conversation
        </button>
        <button onClick={saveConversationNow}>Save Conversation</button>
        <span style={{ marginLeft: "10px", fontSize: "12px", color: "#666" }}>
          Messages: {conversationHistory.length}
        </span>
      </div>

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
    </div>
  );
}
