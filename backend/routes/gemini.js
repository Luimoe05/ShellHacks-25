import express from "express";
import pkg from "express-openid-connect";
const { requiresAuth } = pkg;
import { getAiExplanation } from "../gemini-service.js";
import supabase from "../DB/supabase.js";

const router = express.Router();

// Main chat endpoint - handles individual messages with context
router.post("/", async (req, res) => {
  try {
    const { user_id, current_message, conversation_history } = req.body;

    console.log(`User ${user_id} sent: ${current_message}`);
    console.log(
      `Conversation history length: ${conversation_history?.length || 0}`
    );

    // Build context-aware prompt
    let contextPrompt = current_message;

    if (conversation_history && conversation_history.length > 0) {
      // Include recent conversation history (last 10 messages to avoid token limits)
      const recentHistory = conversation_history.slice(-10);
      const context = recentHistory
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n");

      contextPrompt = `Previous conversation context:\n${context}\n\nCurrent user message: ${current_message}\n\nPlease respond naturally, considering the conversation context.`;
    }

    console.log("Sending to Gemini with context...");
    const explanation = await getAiExplanation(contextPrompt);
    console.log("Received response from Gemini");

    res.json({
      success: true,
      explanation: explanation,
      message_count: conversation_history?.length || 0,
    });
  } catch (error) {
    console.error("Error in chat endpoint:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Save entire conversation to database
router.post("/save-conversation", async (req, res) => {
  try {
    console.log("Save conversation request body:", req.body);

    const { user_id, conversation } = req.body;

    if (!user_id) {
      console.error("Missing user_id in request");
      return res.status(400).json({
        success: false,
        message: "Missing user_id",
      });
    }

    if (!conversation || conversation.length === 0) {
      console.error("Missing or empty conversation");
      return res.status(400).json({
        success: false,
        message: "Missing or empty conversation",
      });
    }

    console.log(
      `Saving conversation for user ${user_id} with ${conversation.length} messages`
    );

    // Create a conversation summary for the title
    const firstUserMessage =
      conversation.find((msg) => msg.role === "user")?.content ||
      "New conversation";
    const title =
      firstUserMessage.length > 50
        ? firstUserMessage.substring(0, 50) + "..."
        : firstUserMessage;

    // Save conversation as a single record
    const { data, error } = await supabase
      .from("conversations_and_messages")
      .insert([
        {
          auth0_id: user_id,
          parent_id: null,
          role: "conversation",
          content: JSON.stringify({
            title: title,
            messages: conversation,
            message_count: conversation.length,
            created_at: new Date().toISOString(),
            last_updated: new Date().toISOString(),
          }),
        },
      ])
      .select();

    if (error) throw error;

    console.log("Conversation saved successfully:", data[0].id);

    res.json({
      success: true,
      conversation_id: data[0].id,
      message_count: conversation.length,
    });
  } catch (error) {
    console.error("Error saving conversation:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// // Get saved conversations for a user
// router.get("/conversations/:user_id", async (req, res) => {
//   try {
//     const { user_id } = req.params;

//     const { data, error } = await supabase
//       .from("conversations_and_messages")
//       .select("id, content, created_at")
//       .eq("auth0_id", user_id)
//       .eq("role", "conversation")
//       .order("created_at", { ascending: false });

//     if (error) throw error;

//     // Parse the conversation data
//     const conversations = data.map((conv) => {
//       const content = JSON.parse(conv.content);
//       return {
//         id: conv.id,
//         title: content.title,
//         message_count: content.message_count,
//         created_at: conv.created_at,
//         last_updated: content.last_updated,
//       };
//     });

//     res.json({
//       success: true,
//       conversations: conversations,
//     });
//   } catch (error) {
//     console.error("Error loading conversations:", error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

// // Load a specific conversation
// router.get("/conversation/:conversation_id", async (req, res) => {
//   try {
//     const { conversation_id } = req.params;

//     const { data, error } = await supabase
//       .from("conversations_and_messages")
//       .select("content")
//       .eq("id", conversation_id)
//       .eq("role", "conversation")
//       .single();

//     if (error) throw error;

//     const conversationData = JSON.parse(data.content);

//     res.json({
//       success: true,
//       conversation: conversationData,
//     });
//   } catch (error) {
//     console.error("Error loading conversation:", error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

export default router;
