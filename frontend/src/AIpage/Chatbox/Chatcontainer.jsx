import React, { useState, useRef, useEffect } from "react";
import ChatHeroBot from "./chatboxpage";

// Constants for message identification
const USER_ID = "user";
const AI_ID = "ai";

// FIXED: Use your backend URL instead of direct Gemini API
const BACKEND_URL = `${
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
}/gemini`;

// Simple ID generator (replaces uuid)
const generateId = () => Date.now() + Math.random();

// Utility to create a message object
const createMessage = (text, sender, id = generateId()) => ({
  id,
  text,
  sender,
  timestamp: new Date().toISOString(),
});

export default function ChatContainer() {
  const [messages, setMessages] = useState([
    createMessage(
      "Hello! I'm Moola, your AI Financial Coach. Upload your onboarding PDF document and ask me anything about it!",
      AI_ID
    ),
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const canSend = input.trim() || file;
    if (!canSend || isLoading) return;

    const userMessage =
      input.trim() || `Querying uploaded document: ${file.name}`;

    // 1. Add user message to history
    setMessages((prev) => [...prev, createMessage(userMessage, USER_ID)]);

    // 2. Clear input and set loading state
    setInput("");
    setIsLoading(true);

    // 3. Add AI typing indicator
    const thinkingId = generateId();
    setMessages((prev) => [
      ...prev,
      createMessage("Generating response...", AI_ID, thinkingId),
    ]);

    try {
      // Create FormData to send to your backend
      const formData = new FormData();
      formData.append("text", input.trim() || "Analyze the provided document.");

      if (file) {
        formData.append("file", file); // This matches your backend's upload.single("file")
      }

      // Send POST request to your backend
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData, // No Content-Type header - let browser set it for multipart/form-data
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Backend error" }));
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      const aiText =
        data.explanation || "Sorry, I couldn't generate a response.";

      // 4. Update state: Remove typing indicator and add final AI response
      setMessages((prev) => {
        const newMessages = prev.filter((m) => m.id !== thinkingId);
        return [...newMessages, createMessage(aiText, AI_ID)];
      });
    } catch (error) {
      console.error("Backend Error:", error);
      // 5. Update state: Remove typing indicator and add error message
      setMessages((prev) => {
        const newMessages = prev.filter((m) => m.id !== thinkingId);
        return [
          ...newMessages,
          createMessage(
            `Error: Could not process request. ${error.message}`,
            AI_ID
          ),
        ];
      });
    } finally {
      setIsLoading(false);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  // File input handlers
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      console.log("PDF file selected:", selectedFile.name);
    } else {
      setFile(null);
      if (selectedFile) {
        console.warn("Invalid file selected. Please select a valid PDF file.");
        alert("Please select a PDF file (.pdf only)");
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        style={{ display: "none" }}
      />

      <ChatHeroBot
        messages={messages}
        input={input}
        setInput={setInput}
        sendMessage={handleSend}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
        USER_ID={USER_ID}
        AI_ID={AI_ID}
        file={file}
        onAttachClick={openFilePicker}
        onRemoveFile={handleRemoveFile}
      />
    </>
  );
}
